// ================================================================
// CHARTS.JS - Data Visualization with Chart.js
// ================================================================

class PortfolioCharts {
    constructor() {
        this.charts = {};
        this.colors = {
            primary: '#FFD700',
            secondary: '#0F1419',
            success: '#4CAF50',
            warning: '#FF9800',
            danger: '#F44336',
            info: '#2196F3'
        };
        this.chartOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#666',
                        font: {
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                            size: 12
                        },
                        padding: 15
                    }
                }
            }
        };
    }

    /**
     * Initialize all charts on page load
     */
    initializeCharts() {
        console.log('Initializing charts...');
        
        this.createPerformanceChart();
        this.createSkillMatrixChart();
        this.createTimelineChart();
        
        console.log('✓ All charts initialized');
    }

    /**
     * Performance Optimization Chart
     * Shows project metrics: Speed, Optimization, Quality
     */
    createPerformanceChart() {
        const canvas = document.getElementById('performanceChart');
        if (!canvas) {
            console.warn('performanceChart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.performance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Performance',
                    'Optimization',
                    'Code Quality',
                    'Scalability',
                    'Security',
                    'Testing'
                ],
                datasets: [
                    {
                        label: 'Project Average',
                        data: [92, 88, 90, 85, 87, 89],
                        borderColor: this.colors.primary,
                        backgroundColor: `rgba(255, 215, 0, 0.1)`,
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 5,
                        pointBackgroundColor: this.colors.primary,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Industry Standard',
                        data: [80, 75, 80, 78, 82, 75],
                        borderColor: '#666',
                        backgroundColor: `rgba(102, 102, 102, 0.05)`,
                        borderWidth: 1,
                        borderDash: [5, 5],
                        fill: true,
                        pointRadius: 3,
                        pointBackgroundColor: '#666'
                    }
                ]
            },
            options: {
                ...this.chartOptions,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20,
                            color: '#999',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    /**
     * Skill Matrix Chart
     * Shows proficiency levels across technologies
     */
    createSkillMatrixChart() {
        const canvas = document.getElementById('skillMatrixChart');
        if (!canvas) {
            console.warn('skillMatrixChart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.skills = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [
                    'Python',
                    'Java',
                    'C/C++',
                    'JavaScript',
                    'SQL',
                    'ML/AI',
                    'DevOps',
                    'React'
                ],
                datasets: [
                    {
                        label: 'Proficiency Level',
                        data: [95, 88, 82, 92, 87, 90, 78, 85],
                        backgroundColor: [
                            this.colors.primary,
                            this.colors.primary,
                            this.colors.warning,
                            this.colors.primary,
                            this.colors.primary,
                            this.colors.success,
                            this.colors.warning,
                            this.colors.primary
                        ],
                        borderRadius: 8,
                        borderWidth: 0,
                        hoverBackgroundColor: [
                            '#FFE680',
                            '#FFE680',
                            '#FFB74D',
                            '#FFE680',
                            '#FFE680',
                            '#81C784',
                            '#FFB74D',
                            '#FFE680'
                        ]
                    }
                ]
            },
            options: {
                ...this.chartOptions,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#666',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#666',
                            font: {
                                size: 12,
                                weight: 500
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Project Timeline Chart
     * Shows project complexity and completion timeline
     */
    createTimelineChart() {
        const canvas = document.getElementById('timelineChart');
        if (!canvas) {
            console.warn('timelineChart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        this.charts.timeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    'Project 1',
                    'Project 2',
                    'Project 3',
                    'Project 4',
                    'Current'
                ],
                datasets: [
                    {
                        label: 'Complexity',
                        data: [35, 62, 78, 85, 92],
                        borderColor: this.colors.primary,
                        backgroundColor: `rgba(255, 215, 0, 0.1)`,
                        borderWidth: 3,
                        fill: true,
                        pointRadius: 6,
                        pointBackgroundColor: this.colors.primary,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 8,
                        tension: 0.4
                    },
                    {
                        label: 'Impact Score',
                        data: [70, 75, 82, 88, 95],
                        borderColor: this.colors.success,
                        backgroundColor: `rgba(76, 175, 80, 0.05)`,
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 4,
                        pointBackgroundColor: this.colors.success,
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointHoverRadius: 6,
                        borderDash: [5, 5],
                        tension: 0.4
                    }
                ]
            },
            options: {
                ...this.chartOptions,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            color: '#666',
                            font: {
                                size: 11
                            },
                            stepSize: 20
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#666',
                            font: {
                                size: 11
                            }
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    /**
     * Update chart data dynamically
     */
    updateChart(chartName, newData) {
        if (this.charts[chartName]) {
            this.charts[chartName].data.datasets[0].data = newData;
            this.charts[chartName].update('none'); // Update without animation
        }
    }

    /**
     * Animate chart data change
     */
    animateChartUpdate(chartName, newData, duration = 500) {
        if (!this.charts[chartName]) return;

        const chart = this.charts[chartName];
        const oldData = [...chart.data.datasets[0].data];
        const steps = 50;
        const increment = duration / steps;

        let current = 0;

        const animate = () => {
            if (current < steps) {
                const progress = current / steps;
                const animatedData = oldData.map((oldVal, index) => {
                    const newVal = newData[index];
                    return oldVal + (newVal - oldVal) * progress;
                });

                chart.data.datasets[0].data = animatedData;
                chart.update('none');

                current++;
                setTimeout(animate, increment);
            } else {
                chart.data.datasets[0].data = newData;
                chart.update('none');
            }
        };

        animate();
    }

    /**
     * Get chart instance
     */
    getChart(chartName) {
        return this.charts[chartName];
    }

    /**
     * Destroy all charts
     */
    destroyCharts() {
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].destroy();
            }
        });
        this.charts = {};
    }

    /**
     * Resize charts (for responsive design)
     */
    resizeCharts() {
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].resize();
            }
        });
    }
}

