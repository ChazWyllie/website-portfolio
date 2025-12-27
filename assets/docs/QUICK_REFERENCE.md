# Quick Reference Guide

## 🚀 Quick Start

### View Website Locally
```bash
cd /Users/chazwyllie/Git/website-portfolio
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Deploy Changes
```bash
git add .
git commit -m "Your commit message"
git push origin main
# Auto-deploys to chazwyllie.com (~1-2 minutes)
```

---

## 🎨 Customization

### Change Colors
Edit `styles.css` root variables (lines 1-40):
```css
:root {
    --color-primary: #0F1419;      /* Navy blue */
    --color-accent: #FFD700;       /* Gold */
    --color-bg-primary: #FAFAFA;   /* Cream */
}
```

### Update GitHub Username
Edit `js/github-integration.js` line 321:
```javascript
const github = new GitHubIntegration('YourUsername');
```

### Modify Chart Data
Edit `js/charts.js` in the relevant chart creation function (lines 60-200).

### Add New Section
1. Add HTML to `index.html`
2. Add CSS to `styles.css`
3. Add animation to `js/animations.js` (optional)

---

## 📊 What Each File Does

| File | Purpose | Key Features |
|------|---------|--------------|
| `index.html` | Main page structure | 10 sections, meta tags, structured data |
| `styles.css` | All styling & animations | CSS variables, grid/flex, dark mode |
| `js/animations.js` | Scroll & interaction animations | GSAP, ScrollTrigger, smooth navigation |
| `js/github-integration.js` | GitHub API integration | Real-time stats, caching, error handling |
| `js/charts.js` | Data visualizations | Chart.js initialization, 3 chart types |

---

## 🔧 Common Tasks

### Add New Project
1. Update `index.html` - Add project card in projects section
2. Create `project3.html` - Follow project1.html template
3. Update `styles.css` - Add any custom styles
4. Update `js/charts.js` - Add sample data if needed

### Update Skills
1. Edit `index.html` - Find skills section
2. Update skill items and data-percentage attributes
3. Skill animations are automatic in `js/animations.js`

### Modify Animations Timing
Edit `js/animations.js` - Look for duration values:
```javascript
.from(element, {
    opacity: 0,
    duration: 0.6,    // Change this (in seconds)
    ease: 'power2.out' // Or change easing
});
```

### Adjust Responsive Breakpoints
Edit `styles.css` media queries (lines 1380+):
```css
@media (max-width: 768px) {  /* Tablet */
    /* Tablet styles */
}

@media (max-width: 480px) {  /* Mobile */
    /* Mobile styles */
}
```

---

## 🐛 Troubleshooting

### Problem: Charts Not Showing
**Solution**: 
1. Check browser console (F12) for errors
2. Verify Chart.js CDN is loaded
3. Clear browser cache (Cmd+Shift+R)
4. Check canvas IDs in HTML match `js/charts.js`

### Problem: Animations Stuttering
**Solution**:
1. Check for `prefers-reduced-motion` setting
2. Test on different browser
3. Verify GPU acceleration is enabled
4. Check for JavaScript errors in console

### Problem: GitHub Stats Show "—"
**Solution**:
1. Check GitHub API rate limits (60/hour)
2. Verify internet connection
3. Try in incognito window
4. Clear sessionStorage: `sessionStorage.clear()`

### Problem: Mobile Menu Stuck
**Solution**:
1. Check JavaScript console for errors
2. Clear browser cache
3. Test on different mobile device
4. Verify CSS z-index values

---

## 📈 Analytics Integration

Add Google Analytics (optional):

1. Create Google Analytics account
2. Get tracking ID (format: GA-XXXXXX-X)
3. Add to `index.html` head:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXX-X"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXXX-X');
</script>
```

---

## 🎯 Performance Tips

### Optimize Images
```bash
# Install imagemin
npm install -g imagemin-cli imagemin-mozjpeg

# Compress images
imagemin Professional*.jpeg --out-dir=.
```

### Minify CSS/JS
```bash
# Install terser (JavaScript minifier)
npm install -g terser

# Minify JS
terser js/animations.js -o js/animations.min.js
```

### Enable Caching
Add to `.htaccess` (if using Apache):
```apache
<FilesMatch "\.(jpg|jpeg|png|gif|js|css|woff|woff2)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

---

## 🔐 Security Checklist

- [ ] No API keys in code
- [ ] HTTPS enabled (GitHub Pages auto-enables)
- [ ] No eval() or dangerous functions
- [ ] Form inputs validated
- [ ] External links have `rel="noopener noreferrer"`
- [ ] No inline event handlers

---

## 📱 Testing Devices

### Recommended Sizes to Test
- **Desktop**: 1920x1080, 1440x900
- **Laptop**: 1366x768
- **Tablet**: 768x1024 (iPad), 600x800 (Android)
- **Mobile**: 375x667 (iPhone), 360x640 (Android)

### Tools
- Chrome DevTools (F12 → Device Emulation)
- Firefox DevTools (F12 → Responsive Design)
- BrowserStack.com (real device testing)

---

## 📚 Useful Resources

### Documentation
- [GSAP Docs](https://greensock.com/docs/)
- [Chart.js Docs](https://www.chartjs.org/docs/latest/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub API Docs](https://docs.github.com/en/rest)

### Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)
- [WAVE (Accessibility)](https://wave.webaim.org/)

### Learning
- [CSS-Tricks](https://css-tricks.com/)
- [Dev.to](https://dev.to/)
- [FreeCodeCamp](https://freecodecamp.org/)

---

## 🔄 Version History

### v1.0.0 (December 26, 2025) - Initial Release
- ✅ Complete portfolio design
- ✅ GSAP scroll animations
- ✅ GitHub integration
- ✅ Data visualization charts
- ✅ 3D card effects
- ✅ Responsive design
- ✅ Accessibility compliance
- ✅ SEO optimization

---

## 📞 Support

For questions or issues, contact:
- **Email**: cwyllie1@asu.edu
- **GitHub Issues**: github.com/ChazWyllie/website-portfolio/issues

---

## ⭐ Credits

**Built with**:
- GSAP (Animation)
- Chart.js (Visualization)
- Vanilla Tilt (3D Effects)
- Google Fonts
- GitHub API

**Design Inspiration**: 2026 Web Design Trends
**Platform**: GitHub Pages
**Framework**: Vanilla HTML/CSS/JavaScript

---

**Last Updated**: December 26, 2025
