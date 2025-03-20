import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import getUserTimeZone from '@src/utils/timezone/getUserTimeZone';
import { useQuery } from '@tanstack/react-query';

interface WorkspaceInfo {
  success: boolean;
  code: number;
  memberInfo: {
    displayName: string;
    profileImgUrl: string;
    isAdmin: boolean;
  };
  workspaceCongressStatus: {
    myCongressCount: number;
    workspaceCongressCount: number;
  };
  workspace: {
    WorkspaceId: number;
    workspaceName: string;
    workspaceImgKey: string;
    congressInfo: {
      myCongressCount: number;
      workspaceCongressCount: number;
    };
  };
}

const getWorkspaceInfoApi = async (WorkspaceId: number): Promise<WorkspaceInfo> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}`, {
    params: { timezone: getUserTimeZone() },
  });

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 메인 정보를 가져오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 메인 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceMainInfoQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useQuery({
    queryKey: ['workspaceInfo', workspaceId],
    queryFn: () => getWorkspaceInfoApi(workspaceId),
    placeholderData: {
      success: false,
      code: 0,
      memberInfo: {
        displayName: '',
        profileImgUrl: '',
        isAdmin: false,
      },
      workspaceCongressStatus: { workspaceCongressCount: 0, myCongressCount: 0 },
      workspace: {
        WorkspaceId: null,
        workspaceName: '',
        workspaceImgKey: '',
        congressInfo: {
          myCongressCount: 0,
          workspaceCongressCount: 0,
        },
      },
    },
    enabled: Boolean(workspaceId), // workspaceId가 정의되어 있지 않은 경우, 첫 렌더링시 요청이 이뤄지지 않게 함.
  });

  return result;
};

export default useGetWorkspaceMainInfoQuery;
