import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useInfiniteQuery } from '@tanstack/react-query';

export type AlarmCategory = 'reserve' | 'invite' | 'change' | 'remind';

interface Params {
  alarmCategory: AlarmCategory;
}

export interface NotificationItem {
  NotificationId: number;
  WorkspaceId: number;
  CongressId: number;
  notificationType: AlarmCategory;
  createdAt: string;
  content: string;
  checkedAt: string | null;
  congress: {
    congressTitle: string;
    startDt: string;
    endDt: string;
    organizer: {
      displayName: string;
    };
  };
  sender: {
    displayName: string;
  };
}

interface Notification {
  success: boolean;
  code: number;
  notificationList: NotificationItem[];
}

const PER_PAGE = 20;

const getNotificationApi = async (
  WorkspaceId: number,
  alarmCategory: AlarmCategory,
  page: number
): Promise<Notification> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/mypage/notifications`, {
    params: { page, perPage: PER_PAGE, ...(alarmCategory && { notyp: alarmCategory }) },
  });

  return response.data;
};

/**
 * React-query의 useInfiniteQuery를 사용하여 워크스페이스 알림 목록을 무한 스크롤로 불러오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 페이지별 알림 데이터
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `isFetchingNextPage`: 다음 페이지 로딩 여부
 *   - `hasNextPage`: 다음 페이지 존재 여부
 *   - `fetchNextPage`: 다음 페이지를 수동으로 불러오는 함수
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 *   - `notifications`: 모든 페이지의 알림을 평면화한 배열
 */
const useGetNotificationsInfiniteQuery = ({ alarmCategory }: Params) => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useInfiniteQuery({
    queryKey: ['notifications', workspaceId, alarmCategory],
    queryFn: ({ pageParam }) => getNotificationApi(workspaceId!, alarmCategory, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      // 알림이 20개 미만이면 마지막 페이지
      if (lastPage.notificationList.length < PER_PAGE) {
        console.log('Less than 20 notifications, this is the last page');
        return undefined;
      }

      // 다음 페이지 번호 반환
      const nextPage = pages.length + 1;

      return nextPage;
    },
    enabled: !!workspaceId,
  });

  // 모든 페이지의 알림을 평면화
  const notifications = result.data?.pages.flatMap((page) => page.notificationList) ?? [];

  return {
    ...result,
    notifications,
  };
};

export default useGetNotificationsInfiniteQuery;
