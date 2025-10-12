import { NextResponse } from 'next/server';
import axios from 'axios';
import type { NextRequest } from 'next/server';

// 로그인 여부 체크 미들웨어
export async function middleware(request: NextRequest) {
  let refreshToken = request.cookies.get('refresh_token');
  let isRefreshToken = request.cookies.has('refresh_token');
  let isAccessToken = request.cookies.has('access_token');
  const referer = request.headers.get('referer');
  const response = NextResponse.next();

  const path = request.nextUrl.pathname;
  const prevUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${request.nextUrl.pathname}${request.nextUrl.search}`; // 로그인 페이지 이전에 있었던 url

  if (referer) {
    response.cookies.set('page_referer', referer, {
      httpOnly: false, // 클라이언트에서 접근 가능하게 함.
      sameSite: 'lax',
    });
  } else {
    response.cookies.delete('page_referer');
  }

  if (isRefreshToken) {
    if (['/login', '/'].includes(path)) {
      // 이미 로그인을 한 경우, 로그인 혹은 랜딩 페이지에 접근했을 때 홈 화면으로 이동
      return NextResponse.redirect(new URL('/home', request.url));
    }

    return response;
  }

  // 로그인을 하지 않은 경우, 로그인 페이지로 이동 (초대 페이지, 로그인 페이지, 랜딩 페이지를 제외한 모든 페이지 접근 불가)
  if (!isRefreshToken && !['/login', '/invite', '/'].includes(path)) {
    return NextResponse.redirect(new URL(`/login?prev_url=${encodeURIComponent(prevUrl)}`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
