import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import clientInstance from '@src/utils/api/clientInstance';
import { useRouter } from 'next/router';

interface WorkspaceInfo {
  code: number;
  success: boolean;
  WorkspaceId: number;
}

interface CreateWorkspaceInfo {
  workspaceName: string;
}

const postWorkspaceApi = async (data: CreateWorkspaceInfo): Promise<WorkspaceInfo> => {
  const response = await clientInstance.post(`/v1/workspace/`, data);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 생성 데이터를 전송하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 워크페이스를 생성하기 위한 데이터
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isIdle`: 쿼리 비활성화 여부 (enabled가 true 이고 쿼리 불러오기가 시작될 때까지 isIdle 은 true)
 *   - `isPending`: mutation 실행중인지에 대한 여부
 *   - `isError`: 에러가 발생했는지에 대한 여부
 *   - `isSuccess`: mutation이 성공했고, mutation data를 사용할 수 있는지에 대한 여부
 */
const usePostWorkspaceQuery = () => {
  const router = useRouter();

  const mutation = useCustomMutation({
    mutationFn: (data: CreateWorkspaceInfo) => postWorkspaceApi(data),
    onSuccess: () => {
      // 워크스페이스 생성 성공 시 홈 화면으로 이동
      router.push('/home');
    },
    onError: (error, variables, context) => {
      // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
      return confirm({
        content: error?.response.data.message.errMsg || `서버 에러가 발생했습니다. (code: ${error?.status})`,
      });
    },
  });

  return mutation;
};

export default usePostWorkspaceQuery;
