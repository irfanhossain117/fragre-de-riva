import mongoose, { Schema, model, models } from "mongoose";

interface ISettings extends mongoose.Document {
  storeName: string;
  supportEmail: string;
  adminPassword?: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    storeName: { type: String, required: true, default: "Fragré De Riva" },
    supportEmail: { type: String, required: true, default: "support@fragrederiva.com" },
    adminPassword: { type: String },
  },
  { timestamps: true }
);

const Settings = models.Settings || model<ISettings>("Settings", SettingsSchema);

export default Settings;