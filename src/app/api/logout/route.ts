export async function GET() {
  return new Response(null, {
    status: 200,
    statusText: "Logged out",
    headers: {
      "Set-Cookie": "session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0",
    },
  });
}
