import React, { FC } from 'react';
import stylex from '@stylexjs/stylex';
import { Typography, colors } from '../../../../../public/styles/vars.stylex';
import RemoveUserOutlined from '@src/components/icons/RemoveUserOutlined';
import { confirm } from '@src/components/ui/Modal/confirm';
import useGetWorkspaceMemberQuery from '../../queries/useGetWorkspaceMemberQuery';
import AlertModal from '@src/components/ui/Modal/alert';
import useRenderModal from '@src/hooks/ui/useRenderModal';
import { hideModal } from '@src/slices/modal';
import { useDispatch } from 'react-redux';

type ProfilePersonalDataListProps = {
  dataList: { id: number; name: string; icon: React.JSX.Element }[];
  title?: string;
  isPublicProfile?: boolean;
  memberId?: number;
  isMyProfile?: boolean;
  isAdmin?: boolean;
};

const ProfilePersonalDataList: FC<ProfilePersonalDataListProps> = (props) => {
  const { dataList, isPublicProfile, title, memberId, isMyProfile, isAdmin } = props;
  const { renderModal } = useRenderModal();
  const dispatch = useDispatch();

  const handleClickRemoveUser = () => {
    if (isMyProfile) {
      return renderModal(AlertModal, {
        content: '자기 자신은 내보낼 수 없습니다.',
        onOk: () => dispatch(hideModal()),
      });
    }

    confirm({
      content: '내보내면 더이상 회의록을 공유할 수 없어요.\n그래도 괜찮으신가요?',
      onOk: () => {
        console.log('내보내기');
      },
      okBtnName: '내보낼게요',
      cancelBtnName: '같이할래요',
    });
  };

  return (
    <div>
      <p {...stylex.props(Styles.Title, Typography.SubTextLargeSemiBold)}>{title}</p>

      <ul {...stylex.props(Styles.List)}>
        {dataList.map((item) => (
          <li key={item.id} {...stylex.props(Styles.Item)}>
            <span>{item.icon}</span>
            <span {...stylex.props(Typography.TextSmallMedium)}>{item.name}</span>
          </li>
        ))}

        {/* 내보내기 */}
        {isPublicProfile && isAdmin && (
          <li {...stylex.props(Styles.Item)}>
            <span>
              <RemoveUserOutlined width={24} height={24} />
            </span>
            <button type="button" onClick={handleClickRemoveUser} {...stylex.props(Typography.TextSmallMedium)}>
              내보내기
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ProfilePersonalDataList;

const Styles = stylex.create({
  Title: {
    margin: '16px 16px 8px',
    color: colors.gray60,
  },
  List: {
    listStyle: 'none',
    flexDirection: 'column',
  },
  Item: {
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  MenuLink: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    textDecoration: 'none',
    color: colors.black400,
  },
});
