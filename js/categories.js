/**
 * ================================================================
 * COMPONENT: Categories Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const CategoriesModule = {
    name: 'categories',
    version: 'v1.0.0',
    status: 'NEW',
    currentCategory: 'Refineries',
    
    mount() {
        console.log('[Categories] Mounting...');
        this.setupCategoryTabs();
        this.renderCategory(this.currentCategory);
    },
    
    unmount() {
        console.log('[Categories] Unmounting...');
    },
    
    setupCategoryTabs() {
        const buttons = document.querySelectorAll('.category-tab-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.currentTarget.dataset.category;
                this.switchCategory(category);
            });
        });
    },
    
    switchCategory(category) {
        // Update button states
        document.querySelectorAll('.category-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        // Render category content
        this.currentCategory = category;
        this.renderCategory(category);
    },
    
    renderCategory(category) {
        const container = document.getElementById('categoryContent');
        if (!container) return;
        
        const attacks = ApplicationData.getByCategory(category);
        const color = ApplicationData.getCategoryColor(category);
        const label = ApplicationData.getCategoryLabel(category);
        
        container.innerHTML = `
            <div class="category-detail" style="animation: fadeIn 0.3s;">
                <h2 style="color: ${color}; margin-bottom: 1.5rem;">
                    ${label}
                </h2>
                
                <div class="category-stats" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div class="stat-box" style="background: var(--secondary-bg); padding: 1.5rem; border-radius: var(--radius-lg); border-left: 4px solid ${color};">
                        <div style="font-size: 2rem; font-weight: 700; color: ${color};">${attacks.length}</div>
                        <div style="color: var(--text-secondary); margin-top: 0.5rem;">Total Attacks</div>
                    </div>
                    
                    <div class="stat-box" style="background: var(--secondary-bg); padding: 1.5rem; border-radius: var(--radius-lg); border-left: 4px solid ${color};">
                        <div style="font-size: 2rem; font-weight: 700; color: ${color};">${this.getUniqueLocations(attacks)}</div>
                        <div style="color: var(--text-secondary); margin-top: 0.5rem;">Unique Targets</div>
                    </div>
                    
                    <div class="stat-box" style="background: var(--secondary-bg); padding: 1.5rem; border-radius: var(--radius-lg); border-left: 4px solid ${color};">
                        <div style="font-size: 2rem; font-weight: 700; color: ${color};">${this.getDateRange(attacks)}</div>
                        <div style="color: var(--text-secondary); margin-top: 0.5rem;">Time Period</div>
                    </div>
                </div>
                
                <h3 style="margin-bottom: 1rem;">Attack List</h3>
                <div class="attacks-table" style="overflow-x: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--secondary-bg); border-bottom: 2px solid ${color};">
                                <th style="padding: 1rem; text-align: left; color: var(--text-primary);">Date</th>
                                <th style="padding: 1rem; text-align: left; color: var(--text-primary);">Location</th>
                                <th style="padding: 1rem; text-align: left; color: var(--text-primary);">Region</th>
                                <th style="padding: 1rem; text-align: left; color: var(--text-primary);">Status</th>
                                <th style="padding: 1rem; text-align: left; color: var(--text-primary);">Distance (km)</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${attacks.map((attack, idx) => `
                                <tr style="border-bottom: 1px solid var(--border-color); ${idx % 2 === 0 ? 'background: var(--tertiary-bg);' : ''}">
                                    <td style="padding: 1rem; color: var(--text-secondary);">${attack.date || attack.Date}</td>
                                    <td style="padding: 1rem; color: var(--text-primary); font-weight: 500;">${attack.location || attack.Location}</td>
                                    <td style="padding: 1rem; color: var(--text-secondary);">${attack.region || attack.Region || 'N/A'}</td>
                                    <td style="padding: 1rem;">
                                        <span style="padding: 0.25rem 0.75rem; background: ${color}33; color: ${color}; border-radius: 0.25rem; font-size: 0.875rem;">
                                            ${attack.status || attack.Status || 'Unknown'}
                                        </span>
                                    </td>
                                    <td style="padding: 1rem; color: var(--text-secondary);">${attack.distance_km || attack.Distance_from_Ukraine_km || 'N/A'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    },
    
    getUniqueLocations(attacks) {
        const locations = new Set();
        attacks.forEach(a => {
            const loc = a.location || a.Location;
            if (loc) locations.add(loc);
        });
        return locations.size;
    },
    
    getDateRange(attacks) {
        if (attacks.length === 0) return 'N/A';
        
        const dates = attacks.map(a => new Date(a.date || a.Date)).filter(d => !isNaN(d));
        if (dates.length === 0) return 'N/A';
        
        const earliest = new Date(Math.min(...dates));
        const latest = new Date(Math.max(...dates));
        
        const formatDate = (d) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[d.getMonth()]} ${d.getFullYear()}`;
        };
        
        if (earliest.getTime() === latest.getTime()) {
            return formatDate(earliest);
        }
        
        return `${formatDate(earliest)} - ${formatDate(latest)}`;
    }
};
window.CategoriesModule = CategoriesModule;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategoriesModule;
}