import React, { useState } from 'react';
import stylex from '@stylexjs/stylex';
import Switch from 'react-switch';
import ProfileImg from '@src/components/ui/ProfileImg';

const ReservationList = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const handleChangeLastMeetingHidden = () => {
    setIsHidden(!isHidden);
  };

  return (
    <section {...stylex.props(Styles.wrapper)}>
      <h1 {...stylex.props(Styles.dateTitle)}>2월 5일 월요일</h1>
      <p {...stylex.props(Styles.totalCountText)}>
        총 <span {...stylex.props(Styles.totalCountTextEmphasis)}>6</span>건의 회의가 있어요
      </p>
      <div {...stylex.props(Styles.hidePastMeetingToggleContent)}>
        <span>지난 회의 숨기기</span>
        <Switch
          onChange={handleChangeLastMeetingHidden}
          checked={isHidden}
          offColor="#D9D9D9"
          onColor="#242c33"
          uncheckedIcon={false}
          checkedIcon={false}
          borderRadius={13}
          width={34}
          height={20}
          handleDiameter={16}
          activeBoxShadow={null}
        />
      </div>
      <div {...stylex.props(Styles.meetingListContent)}>
        <div {...stylex.props(Styles.meetingContent, isHidden && Styles.meetingContentHidden)}>
          <div {...stylex.props(Styles.detailContent)}>
            <div {...stylex.props(Styles.infoContent)}>
              <p {...stylex.props(Styles.titleText)}>룸렛 회의</p>
              <p {...stylex.props(Styles.timeText)}>9시 ~ 10시</p>
              <p {...stylex.props(Styles.placeText)}>대회의실</p>
              <div {...stylex.props(Styles.profileListContent)}>
                <span>
                  <ProfileImg
                    src={null}
                    size={34}
                    borderProperties={{ color: '#D9D9D9', width: '1px', radius: '50%' }}
                  />
                </span>
                <span {...stylex.props(Styles.profileContent)}>
                  <ProfileImg
                    src={null}
                    size={34}
                    borderProperties={{ color: '#D9D9D9', width: '1px', radius: '50%' }}
                  />
                </span>
                <span {...stylex.props(Styles.profileContent)}>
                  <ProfileImg
                    src={null}
                    size={34}
                    borderProperties={{ color: '#D9D9D9', width: '1px', radius: '50%' }}
                  />
                </span>
              </div>
            </div>
            <div {...stylex.props(Styles.categoryTag)}>기획</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationList;

const Styles = stylex.create({
  wrapper: {
    height: 'calc(100vh - 77px)',
    padding: '16px',
    overflowY: 'auto',
  },
  dateTitle: {
    marginBottom: '16px',
    paddingBottom: '16px',
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: '2.6rem',
    color: '#333333',
  },
  totalCountText: {
    fontSize: '1.8rem',
    lineHeight: '2.6rem',
    fontWeight: 600,
    color: '#333333',
  },
  totalCountTextEmphasis: {
    color: 'var(--Red-300)',
  },
  hidePastMeetingToggleContent: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'center',
    gap: '8px',
    fontSize: '1.4rem',
    lineHeight: '2rem',
    fontWeight: 500,
    color: '#818181',
  },
  meetingListContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  meetingContentHidden: {
    opacity: 0.6,
  },
  meetingContent: {
    padding: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'var(--Base-White)',
    borderLeft: '2px solid var(--Blue-300)',
    borderRadius: '0 16px 16px 0',
    boxShadow: '0 4px 24px 0 rgba(44, 42, 61, 0.08)',
  },
  detailContent: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  infoContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  titleText: {
    fontSize: '1.7rem',
    fontWeight: 700,
    lineHeight: '2.4rem',
    color: '#61686D',
  },
  timeText: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: '1.4rem',
    color: '#D56231',
  },
  placeText: {
    fontSize: '1.4rem',
    fontWeight: 500,
    lineHeight: '1.4rem',
    color: '#BBBBBB',
  },
  categoryTag: {
    display: 'flex',
    alignSelf: 'flex-start',
    padding: '4px 8px',
    backgroundColor: 'var(--Blue-300)',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    lineHeight: '100%',
    color: 'var(--Base-White)',
  },
  profileListContent: {
    marginTop: '8px',
    display: 'flex',
  },
  profileContent: {
    marginInlineStart: '-8px',
  },
});
