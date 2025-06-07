import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

export interface ResponseData {
  success: boolean;
  code: number;
  member: Member;
}

interface Member {
  MemberId: number;
  displayName: string;
  profileImgKey: null;
  position: string;
  isAdmin: boolean;
  email: string;
  ourself: boolean;
  teamInfo: TeamInfo;
}

interface TeamInfo {
  TeamId: number;
  teamName: string;
}

const getWorkspaceMemberApi = async (WorkspaceId: number, MemberId: number): Promise<ResponseData> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/members/${MemberId}`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 멤버 정보를 불러오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 멤버 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceMemberQuery = (memberId: number) => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useQuery({
    queryKey: ['workspaceMember', memberId],
    queryFn: () => getWorkspaceMemberApi(workspaceId, memberId),
    enabled: Boolean(workspaceId) && Boolean(memberId),
  });

  return result;
};

export default useGetWorkspaceMemberQuery;
