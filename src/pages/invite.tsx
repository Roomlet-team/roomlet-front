import MainLayout from '@src/layouts/MainLayout';
import React from 'react';

const Invite = () => {
  return (
    <MainLayout>
      <section>
        <img href="" alt="로고 이름" />
      </section>
      <section>
        <img href="" alt="편지 이미지" />
        <div>
          ~님이 초대했어요.
          <br />
          룸렛에서 [워크스페이스] 회의를 <br />
          함께 준비해보세요.
        </div>
      </section>
      <section>
        <input type="text" placeholder="사용하실 닉네임을 입력해주세요." />
        <button type="button">참가하기</button>
      </section>
    </MainLayout>
  );
};

export default Invite;
