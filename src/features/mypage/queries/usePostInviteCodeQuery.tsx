import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface InviteCodeInfo {
  inviteInfo: {
    InviteId: string;
  };
}

const postInviteCodeApi = async (WorkspaceId: number): Promise<InviteCodeInfo> => {
  const response = await clientInstance.post(`/v1/workspace/@${WorkspaceId}/invite`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 초대 코드를 생성하는 커스텀 훅
 * 자주 사용되는 훅이라서 gcTime을 설정함.
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 생성된 초대 코드 정본 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const usePostInviteCodeQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useQuery({
    queryKey: ['inviteCode'],
    queryFn: () => postInviteCodeApi(workspaceId),
    gcTime: 60 * 60 * 1000,
    enabled: Boolean(workspaceId),
  });

  return result;
};

export default usePostInviteCodeQuery;
