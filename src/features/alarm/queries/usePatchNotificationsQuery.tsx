import { confirm } from '@src/components/ui/Modal/confirm';
import useCustomMutation from '@src/hooks/react-query/useCustomMutation';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import { hideModal } from '@src/slices/modal';
import clientInstance from '@src/utils/api/clientInstance';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

interface ResponseData {}

interface ClientCustomResponseData extends ResponseData {
  CongressId: number;
}

interface AlarmRequestData {
  NotificationId: number;
  isReadAll?: boolean;
}

interface MutationFnData extends AlarmRequestData {
  CongressId: number;
}

const patchNotificationsApi = async (WorkspaceId: number, data: MutationFnData): Promise<ClientCustomResponseData> => {
  const { CongressId, ...restData } = data;
  const response = await clientInstance.patch(`/v1/workspace/@${WorkspaceId}/mypage/notifications`, restData);

  return { ...response.data, CongressId };
};

/**
 * React-query를 사용하여 알림을 읽은 상태로 변경하는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 없음
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isIdle`: 쿼리 비활성화 여부 (enabled가 true 이고 쿼리 불러오기가 시작될 때까지 isIdle 은 true)
 *   - `isPending`: mutation 실행중인지에 대한 여부
 *   - `isError`: 에러가 발생했는지에 대한 여부
 *   - `isSuccess`: mutation이 성공했고, mutation data를 사용할 수 있는지에 대한 여부
 */
const usePatchNotificationsQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const queryClient = useQueryClient();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;
  const router = useRouter();

  const mutation = useCustomMutation({
    mutationFn: (data: MutationFnData) => {
      return patchNotificationsApi(workspaceId, data);
    },
    onSuccess: (data, variables) => {
      const { CongressId } = data;
      // 업데이트 후 알람 설정 데이터 재요청 (쿼리 무효화)
      queryClient.invalidateQueries({ queryKey: ['notifications'] });

      // 회의 페이지 이동
      router.push(`/reservations/${CongressId}`);
    },
    onError: (error, variables, context) => {
      console.log('error', error);
      // 에러가 발생한 경우, 에러 내용이 담긴 confirm 모달 띄우기
      confirm({ content: error?.response.data.message.errMsg });
    },
  });

  return mutation;
};

export default usePatchNotificationsQuery;
