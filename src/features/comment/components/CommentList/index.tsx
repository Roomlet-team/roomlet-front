import React from 'react';
import stylex from '@stylexjs/stylex';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ProfileImg from '@src/components/ui/ProfileImg';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import useGetWorkspaceCongressCommentQuery, {
  CommentListItem,
} from '../../queries/useGetWorkspaceCongressCommentQuery';
import { useRouter } from 'next/router';
import Dropdown from '@src/components/ui/Dropdown';
import PencilOutlined from '@src/components/icons/PencilOutlined';
import TrashcanOutlined from '@src/components/icons/TrashcanOutlined';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import CommentEditModal from '../CommentEditModal';
import useDeleteCongressCommentQuery from '../../queries/useDeleteCongressCommentQuery';
import { confirm } from '@src/components/ui/Modal/confirm';
import Link from 'next/link';

// fromNow를 사용하기 위해 플러그인 사용
dayjs.extend(relativeTime);

const CommentList = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetWorkspaceCongressCommentQuery({ page: 1, perPage: 5, cgsid: Number(id) });
  const mutation = useDeleteCongressCommentQuery();
  const { renderModal } = useRenderModal();

  const getMenuList = (item: CommentListItem) => {
    return [
      {
        id: '1',
        label: '수정하기',
        icon: <PencilOutlined width={16} height={16} />,
        onClick: () => {
          renderModal(CommentEditModal, {
            data: item,
          });
        },
      },
      {
        id: '2',
        label: '삭제하기',
        icon: <TrashcanOutlined width={16} height={16} />,
        onClick: () => {
          confirm({
            content: '댓글을 삭제하시겠어요? \n삭제한 댓글은 복구가 불가능해요.',
            cancelBtnName: '취소',
            okBtnName: '확인',
            onOk: () => mutation.mutate({ CommentId: item.CommentId }),
          });
        },
      },
    ];
  };

  return (
    <div {...stylex.props(Styles.container)}>
      <p {...stylex.props(Styles.title)}>댓글</p>

      {/* 댓글 리스트 */}
      <ul {...stylex.props(Styles.commentList)}>
        {data?.commentList.map((item) => (
          <li key={item.CommentId}>
            <div {...stylex.props(Styles.profileAndCommentInfoContainer)}>
              {/* 프로필 이미지 */}
              <Link href={`/profile/${item.member.MemberId}`}>
                <ProfileImg src={item.member.profileImgKey} size={32} />
              </Link>

              <div {...stylex.props(Styles.commentInfoContainer)}>
                {/* 작성자 정보 및 드롭다운 */}
                <div {...stylex.props(Styles.authorAndDropdownContainer)}>
                  {/* 닉네임 및 작성일 */}
                  <div {...stylex.props(Styles.nicknameAndDateContainer)}>
                    {/* 닉네임 */}
                    <Link href={`/profile/${item.member.MemberId}`} {...stylex.props(Styles.nicknameLink)}>
                      <span {...stylex.props(Styles.nickname)}>{item.member.displayName}</span>
                    </Link>

                    {/* 작성일 */}
                    <span {...stylex.props(Styles.date)}>{dayjs(item.createdAt).fromNow()}</span>
                  </div>

                  {/* 수정하기 / 삭제하기 */}
                  {/* [ ] 본인 댓글에만 드롭박스가 나타나게 수정 필요 */}
                  <Dropdown menuList={getMenuList(item)} />
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
    width: '100%',
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
    flexShrink: 0,
  },
  content: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: '500',
    color: '#333',
    whiteSpace: 'normal', // 글이 끊김없이 표현될 경우에 사용
    wordBreak: 'break-all',
  },
  authorAndDropdownContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nicknameLink: {
    width: '100%',
    textDecoration: 'none',
  },
});
