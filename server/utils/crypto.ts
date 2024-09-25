import crypto from "node:crypto";

export function hashPassword(salt: string, password: string): string {
  const hmac = crypto.createHmac("sha512", salt);
  return hmac.update(password).digest("hex");
}

export function generateSalt(): string {
  return crypto.randomBytes(128).toString("base64");
}
