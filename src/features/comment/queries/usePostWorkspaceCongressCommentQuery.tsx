import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface RequestBody {
  content: string;
}

interface Params {
  cgsid: number;
}

const postCongressCommentApi = async (WorkspaceId: number, params: Params, data: RequestBody) => {
  const response = await clientInstance.post(`/v1/workspace/@${WorkspaceId}/congress/comment`, data, { params });

  return response.data;
};

/**
 * React-query를 사용하여 회의 댓글 쓰기 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 반환하는 데이터 없음 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const usePostWorkspaceCongressCommentQuery = (params: Params) => {
  const queryClient = useQueryClient();
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useCustomMutation({
    mutationFn: (data: RequestBody) => postCongressCommentApi(workspaceId, params, data),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['congressCommentList'] }); // 무효화할 queryKey를 지정
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

export default usePostWorkspaceCongressCommentQuery;
