'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Log Core Web Vitals
      const logWebVitals = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          console.log('📊 Performance Metrics:');
          console.log(`⚡ DOM Content Loaded: ${Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart)}ms`);
          console.log(`🎨 First Paint: ${Math.round(navigation.domContentLoadedEventEnd)}ms`);
          console.log(`📦 Load Complete: ${Math.round(navigation.loadEventEnd - navigation.loadEventStart)}ms`);
          console.log(`🔄 Total Load Time: ${Math.round(navigation.loadEventEnd - navigation.fetchStart)}ms`);
        }

        // Log resource timing
        const resources = performance.getEntriesByType('resource');
        const totalSize = resources.reduce((acc: number, resource: any) => {
          return acc + (resource.transferSize || 0);
        }, 0);
        
        console.log(`📁 Total Resources: ${resources.length}`);
        console.log(`💾 Total Transfer Size: ${(totalSize / 1024).toFixed(2)} KB`);
      };

      // Wait for page load
      if (document.readyState === 'complete') {
        logWebVitals();
      } else {
        window.addEventListener('load', logWebVitals);
        return () => window.removeEventListener('load', logWebVitals);
      }
    }
  }, []);

  return null; // This component doesn't render anything
}
