import React from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../public/styles/vars.stylex';
import MainLayout from '@src/layouts/MainLayout';
// import CommentTextarea from '@src/features/comment/components/CommentTextarea';
// import CommentList from '@src/features/comment/components/CommentList';
// import ReservationInfo from '@src/features/reservation/components/ReservationInfo';
import Header from '@src/components/ui/Header';
import dynamic from 'next/dynamic';

const CommentList = dynamic(() => import('@src/features/comment/components/CommentList'), {
  ssr: false,
});
const CommentTextarea = dynamic(() => import('@src/features/comment/components/CommentTextarea'), {
  ssr: false,
});
const ReservationInfo = dynamic(() => import('@src/features/reservation/components/ReservationInfo'), {
  ssr: false,
});

const MeetingDetails = () => {
  return (
    <MainLayout isScroll>
      {/* 직전 페이지로 이동할 수 잇게 구현하기 */}
      <Header prevUrl="/calendar" />
      <ReservationInfo />

      {/* 경계선 */}
      <div {...stylex.props(Styles.borderLine)} />

      {/* 댓글 */}
      <div>
        {/* 댓글 리스트 */}
        <CommentList />
      </div>

      {/* 댓글 작성 */}
      <CommentTextarea />
    </MainLayout>
  );
};

export default MeetingDetails;

const Styles = stylex.create({
  borderLine: {
    width: '100%',
    height: '8px',
    background: '#F2F2F2',
    borderTop: colors.gray30,
  },
});
