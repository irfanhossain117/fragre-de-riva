import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import Settings from "../../../../models/Settings"; // Apnar Settings model thakte hobe, ba User model use korte paren password-er jonno
import bcrypt from "bcryptjs";

// GET Settings
export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne({});
    
    if (!settings) {
      // Default settings if not found
      settings = await Settings.create({
        storeName: "Fragré De Riva",
        supportEmail: "support@fragrederiva.com",
      });
    }

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch settings" }, { status: 500 });
  }
}

// UPDATE Settings & Password
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { storeName, supportEmail, newPassword, confirmPassword } = body;

    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings({});
    }

    if (storeName) settings.storeName = storeName;
    if (supportEmail) settings.supportEmail = supportEmail;

    // Password update logic if provided
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        return NextResponse.json({ success: false, message: "Passwords do not match." }, { status: 400 });
      }
      if (newPassword.length < 6) {
        return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      settings.adminPassword = hashedPassword; // Apnar schema anujayi field adjust kore nite paren
    }

    await settings.save();

    return NextResponse.json({ success: true, message: "Settings updated successfully." });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 });
  }
}