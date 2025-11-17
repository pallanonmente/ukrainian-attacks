/**
 * ================================================================
 * COMPONENT: Central Data Store
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const ApplicationData = {
    // Data containers
    refineries: [],
    powerPlants: [],
    substations: [],
    ports: [],
    defense: [],
    fuelDepots: [],
    
    // Combined dataset
    allAttacks: [],
    
    // Statistics
    statistics: {
        totalAttacks: 0,
        byCategory: {},
        byRegion: {},
        byMonth: {},
        avgDistance: 0,
        maxDistance: 0,
        totalCapacityLost: 0
    },
    
    // Category mapping
    categoryColors: {
        'Refineries': '#E63946',
        'Power_Plants': '#F77F00',
        'Substations': '#FCBF49',
        'Ports': '#06AED5',
        'Defense_Facilities': '#8338EC',
        'Fuel_Depots': '#FF006E'
    },
    
    categoryLabels: {
        'Refineries': 'Refineries',
        'Power_Plants': 'Power Plants',
        'Substations': 'Electrical Substations',
        'Ports': 'Port Terminals',
        'Defense_Facilities': 'Defense Facilities',
        'Fuel_Depots': 'Fuel Depots'
    },
    
    /**
     * Initialize and load all datasets
     */
    async init() {
        console.log('[Data] Initializing data store...');
        
        try {
            // Load all JSON files
            this.refineries = await this.fetchJSON('data_refineries.json');
            this.powerPlants = await this.fetchJSON('data_power_plants.json');
            this.substations = await this.fetchJSON('data_substations.json');
            this.ports = await this.fetchJSON('data_ports.json');
            this.defense = await this.fetchJSON('data_defense.json');
            this.fuelDepots = await this.fetchJSON('data_fuel.json');
            
            // Combine all data
            this.combineData();
            
            // Compute statistics
            this.computeStatistics();
            
            console.log('[Data] ✅ Data loaded successfully:', {
                total: this.allAttacks.length,
                refineries: this.refineries.length,
                powerPlants: this.powerPlants.length,
                substations: this.substations.length,
                ports: this.ports.length,
                defense: this.defense.length,
                fuelDepots: this.fuelDepots.length
            });
            
            return true;
        } catch (error) {
            console.error('[Data] ❌ Error loading data:', error);
            return false;
        }
    },
    
    /**
     * Fetch JSON file
     */
    async fetchJSON(filename) {
        try {
            const response = await fetch(filename);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            return await response.json();
        } catch (error) {
            console.error(`[Data] Error fetching ${filename}:`, error);
            return [];
        }
    },
    
    /**
     * Combine all datasets into single array
     */
    combineData() {
        this.allAttacks = [
            ...this.refineries.map(r => ({ ...r, category: 'Refineries' })),
            ...this.powerPlants.map(p => ({ ...p, category: 'Power_Plants' })),
            ...this.substations.map(s => ({ ...s, category: 'Substations' })),
            ...this.ports.map(p => ({ ...p, category: 'Ports' })),
            ...this.defense.map(d => ({ ...d, category: 'Defense_Facilities' })),
            ...this.fuelDepots.map(f => ({ ...f, category: 'Fuel_Depots' }))
        ];
        
        // Sort by date descending
        this.allAttacks.sort((a, b) => new Date(b.date || b.Date) - new Date(a.date || a.Date));
    },
    
    /**
     * Compute statistics from data
     */
    computeStatistics() {
        this.statistics.totalAttacks = this.allAttacks.length;
        
        // Count by category
        this.statistics.byCategory = {};
        this.allAttacks.forEach(attack => {
            const cat = attack.category;
            this.statistics.byCategory[cat] = (this.statistics.byCategory[cat] || 0) + 1;
        });
        
        // Count by region
        this.statistics.byRegion = {};
        this.allAttacks.forEach(attack => {
            const region = attack.region || 'Unknown';
            this.statistics.byRegion[region] = (this.statistics.byRegion[region] || 0) + 1;
        });
        
        // Count by month
        this.statistics.byMonth = {};
        this.allAttacks.forEach(attack => {
            const dateStr = attack.date || attack.Date;
            if (dateStr) {
                const monthKey = dateStr.substring(0, 7);
                this.statistics.byMonth[monthKey] = (this.statistics.byMonth[monthKey] || 0) + 1;
            }
        });
        
        // Distance calculations
        const distances = this.allAttacks
            .filter(a => a.distance_km || a.Distance_from_Ukraine_km)
            .map(a => a.distance_km || a.Distance_from_Ukraine_km);
        
        if (distances.length > 0) {
            this.statistics.avgDistance = distances.reduce((a, b) => a + b) / distances.length;
            this.statistics.maxDistance = Math.max(...distances);
        }
    },
    
    /**
     * Get all attacks
     */
    getAllAttacks(limit = null) {
        return limit ? this.allAttacks.slice(0, limit) : this.allAttacks;
    },
    
    /**
     * Get attacks by category
     */
    getByCategory(category) {
        return this.allAttacks.filter(a => a.category === category);
    },
    
    /**
     * Get attacks by region
     */
    getByRegion(region) {
        return this.allAttacks.filter(a => (a.region || 'Unknown') === region);
    },
    
    /**
     * Filter by date range
     */
    filterByDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        
        return this.allAttacks.filter(a => {
            const attackDate = new Date(a.date || a.Date);
            return attackDate >= start && attackDate <= end;
        });
    },
    
    /**
     * Filter by distance
     */
    filterByDistance(maxDistance) {
        return this.allAttacks.filter(a => {
            const dist = a.distance_km || a.Distance_from_Ukraine_km || 0;
            return dist <= maxDistance;
        });
    },
    
    /**
     * Search attacks
     */
    searchAttacks(query) {
        const q = query.toLowerCase();
        return this.allAttacks.filter(a => {
            return (a.location || a.Location || '').toLowerCase().includes(q) ||
                   (a.damage || a.Damage_Description || '').toLowerCase().includes(q) ||
                   (a.region || '').toLowerCase().includes(q);
        });
    },
    
    /**
     * Get top regions by attack count
     */
    getTopRegions(limit = 10) {
        return Object.entries(this.statistics.byRegion)
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([region, count]) => ({ region, count }));
    },
    
    /**
     * Get category color
     */
    getCategoryColor(category) {
        return this.categoryColors[category] || '#999999';
    },
    
    /**
     * Get category label
     */
    getCategoryLabel(category) {
        return this.categoryLabels[category] || category;
    },
    
    /**
     * Export as CSV
     */
    exportCSV() {
        const headers = ['Date', 'Location', 'Category', 'Region', 'Type', 'Damage', 'Status', 'Distance (km)'];
        const rows = this.allAttacks.map(a => [
            a.date || a.Date || '',
            a.location || a.Location || '',
            a.category || '',
            a.region || a.Region || '',
            a.attack_type || a.Attack_Type || '',
            (a.damage || a.Damage_Description || '').substring(0, 100),
            a.status || a.Status || '',
            a.distance_km || a.Distance_from_Ukraine_km || ''
        ]);
        
        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });
        
        return csv;
    },
    
    /**
     * Export as JSON
     */
    exportJSON() {
        return JSON.stringify(this.allAttacks, null, 2);
    }
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
    ApplicationData.init().then(success => {
        if (success) {
            console.log('[App] Data loaded, rendering...');
            if (window.Navigation) window.Navigation.init();
        }
    });
});
