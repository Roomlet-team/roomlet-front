import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import { CongressRoomInfoItem } from '@src/queries/congress/useGetCongressRoomListQuery';

interface CongressRoomCardProps {
  data: CongressRoomInfoItem;
}

/**
 *  회의실 정보에서 보여줄 회의실 카드 컴포넌트
 */
const CongressRoomCard: FC<CongressRoomCardProps> = (props) => {
  const { data } = props;
  const meetingRoomCubeImgUrl = `${process.env.NEXT_PUBLIC_S3_URL}/public/images/mypage/meeting-room-cube.png`;

  return (
    <div {...stylex.props(Styles.Container)}>
      <img src={meetingRoomCubeImgUrl} width={24} height={24} />
      <div {...stylex.props(Styles.InfoContainer)}>
        <p {...stylex.props(Typography.TextSmallMedium)}>{data?.roomName}</p>
        <p {...stylex.props(Typography.SubTextLargeMedium)}>{data?.roomDescription}</p>
      </div>
    </div>
  );
};

export default CongressRoomCard;

const Styles = stylex.create({
  Container: {
    padding: '16px',
    display: 'flex',
    gap: '12px',
    border: `1px solid ${colors.gray20}`,
    borderRadius: '16px',
    background: colors.white500,
  },
  InfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
});
