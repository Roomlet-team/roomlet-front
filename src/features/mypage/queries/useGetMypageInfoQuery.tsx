import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface MypageInfo {
  myInfo: {
    MemberId: number;
    displayName: string;
    profileImgUrl: string;
    position: string;
    isAdmin: boolean;
    email: string;
    teamInfo: {
      TeamId: number;
      teamName: string;
    };
  };
}

const getMypageInfoApi = async (WorkspaceId: number): Promise<MypageInfo> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/mypage/info`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 내 정보를 가져오는 커스텀 훅
 * 자주 사용되는 훅이라서 gcTime을 설정함.
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 내 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetMypageInfoQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0].WorkspaceId;

  const result = useQuery({
    queryKey: ['mypageInfo'],
    queryFn: () => getMypageInfoApi(workspaceId),
    gcTime: 3 * 60 * 1000,
    enabled: Boolean(workspaceId),
  });

  return result;
};

export default useGetMypageInfoQuery;
