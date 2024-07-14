import Header from '@src/components/ui/Header';
import Toggle from '@src/components/ui/Toggle';
import MyPageAlarmToggle from '@src/features/mypage/compontents/MyPageAlarmToggle';
import MainLayout from '@src/layouts/MainLayout';
import React, { useState } from 'react';

const MyPageAlarmSetting = () => {
  const toggleList = [
    {
      id: 1,
      label: '회의 초대',
      caption: '새로운 회의에 초대되면 알려드려요.',
      apiUrl: '',
    },
    {
      id: 2,
      label: '회의 변경',
      caption: '참여중인 회의에 변경사항이 있을 때 알려드려요.',
      apiUrl: '',
    },
    {
      id: 3,
      label: '회의 리마인드',
      caption: '회의 시간이 다가오면 30분 전에 다시 한 번 알려드려요.',
      apiUrl: '',
    },
  ];

  return (
    <MainLayout>
      <Header title="알림 수신 설정" prevUrl="/mypage" />

      <section>
        {toggleList.map((item) => (
          <MyPageAlarmToggle key={item.id} label={item.label} caption={item.caption} apiUrl={item.apiUrl} />
        ))}
      </section>
    </MainLayout>
  );
};

export default MyPageAlarmSetting;
