import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface InviteInfo {
  code: number;
  success: boolean;
  workspaceList: {
    WorkspaceId: number;
    workspaceName: string;
  }[];
  workspaceCount: number;
}

const getWorkspaceListApi = async (): Promise<InviteInfo> => {
  const response = await clientInstance.get(`/v1/workspace/list`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 리스트를 가져오는 커스텀 훅
 * 자주 사용되는 훅이라서 gcTime을 설정함.
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 초대 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceListQuery = () => {
  const result = useQuery({
    queryKey: ['workspaceList'],
    queryFn: () => getWorkspaceListApi(),
    gcTime: 3 * 60 * 1000,
    retry: false,
  });

  return result;
};

export default useGetWorkspaceListQuery;
