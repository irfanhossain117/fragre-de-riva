import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!process.env.JWT_SECRET) {
  throw new Error("Please define JWT_SECRET in your .env.local file");
}

// Token Sign Function
export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

// Token Verify Function
export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}