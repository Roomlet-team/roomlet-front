import React, { FC, useState } from 'react';
import stylex from '@stylexjs/stylex';
import Toggle from '@src/components/ui/Toggle';
import { Typography, colors } from '../.././../../../public/styles/vars.stylex';

type MyPageAlarmToggleProps = {
  key: string | number;
  label: string;
  caption: string;
  apiUrl: string;
};

const MyPageAlarmToggle: FC<MyPageAlarmToggleProps> = (props) => {
  const { label, caption, apiUrl } = props;
  const [isInviteMeeting, setIsInviteMeeting] = useState<boolean>(false);

  const handleChangeAlarm = (e) => {
    setIsInviteMeeting(e.target.checked);
  };

  return (
    <div {...stylex.props(Styles.Container)}>
      <div>
        <p {...stylex.props(Typography.TextSmallMedium, Styles.Label)}>{label}</p>
        <p {...stylex.props(Typography.CaptionLargeRegular, Styles.Caption)}>{caption}</p>
      </div>
      <Toggle onChange={handleChangeAlarm} />
    </div>
  );
};

export default MyPageAlarmToggle;

const Styles = stylex.create({
  Container: {
    width: '100%',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Label: {
    color: colors.black400,
    marginBottom: '4px',
  },
  Caption: {
    color: colors.gray60,
  },
});
