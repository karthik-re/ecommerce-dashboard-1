import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

export const middleware = async (req: NextRequest) => {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
};

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const authHeader =
    req.headers.get("Authorization") || req.headers.get("authorization");

  if (authHeader == null) {
    return false;
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(password, process.env.ADMIN_PASSWORD as string))
  );
}

export const config = {
  matcher: "/admin/:path*",
};
