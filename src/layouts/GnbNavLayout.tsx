import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import MainLayout from './MainLayout';
import HomeTwoTone from '@src/components/icons/HomeTwoTone';
import CalendarTwoTone from '@src/components/icons/CalendarTwoTone';
import CalendarOutlined from '@src/components/icons/CalendarOutlined';
import HomeOutlined from '@src/components/icons/HomeOutlined';
import ListOutlined from '@src/components/icons/ListOutlined';
import ListTwoTone from '@src/components/icons/ListTwoTone';
import MypageOutlined from '@src/components/icons/MypageOutlined';

type GnbNavLayoutProps = {
  children: React.ReactElement | React.ReactElement[] | string;
};

type MenuListType = {
  id: number;
  name: string;
  onIcon: React.ReactElement | React.ReactElement[] | string;
  offIcon: React.ReactElement | React.ReactElement[] | string;
  href: string;
}[];

const GnbNavLayout: FC<GnbNavLayoutProps> = (props) => {
  const { children } = props;
  const isActive = false; // [ ] isActive에 대한 코드 작성하기
  const menuList: MenuListType = [
    {
      id: 1,
      name: '홈',
      onIcon: <HomeTwoTone width={24} height={24} />,
      offIcon: <HomeOutlined width={24} height={24} />,
      href: '/',
    },
    {
      id: 1,
      name: '캘린더',
      onIcon: <CalendarTwoTone width={24} height={24} />,
      offIcon: <CalendarOutlined width={24} height={24} />,
      href: '/',
    },
    {
      id: 1,
      name: '예약리스트',
      onIcon: <ListTwoTone width={24} height={24} />,
      offIcon: <ListOutlined width={24} height={24} />,
      href: '/',
    },
    {
      id: 1,
      name: '마이페이지',
      onIcon: '',
      offIcon: <MypageOutlined width={24} height={24} />,
      href: '/',
    },
  ];

  return (
    <MainLayout>
      <main {...stylex.props(Styles.wrapper)}>{children}</main>
      <div {...stylex.props(Styles.gnbNavContent)}>
        <ul {...stylex.props(Styles.gnbNavList)}>
          {menuList.map((item) => (
            <li key={item.id} {...stylex.props(Styles.gnbNavItem)}>
              {isActive ? item.onIcon : item.offIcon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </MainLayout>
  );
};

export default GnbNavLayout;

const Styles = stylex.create({
  wrapper: {
    paddingBottom: '90px',
  },
  gnbNavContent: {
    width: '100%',
    maxWidth: '767px',
    padding: '16px 0',
    position: 'fixed',
    bottom: 0,
    borderTop: '1px solid #E2E2E2',
    borderRadius: '16px 16px 0 0',
    background: 'var(--Base-White)',
  },
  gnbNavList: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'space-between',
  },
  gnbNavItem: {
    padding: '0 11px',
    display: 'flex',
    gap: '8px',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1',
    flexShrink: 0,
  },
});