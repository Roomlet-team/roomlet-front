import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';

interface InviteInfo {
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

const getInviteInfoApi = async (InviteId: string): Promise<InviteInfo> => {
  const response = await axios.get(`/v1/workspace/invite/${InviteId}`);

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
const useInviteInfoQuery = () => {
  const router = useRouter();
  const InviteId = router.query.InviteId as string;
  const result = useQuery({
    queryKey: ['inviteInfo', InviteId],
    queryFn: () => getInviteInfoApi(InviteId),
  });

  return result;
};

export default useInviteInfoQuery;
