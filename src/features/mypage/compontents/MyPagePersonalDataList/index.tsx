import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

type MyPagePersonalDataListProps = {
  dataList: { id: number; name: string; icon: React.JSX.Element }[];
  title?: string;
};

const MyPagePersonalDataList: FC<MyPagePersonalDataListProps> = (props) => {
  const { dataList } = props;

  return (
    <ul {...stylex.props(Styles.List)}>
      {dataList.map((item) => (
        <li key={item.id} {...stylex.props(Styles.Item)}>
          <span>{item.icon}</span>
          <span {...stylex.props(Typography.TextSmallMedium)}>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default MyPagePersonalDataList;

const Styles = stylex.create({
  Title: {
    margin: '16px 16px 8px',
    color: colors.gray60,
  },
  List: {
    listStyle: 'none',
    flexDirection: 'column',
  },
  Item: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  MenuLink: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.black400,
  },
});
