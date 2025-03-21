import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 로그아웃을 실행하는 API. 성공 혹은 인증 오류 메시지를 반환함.
 * @param req api의 request
 * @param res api의 response
 * @returns 성공시 {message: 'success'}, 인증 오류시 { message: 'Unauthorize' }를 반환함.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookie = req ? req.headers.cookie : '';
    axios.defaults.headers.common.cookie = '';
    if (req && cookie) {
      axios.defaults.headers.common.cookie = cookie;
    }

    res.setHeader('set-cookie', [
      `access_token=deleted; path=/; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; httpOnly=${process.env.NEXT_PUBLIC_HTTP_ONLY}; secure=true; Max-Age=0;`,
      `refresh_token=deleted; path=/; domain=${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}; httpOnly=${process.env.NEXT_PUBLIC_HTTP_ONLY}; secure=true;  Max-Age=0;`,
    ]);

    return res.status(200).json({ message: 'success' });
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: 'Unauthorize' });
  }
};
