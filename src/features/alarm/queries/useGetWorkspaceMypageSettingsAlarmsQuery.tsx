import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface AlarmInfo {
  success: boolean;
  code: number;
  alarmInfo: {
    isAlarm: boolean;
  };
}

const getWorkspaceMypageSettingsAlarmsApi = async (WorkspaceId: number): Promise<AlarmInfo> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/mypage/settings/alarms`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 내정보 셋팅 알람을 불러오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 알람 설정 상태 데이터 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceMypageSettingsAlarms = () => {
  const { data } = useGetWorkspaceListQuery();
  const WorkspaceId = data?.workspaceList[0].WorkspaceId;

  const result = useQuery({
    queryKey: ['mypageSettingsAlarms', WorkspaceId],
    queryFn: () => getWorkspaceMypageSettingsAlarmsApi(WorkspaceId),
    enabled: Boolean(WorkspaceId), // WorkspaceId가 정의되어 있지 않은 경우, 첫 렌더링시 요청이 이뤄지지 않게 함.
  });

  return result;
};

export default useGetWorkspaceMypageSettingsAlarms;
