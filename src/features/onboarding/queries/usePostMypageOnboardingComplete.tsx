import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import clientInstance from '@src/utils/api/clientInstance';

const postMypageOnboardingCompleteApi = async (): Promise<void> => {
  const response = await clientInstance.post(`/v1/mypage/onboarding/complete`);

  return response.data;
};

/**
 * React-query를 사용하여 마이페이지 온보딩 확인 완료를 처리하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 생성된 초대 코드 정본 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const usePostMypageOnboardingCompleteQuery = () => {
  const result = useCustomMutation({
    mutationFn: () => postMypageOnboardingCompleteApi(),
    onError: (error, variables, context) => {
      const errorCode = error?.status;
      confirm({
        content: `온보딩 확인 완료에 실패했습니다.\n(server error code: ${errorCode})`,
      });
    },
  });

  return result;
};

export default usePostMypageOnboardingCompleteQuery;
