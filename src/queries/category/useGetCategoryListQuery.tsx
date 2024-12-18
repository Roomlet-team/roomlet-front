import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';
import clientInstance from '@src/utils/api/clientInstance';
import { useQuery } from '@tanstack/react-query';

export interface CongressCategoryItem {
  CongressCategoryId: number;
  categoryType: string;
  categoryName: string;
  hexcode: string;
  congressCount: number;
}

interface CongressCategoryList {
  success: boolean;
  code: number;
  congressCategoryList: CongressCategoryItem[];
  congressCategoryCount: number;
}

const getCongressCategoryListApi = async (WorkspaceId: number): Promise<CongressCategoryList> => {
  const response = await clientInstance.get(`/v1/workspace/@${WorkspaceId}/congress/category/list`);

  return response.data;
};

/**
 * React-query를 사용하여 워크스페이스 회의실 카테고리 목록을 불러오는 커스텀 훅
 * @returns
 * - 다음 객체를 반환합니다:
 *   - `data`: 카테고리 리스트 (아직 가져오지 않았다면 `undefined`)
 *   - `error`: 에러 발생 시 에러 객체
 *   - `isLoading`: 데이터 로딩 여부
 *   - `refetch`: 데이터를 수동으로 다시 가져오는 함수
 */
const useGetCategoryListQuery = () => {
  const { data } = useGetWorkspaceListQuery();
  const workspaceId = data?.workspaceList[0]?.WorkspaceId;

  const result = useQuery({
    queryKey: ['categoryList'],
    queryFn: () => getCongressCategoryListApi(workspaceId),
    enabled: Boolean(workspaceId),
  });

  return result;
};

export default useGetCategoryListQuery;
