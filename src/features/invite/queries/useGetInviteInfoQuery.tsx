import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface InviteInfoResponse {
  success: boolean;
  code: number;
  inviteInfo: {
    InviteId: string;
    workspace: {
      WorkspaceId: number;
      workspaceName: string;
      memberCount: number;
      memberList: MemberListItem[];
    };
    invitedMember: {
      displayName: string;
      profileImgKey: string;
    };
  };
}

interface MemberListItem {
  displayName: string;
  profileImgKey: null | string;
}

export const getInviteInfoApi = async (InviteId: string): Promise<InviteInfoResponse> => {
  const response = await clientInstance.get(`/v1/workspace/invite/${InviteId}`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 초대 정보를 가져오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 초대 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetInviteInfoQuery = () => {
  const router = useRouter();
  const InviteId = router.query.InviteId as string;

  const result = useQuery({
    queryKey: ['inviteInfo', InviteId],
    queryFn: () => getInviteInfoApi(InviteId),
    enabled: Boolean(InviteId), // InviteId가 정의되어 있지 않은 경우, 첫 렌더링시 요청이 이뤄지지 않게 함.
    staleTime: 60 * 1000, // SSR을 위해 추가
  });

  return result;
};

export default useGetInviteInfoQuery;
