import { useDispatch } from 'react-redux';
import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import useGlobalRouter from '@src/hooks/useGlobalRouter';
import { saveSelectBookingDate } from '../slices/booking';
import { saveSelectBookingMemberObj } from '../slices/booking';

interface RequestBody {
  cgsid: number;
  RoomId: number;
  CongressCategoryId: number;
  congressTitle: string;
  congressDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  attendMemberList: {
    MemberId: number;
  }[];
  allTeam: boolean;
}

interface CongressInfo {
  success: boolean;
  code: number;
  CongressId: number;
}

const patchCongressApi = async (
  WorkspaceId: number | undefined,
  cgsid: number,
  data: RequestBody
): Promise<CongressInfo> => {
  const response = await clientInstance.patch(`/v1/workspace/@${WorkspaceId}/congress`, data, {
    params: { cgsid },
  });

  return response.data;
};

/**
 * React-query를 사용하여 회의를 수정하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 반환하는 데이터 없음 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const usePatchWorkspaceCongressQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const router = useGlobalRouter();
  const dispatch = useDispatch();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useCustomMutation({
    mutationFn: (data: RequestBody) => {
      const cgsid = data?.cgsid;
      return patchCongressApi(workspaceId, cgsid, data);
    },
    onSuccess: (data: CongressInfo, variables, context) => {
      // [ ] 초기화 코드가 여기에 있으면, 유지보수할 때 코드 찾기가 어려울 것. 추후 수정 필요
      // 예약 날짜 초기화
      dispatch(saveSelectBookingDate(''));
      // 예약 참석자 초기화
      dispatch(saveSelectBookingMemberObj({}));

      router.push(`/reservations/${data.CongressId}`);
    },
    onError: (error, variables, context) => {
      if (error.response.data.code === 452) {
        // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
        confirm({ content: error?.response.data.message.errMsg });
      }
    },
  });

  return result;
};

export default usePatchWorkspaceCongressQuery;
