import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import Link from 'next/link';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import { MenuListType } from './index.type';

type MypageMenuProps = {
  menuList: MenuListType;
  title?: string;
};

const MypageMenu: FC<MypageMenuProps> = (props) => {
  const { menuList, title } = props;

  return (
    <nav>
      <div {...stylex.props(Styles.Title, Typography.SubTextLargeSemiBold)}>{title}</div>
      <ul {...stylex.props(Styles.List)}>
        {menuList.map((item) => (
          <li key={item.id} {...stylex.props(Styles.Item)}>
            {/* onClick으로 메뉴 사용할 때 */}
            {item.onClick ? (
              <button type="button" onClick={item.onClick} {...stylex.props(Styles.MenuButton)}>
                <span>{item.icon}</span>
                <span {...stylex.props(Typography.TextSmallMedium)}>{item.name}</span>
              </button>
            ) : (
              // 메뉴 클릭시 링크 이동할 때
              <Link href={item.href} {...stylex.props(Styles.MenuLink)}>
                <span>{item.icon}</span>
                <span {...stylex.props(Typography.TextSmallMedium)}>{item.name}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MypageMenu;

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
  },
  MenuLink: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.black400,
  },
  MenuButton: {
    width: '100%',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textAlign: 'left',
  },
});
