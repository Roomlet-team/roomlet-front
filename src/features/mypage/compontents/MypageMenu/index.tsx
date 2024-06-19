import React from 'react';
import stylex from '@stylexjs/stylex';
import Link from 'next/link';
import SettingOutlined from '@src/components/icons/SettingOutlined';
import AddUserOutlined from '@src/components/icons/AddUserOutlined';
import MegaphoneOutlined from '@src/components/icons/MegaphoneOutlined';
import BellOutlined from '@src/components/icons/BellOutlined';
import ExitOutlined from '@src/components/icons/ExitOutlined';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';

const MypageMenu = () => {
  const menuList = [
    { id: 1, name: '워크스페이스 설정', icon: <SettingOutlined width={24} height={24} />, href: '' },
    { id: 2, name: '멤버초대', icon: <AddUserOutlined width={24} height={24} />, href: '' },
    { id: 3, name: '공지사항 작성', icon: <MegaphoneOutlined width={24} height={24} />, href: '' },
    { id: 4, name: '알림설정', icon: <BellOutlined width={24} height={24} />, href: '' },
    { id: 5, name: '워크스페이스 나가기', icon: <ExitOutlined width={24} height={24} />, href: '' },
  ];

  return (
    <nav>
      <ul {...stylex.props(Styles.List)}>
        {menuList.map((item) => (
          <li key={item.id}>
            <Link href={item.href} {...stylex.props(Styles.MenuLink, Typography.TextSmallMedium)}>
              <span>{item.icon}</span>
              <span>{item.name}</span>
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
  MenuLink: {
    padding: '16px',
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.black400,
  },
});
