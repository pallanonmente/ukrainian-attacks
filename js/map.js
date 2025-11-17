/**
 * ================================================================
 * COMPONENT: Map Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const MapModule = {
    name: 'map',
    version: 'v1.0.0',
    status: 'NEW',
    map: null,
    markers: [],
    
    mount() {
        console.log('[Map] Mounting...');
        // Give time for DOM to render
        setTimeout(() => this.initMap(), 100);
    },
    
    unmount() {
        console.log('[Map] Unmounting...');
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
        this.markers = [];
    },
    
    initMap() {
        const mapElement = document.getElementById('mapElement');
        if (!mapElement) {
            console.warn('[Map] Map element not found');
            return;
        }
        
        // Check if Leaflet is loaded
        if (typeof L === 'undefined') {
            console.error('[Map] Leaflet library not loaded');
            mapElement.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">Map library not loaded. Please refresh the page.</div>';
            return;
        }
        
        // Initialize map centered on Russia
        this.map = L.map('mapElement').setView([55.7558, 37.6173], 5);
        
        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(this.map);
        
        // Add markers for attacks with coordinates
        this.addMarkers();
        
        // Setup filter
        this.setupFilter();
    },
    
    addMarkers() {
        const attacks = ApplicationData.getAllAttacks();
        
        attacks.forEach(attack => {
            const coords = attack.coordinates || attack.Coordinates;
            if (!coords || coords.length !== 2) return;
            
            const [lat, lon] = coords;
            const color = ApplicationData.getCategoryColor(attack.category);
            
            // Create custom icon
            const icon = L.divIcon({
                className: 'custom-marker',
                html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
                iconSize: [12, 12]
            });
            
            const marker = L.marker([lat, lon], { icon: icon }).addTo(this.map);
            
            // Popup content
            const popupContent = `
                <div style="min-width: 200px;">
                    <h3 style="margin: 0 0 0.5rem 0; color: ${color};">${attack.location || attack.Location}</h3>
                    <p style="margin: 0.25rem 0;"><strong>Date:</strong> ${attack.date || attack.Date}</p>
                    <p style="margin: 0.25rem 0;"><strong>Type:</strong> ${attack.attack_type || attack.Attack_Type || 'N/A'}</p>
                    <p style="margin: 0.25rem 0;"><strong>Status:</strong> ${attack.status || attack.Status || 'Unknown'}</p>
                    <p style="margin: 0.25rem 0;"><strong>Distance:</strong> ${attack.distance_km || attack.Distance_from_Ukraine_km || 'N/A'} km</p>
                </div>
            `;
            
            marker.bindPopup(popupContent);
            
            this.markers.push({
                marker: marker,
                category: attack.category
            });
        });
        
        console.log(`[Map] Added ${this.markers.length} markers`);
    },
    
    setupFilter() {
        const filterSelect = document.getElementById('categoryFilter');
        if (!filterSelect) return;
        
        filterSelect.addEventListener('change', (e) => {
            const selectedCategory = e.target.value;
            
            this.markers.forEach(({ marker, category }) => {
                if (selectedCategory === '' || category === selectedCategory) {
                    marker.addTo(this.map);
                } else {
                    this.map.removeLayer(marker);
                }
            });
        });
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapModule;
}