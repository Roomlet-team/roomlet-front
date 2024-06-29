import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import { MenuListType } from './index.type';

type MypageMenu = {
  menuList: MenuListType;
};

const MypageMenu: FC<MypageMenu> = (props) => {
  const { menuList } = props;

  return (
    <nav>
      <ul {...stylex.props(Styles.List)}>
        {menuList.map((item) => (
          <li key={item.id} {...stylex.props(Styles.Item)}>
            <Link href={item.href} {...stylex.props(Styles.MenuLink)}>
              <span>{item.icon}</span>
              <span {...stylex.props(Typography.TextSmallMedium)}>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MypageMenu;

const Styles = stylex.create({
  List: {
    listStyle: 'none',
    flexDirection: 'column',
  },
  Item: {
    padding: '16px',
  },
  MenuLink: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.black400,
  },
});