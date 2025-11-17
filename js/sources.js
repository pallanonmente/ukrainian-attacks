/**
 * ================================================================
 * COMPONENT: Sources Module
 * Version: v1.0.0
 * Status: NEW
 * Framework: v2.2.1 INTEGRATED
 * ================================================================
 */

const SourcesModule = {
    name: 'sources',
    version: 'v1.0.0',
    status: 'NEW',
    
    mount() {
        console.log('[Sources] Mounting...');
        this.setupDownloadButtons();
    },
    
    unmount() {
        console.log('[Sources] Unmounting...');
    },
    
    setupDownloadButtons() {
        // Setup download functions
        window.downloadCSV = () => this.downloadCSV();
        window.downloadJSON = () => this.downloadJSON();
        window.generatePDF = () => this.generatePDF();
    },
    
    downloadCSV() {
        const csv = ApplicationData.exportCSV();
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'ukrainian_attacks_infrastructure.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('[Sources] CSV downloaded');
    },
    
    downloadJSON() {
        const json = ApplicationData.exportJSON();
        const blob = new Blob([json], { type: 'application/json' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'ukrainian_attacks_infrastructure.json');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('[Sources] JSON downloaded');
    },
    
    generatePDF() {
        // PDF generation requires jsPDF library
        if (typeof jspdf === 'undefined') {
            alert('PDF generation requires jsPDF library. This feature will be available in v1.1.0. For now, please use CSV or JSON export.');
            console.warn('[Sources] jsPDF library not loaded');
            return;
        }
        
        // Future implementation with jsPDF
        console.log('[Sources] PDF generation - Coming in v1.1.0');
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SourcesModule;
}