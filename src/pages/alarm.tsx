import Header from '@src/components/ui/Header';
import AlarmCategoryList from '@src/features/alarm/components/AlarmCategoryList';
import AlarmList from '@src/features/alarm/components/AlarmList';
import { AlarmCategoryProvider } from '@src/features/alarm/contexts/AlarmCategoryContext';
import usePatchNotificationsQuery from '@src/features/alarm/queries/usePatchNotificationsQuery';
import MainLayout from '@src/layouts/MainLayout';
import React, { useState } from 'react';

const Alarm = () => {
  const { mutate: patchNotifications } = usePatchNotificationsQuery();

  const readAllBtnProps = {
    name: '모두 읽기',
    isActive: true,
    onClick: () => patchNotifications({ isReadAll: true }),
  };

  // 컨텍스트로 알림 카테고리 관리하기
  return (
    <MainLayout isScroll>
      <Header title="알림" rightBtnInfo={readAllBtnProps} />
      <AlarmCategoryProvider>
        {/* 알림 카테고리 */}
        <AlarmCategoryList />

        {/* 알림 리스트 */}
        <AlarmList />
      </AlarmCategoryProvider>
    </MainLayout>
  );
};

export default Alarm;
