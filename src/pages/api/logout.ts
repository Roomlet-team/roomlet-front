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

    return res.status(200).json({ success: true, code: 200, message: 'success' });
  } catch (e) {
    console.error(e);

    if (e.response.status === 401) {
      return res
        .status(401)
        .json({ success: false, code: 401, message: { errMsg: '로그아웃 할 수 있는 권한이 없습니다.' } });
    } else if (e.response.status === 403) {
      return res.status(403).json({ success: false, code: 403, message: { errMsg: '접근할 수 없는 페이지입니다.' } });
    } else {
      return res.status(500).json({ success: false, code: 500, message: { errMsg: '서버 에러가 발생했습니다.' } });
    }
  }
};
