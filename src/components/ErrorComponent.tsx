import React from 'react';
import { AlertTriangle, RefreshCw, XCircle } from 'lucide-react';

interface ErrorComponentProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({
  title = 'Media Extraction Failed',
  message,
  onRetry,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-5 bg-rose-500/10 border border-rose-500/30 rounded-2xl backdrop-blur-md shadow-xl text-rose-200">
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-bold text-sm sm:text-base text-rose-300">{title}</h4>
          <p className="text-xs sm:text-sm text-rose-200/80 mt-1 leading-relaxed">{message}</p>

          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold border border-rose-500/40 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
