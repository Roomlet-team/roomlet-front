import { useQuery } from '@tanstack/react-query';
import clientInstance from '@src/utils/api/clientInstance';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import getUserTimeZone from '@src/utils/timezone/getUserTimeZone';

export interface CongressRoomTimeList {
  success: boolean;
  code: number;
  timeList: CongressRoomTimeItem[];
}

export interface CongressRoomTimeItem {
  time: string;
  isValid: boolean;
}

interface Params {
  startTime?: string;
}

const getWorkspaceCongressRoomTimeApi = async (
  WorkspaceId,
  RoomId,
  date,
  params: Params
): Promise<CongressRoomTimeList> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/congress/room/${RoomId}/${date}/time`, {
    params: { ...params, timezone: getUserTimeZone() },
  });

  return response.data;
};

/**
 * React-query를 사용하여 회의실 예약 가능 시간 목록을 가져오는 커스텀 훅
 * @param RoomId 회의실 아이디
 * @param date 회의 날짜
 * @param params api에 전달할 쿼리 파라미터
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 회의실 예약 가능 시간 목록 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetWorkspaceCongressRoomTimQuery = (RoomId, date, params: Params) => {
  const { data } = useGetWorkspaceListQuery();
  const WorkspaceId = data?.workspaceList[0].WorkspaceId;

  const result = useQuery({
    queryKey: ['workspaceCongressRoomTime', ...Object.values(params)],
    queryFn: () => getWorkspaceCongressRoomTimeApi(WorkspaceId, RoomId, date, params),
    enabled: Boolean(WorkspaceId) && Boolean(date) && Boolean(RoomId), // WorkspaceId가 정의되어 있지 않은 경우, 첫 렌더링시 요청이 이뤄지지 않게 함.
  });

  return result;
};

export default useGetWorkspaceCongressRoomTimQuery;
