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
        const totalEl = document.getElementById('stat-total');
        const regionsEl = document.getElementById('stat-regions');
        
        if (totalEl) totalEl.textContent = data.totalAttacks;
        if (regionsEl) regionsEl.textContent = Object.keys(data.byRegion).length;
        
        // Render recent attacks
        this.renderRecentAttacks();
    },
    
    /**
     * Render recent attacks list
     */
    renderRecentAttacks() {
        const recent = ApplicationData.getAllAttacks(10);
        const container = document.getElementById('recentAttacksList');
        
        if (!container) return;
        
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
        
        const canvas = document.getElementById('categoryChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
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
        
        const canvas = document.getElementById('trendChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
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
window.DashboardModule = DashboardModule;
// Export if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardModule;
}