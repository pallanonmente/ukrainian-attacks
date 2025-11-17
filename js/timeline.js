/**
 * ================================================================
 * COMPONENT: Timeline Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const TimelineModule = {
    name: 'timeline',
    version: 'v1.0.0',
    status: 'NEW',
    
    mount() {
        console.log('[Timeline] Mounting...');
        this.render();
    },
    
    unmount() {
        console.log('[Timeline] Unmounting...');
    },
    
    render() {
        const container = document.getElementById('timelineContent');
        if (!container) return;
        
        const attacks = ApplicationData.getAllAttacks(50); // Show first 50
        
        container.innerHTML = '<div class="timeline-list">' + 
            attacks.map((attack, idx) => {
                const color = ApplicationData.getCategoryColor(attack.category);
                const date = attack.date || attack.Date || 'Unknown date';
                const location = attack.location || attack.Location || 'Unknown location';
                const damage = attack.damage || attack.Damage_Description || attack.damage_description || 'No details';
                
                return `
                    <div class="timeline-item" style="border-left: 4px solid ${color}; padding: 1rem; margin-bottom: 1rem; background-color: var(--secondary-bg); border-radius: var(--radius-md);">
                        <div class="timeline-date" style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">
                            📅 ${date}
                        </div>
                        <div class="timeline-location" style="font-size: 1.125rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--text-primary);">
                            📍 ${location}
                        </div>
                        <div class="timeline-category" style="display: inline-block; padding: 0.25rem 0.75rem; background-color: ${color}; color: white; border-radius: 0.25rem; font-size: 0.75rem; margin-bottom: 0.75rem;">
                            ${ApplicationData.getCategoryLabel(attack.category)}
                        </div>
                        <div class="timeline-damage" style="color: var(--text-secondary); line-height: 1.6;">
                            ${damage.substring(0, 300)}${damage.length > 300 ? '...' : ''}
                        </div>
                    </div>
                `;
            }).join('') +
        '</div>';
    }
};
window.TimelineModule = TimelineModule;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimelineModule;
}