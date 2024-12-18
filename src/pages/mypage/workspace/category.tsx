import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import stylex from '@stylexjs/stylex';
import Header from '@src/components/ui/Header';
import { colors, Typography } from '../../../../public/styles/vars.stylex';
import { RootState } from '@src/store';
import PlusOutlined from '@src/components/icons/PlusOutlined';
import MainLayout from '@src/layouts/MainLayout';
import CategoryItem from '@src/features/mypage/workspace/category/components/CategoryItem';
import useGetCategoryListQuery from '@src/queries/category/useGetCategoryListQuery';
import { saveCategoryList } from '@src/features/mypage/workspace/category/slices/category';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import AddCategoryBottomSheet from '@src/features/mypage/workspace/category/components/AddCategoryBottomSheet';

const Category = () => {
  const { data } = useGetCategoryListQuery();
  const dispatch = useDispatch();
  const { editCongressCategoryList } = useSelector((state: RootState) => state.category);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { renderModal } = useRenderModal();

  const completeBtnProps = {
    name: isEdit ? '완료' : '수정',
    isActive: isEdit,
    onClick: () => {
      setIsEdit(!isEdit);
    },
  };

  const handleClickAddCategory = () => {
    renderModal(AddCategoryBottomSheet, null);
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(saveCategoryList(data?.congressCategoryList));
    }
  }, [isEdit]);

  return (
    <MainLayout>
      <Header title={isEdit ? '수정하기' : '카테고리'} prevUrl="/mypage/workspace" rightBtnInfo={completeBtnProps} />
      {/* 검색 */}

      <div {...{ ...stylex.props(Styles.Container) }}>
        {/* 전체 카테고리 수 */}
        <div {...stylex.props(Styles.TotalCountWrapper, Typography.TextSmallMedium)}>
          전체 카테고리 ({data?.congressCategoryCount})
        </div>

        {/* 카테고리 목록 */}
        <div {...stylex.props(Styles.CategoryListContainer)}>
          {isEdit
            ? editCongressCategoryList?.map((item, idx) => <CategoryItem data={item} isEdit />)
            : data?.congressCategoryList?.map((item, idx) => <CategoryItem data={item} />)}
        </div>

        {/* 카테고리 추가 */}
        {isEdit && (
          <button
            type="button"
            {...stylex.props(Styles.AddCategoryBtn, Typography.TextSmallMedium)}
            onClick={handleClickAddCategory}
          >
            <PlusOutlined width={24} height={24} />
            <span>카테고리 추가</span>
          </button>
        )}
      </div>
    </MainLayout>
  );
};

export default Category;

const Styles = stylex.create({
  Container: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    position: 'relative',
    padding: '16px',
    marginBottom: '24px',
    overflowY: 'auto',
  },
  TotalCountWrapper: {
    padding: '16px',
  },
  CategoryListContainer: {
    width: '100%',
    height: 'calc(100vh - 212px)',
    display: 'flex',
    flexDirection: 'column',
  },
  AddCategoryBtn: {
    maxWidth: '735px',
    width: 'calc(100% - 32px)',
    padding: '16px',
    position: 'fixed',
    bottom: '16px',
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    background: colors.red500,
    color: colors.white500,
    borderRadius: '20px',
  },
});
