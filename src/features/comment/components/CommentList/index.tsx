import React from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProfileImg from '@src/components/ui/ProfileImg';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import useGetWorkspaceCongressCommentQuery from '../../queries/useGetWorkspaceCongressCommentQuery';
import { useRouter } from 'next/router';

// fromNow를 사용하기 위해 플러그인 사용
dayjs.extend(relativeTime);

const CommentList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetWorkspaceCongressCommentQuery({ page: 1, perPage: 5, cgsid: Number(id) });

  return (
    <div {...stylex.props(Styles.container)}>
      <p {...stylex.props(Styles.title)}>댓글</p>

      {/* 댓글 리스트 */}
      <ul {...stylex.props(Styles.commentList)}>
        {data?.commentList.map((item) => (
          <li key={item.CommentId}>
            <div {...stylex.props(Styles.profileAndCommentInfoContainer)}>
              {/* 프로필 이미지 */}
              <ProfileImg src={item.member.profileImgUrl} size={32} />

              <div {...stylex.props(Styles.commentInfoContainer)}>
                {/* 닉네임 및 작성일 */}
                <div {...stylex.props(Styles.nicknameAndDateContainer)}>
                  {/* 닉네임 */}
                  <span {...stylex.props(Styles.nickname)}>{item.member.displayName}</span>

                  {/* 작성일 */}
                  <span {...stylex.props(Styles.date)}>{dayjs(item.createdAt).fromNow()}</span>
                </div>

                {/* 내용 */}
                <pre {...stylex.props(Styles.content)}>{item.content}</pre>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;

const Styles = stylex.create({
  container: {
    // marginBottom: '104px',
    padding: '24px 16px 104px 16px',
  },
  title: {
    marginBottom: '24px',
    fontSize: '1.6rem',
    fontWeight: '600',
    color: colors.gray60,
    lineHeight: '2rem',
  },
  commentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  profileAndCommentInfoContainer: {
    display: 'flex',
    gap: '8px',
  },
  commentInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  nicknameAndDateContainer: {
    marginBottom: '4px',
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
  },
  nickname: {
    fontSize: '1.6rem',
    fontWeight: '700',
    color: colors.black300,
    lineHeight: 'normal',
  },
  date: {
    fontSize: '1.2rem',
    fontWeight: '400',
    color: colors.gray50,
    lineHeight: 'normal',
  },
  content: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: '500',
    color: '#333',
    whiteSpace: 'normal', // 글이 끊김없이 표현될 경우에 사용
    wordBreak: 'break-all',
  },
});
