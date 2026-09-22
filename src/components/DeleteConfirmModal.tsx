import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  description?: string;
  itemTitle?: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen = true,
  title = 'Delete Recipe',
  message,
  description,
  itemTitle,
  confirmLabel = 'Delete Recipe',
  onConfirm,
  onCancel,
}) => {
  if (isOpen === false) return null;

  const displayMessage =
    message ||
    description ||
    'Are you sure you want to delete this recipe from your culinary collection? This action cannot be undone.';

  return (
    <div
      id="delete-confirm-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onCancel}
    >
      <div
        id="delete-confirm-modal-card"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-rose-100 p-6 flex flex-col gap-4"
      >
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <button
            id="delete-modal-close-btn"
            onClick={onCancel}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 leading-relaxed">{displayMessage}</p>
          {itemTitle && (
            <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-800 line-clamp-2">
              "{itemTitle}"
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            id="delete-modal-cancel-btn"
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="delete-modal-confirm-btn"
            type="button"
            onClick={onConfirm}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>{confirmLabel}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
