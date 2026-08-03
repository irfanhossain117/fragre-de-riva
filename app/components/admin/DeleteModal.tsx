"use client";

import { AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  open: boolean;
  productName: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  open,
  productName,
  loading,
  onClose,
  onDelete,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-opacity"
      onClick={onClose} // Modal-er bahire click korle close hobe
    >
      <div 
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()} // Content-er bhitore click korle jate close na hoy
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Delete Product
            </h2>
            <p className="text-xs text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">
            "{productName}"
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={loading}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}