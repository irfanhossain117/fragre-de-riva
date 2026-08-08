import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import Settings from "../../../models/Settings"; // Apnar Settings model thakte hobe, ba User model use korte paren password-er jonno
import bcrypt from "bcryptjs";

// GET Settings (public — used by storefront for Instagram gallery etc, so never include adminPassword)
export async function GET() {
  try {
    await connectDB();
    let settings = await Settings.findOne({});

    if (!settings) {
      // Default settings if not found
      settings = await Settings.create({
        storeName: "Fragré De Riva",
        supportEmail: "connect.irfanhossain@gmail.com",
        instagramImages: [],
      });
    }

    // যদি আগের পুরনো default email (support@fragrederiva.com) DB-তে থেকে যায়, সেটাকে
    // নতুন default (connect.irfanhossain@gmail.com) দিয়ে এক-বার auto-update করে দেওয়া হচ্ছে।
    if (settings.supportEmail === "support@fragrederiva.com") {
      settings.supportEmail = "connect.irfanhossain@gmail.com";
      await settings.save();
    }

    const safeSettings = {
      _id: settings._id,
      storeName: settings.storeName,
      supportEmail: settings.supportEmail,
      instagramImages: settings.instagramImages || [],
    };

    return NextResponse.json({ success: true, settings: safeSettings });
  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch settings" }, { status: 500 });
  }
}

// UPDATE Settings & Password (auth-protected via middleware — see middleware.ts)
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { storeName, supportEmail, newPassword, confirmPassword, instagramImages } = body;

    let settings = await Settings.findOne({});
    if (!settings) {
      settings = new Settings({});
    }

    if (storeName) settings.storeName = storeName;
    if (supportEmail) settings.supportEmail = supportEmail;
    if (Array.isArray(instagramImages)) {
      settings.instagramImages = instagramImages.filter((url: unknown) => typeof url === "string" && url.trim());
    }

    // Password update logic if provided
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        return NextResponse.json({ success: false, message: "Passwords do not match." }, { status: 400 });
      }
      if (newPassword.length < 6) {
        return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      settings.adminPassword = hashedPassword;
    }

    await settings.save();

    return NextResponse.json({ success: true, message: "Settings updated successfully." });
  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);
    return NextResponse.json({ success: false, message: "Failed to update settings" }, { status: 500 });
  }
}