import type { NextApiRequest, NextApiResponse } from 'next';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@src/utils/api/axiosInstance';
import dayjs from 'dayjs';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const { refresh_token, access_token } = req.cookies;
  const refreshTokenExp = refresh_token ? jwtDecode(refresh_token).exp : 0;
  const accessTokenExp = access_token ? jwtDecode(access_token).exp : 0;

  // refresh Token 만료
  if (dayjs().isAfter(refreshTokenExp * 1000)) {
    // 로그아웃
    res.setHeader('set-cookie', [
      `refresh_token=deleted; path=/; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; httpOnly=${process.env.NEXT_PUBLIC_HTTP_ONLY}; secure=true; Max-Age=0;`,
      `access_token=deleted; path=/; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; httpOnly=${process.env.NEXT_PUBLIC_HTTP_ONLY}; secure=true;  Max-Age=0;`,
    ]);
    res.status(200).json({ message: 'logout' });
  } else {
    // refresh token 유효한 경우

    // access Token 만료
    if (dayjs().isAfter(accessTokenExp * 1000)) {
      try {
        // 재발급
        const result = await axiosInstance.get('/v1/auth/refresh', {
          headers: {
            Cookie: `refresh_token=${refresh_token};`,
          },
        });

        const token = result.headers.authorization;

        res.setHeader('set-cookie', [
          `access_token=${token}; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; path=/; httpOnly=${process.env.NEXT_PUBLIC_HTTP_ONLY}; secure=true`,
        ]);

        // 액세스 토큰이 만료되었다면, 새로 발급받은 액세스 토큰을 반환
        res.setHeader('Authorization', token);
        res.status(200).json({ message: 'Successful new token generation' });
      } catch (e) {
        const statusCode = e.response.statusCode;

        res.status(statusCode).json({ message: e });
      }
    }
  }

  // 액세스 토큰이 만료되지 않았다면 그대로 반환
  res.setHeader('Authorization', access_token);
  res.status(200).json({ message: 'Successful creation of an existing token' });
}
