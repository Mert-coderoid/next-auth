import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth((req) => {
    console.log("req.nextUrl.pathname", req.nextUrl.pathname);
    console.log("req.nextauth.token.role", req.nextauth.token.role);

    if (req.nextUrl.pathname === "/CreateUser" && req.nextauth.token.role !== "admin") {
        return NextResponse.rewrite( new URL("/Denied", req.url));
    }
},
{
    callbacks: {
        authorized: ({ token }) => !!token,
    }
});

export const config = { matcher: ["/CreateUser"] };  // matcher ile CreateUSer sayfasını koruma altına alıyoruz

