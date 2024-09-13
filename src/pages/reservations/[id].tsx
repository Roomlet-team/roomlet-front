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
              <EllipsisOutlined width="24" height="24" />
            </button>
          </div>
        </div>

        {/* 회의실 정보 */}
        <div {...stylex.props(Styles.InfoContainer)}>
          <ul {...stylex.props(Styles.List)}>
            <li {...stylex.props(Styles.horizonItem)}>
              <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>장소</div>
              <div {...stylex.props(Typography.TextSmallRegular)}>C 회의실</div>
            </li>
            <li {...stylex.props(Styles.horizonItem)}>
              <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>날짜/시간</div>
              <div {...stylex.props(Typography.TextSmallRegular)}>2024-03-06 10:00 ~ 11:00</div>
            </li>
            <li {...stylex.props(Styles.horizonItem)}>
              <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>참여자</div>
              <div>
                <div>기획팀</div>
              </div>
            </li>
            <li {...stylex.props(Styles.verticalItem)}>
              <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>상세내용</div>
              <pre {...stylex.props(Styles.ContentWrapper)}>홍길동 인턴: 당뇨 관리앱 분석 조사 발표</pre>
            </li>
          </ul>
        </div>
      </div>

      {/* 경계선 */}
      <div {...stylex.props(Styles.borderLine)} />

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
  InfoContainer: {
    padding: '16px 16px 24px',
  },
  List: {
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
  },
  CommonItem: {
    width: '70px',
    color: colors.gray60,
  },
  horizonItem: {
    display: 'flex',
    gap: '16px',
  },
  verticalItem: {
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ContentWrapper: {
    margin: 0,
    padding: '12px',
    minHeight: '120px',
    borderRadius: '16px',
    background: colors.gray20,
    fontSize: '1.4rem',
    color: colors.black300,
  },
  borderLine: {
    width: '100%',
    height: '8px',
    background: '#F2F2F2',
    borderTop: colors.gray30,
  },
});