/**
 * ================================================================
 * COMPONENT: Statistics Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const StatisticsModule = {
    name: 'statistics',
    version: 'v1.0.0',
    status: 'NEW',
    charts: {},
    
    mount() {
        console.log('[Statistics] Mounting...');
        setTimeout(() => this.renderCharts(), 100);
    },
    
    unmount() {
        console.log('[Statistics] Unmounting...');
        Object.values(this.charts).forEach(chart => {
            if (chart) chart.destroy();
        });
        this.charts = {};
    },
    
    renderCharts() {
        this.renderRegionChart();
        this.renderDistanceChart();
        this.renderTypeChart();
        this.renderDamageChart();
    },
    
    renderRegionChart() {
        const canvas = document.getElementById('regionChart');
        if (!canvas || typeof Chart === 'undefined') return;
        
        const topRegions = ApplicationData.getTopRegions(10);
        
        if (this.charts.region) this.charts.region.destroy();
        
        this.charts.region = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: topRegions.map(r => r.region),
                datasets: [{
                    label: 'Number of Attacks',
                    data: topRegions.map(r => r.count),
                    backgroundColor: '#E63946',
                    borderColor: '#1A1F2E',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Top 10 Regions by Attack Count',
                        color: '#E4E4E4'
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#A8A8A8' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#A8A8A8' }
                    }
                }
            }
        });
    },
    
    renderDistanceChart() {
        const canvas = document.getElementById('distanceChart');
        if (!canvas || typeof Chart === 'undefined') return;
        
        const attacks = ApplicationData.getAllAttacks();
        const distances = attacks
            .filter(a => a.distance_km || a.Distance_from_Ukraine_km)
            .map(a => a.distance_km || a.Distance_from_Ukraine_km);
        
        // Create histogram bins
        const bins = [0, 200, 400, 600, 800, 1000, 1500, 2000];
        const counts = new Array(bins.length - 1).fill(0);
        
        distances.forEach(d => {
            for (let i = 0; i < bins.length - 1; i++) {
                if (d >= bins[i] && d < bins[i + 1]) {
                    counts[i]++;
                    break;
                }
            }
        });
        
        if (this.charts.distance) this.charts.distance.destroy();
        
        this.charts.distance = new Chart(canvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: bins.slice(0, -1).map((b, i) => `${b}-${bins[i + 1]} km`),
                datasets: [{
                    label: 'Number of Attacks',
                    data: counts,
                    backgroundColor: '#06AED5',
                    borderColor: '#1A1F2E',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Distance from Ukraine Distribution',
                        color: '#E4E4E4'
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
    },
    
    renderTypeChart() {
        const canvas = document.getElementById('typeChart');
        if (!canvas || typeof Chart === 'undefined') return;
        
        const attacks = ApplicationData.getAllAttacks();
        const types = {};
        
        attacks.forEach(a => {
            const type = a.attack_type || a.Attack_Type || 'Unknown';
            types[type] = (types[type] || 0) + 1;
        });
        
        if (this.charts.type) this.charts.type.destroy();
        
        this.charts.type = new Chart(canvas.getContext('2d'), {
            type: 'pie',
            data: {
                labels: Object.keys(types),
                datasets: [{
                    data: Object.values(types),
                    backgroundColor: ['#E63946', '#F77F00', '#FCBF49', '#06AED5', '#8338EC', '#FF006E'],
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
                        labels: { color: '#E4E4E4', padding: 15 }
                    },
                    title: {
                        display: true,
                        text: 'Attack Type Distribution',
                        color: '#E4E4E4'
                    }
                }
            }
        });
    },
    
    renderDamageChart() {
        const canvas = document.getElementById('damageChart');
        if (!canvas || typeof Chart === 'undefined') return;
        
        const attacks = ApplicationData.getAllAttacks();
        const statuses = {};
        
        attacks.forEach(a => {
            const status = a.status || a.Status || 'Unknown';
            statuses[status] = (statuses[status] || 0) + 1;
        });
        
        if (this.charts.damage) this.charts.damage.destroy();
        
        this.charts.damage = new Chart(canvas.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: Object.keys(statuses),
                datasets: [{
                    data: Object.values(statuses),
                    backgroundColor: ['#06D6A0', '#FFD23F', '#EF476F', '#A8A8A8'],
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
                        labels: { color: '#E4E4E4', padding: 15 }
                    },
                    title: {
                        display: true,
                        text: 'Damage Status Distribution',
                        color: '#E4E4E4'
                    }
                }
            }
        });
    }
};
window.StatisticsModule = StatisticsModule;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StatisticsModule;
}