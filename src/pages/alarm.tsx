import Header from '@src/components/ui/Header';
import AlarmCategoryList from '@src/features/alarm/components/AlarmCategoryList';
import AlarmList from '@src/features/alarm/components/AlarmList';
import MainLayout from '@src/layouts/MainLayout';
import React, { useState } from 'react';

const Alarm = () => {
  const [isReadAll, setIsReadAll] = useState<boolean>(false);

  const readAllBtnProps = {
    name: '모두 읽기',
    isActive: true,
    onClick: () => console.log(''),
  };

  // 컨텍스트로 알림 카테고리 관리하기
  return (
    <MainLayout>
      <Header title="알림" prevUrl="/" rightBtnInfo={readAllBtnProps} />

      {/* 알림 카테고리 */}
      <AlarmCategoryList />

      {/* 알림 리스트 */}
      <AlarmList />
    </MainLayout>
  );
};

export default Alarm;