// ================================================================
// INITIALIZE CHARTS ON DOM READY
// ================================================================

let portfolioCharts = null;

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Wait for Chart.js to be available
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js library not loaded');
            // Show fallback message
            const chartsContainer = document.querySelector('.project-metrics');
            if (chartsContainer) {
                chartsContainer.innerHTML += '<p style="text-align: center; color: #999;">Charts are loading...</p>';
            }
            return;
        }

        portfolioCharts = new PortfolioCharts();
        portfolioCharts.initializeCharts();
    } catch (error) {
        console.error('Error initializing charts:', error);
    }

    // Handle window resize for responsive charts
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            portfolioCharts.resizeCharts();
        }, 250);
    });

    console.log('✓ Charts system initialized');
});

// ================================================================
// EXPORT FOR MODULE SYSTEMS
// ================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioCharts;
}

// ================================================================
// SAMPLE DATA MANAGEMENT
// ================================================================

const sampleProjectMetrics = {
    'kaizen-todo': {
        performance: [88, 92, 95, 87, 85, 90],
        complexity: 35,
        impact: 70,
        technologies: ['React', 'Node.js', 'PostgreSQL']
    },
    'data-viz': {
        performance: [90, 95, 92, 89, 88, 93],
        complexity: 62,
        impact: 75,
        technologies: ['Python', 'D3.js', 'TensorFlow']
    },
    'ml-model': {
        performance: [92, 90, 88, 92, 91, 89],
        complexity: 78,
        impact: 82,
        technologies: ['Python', 'Scikit-learn', 'TensorFlow']
    },
    'ecommerce-api': {
        performance: [85, 88, 90, 86, 89, 92],
        complexity: 85,
        impact: 88,
        technologies: ['Java', 'Spring Boot', 'PostgreSQL']
    }
};

// ================================================================
// INTERACTIVE CHART UPDATES
// ================================================================

function updateChartForProject(projectId) {
    if (!portfolioCharts) return;

    const metrics = sampleProjectMetrics[projectId];
    if (metrics) {
        portfolioCharts.animateChartUpdate('performance', metrics.performance);
    }
}

// Example: Update when clicking project cards
document.addEventListener('click', (e) => {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
        const projectId = projectCard.getAttribute('data-project-id');
        if (projectId) {
            updateChartForProject(projectId);
        }
    }
});
