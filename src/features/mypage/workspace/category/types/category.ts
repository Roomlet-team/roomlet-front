import { CongressCategoryItem } from '@src/queries/category/useGetCategoryListQuery';

/**
 * 회의실 카테고리 편집용 아이템 타입
 */
export interface editCongressCategoryItem extends CongressCategoryItem {
  tempCongressCategoryId?: number;
}
