import React, { FC, useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';
import Toggle from '@src/components/ui/Toggle';
import { Typography, colors } from '../.././../../../public/styles/vars.stylex';
import { confirm } from '@src/components/ui/Modal/confirm';
import usePatchWorkspaceMypageSettingsAlarmsQuery from '@src/features/alarm/queries/usePatchWorkspaceMypageSettingsAlarmsQuery';

type MyPageAlarmToggleProps = {
  key: string | number;
  label: string;
  caption: string;
  value: boolean;
};

const MyPageAlarmToggle: FC<MyPageAlarmToggleProps> = (props) => {
  const { label, caption, value } = props;
  const [isInviteMeeting, setIsInviteMeeting] = useState<boolean>(false);
  const { mutate: patchWorkspaceMypageSettingsAlarmsMutate } = usePatchWorkspaceMypageSettingsAlarmsQuery();

  const handleChangeAlarm = (e) => {
    const { checked } = e.target;

    if (isInviteMeeting) {
      confirm({
        content: '중요한 알림을 놓칠 수 있어요.\n그래도 괜찮으신가요?',
        onOk: () => {
          setIsInviteMeeting(checked);
          patchWorkspaceMypageSettingsAlarmsMutate({ isAlarm: checked });
        },
        okBtnName: '그만 받을래요',
        cancelBtnName: '계속 받을래요',
      });
    } else {
      setIsInviteMeeting(checked);
      patchWorkspaceMypageSettingsAlarmsMutate({ isAlarm: checked });
    }
  };

  useEffect(() => {
    if (value) {
      setIsInviteMeeting(value);
    }
  }, [value]);

  return (
    <div {...stylex.props(Styles.Container)}>
      <div>
        <p {...stylex.props(Typography.TextSmallMedium, Styles.Label)}>{label}</p>
        <p {...stylex.props(Typography.CaptionLargeRegular, Styles.Caption)}>{caption}</p>
      </div>
      <Toggle onChange={handleChangeAlarm} checked={isInviteMeeting} />
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
