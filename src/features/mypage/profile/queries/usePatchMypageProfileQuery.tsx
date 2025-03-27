import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import clientInstance from '@src/utils/api/clientInstance';

interface WorkspaceInfo {
  code: number;
  success: boolean;
  workspaceInfo: {
    WorkspaceId: number;
    workspaceName: string;
  };
}

// [ ] formData에 특정 키를 지정해서 해당 키 값만 받을 수 있게하는 타입스크립트를 선언한 코드 추가 필요
const patchMypageProfileApi = async (data: FormData): Promise<WorkspaceInfo> => {
  const response = await clientInstance.patch(`/v1/mypage/profile`, data);

  return response.data;
};

/**
 * React-query를 사용하여 공통 마이페이지 프로필을 수정하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 공통 마이페이지 프로필을 수정하기 위한 데이터
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isIdle`: 쿼리 비활성화 여부 (enabled가 true 이고 쿼리 불러오기가 시작될 때까지 isIdle 은 true)
 *   - `isPending`: mutation 실행중인지에 대한 여부
 *   - `isError`: 에러가 발생했는지에 대한 여부
 *   - `isSuccess`: mutation이 성공했고, mutation data를 사용할 수 있는지에 대한 여부
 */
const usePatchMypageProfileQuery = () => {
  const mutation = useCustomMutation({
    mutationFn: (data: FormData) => patchMypageProfileApi(data),
    onError: (error, variables, context) => {
      // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
      confirm({ content: error?.response.data.message.errMsg });
    },
  });

  return mutation;
};

export default usePatchMypageProfileQuery;
