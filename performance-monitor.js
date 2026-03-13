// Performance Monitoring System for JITConnect
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            pageLoad: 0,
            timeToInteractive: 0,
            firstContentfulPaint: 0,
            resourceCount: 0,
            memoryUsage: 0
        };
        this.init();
    }

    init() {
        if (window.performance) {
            window.addEventListener('load', () => {
                setTimeout(() => this.collectMetrics(), 0);
            });
        }
    }

    collectMetrics() {
        const perfData = performance.timing;
        const navigation = performance.getEntriesByType('navigation')[0];
        
        this.metrics.pageLoad = perfData.loadEventEnd - perfData.navigationStart;
        this.metrics.timeToInteractive = perfData.domInteractive - perfData.navigationStart;
        this.metrics.resourceCount = performance.getEntriesByType('resource').length;
        
        if (navigation) {
            this.metrics.firstContentfulPaint = navigation.responseStart - navigation.requestStart;
        }
        
        if (performance.memory) {
            this.metrics.memoryUsage = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
        }
        
        this.displayMetrics();
    }

    displayMetrics() {
        console.log('📊 Performance Metrics:');
        console.log(`⚡ Page Load: ${this.metrics.pageLoad}ms`);
        console.log(`🎯 Time to Interactive: ${this.metrics.timeToInteractive}ms`);
        console.log(`🎨 First Paint: ${this.metrics.firstContentfulPaint}ms`);
        console.log(`📦 Resources Loaded: ${this.metrics.resourceCount}`);
        console.log(`💾 Memory Usage: ${this.metrics.memoryUsage}MB`);
    }
}

// Initialize monitor
const perfMonitor = new PerformanceMonitor();
