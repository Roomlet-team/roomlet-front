import React from 'react';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import ProfileImg from '@src/components/ui/ProfileImg';
import useGetWorkspaceCongressQuery from '../../queries/useGetWorkspaceCongressQuery';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Dropdown from '@src/components/ui/Dropdown';
import PencilOutlined from '@src/components/icons/PencilOutlined';
import TrashcanOutlined from '@src/components/icons/TrashcanOutlined';
import { confirm } from '@src/components/ui/Modal/confirm';
import useDeleteCongressQuery from '../../queries/useDeleteCongressQuery';

const ReservationInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetWorkspaceCongressQuery({ cgsid: Number(id) });
  const mutation = useDeleteCongressQuery();

  const dropdownMenuList = [
    {
      id: '1',
      label: '수정하기',
      icon: <PencilOutlined width={16} height={16} />,
      onClick: () => {
        router.push(`/booking?id=${id}&mode=edit`);
      },
    },
    {
      id: '2',
      label: '삭제하기',
      icon: <TrashcanOutlined width={16} height={16} />,
      onClick: () => {
        confirm({
          content: '삭제하기 진행시 기록한 회의 내용을\n다시 확인할 수 없어요. 삭제를 진행할까요?',
          cancelBtnName: '취소',
          okBtnName: '확인',
          onOk: () => mutation.mutate({ cgsid: Number(id) }),
        });
      },
    },
  ];

  return (
    <div>
      {/* 카테고리 태그 및 회의 제목 */}
      <div {...stylex.props(Styles.categoryAndTitleContainer)}>
        <div {...stylex.props(Styles.categoryTag(data?.congress.congressCategory.hexcode))}>
          {data?.congress.congressCategory.categoryName}
        </div>
        <div {...stylex.props(Styles.TitleAndShowMoreContainer)}>
          <h1 {...stylex.props(Typography.TextLargeBold)}>{data?.congress.congressTitle}</h1>

          {data?.congress.isOrganizer && <Dropdown menuList={dropdownMenuList} />}
        </div>
      </div>

      {/* 회의실 정보 */}
      <div {...stylex.props(Styles.InfoContainer)}>
        <ul {...stylex.props(Styles.List)}>
          <li {...stylex.props(Styles.horizonItem)}>
            <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>장소</div>
            <div {...stylex.props(Typography.TextSmallRegular)}>{data?.congress.congressRoom.roomName}</div>
          </li>
          <li {...stylex.props(Styles.horizonItem)}>
            <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>날짜/시간</div>
            <div {...stylex.props(Typography.TextSmallRegular)}>
              {dayjs(data?.congress.startDt).format('YY-MM-DD HH:mm')} ~ {dayjs(data?.congress.endDt).format('HH:mm')}
            </div>
          </li>
          <li {...stylex.props(Styles.horizonItem)}>
            <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>참여자</div>

            {/* 팀목록 */}
            <div {...stylex.props(Styles.TeamListContainer)}>
              {data?.congress.attendTeamList.map((teamItem) => (
                <div {...stylex.props(Styles.TeamContainer)}>
                  <p {...stylex.props(Styles.TeamName)}>{teamItem.teamName}</p>
                  <div {...stylex.props(Styles.MemberListContainer)}>
                    {teamItem.memberList.map((memberItem) => (
                      <Link
                        href={`/profile/${memberItem.MemberId}`}
                        key={memberItem.MemberId}
                        {...stylex.props(Styles.memberLink)}
                      >
                        <div {...stylex.props(Styles.MemberInfoContainer)}>
                          <ProfileImg size={20} src={memberItem.profileImgUrl} />
                          <span {...stylex.props(Typography.TagLargeMedium)}>{memberItem.displayName}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </li>
          <li {...stylex.props(Styles.verticalItem)}>
            <div {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.CommonItem)}>상세내용</div>
            <pre {...stylex.props(Styles.ContentWrapper)}>{data?.congress.congressDescription}</pre>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReservationInfo;

const Styles = stylex.create({
  TeamListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  TeamContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
  },
  MemberListContainer: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  MemberInfoContainer: {
    display: 'flex',
    gap: '4px',
    alignContent: 'center',
    color: colors.black400,
  },
  TeamName: {
    width: '56px',
    fontWeight: 400,
    fontSize: '1.6rem',
    lineHeight: '2.4rem',
  },
  categoryAndTitleContainer: {
    padding: '16px',
  },
  categoryTag: (hexcode) => ({
    width: 'fit-content',
    padding: '4px 8px',
    marginBottom: '12px',
    borderRadius: '20px',
    fontSize: '1.2rem',
    fontWeight: 500,
    color: colors.white500,
    background: hexcode,
  }),
  TitleAndShowMoreContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  InfoContainer: {
    padding: '16px 16px 24px',
  },
  List: {
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
  },
  CommonItem: {
    width: '70px',
    color: colors.gray60,
  },
  horizonItem: {
    display: 'flex',
    gap: '16px',
  },
  verticalItem: {
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ContentWrapper: {
    margin: 0,
    padding: '12px',
    minHeight: '120px',
    borderRadius: '16px',
    background: colors.gray20,
    fontSize: '1.4rem',
    color: colors.black300,
  },
  memberLink: {
    width: '100%',
    textDecoration: 'none',
  },
});
