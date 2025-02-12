import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface CongressCalendarInfo {
  success: boolean;
  code: number;
  congressCountByDayList: CongressCountByDayListItem[];
  ym: string;
  holidayList: number[];
  congressCountByDayCount: number;
}

interface CongressCountByDayListItem {
  date: string;
  day: string;
  congressCount: number;
  hexcodeList: string[];
}

interface Params {
  ym: string;
}

const getWorkspaceCongressCalendarApi = async (WorkspaceId: number, params: Params): Promise<CongressCalendarInfo> => {
  const { ym } = params;

  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/congress/calender`, {
    params: {
      ym,
    },
  });

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 회의 캘린더 정보를 불러오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 회의 캘린더 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceCongressCalendarQuery = (params: Params) => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useQuery({
    queryKey: ['workspaceCongressCalendar', ...Object.values(params)],
    queryFn: () => getWorkspaceCongressCalendarApi(workspaceId, params),
    enabled: Boolean(workspaceId) && Boolean(params),
  });

  return result;
};

export default useGetWorkspaceCongressCalendarQuery;
