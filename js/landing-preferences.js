/**
 * Landing Page Preferences Tracker
 * 
 * Stores user feedback, viewing history, and preferences for landing pages.
 * This data helps future landing page generations align with user preferences.
 */

(function() {
    'use strict';

    const STORAGE_KEY = 'landing_page_preferences';
    const VERSION = '1.0.0';

    /**
     * Default preferences structure
     */
    const defaultPreferences = {
        version: VERSION,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        
        // Viewing history
        viewHistory: [],
        
        // Page-specific feedback
        pageFeedback: {},
        
        // Aggregated style preferences
        stylePreferences: {
            // Color preferences (inferred from liked pages)
            colorSchemes: {
                dark: 0,
                light: 0,
                gradient: 0
            },
            // Layout preferences
            layouts: {
                minimal: 0,
                feature_rich: 0,
                photo_forward: 0
            },
            // Animation preferences
            animations: {
                subtle: 0,
                dynamic: 0,
                none: 0
            },
            // Typography preferences
            typography: {
                bold: 0,
                elegant: 0,
                modern: 0
            }
        },
        
        // General notes/comments from user
        userNotes: [],
        
        // Favorite pages
        favorites: [],
        
        // Pages to avoid (disliked)
        disliked: []
    };

    /**
     * Load preferences from localStorage
     */
    function loadPreferences() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Migrate if needed
                if (parsed.version !== VERSION) {
                    return migratePreferences(parsed);
                }
                return parsed;
            }
        } catch (e) {
            console.warn('Failed to load landing page preferences:', e);
        }
        return { ...defaultPreferences };
    }

    /**
     * Save preferences to localStorage
     */
    function savePreferences(prefs) {
        try {
            prefs.updated = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch (e) {
            console.warn('Failed to save landing page preferences:', e);
        }
    }

    /**
     * Migrate preferences from older versions
     */
    function migratePreferences(oldPrefs) {
        const newPrefs = { ...defaultPreferences };
        
        // Copy over compatible fields
        if (oldPrefs.viewHistory) newPrefs.viewHistory = oldPrefs.viewHistory;
        if (oldPrefs.pageFeedback) newPrefs.pageFeedback = oldPrefs.pageFeedback;
        if (oldPrefs.favorites) newPrefs.favorites = oldPrefs.favorites;
        if (oldPrefs.disliked) newPrefs.disliked = oldPrefs.disliked;
        if (oldPrefs.userNotes) newPrefs.userNotes = oldPrefs.userNotes;
        
        newPrefs.created = oldPrefs.created || new Date().toISOString();
        
        return newPrefs;
    }

    /**
     * Record a page view
     */
    function recordPageView(pageId, pageName) {
        const prefs = loadPreferences();
        
        prefs.viewHistory.push({
            pageId,
            pageName,
            timestamp: new Date().toISOString(),
            duration: 0 // Will be updated on page unload
        });
        
        // Keep only last 100 views
        if (prefs.viewHistory.length > 100) {
            prefs.viewHistory = prefs.viewHistory.slice(-100);
        }
        
        savePreferences(prefs);
        
        // Track duration
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const duration = Math.round((Date.now() - startTime) / 1000);
            updateLastViewDuration(duration);
        });
    }

    /**
     * Update duration for the last view
     */
    function updateLastViewDuration(duration) {
        const prefs = loadPreferences();
        if (prefs.viewHistory.length > 0) {
            prefs.viewHistory[prefs.viewHistory.length - 1].duration = duration;
            savePreferences(prefs);
        }
    }

    /**
     * Record feedback for a page
     */
    function recordFeedback(pageId, feedback) {
        const prefs = loadPreferences();
        
        if (!prefs.pageFeedback[pageId]) {
            prefs.pageFeedback[pageId] = {
                ratings: [],
                comments: [],
                lastUpdated: null
            };
        }
        
        const pageFeedback = prefs.pageFeedback[pageId];
        
        if (feedback.rating !== undefined) {
            pageFeedback.ratings.push({
                value: feedback.rating,
                timestamp: new Date().toISOString()
            });
        }
        
        if (feedback.comment) {
            pageFeedback.comments.push({
                text: feedback.comment,
                timestamp: new Date().toISOString()
            });
        }
        
        if (feedback.liked !== undefined) {
            if (feedback.liked) {
                if (!prefs.favorites.includes(pageId)) {
                    prefs.favorites.push(pageId);
                }
                prefs.disliked = prefs.disliked.filter(id => id !== pageId);
            } else {
                if (!prefs.disliked.includes(pageId)) {
                    prefs.disliked.push(pageId);
                }
                prefs.favorites = prefs.favorites.filter(id => id !== pageId);
            }
        }
        
        // Update style preferences based on page characteristics
        if (feedback.styles) {
            updateStylePreferences(prefs, feedback.styles, feedback.liked ? 1 : -1);
        }
        
        pageFeedback.lastUpdated = new Date().toISOString();
        savePreferences(prefs);
    }

    /**
     * Update aggregated style preferences
     */
    function updateStylePreferences(prefs, styles, weight) {
        for (const [category, value] of Object.entries(styles)) {
            if (prefs.stylePreferences[category] && prefs.stylePreferences[category][value] !== undefined) {
                prefs.stylePreferences[category][value] += weight;
            }
        }
    }

    /**
     * Add a user note
     */
    function addUserNote(note, context = {}) {
        const prefs = loadPreferences();
        
        prefs.userNotes.push({
            text: note,
            context,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 notes
        if (prefs.userNotes.length > 50) {
            prefs.userNotes = prefs.userNotes.slice(-50);
        }
        
        savePreferences(prefs);
    }

    /**
     * Get summary of preferences for AI context
     */
    function getPreferencesSummary() {
        const prefs = loadPreferences();
        
        // Calculate most viewed pages
        const viewCounts = {};
        prefs.viewHistory.forEach(view => {
            viewCounts[view.pageId] = (viewCounts[view.pageId] || 0) + 1;
        });
        
        // Calculate average view duration per page
        const avgDurations = {};
        const durationSums = {};
        const durationCounts = {};
        prefs.viewHistory.forEach(view => {
            if (view.duration > 0) {
                durationSums[view.pageId] = (durationSums[view.pageId] || 0) + view.duration;
                durationCounts[view.pageId] = (durationCounts[view.pageId] || 0) + 1;
            }
        });
        for (const pageId of Object.keys(durationSums)) {
            avgDurations[pageId] = Math.round(durationSums[pageId] / durationCounts[pageId]);
        }
        
        // Find top style preferences
        const topStyles = {};
        for (const [category, values] of Object.entries(prefs.stylePreferences)) {
            const sorted = Object.entries(values).sort((a, b) => b[1] - a[1]);
            if (sorted[0] && sorted[0][1] > 0) {
                topStyles[category] = sorted[0][0];
            }
        }
        
        return {
            totalViews: prefs.viewHistory.length,
            favorites: prefs.favorites,
            disliked: prefs.disliked,
            mostViewed: Object.entries(viewCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([id, count]) => ({ pageId: id, views: count })),
            longestViewed: Object.entries(avgDurations)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([id, duration]) => ({ pageId: id, avgDuration: duration })),
            topStylePreferences: topStyles,
            recentNotes: prefs.userNotes.slice(-5).map(n => n.text),
            lastUpdated: prefs.updated
        };
    }

    /**
     * Reset all preferences
     */
    function resetPreferences() {
        localStorage.removeItem(STORAGE_KEY);
    }

    /**
     * Export preferences as JSON
     */
    function exportPreferences() {
        return JSON.stringify(loadPreferences(), null, 2);
    }

    // Expose API globally
    window.LandingPreferences = {
        load: loadPreferences,
        save: savePreferences,
        recordPageView,
        recordFeedback,
        addUserNote,
        getSummary: getPreferencesSummary,
        reset: resetPreferences,
        export: exportPreferences
    };

    // Auto-track page views on landing pages
    document.addEventListener('DOMContentLoaded', () => {
        const path = window.location.pathname;
        
        // Check if we're on a landing page
        if (path.includes('landing-pages/') && !path.includes('landing-showcase')) {
            const pageName = path.split('/').pop().replace('.html', '');
            const pageId = pageName;
            
            recordPageView(pageId, pageName);
            
            console.log(`📊 Landing page view recorded: ${pageName}`);
        }
    });

})();
