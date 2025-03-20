import { confirm } from '@src/components/ui/Modal/confirm';
import Toast from '@src/components/ui/Toast';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';

interface WorkspaceInfoFormData {
  code: number;
  success: boolean;
  workspaceInfo: {
    // 텍스트 필드
    workspaceName: string;
    // 파일 필드
    image: File;
  };
}

const patchWorkspaceInfoApi = async (WorkspaceId: number, data: FormData): Promise<WorkspaceInfoFormData> => {
  const response = await clientInstance.patch(`/v1/workspace/@${WorkspaceId}`, data);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 정보를 수정하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 워크페이스 정보를 수정하기 위한 데이터
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isIdle`: 쿼리 비활성화 여부 (enabled가 true 이고 쿼리 불러오기가 시작될 때까지 isIdle 은 true)
 *   - `isPending`: mutation 실행중인지에 대한 여부
 *   - `isError`: 에러가 발생했는지에 대한 여부
 *   - `isSuccess`: mutation이 성공했고, mutation data를 사용할 수 있는지에 대한 여부
 */
const usePatchWorkspaceInfoQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const mutation = useCustomMutation({
    mutationFn: (data: FormData) => patchWorkspaceInfoApi(workspaceId, data),
    onSuccess: () => {
      Toast({ message: '정보 수정이 완료되었습니다.' });
    },
    onError: (error, variables, context) => {
      const errorCode = error?.status;
      // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
      confirm({
        content:
          error?.response.data.message.errMsg ||
          `워크스페이스 정보 수정에 실패했습니다.\n(server error code: ${errorCode})`,
      });
    },
  });

  return mutation;
};

export default usePatchWorkspaceInfoQuery;
