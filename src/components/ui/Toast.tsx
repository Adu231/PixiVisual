import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

let toastHandler: ((toast: Omit<Toast, 'id'>) => void) | null = null;

export function toast(type: ToastType, message: string, duration = 4000) {
  if (toastHandler) {
    toastHandler({ type, message, duration });
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(x => x.id !== id));
    }, t.duration || 4000);
  }, []);

  useEffect(() => {
    toastHandler = addToast;
    return () => { toastHandler = null; };
  }, [addToast]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />,
  };

  const colors = {
    success: 'border-green-200 dark:border-green-900/40',
    error: 'border-red-200 dark:border-red-900/40',
    warning: 'border-yellow-200 dark:border-yellow-900/40',
    info: 'border-blue-200 dark:border-blue-900/40',
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none" style={{ width: 'min(400px, calc(100vw - 32px))' }}>
      {toasts.map(t => (
        <div
          key={t.id}
          className={`w-full bg-card border ${colors[t.type]} rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl pointer-events-auto animate-slide-up`}
        >
          {icons[t.type]}
          <p className="text-sm font-medium text-foreground flex-1">{t.message}</p>
          <button
            onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
            className="w-5 h-5 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
    </div>
  );
}
