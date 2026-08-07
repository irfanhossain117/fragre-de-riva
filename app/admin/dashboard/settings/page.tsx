"use client";

import { useState, useEffect } from "react";
import { Lock, Store, Save, Images } from "lucide-react";
import ImageUploader from "../../../components/admin/ImageUploader";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [instagramImages, setInstagramImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings");
        const data = await res.json();
        if (data.success && data.settings) {
          setStoreName(data.settings.storeName || "");
          setSupportEmail(data.settings.supportEmail || "");
          setInstagramImages(data.settings.instagramImages || []);
        }
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          storeName,
          supportEmail,
          newPassword,
          confirmPassword,
          instagramImages,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ text: "✅ Settings saved successfully!", type: "success" });
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ text: `❌ ${data.message || "Failed to save"}`, type: "error" });
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
      setMessage({ text: "❌ An error occurred while saving.", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {message && (
        <div
          className={`rounded-2xl border p-4 text-sm font-medium ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
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
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
                required
              />
            </div>
          </div>
        </div>

        {/* Instagram Gallery */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Images className="text-[#A88442]" size={22} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Instagram Gallery</h3>
              <p className="text-xs text-gray-500">
                Images shown in the homepage "Instagram Gallery" section
              </p>
            </div>
          </div>

          <ImageUploader images={instagramImages} setImages={setInstagramImages} />
        </div>

        {/* Security / Password */}
        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <Lock className="text-[#A88442]" size={22} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Admin Security</h3>
              <p className="text-xs text-gray-500">Update password and security (leave blank to keep current)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-900 outline-none focus:border-[#A88442]"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#A88442] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}