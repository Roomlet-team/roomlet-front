import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

const AlarmCategoryList = () => {
  const [selectCategory, setSelectCategory] = useState<string>('all');
  const categoryList = [
    { id: 1, name: '전체', value: 'all' },
    { id: 2, name: '테스트', value: 'test' },
  ];

  const handleClick = (e) => {
    const value = e.target.getAttribute('value');
    setSelectCategory(value);
  };

  return (
    <div {...stylex.props(AlarmCategoryStyles.Wrapper)}>
      <ul {...stylex.props(AlarmCategoryStyles.List)} onClick={handleClick}>
        {categoryList.map((item, idx) => (
          <li
            key={item.id}
            value={item.value}
            {...stylex.props(
              AlarmCategoryStyles.Item,
              Typography.SubTextLargeRegular,
              idx === categoryList.length - 1 && AlarmCategoryStyles.LastItem,
              item.value === selectCategory && AlarmCategoryStyles.Active
            )}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlarmCategoryList;

const AlarmCategoryStyles = stylex.create({
  Wrapper: {
    padding: '16px',
    overflowX: 'auto',
  },
  List: {
    listStyle: 'none',
    textWrap: 'nowrap',
  },
  Item: {
    marginRight: '8px',
    padding: '7px 16px',
    display: 'inline-block',
    borderRadius: '20px',
    boxShadow: `inset 0 0 0 1px ${colors.gray30}`,
    color: '#000',
    flexShrink: 0,
  },
  LastItem: {
    marginRight: '16px',
  },
  Active: {
    boxShadow: `inset 0 0 0 1px ${colors.red500}`,
    color: colors.red500,
    background: '#FDF0F0',
  },
});
