import React, { FC } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
  backgroundColor?: string;
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
  const router = useRouter();
  const { backgroundColor, children } = props;
  const menuList: MenuListType = [
    {
      id: 1,
      name: '홈',
      onIcon: <HomeTwoTone width={24} height={24} />,
      offIcon: <HomeOutlined width={24} height={24} />,
      href: '/',
    },
    {
      id: 2,
      name: '캘린더',
      onIcon: <CalendarTwoTone width={24} height={24} />,
      offIcon: <CalendarOutlined width={24} height={24} />,
      href: '/calendar',
    },
    {
      id: 3,
      name: '예약리스트',
      onIcon: <ListTwoTone width={24} height={24} />,
      offIcon: <ListOutlined width={24} height={24} />,
      href: '/reservations',
    },
    {
      id: 4,
      name: '마이페이지',
      onIcon: '',
      offIcon: <MypageOutlined width={24} height={24} />,
      href: '/mypage',
    },
  ];

  // 현재 접속한 페이지가 mainPath(메인 메뉴)의 하위 페이지인지 체크
  const checkSameMainPath = (mainPath) => {
    const pathName = router.pathname;

    return (
      pathName.indexOf(mainPath) === 0 && (pathName.length === mainPath.length || pathName[mainPath.length] === '/')
    );
  };

  return (
    <MainLayout>
      <main {...stylex.props(Styles.wrapper(backgroundColor))}>{children}</main>
      <div {...stylex.props(Styles.gnbNavContent)}>
        <ul {...stylex.props(Styles.gnbNavList)}>
          {menuList.map((item) => {
            const isActive = checkSameMainPath(item.href);

            return (
              <li key={item.id} {...stylex.props(Styles.gnbNavItem)}>
                <Link href={item.href} passHref legacyBehavior>
                  <a href="alternative" {...stylex.props(Styles.gnbNavItemLink, isActive && Styles.gnbNavItemActive)}>
                    {isActive ? item.onIcon : item.offIcon}
                    <span>{item.name}</span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </MainLayout>
  );
};

export default GnbNavLayout;

const Styles = stylex.create({
  wrapper: (backgroundColor) => ({ backgroundColor, height: '100%', paddingBottom: '90px' }),
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
  gnbNavItemLink: {
    display: 'flex',
    gap: '8px',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'unset',
    fontSize: '12px',
    fontWeight: '500',
    lineHeight: '1',
    color: `var(--Gray-10)`,
  },
  gnbNavItem: {
    padding: '0 11px',
    display: 'flex',
    flex: 1,
    flexShrink: 0,
  },
  gnbNavItemActive: {
    fontWeight: '500',
    color: `var(--Blue-900)`,
  },
});
