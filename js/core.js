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
        
        // Initialize modules from global scope
        this.registerModule('dashboard', window.DashboardModule);
        this.registerModule('timeline', window.TimelineModule);
        this.registerModule('map', window.MapModule);
        this.registerModule('categories', window.CategoriesModule);
        this.registerModule('statistics', window.StatisticsModule);
        this.registerModule('impact', window.ImpactModule);
        this.registerModule('sources', window.SourcesModule);
        
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

// Make Navigation available globally
window.Navigation = Navigation;

// Initialize Navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Only init after ApplicationData is ready (delegated from data.js)
        // If you want to allow manual init, uncomment the next line:
        // Navigation.init();
    });
} else {
    // Navigation.init(); // Only if using manual initialization
}