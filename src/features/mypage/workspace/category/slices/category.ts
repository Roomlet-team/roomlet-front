import { createSlice } from '@reduxjs/toolkit';
import { editCongressCategoryItem } from '../types/category';

export interface CategoryState {
  editCongressCategoryList: editCongressCategoryItem[];
  tempDeleteCongressCategoryList: editCongressCategoryItem[];
}

const initialState: CategoryState = {
  // 회의실 카테고리 저장
  editCongressCategoryList: [],
  // 삭제한 회의실 카테고리 임시 리스트
  tempDeleteCongressCategoryList: [],
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
    // 회의실 카테고리 제거
    tempRemoveCategory: (state, action) => {
      // 회의실 카테고리 제거 시, 임시로 생성한 카테고리와 기존 카테고리를 별도로 처리해서 제거
      const filterRemoveCategoryList = state.editCongressCategoryList.filter((item) => {
        if (item.CongressCategoryId) {
          return item.CongressCategoryId !== action.payload.CongressCategoryId;
        }

        return item.tempCongressCategoryId !== action.payload.tempCongressCategoryId;
      });

      // CongressCategoryId가 존재하는 경우에만 회의실 제거 리스트에 추가
      if (action.payload.CongressCategoryId) {
        state.tempDeleteCongressCategoryList = [...state.tempDeleteCongressCategoryList, action.payload];
      }

      state.editCongressCategoryList = filterRemoveCategoryList;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveCategoryList, addCategory, tempRemoveCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
