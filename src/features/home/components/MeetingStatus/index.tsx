import React from 'react';
import stylex from '@stylexjs/stylex';

/**
 * 나의 회의 및 전체 회의 상태를 나타내는 컴포넌트
 */
const MeetingStatus = () => {
  const myMeetingImgUrl = 'https://roomlet-front.s3.ap-northeast-2.amazonaws.com/public/images/home/my.png';
  const allMeetingImgUrl = 'https://roomlet-front.s3.ap-northeast-2.amazonaws.com/public/images/home/all.png';

  return (
    <div {...stylex.props(Styles.container)}>
      <div {...stylex.props(Styles.content)}>
        <img {...stylex.props(Styles.img)} src={myMeetingImgUrl} alt="나의 회의" />
        <div {...stylex.props(Styles.textContent)}>
          <p {...stylex.props(Styles.titleText)}>나의 회의</p>
          <p {...stylex.props(Styles.countText('var(--Red-600)'))}>3</p>
        </div>
      </div>
      <div {...stylex.props(Styles.content)}>
        <img {...stylex.props(Styles.img)} src={allMeetingImgUrl} alt="전체 회의" />
        <div {...stylex.props(Styles.textContent)}>
          <p {...stylex.props(Styles.titleText)}>전체 회의</p>
          <p {...stylex.props(Styles.countText('#444444'))}>3</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingStatus;

const Styles = stylex.create({
  container: {
    width: '100%',
    display: 'flex',
    gap: '16px',
  },
  content: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    gap: '12px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 24px 0 rgba(44, 42, 61, 0.08)',
  },
  img: {
    width: '56px',
    height: '56px',
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  titleText: {
    fontSize: '1.4rem',
    fontWeight: '400',
    lineHeight: '2rem',
    color: '#999999',
  },
  countText: (color) => ({
    fontSize: '2.8rem',
    fontWeight: '700',
    lineHeight: '3.4rem',
    color: color,
    textAlign: 'center',
  }),
});
