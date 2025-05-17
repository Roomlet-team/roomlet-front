import React from 'react';
import Header from '@src/components/ui/Header';
import Toggle from '@src/components/ui/Toggle';
import useGetWorkspaceMypageSettingsAlarmsQuery from '@src/features/alarm/queries/useGetWorkspaceMypageSettingsAlarmsQuery';
import MyPageAlarmToggle from '@src/features/mypage/compontents/MyPageAlarmToggle';
import MainLayout from '@src/layouts/MainLayout';

const MyPageAlarmSetting = () => {
  const { data } = useGetWorkspaceMypageSettingsAlarmsQuery();
  const toggleList = [
    {
      id: 1,
      label: '회의 알림',
      caption: '회의 리마인드, 초대, 변경 사항이 있을 때 알려드려요.',
      value: data?.alarmInfo.isAlarm,
    },
  ];

  return (
    <MainLayout>
      <Header title="알림 수신 설정" prevUrl="/mypage" />

      <section>
        {toggleList.map((item) => (
          <MyPageAlarmToggle key={item.id} label={item.label} caption={item.caption} value={item.value} />
        ))}
      </section>
    </MainLayout>
  );
};

export default MyPageAlarmSetting;
