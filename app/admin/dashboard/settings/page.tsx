"use client";

import { useState } from "react";
import { Lock, Store, Save } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      {saved && (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
          ✅ Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Store Profile */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Store className="text-[#A88442]" size={22} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Store Information</h3>
              <p className="text-xs text-gray-500">General details for Fragré store</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Store Name</label>
              <input
                type="text"
                defaultValue="Fragré De Riva"
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                defaultValue="support@fragrederiva.com"
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
              />
            </div>
          </div>
        </div>

        {/* Security / Password */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Lock className="text-[#A88442]" size={22} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Security</h3>
              <p className="text-xs text-gray-500">Update password and security</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[#A88442] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}