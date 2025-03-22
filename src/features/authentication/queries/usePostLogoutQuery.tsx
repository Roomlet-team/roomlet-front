import { useRouter } from 'next/router';
import clientInstance from '@src/utils/api/clientInstance';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import { confirm } from '@src/components/ui/Modal/confirm';

export interface LogoutResponse {
  success: boolean;
  code: number;
  message: string;
}

const postLogoutApi = async (): Promise<LogoutResponse> => {
  const response = await clientInstance.post(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/logout`);

  return response.data;
};

/**
 * React-query를 사용하여 로그아웃을 실행하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 로그아웃 응답 데이터 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const usePostLogoutQuery = () => {
  const router = useRouter();

  const result = useCustomMutation({
    mutationFn: () => postLogoutApi(),
    onSuccess: (data: LogoutResponse, variables, context) => {
      router.push(`/`);
    },
    onError: (error, variables, context) => {
      if (error.response.data.code === 452) {
        // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
        confirm({ content: error?.response.data.message.errMsg });
      }
    },
  });

  return result;
};

export default usePostLogoutQuery;
