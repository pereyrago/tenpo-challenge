import { Role } from "@/schemas/session";
import { JWTPayload } from "jose";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log("Received login request");
  const body = await req.json();
  const { email, password } = body;
  const SECRET_KEY = process.env.SESSION_SECRET || "default_secret";

  if (!email || !password) {
    return new Response(null, {
      status: 400,
      statusText: "Email and password are required",
    });
  }

  const role: Role = "user";
  const payload: JWTPayload = {
    userId: 123,
    email: body.email,
    role,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  // Set cookie header
  const cookie = `session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600`;

  return new Response(JSON.stringify({ token, role, email }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
