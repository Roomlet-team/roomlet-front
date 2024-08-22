import React from 'react';
import stylex from '@stylexjs/stylex';
import { Typography } from '../../../public/styles/vars.stylex';
import MainLayout from '@src/layouts/MainLayout';

const MeetingDetails = () => {
  return (
    <MainLayout>
      {/* 회의 정보 */}
      <div>
        <div>디자인</div>
        <div>
          <h1 {...stylex.props(Typography.TextLargeBold)}>사용성 관련 기획 회의</h1>
          <button type="button">더보기</button>
        </div>
        <div>
          <ul>
            <li>
              <div>장소</div>
              <div>C 회의실</div>
            </li>
            <li>
              <div>날짜/시간</div>
              <div>2024-03-06 10:00 ~ 11:00</div>
            </li>
            <li>
              <div>참여자</div>
              <div>
                <div>기획팀</div>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <div>상세내용</div>
          <div>홍길동 인턴: 당뇨 관리앱 분석 조사 발표</div>
        </div>
      </div>

      {/* 댓글 */}
      <div>댓글</div>
    </MainLayout>
  );
};

export default MeetingDetails;
