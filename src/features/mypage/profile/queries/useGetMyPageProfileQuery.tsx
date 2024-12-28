import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

interface ProfileInfo {
  success: boolean;
  code: number;
  profile: {
    displayName: string;
    profileImgUrl: string | null;
    email: string;
  };
}
const getMyPageProfileApi = async (): Promise<ProfileInfo> => {
  const response = await clientInstance.get(`/v1/mypage/profile`);

  return response.data;
};

/**
 * React-query를 사용하여 사용자 프로필 정보를 가져오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 프로필 정보 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetMyPageProfileQuery = () => {
  const result = useQuery({
    queryKey: ['profile'],
    queryFn: () => getMyPageProfileApi(),
  });

  return result;
};

export default useGetMyPageProfileQuery;
