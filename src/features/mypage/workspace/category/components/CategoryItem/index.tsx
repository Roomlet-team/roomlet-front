import React, { FC, useCallback } from 'react';
import stylex from '@stylexjs/stylex';
import FileOutlined from '@src/components/icons/FileOutlined';
import { CongressCategoryItem } from '@src/queries/category/useGetCategoryListQuery';
import useInput from '@src/hooks/useInput';
import CircleCloseFilled from '@src/components/icons/CircleCloseFilled';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import { confirm } from '@src/components/ui/Modal/confirm';
import { useDispatch, useSelector } from 'react-redux';
import { saveCategoryList, tempRemoveCategory } from '../../slices/category';
import { editCongressCategoryItem } from '../../types/category';
import { RootState } from '@src/store';

interface CategoryItemProps {
  data: editCongressCategoryItem;
  isEdit?: boolean;
}

const CategoryItem: FC<CategoryItemProps> = (props) => {
  const { isEdit, data } = props;
  const { editCongressCategoryList } = useSelector((state: RootState) => state.category);
  const [categoryName, handleChangeCategoryName] = useInput<string>(data?.categoryName);
  const dispatch = useDispatch();

  // 회의실 카테고리 이름값 변경을 다루는 함수
  const handleChangeCategory = useCallback(
    (key: 'categoryName') => (e) => {
      const value = e.target.value;
      const mappingCongressRoomList = editCongressCategoryList.map((item) =>
        item.CongressCategoryId === data.CongressCategoryId ? { ...item, [key]: value } : item
      );
      const index = editCongressCategoryList.findIndex((item) => item.CongressCategoryId === data.CongressCategoryId);

      if (index === -1) {
        return null;
      }

      const updateCongressCategoryList = [...editCongressCategoryList];
      updateCongressCategoryList[index] = { ...updateCongressCategoryList[index], [key]: value };

      dispatch(saveCategoryList(mappingCongressRoomList));
    },
    [editCongressCategoryList, data.CongressCategoryId, dispatch]
  );

  const handleClickDelete = () => {
    confirm({
      content: '기존 회의 기록은 변하지 않지만,\n새로운 회의에서는 더이상 사용할 수 없어요.',
      cancelBtnName: '유지할래요',
      okBtnName: '삭제할래요',
      onOk: () =>
        dispatch(
          tempRemoveCategory(
            data.tempCongressCategoryId ? { tempCongressCategoryId: data.tempCongressCategoryId } : { ...data }
          )
        ),
    });
  };

  return (
    <div {...stylex.props(Styles.Container)}>
      <FileOutlined width={24} height={24} />
      {isEdit ? (
        <div {...stylex.props(Styles.InputAndCloseBtnContainer)}>
          <input
            value={categoryName}
            onChange={handleChangeCategory('categoryName')}
            {...stylex.props(Styles.TextInput, Typography.TextSmallMedium)}
          />
          <button type="button" onClick={handleClickDelete}>
            <CircleCloseFilled width={24} height={24} />
          </button>
        </div>
      ) : (
        <p {...stylex.props(Typography.TextSmallMedium)}>{data.categoryName}</p>
      )}
    </div>
  );
};

export default CategoryItem;

const Styles = stylex.create({
  Container: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  InputAndCloseBtnContainer: {
    width: '100%',
    display: 'flex',
    gap: '16px',
  },
  TextInput: {
    width: '100%',
    padding: '4px 8px',
    background: colors.gray20,
    border: 'none',
    borderRadius: '4px',
  },
});
