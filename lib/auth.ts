import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!process.env.JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env.local file");
}

// jose needs the secret as a Uint8Array, not a plain string
const secretKey = new TextEncoder().encode(JWT_SECRET);

// Token Sign Function
// NOTE: this is now async (jose signs asynchronously) — every caller must use `await signToken(...)`
export async function signToken(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

// Token Verify Function
// NOTE: this is now async — every caller must use `await verifyToken(...)`
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}
