/**
 * ================================================================
 * COMPONENT: Impact Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const ImpactModule = {
    name: 'impact',
    version: 'v1.0.0',
    status: 'NEW',
    
    mount() {
        console.log('[Impact] Mounting...');
        this.setupCalculator();
    },
    
    unmount() {
        console.log('[Impact] Unmounting...');
    },
    
    setupCalculator() {
        // Calculator is already in HTML, just needs to work
        // Function calculateImpact() will be called from HTML button
        window.calculateImpact = () => this.calculateImpact();
    },
    
    calculateImpact() {
        const oilPrice = parseFloat(document.getElementById('oilPrice')?.value || 75);
        const days = parseInt(document.getElementById('daysCount')?.value || 30);
        const resultDiv = document.getElementById('impactResult');
        
        if (!resultDiv) return;
        
        // Calculations based on capacity lost
        const refineryCapacityLost = 2.05; // Million bbl/day
        const portExportLost = 3.74; // Million bbl/day
        const totalCapacityLost = refineryCapacityLost + portExportLost; // 5.79 M bbl/day
        
        const dailyLoss = totalCapacityLost * oilPrice * 1000000;
        const periodLoss = dailyLoss * days;
        const monthlyLoss = dailyLoss * 30;
        const yearlyLoss = dailyLoss * 365;
        
        const formatCurrency = (amount) => {
            if (amount >= 1e9) {
                return `$${(amount / 1e9).toFixed(2)}B`;
            } else if (amount >= 1e6) {
                return `$${(amount / 1e6).toFixed(2)}M`;
            } else {
                return `$${amount.toLocaleString()}`;
            }
        };
        
        resultDiv.innerHTML = `
            <div style="padding: 1.5rem; background: var(--tertiary-bg); border: 2px solid var(--accent); border-radius: var(--radius-lg);">
                <h3 style="color: var(--accent); margin-bottom: 1rem;">💰 Economic Impact Calculation</h3>
                
                <div style="margin-bottom: 1rem;">
                    <strong>Parameters:</strong>
                    <div style="margin-top: 0.5rem; color: var(--text-secondary);">
                        • Oil Price: $${oilPrice}/barrel<br>
                        • Period: ${days} days<br>
                        • Capacity Lost: ${totalCapacityLost.toFixed(2)}M bbl/day
                    </div>
                </div>
                
                <div style="border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">
                    <div style="display: grid; gap: 0.75rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <span>Daily Loss:</span>
                            <strong style="color: var(--danger);">${formatCurrency(dailyLoss)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Period Loss (${days} days):</span>
                            <strong style="color: var(--danger);">${formatCurrency(periodLoss)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span>Monthly Loss:</span>
                            <strong style="color: var(--danger);">${formatCurrency(monthlyLoss)}</strong>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 1.125rem;">
                            <span>Annual Loss:</span>
                            <strong style="color: var(--danger); font-size: 1.5rem;">${formatCurrency(yearlyLoss)}</strong>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 1rem; padding: 1rem; background: rgba(230, 57, 70, 0.1); border-left: 4px solid var(--danger); border-radius: 0.25rem;">
                    <small style="color: var(--text-secondary);">
                        <strong>Note:</strong> This calculation includes refinery capacity reduction (2.05M bbl/day) 
                        and port export disruption (3.74M bbl/day). Actual losses may vary based on repair times, 
                        alternative routes, and market conditions.
                    </small>
                </div>
            </div>
        `;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImpactModule;
}