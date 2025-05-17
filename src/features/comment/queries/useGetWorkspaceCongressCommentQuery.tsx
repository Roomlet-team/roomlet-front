import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface CommentListInfo {
  success: boolean;
  code: number;
  commentList: CommentListItem[];
  commentCount: number;
}

export interface CommentListItem {
  CommentId: number;
  content: string;
  createdAt: string;
  member: { MemberId: number; displayName: string; profileImgKey: string; isAdmin: boolean };
}

interface Params {
  page: number;
  perPage: number;
  cgsid: number | string;
}

const getWorkspaceCongressCommentApi = async (WorkspaceId: number, params: Params): Promise<CommentListInfo> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/congress/comment`, { params });

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 회의 댓글 리스트를 불러오는 커스텀 훅
 * @param skeywd 검색어
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 댓글 리스트 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceCongressCommentQuery = (params: Params) => {
  const { data } = useGetWorkspaceListQuery();
  const WorkspaceId = data?.workspaceList[0].WorkspaceId;

  const result = useQuery({
    queryKey: ['congressCommentList', ...Object.values(params)],
    queryFn: () => getWorkspaceCongressCommentApi(WorkspaceId, params),
    enabled: Boolean(WorkspaceId), // WorkspaceId가 정의되어 있지 않은 경우, 첫 렌더링시 요청이 이뤄지지 않게 함.
  });

  return result;
};

export default useGetWorkspaceCongressCommentQuery;
