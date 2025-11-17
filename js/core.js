/**
 * ================================================================
 * COMPONENT: Core Navigation Engine
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const Navigation = {
    currentTab: 'dashboard',
    modules: {},
    
    /**
     * Initialize navigation system
     */
    init() {
        console.log('[Navigation] Initializing...');
        
        // Setup tab button listeners
        this.setupTabButtons();
        
        // Initialize modules
        this.registerModule('dashboard', DashboardModule);
        this.registerModule('timeline', TimelineModule);
        this.registerModule('map', MapModule);
        this.registerModule('categories', CategoriesModule);
        this.registerModule('statistics', StatisticsModule);
        this.registerModule('impact', ImpactModule);
        this.registerModule('sources', SourcesModule);
        
        // Mount initial tab
        this.switchTab('dashboard');
    },
    
    /**
     * Setup tab button click handlers
     */
    setupTabButtons() {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.switchTab(tabName);
            });
        });
    },
    
    /**
     * Register a module
     */
    registerModule(name, module) {
        this.modules[name] = module;
        console.log(`[Navigation] Module registered: ${name}`);
    },
    
    /**
     * Switch to a different tab
     */
    switchTab(tabName) {
        console.log(`[Navigation] Switching to tab: ${tabName}`);
        
        // Hide current tab
        const currentTabEl = document.getElementById(`${this.currentTab}-tab`);
        if (currentTabEl) {
            currentTabEl.classList.remove('active');
        }
        
        // Unmount current module
        if (this.modules[this.currentTab] && this.modules[this.currentTab].unmount) {
            this.modules[this.currentTab].unmount();
        }
        
        // Show new tab
        const newTabEl = document.getElementById(`${tabName}-tab`);
        if (newTabEl) {
            newTabEl.classList.add('active');
        }
        
        // Mount new module
        if (this.modules[tabName] && this.modules[tabName].mount) {
            this.modules[tabName].mount();
        }
        
        // Update button state
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        // Update current tab
        this.currentTab = tabName;
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
};

// Export for use in other modules
window.Navigation = Navigation;

/**
 * ================================================================
 * COMPONENT: Dashboard Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const DashboardModule = {
    name: 'dashboard',
    version: 'v1.0.0',
    status: 'NEW',
    
    // Store for chart instances
    charts: {
        category: null,
        trend: null
    },
    
    /**
     * Mount dashboard
     */
    mount() {
        console.log('[Dashboard] Mounting...');
        this.render();
        this.renderCharts();
    },
    
    /**
     * Unmount dashboard
     */
    unmount() {
        console.log('[Dashboard] Unmounting...');
        // Destroy existing charts
        if (this.charts.category) this.charts.category.destroy();
        if (this.charts.trend) this.charts.trend.destroy();
    },
    
    /**
     * Render dashboard content
     */
    render() {
        const data = ApplicationData.statistics;
        
        // Update stat numbers
        document.getElementById('stat-total').textContent = data.totalAttacks;
        document.getElementById('stat-regions').textContent = Object.keys(data.byRegion).length;
        
        // Render recent attacks
        this.renderRecentAttacks();
    },
    
    /**
     * Render recent attacks list
     */
    renderRecentAttacks() {
        const recent = ApplicationData.getAllAttacks(10);
        const container = document.getElementById('recentAttacksList');
        
        container.innerHTML = recent.map(attack => `
            <div class="attack-item">
                <div class="attack-item-info">
                    <div class="attack-item-date">${attack.date || attack.Date}</div>
                    <div class="attack-item-location">${attack.location || attack.Location}</div>
                </div>
                <span class="attack-item-category">${attack.category}</span>
                <div>${attack.status || attack.Status || 'Unknown'}</div>
            </div>
        `).join('');
    },
    
    /**
     * Render charts
     */
    renderCharts() {
        this.renderCategoryChart();
        this.renderTrendChart();
    },
    
    /**
     * Render category pie chart
     */
    renderCategoryChart() {
        const data = ApplicationData.statistics.byCategory;
        const labels = Object.keys(data);
        const values = Object.values(data);
        const colors = labels.map(label => ApplicationData.getCategoryColor(label));
        
        const ctx = document.getElementById('categoryChart').getContext('2d');
        
        if (this.charts.category) this.charts.category.destroy();
        
        this.charts.category = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels.map(l => ApplicationData.getCategoryLabel(l)),
                datasets: [{
                    data: values,
                    backgroundColor: colors,
                    borderColor: '#1A1F2E',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#E4E4E4',
                            padding: 15
                        }
                    }
                }
            }
        });
    },
    
    /**
     * Render monthly trend line chart
     */
    renderTrendChart() {
        const data = ApplicationData.statistics.byMonth;
        const labels = Object.keys(data).sort();
        const values = labels.map(l => data[l]);
        
        const ctx = document.getElementById('trendChart').getContext('2d');
        
        if (this.charts.trend) this.charts.trend.destroy();
        
        this.charts.trend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Attacks per Month',
                    data: values,
                    borderColor: '#E63946',
                    backgroundColor: 'rgba(230, 57, 70, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#E63946',
                    pointBorderColor: '#1A1F2E',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: { color: '#E4E4E4' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#A8A8A8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#A8A8A8' }
                    }
                }
            }
        });
    }
};

/**
 * ================================================================
 * COMPONENT: Timeline Module (Placeholder)
 * ================================================================
 */

const TimelineModule = {
    name: 'timeline',
    mount() {
        console.log('[Timeline] Mounting...');
        this.render();
    },
    unmount() {
        console.log('[Timeline] Unmounting...');
    },
    render() {
        const container = document.getElementById('timelineContent');
        const attacks = ApplicationData.getAllAttacks();
        
        container.innerHTML = '<div class="timeline-list">' + 
            attacks.slice(0, 20).map((attack, idx) => `
                <div class="timeline-item" style="border-left: 4px solid ${ApplicationData.getCategoryColor(attack.category)}">
                    <div class="timeline-date">${attack.date || attack.Date}</div>
                    <div class="timeline-location">${attack.location || attack.Location}</div>
                    <div class="timeline-damage">${(attack.damage || attack.Damage_Description || '').substring(0, 200)}</div>
                </div>
            `).join('') +
        '</div>';
    }
};

/**
 * ================================================================
 * PLACEHOLDER MODULES
 * ================================================================
 */

const MapModule = { name: 'map', mount() { console.log('[Map] Mounted'); }, unmount() {} };
const CategoriesModule = { name: 'categories', mount() { console.log('[Categories] Mounted'); }, unmount() {} };
const StatisticsModule = { name: 'statistics', mount() { console.log('[Statistics] Mounted'); }, unmount() {} };
const ImpactModule = { name: 'impact', mount() { console.log('[Impact] Mounted'); }, unmount() {} };
const SourcesModule = { name: 'sources', mount() { console.log('[Sources] Mounted'); }, unmount() {} };

// Initialize Navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Navigation.init();
    });
} else {
    Navigation.init();
}
