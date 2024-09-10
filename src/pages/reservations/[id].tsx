import React from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../public/styles/vars.stylex';
import MainLayout from '@src/layouts/MainLayout';
import EllipsisOutlined from '@src/components/icons/EllipsisOutlined';

const MeetingDetails = () => {
  return (
    <MainLayout>
      {/* 회의 정보 */}
      <div>
        {/* 카테고리 태그 및 회의 제목 */}
        <div {...stylex.props(Styles.categoryAndTitleContainer)}>
          <div {...stylex.props(Styles.categoryTag)}>디자인</div>
          <div {...stylex.props(Styles.TitleAndShowMoreContainer)}>
            <h1 {...stylex.props(Typography.TextLargeBold)}>사용성 관련 기획 회의</h1>
            <button type="button">
              <EllipsisOutlined width="24" heigh="24" />
            </button>
          </div>
        </div>

        {/* 회의실 정보 */}
        <div>
          <ul>
            <li>
              <div {...stylex.props(Typography.SubTextRegularSemiBold)}>장소</div>
              <div>C 회의실</div>
            </li>
            <li>
              <div>날짜/시간</div>
              <div>2024-03-06 10:00 ~ 11:00</div>
            </li>
            <li>
              <div>참여자</div>
              <div>
                <div>기획팀</div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div>상세내용</div>
          <div>홍길동 인턴: 당뇨 관리앱 분석 조사 발표</div>
        </div>
      </div>

      {/* 댓글 */}
      <div>댓글</div>
    </MainLayout>
  );
};

export default MeetingDetails;

const Styles = stylex.create({
  categoryAndTitleContainer: {
    padding: '16px',
  },
  categoryTag: {
    width: 'fit-content',
    padding: '4px 8px',
    marginBottom: '12px',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    color: colors.white500,
    background: colors.red300,
  },
  TitleAndShowMoreContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
