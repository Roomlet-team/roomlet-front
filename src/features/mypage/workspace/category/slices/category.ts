import { createSlice } from '@reduxjs/toolkit';
import { editCongressCategoryItem } from '../types/category';

export interface CategoryState {
  editCongressCategoryList: editCongressCategoryItem[];
}

const initialState: CategoryState = {
  // 회의실 카테고리 저장
  editCongressCategoryList: [],
};

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // 회의실 카테고리 리스트 저장
    saveCategoryList: (state, action) => {
      state.editCongressCategoryList = action.payload;
    },
    // 회의실 카테고리 추가
    addCategory: (state, action) => {
      // 임시로 생성한 카테고리를 제거할 때, 고유 id 값으로 판별하기 위해 tempCongressCategoryId 생성
      const tempCongressCategoryId =
        state.editCongressCategoryList.filter((item) => item.tempCongressCategoryId).length + 1;

      state.editCongressCategoryList = [
        ...state.editCongressCategoryList,
        { ...action.payload, tempCongressCategoryId },
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveCategoryList, addCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
