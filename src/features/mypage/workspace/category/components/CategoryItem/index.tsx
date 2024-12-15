import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import FileOutlined from '@src/components/icons/FileOutlined';
import { CongressCategoryItem } from '@src/queries/category/useGetCategoryListQuery';
import useInput from '@src/hooks/useInput';
import CircleCloseFilled from '@src/components/icons/CircleCloseFilled';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';

interface CategoryItemProps {
  data: CongressCategoryItem;
  isEdit?: boolean;
}

const CategoryItem: FC<CategoryItemProps> = (props) => {
  const { isEdit, data } = props;
  const [categoryName, handleChangeCategoryName] = useInput<string>(data?.categoryName);

  const handleClickDelete = () => {};

  return (
    <div {...stylex.props(Styles.Container)}>
      <FileOutlined width={24} height={24} />
      {isEdit ? (
        <div {...stylex.props(Styles.InputAndCloseBtnContainer)}>
          <input
            value={categoryName}
            onChange={handleChangeCategoryName}
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
