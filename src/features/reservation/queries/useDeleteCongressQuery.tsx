import { useRouter } from 'next/router';
import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQueryClient } from '@tanstack/react-query';

type ResponseData = null;

interface CongressRequestData {
  cgsid: number;
}

const deleteCongressCommentApi = async (WorkspaceId, data: CongressRequestData): Promise<ResponseData> => {
  const response = await clientInstance.delete(`/v1/workspace/@${WorkspaceId}/congress`, { params: data });

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 회의를 삭제하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 회의 삭제 후 반환하는 응답데이터 없음
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isIdle`: 쿼리 비활성화 여부 (enabled가 true 이고 쿼리 불러오기가 시작될 때까지 isIdle 은 true)
 *   - `isPending`: mutation 실행중인지에 대한 여부
 *   - `isError`: 에러가 발생했는지에 대한 여부
 *   - `isSuccess`: mutation이 성공했고, mutation data를 사용할 수 있는지에 대한 여부
 */
const useDeleteCongressQuery = () => {
  const router = useRouter();
  const { data } = useGetWorkspaceListQuery();
  const queryClient = useQueryClient();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const mutation = useCustomMutation({
    mutationFn: (data: CongressRequestData) => {
      return deleteCongressCommentApi(workspaceId, data);
    },
    onSuccess: (data, variables) => {
      // 삭제 후 이전 페이지로 이동
      router.back();
      // 삭제 후 회의 리스트 데이터 재요청 (쿼리 무효화)
      queryClient.invalidateQueries({ queryKey: 'congressList' });
    },
    onError: (error, variables, context) => {
      // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
      confirm({ content: error?.response.data.message.errMsg });
    },
  });

  return mutation;
};

export default useDeleteCongressQuery;
