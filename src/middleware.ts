import { NextResponse } from 'next/server';
import axios from 'axios';
import type { NextRequest } from 'next/server';

// 로그인 여부 체크 미들웨어
export async function middleware(request: NextRequest) {
  let refreshToken = request.cookies.get('refresh_token');
  let isRefreshToken = request.cookies.has('refresh_token');
  let isAccessToken = request.cookies.has('access_token');

  const path = request.nextUrl.pathname;

  if (isRefreshToken) {
    if (path === '/login') {
      // 이미 로그인을 한 경우, 로그인 페이지에 접근했을 때 홈 화면으로 이동
      return NextResponse.redirect(new URL('/', request.url));
    }

    return null;
  }

  // 로그인을 하지 않은 경우, 로그인 페이지로 이동 (로그인 페이지를 제외한 모든 페이지 접근 불가)
  if (!isRefreshToken && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return null;
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
