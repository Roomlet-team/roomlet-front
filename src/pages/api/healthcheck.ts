import { NextApiRequest, NextApiResponse } from 'next';

/**
 * 로드밸런서에서 프론트 서버 연결이 정상적인지 체크하는 API
 * @param req api의 request
 * @param res api의 response
 * @returns 연결 성공을 알리는 'connect success' 메시지 반환
 */
export default async (req: NextApiRequest, res: NextApiResponse) => res.status(200).send('connect success');
