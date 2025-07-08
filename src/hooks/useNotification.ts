// src/hooks/useNotification.ts
import { useCallback } from 'react';
import { colors } from '@/styles/colors';

interface NotificationOptions {
  duration?: number;
  type?: 'info' | 'success' | 'warning' | 'error';
}

interface UseNotificationReturn {
  showNotification: (message: string, options?: NotificationOptions) => void;
  showPolicyNotification: (policyTitle: string) => void;
}

export const useNotification = (): UseNotificationReturn => {
  const showNotification = useCallback((
    message: string, 
    options: NotificationOptions = {}
  ) => {
    const { duration = 2000, type = 'info' } = options;
    
    // Create notification element
    const notification = document.createElement('div');
    
    // Base styles
    notification.className = 'fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-opacity text-white';
    
    // Type-specific styling
    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#10b981';
        break;
      case 'warning':
        notification.style.backgroundColor = '#f59e0b';
        break;
      case 'error':
        notification.style.backgroundColor = '#ef4444';
        break;
      default:
        notification.style.backgroundColor = colors.orange;
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Auto-remove notification
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, duration);
  }, []);

  const showPolicyNotification = useCallback((policyTitle: string) => {
    showNotification(`Policy: ${policyTitle} (Feature coming soon)`, {
      type: 'info',
      duration: 2000
    });
  }, [showNotification]);

  return {
    showNotification,
    showPolicyNotification,
  };
};