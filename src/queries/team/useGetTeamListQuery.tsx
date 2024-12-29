import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

export interface MemberInfoItem {
  MemberId: number;
  displayName: string;
  profileImgUrl: string;
  position: string;
  isAdmin: boolean;
  email: string;
}

export interface TeamInfoItem {
  TeamId: number;
  teamType: string;
  teamName: string;
  memberList: MemberInfoItem[];
}

interface TeamList {
  success: boolean;
  code: number;
  WorkspaceId: number;
  workspaceName: string;
  teamList: TeamInfoItem[];
  teamCount: number;
}

const getTeamListApi = async (WorkspaceId: number, skeywd: string): Promise<TeamList> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/team`, { params: { skeywd } });

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 팀 목록을 불러오는 커스텀 훅
 * @param skeywd 검색어
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 팀 리스트 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetTeamListQuery = (skeywd: string) => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useQuery({
    queryKey: ['teamList', skeywd],
    queryFn: () => getTeamListApi(workspaceId, skeywd),
    enabled: Boolean(workspaceId),
  });

  return result;
};

export default useGetTeamListQuery;
