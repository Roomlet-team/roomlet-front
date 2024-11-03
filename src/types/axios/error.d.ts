import { AxiosError } from 'axios';

/**
 * 에러 발생시, 백엔드에서 표현하는 response로 나타낼 수 있게 커스텀한 AxiosError 타입
 */
interface CustomAxiosError extends AxiosError {
  response: {
    data: {
      success: boolean;
      code: number;
      message: {
        errCode: string;
        errMsg: string;
      };
    };
  };
}
