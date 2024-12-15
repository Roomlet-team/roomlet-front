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
  },
});

// Action creators are generated for each case reducer function
export const { saveCategoryList } = CategorySlice.actions;

export default CategorySlice.reducer;
