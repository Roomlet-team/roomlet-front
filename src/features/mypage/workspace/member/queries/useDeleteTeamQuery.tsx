import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQueryClient } from '@tanstack/react-query';

type ResponseData = null;

const deleteTeamApi = async (WorkspaceId, TeamId): Promise<ResponseData> => {
  const response = await clientInstance.delete(`/v1/workspace/@${WorkspaceId}/manage/team/${TeamId}`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 팀을 삭제하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 팀 데이터 삭제 후 반환하는 응답데이터 없음
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isIdle`: 쿼리 비활성화 여부 (enabled가 true 이고 쿼리 불러오기가 시작될 때까지 isIdle 은 true)
 *   - `isPending`: mutation 실행중인지에 대한 여부
 *   - `isError`: 에러가 발생했는지에 대한 여부
 *   - `isSuccess`: mutation이 성공했고, mutation data를 사용할 수 있는지에 대한 여부
 */
const useDeleteTeamQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const queryClient = useQueryClient();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const mutation = useCustomMutation({
    mutationFn: (data: { TeamId: number }) => deleteTeamApi(workspaceId, data.TeamId),
    onSuccess: () => {
      // 업데이트 후 팀 리스트 데이터 재요청 (쿼리 무효화)
      queryClient.invalidateQueries({ queryKey: ['teamList'] });
    },
    onError: (error, context) => {
      if (error.status !== 452) {
        // alert 도 모달로 수정해주기
        alert(`서버 에러가 발생했습니다. (code: ${error.status})`);
      } else {
        // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
        confirm({ content: error?.response.data.message.errMsg });
      }
    },
  });

  return mutation;
};

export default useDeleteTeamQuery;
