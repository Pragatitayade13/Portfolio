import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = "success", isOpen, onClose, duration = 4000 }) => {
  useEffect(() => {
    if (isOpen && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-elevated)',
            border: `1px solid ${type === 'success' ? 'var(--success)' : 'var(--danger)'}`,
            boxShadow: 'var(--shadow-xl)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          {type === 'success' ? (
            <CheckCircle size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
          ) : (
            <AlertCircle size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
          )}
          <span>{message}</span>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: '2px',
              display: 'grid',
              placeItems: 'center'
            }}
            aria-label="Dismiss toast notification"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
