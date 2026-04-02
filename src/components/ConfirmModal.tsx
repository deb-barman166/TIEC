import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'info' | 'success';
}

export default function ConfirmModal({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  variant = 'danger'
}: ConfirmModalProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return {
          iconBg: 'bg-accent-cyan/10',
          iconColor: 'text-accent-cyan',
          Icon: Info,
          btnBg: 'bg-accent-cyan',
          btnHover: 'hover:bg-accent-cyan/80',
          btnShadow: 'shadow-[0_0_15px_rgba(0,245,255,0.3)]'
        };
      case 'success':
        return {
          iconBg: 'bg-green-500/10',
          iconColor: 'text-green-500',
          Icon: CheckCircle2,
          btnBg: 'bg-green-500',
          btnHover: 'hover:bg-green-600',
          btnShadow: 'shadow-[0_0_15px_rgba(34,197,94,0.3)]'
        };
      case 'danger':
      default:
        return {
          iconBg: 'bg-red-500/10',
          iconColor: 'text-red-500',
          Icon: AlertTriangle,
          btnBg: 'bg-red-500',
          btnHover: 'hover:bg-red-600',
          btnShadow: 'shadow-[0_0_15px_rgba(239,68,68,0.3)]'
        };
    }
  };

  const styles = getVariantStyles();
  const Icon = styles.Icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-bg-base/80 backdrop-blur-sm"
            onClick={onCancel}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${styles.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${styles.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-text-secondary text-sm">{message}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/5 bg-white/5 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-lg ${styles.btnBg} text-white ${styles.btnHover} transition-colors text-sm font-medium ${styles.btnShadow}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
