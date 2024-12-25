import React, { FC, useEffect } from 'react';
import stylex from '@stylexjs/stylex';
import { colors } from '../../public/styles/vars.stylex';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { workspaceExists } from '@src/slices/workspace';
import useGetWorkspaceListQuery from '@src/queries/workspace/useGetWorkspaceListQuery';

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  isScroll?: boolean; // 전체 화면에 스크롤이 적용되게 할지 말지 결정
  backgroundColor?: string;
  children: React.ReactElement | React.ReactElement[] | string;
}

const MainLayout: FC<MainLayoutProps> = (props) => {
  const { isScroll, backgroundColor, children } = props;
  const modal = useSelector((state: RootState) => state.modal);
  const { data } = useGetWorkspaceListQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    // 워크스페이스 존재 여부 체크
    dispatch(workspaceExists(!!data?.workspaceCount));
  }, []);

  return (
    <div id="main-layout" {...stylex.props(Styles.container(isScroll, backgroundColor))}>
      {children}
      {modal && <div {...stylex.props(Styles.modalWrapper)}>{modal}</div>}
    </div>
  );
};

export default MainLayout;

const Styles = stylex.create({
  container: (isScroll: boolean, backgroundColor: string) => ({
    width: '100%',
    height: '100%',
    margin: '0 auto',
    maxWidth: '767px',
    position: 'relative',
    overflowY: isScroll ? 'auto' : 'hidden',
    background: backgroundColor || colors.white500,
  }),
  modalWrapper: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100vh',
  },
});
