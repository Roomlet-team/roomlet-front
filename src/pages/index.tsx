import React from 'react';
import GnbNavLayout from '@src/layouts/GnbNavLayout';
import UserGreeting from '@src/features/home/components/UserGreeting';

const Home = () => {
  console.log('');

  return (
    <GnbNavLayout backgroundColor="#FAFAFA">
      {/* 프로필 섹션 */}
      <UserGreeting />
      {/* 회의 현황 섹션 */}
      {/* 타임 라인 섹션 */}
    </GnbNavLayout>
  );
};

export default Home;
