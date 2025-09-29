import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import BottomSheet from '@src/components/ui/BottomSheet';
import { hideModal } from '@src/slices/modal';
import stylex from '@stylexjs/stylex';
import { colors, Typography } from '../../../../../public/styles/vars.stylex';
import useGetCongressRoomListQuery from '@src/queries/congress/useGetCongressRoomListQuery';
import useGetCategoryListQuery from '@src/queries/category/useGetCategoryListQuery';
import Radio from '@src/components/ui/Radio';

const MEETING_TYPE: { id: string; label: string; value: 0 | 1 }[] = [
  {
    id: '1',
    label: '전체 회의',
    value: 0,
  },
  {
    id: '2',
    label: '나의 회의',
    value: 1,
  },
];

let bottomSheetId = 'reservation-filter-bottom-sheet';

const ReservationFilter = () => {
  const router = useRouter();
  const { my: queryMy, roomIds: queryRoomIds, cc: queryCc } = router.query;
  const dispatch = useDispatch();
  const { data: congressRoomData } = useGetCongressRoomListQuery();
  const { data: congressCategoryData } = useGetCategoryListQuery();
  const [isOnlyMy, setIsOnlyMy] = useState<boolean>(false);
  const [selectedRoomIdList, setSelectedRoomIdList] = useState<number[] | null>([]);
  const [selectedCategoryIdList, setSelectedCategoryIdList] = useState<number[] | null>([]);

  const handleChangeMeetingType = (value: 0 | 1) => {
    setIsOnlyMy(value === 1);
  };

  const handleChangeMeetingRoom = (value: number) => {
    if (selectedRoomIdList.includes(value)) {
      setSelectedRoomIdList((prevState) => prevState.filter((item) => item !== value));
    } else if (value === 0) {
      setSelectedRoomIdList([]);
    } else {
      setSelectedRoomIdList((prevState) => [value]);
    }
  };

  const handleChangeCategory = (value: number) => {
    if (selectedCategoryIdList.includes(value)) {
      setSelectedCategoryIdList((prevState) => prevState.filter((item) => item !== value));
    } else if (value === 0) {
      setSelectedCategoryIdList([]);
    } else {
      setSelectedCategoryIdList((prevState) => [value]);
    }
  };

  const handleClickReset = () => {
    setSelectedRoomIdList([]);
    setSelectedCategoryIdList([]);
    setIsOnlyMy(false);

    router.push('/reservations');
    dispatch(hideModal());
  };

  const handleClickSubmit = () => {
    dispatch(hideModal());

    router.push({
      pathname: `/reservations`,
      query: {
        ...(selectedRoomIdList.length > 0 ? { roomIds: selectedRoomIdList.join(',') } : {}),
        ...(selectedCategoryIdList.length > 0 ? { cc: selectedCategoryIdList.join(',') } : {}),
        ...(isOnlyMy ? { my: '1' } : {}),
      },
    });
  };

  useEffect(() => {
    if (queryMy) {
      setIsOnlyMy(queryMy === '1');
    }
    if (queryRoomIds) {
      setSelectedRoomIdList((queryRoomIds as string).split(',').map(Number));
    }
    if (queryCc) {
      setSelectedCategoryIdList((queryCc as string).split(',').map(Number));
    }
  }, []);

  return (
    <BottomSheet id={bottomSheetId} onClick={() => dispatch(hideModal())}>
      <div {...stylex.props(Styles.Container)}>
        <p {...stylex.props(Typography.SubTextLargeSemiBold, Styles.Title)}>필터</p>
        <div {...stylex.props(Styles.RadioContainer)}>
          {MEETING_TYPE.map((item) => (
            <Radio
              name="meetingType"
              id={`meetingType${item.id}`}
              // label={item.roomName}
              theme="white"
              label={item.label}
              value={item.value}
              checked={isOnlyMy ? item.value === 1 : item.value === 0}
              onChange={() => handleChangeMeetingType(item.value)}
            />
          ))}
        </div>

        {/* 회의실 */}
        <p {...stylex.props(Typography.SubTextLargeSemiBold, Styles.Title)}>회의실</p>
        <div {...stylex.props(Styles.RadioContainer)}>
          <Radio
            name="congressRoom"
            id={`congressRoomAll`}
            theme="white"
            label={'전체'}
            value={0}
            onChange={() => handleChangeMeetingRoom(0)}
            checked={selectedRoomIdList.length === 0}
          />
          {congressRoomData?.congressRoomList?.map((item) => (
            <Radio
              name="congressRoom"
              id={`congressRoom${item.RoomId}`}
              theme="white"
              label={item.roomName}
              value={item.RoomId}
              checked={selectedRoomIdList?.includes(item.RoomId)}
              onChange={() => handleChangeMeetingRoom(item.RoomId)}
            />
          ))}
        </div>

        {/* 카테고리 */}
        <p {...stylex.props(Typography.SubTextLargeSemiBold, Styles.Title)}>카테고리</p>
        <div {...stylex.props(Styles.RadioContainer)}>
          <Radio
            name="category"
            id={`categoryAll`}
            theme="white"
            label={'전체'}
            value={0}
            onChange={() => handleChangeCategory(0)}
            checked={selectedCategoryIdList.length === 0}
          />
          {congressCategoryData?.congressCategoryList?.map((item) => (
            <Radio
              name="category"
              id={`category${item.CongressCategoryId}`}
              theme="white"
              label={item.categoryName}
              value={item.CongressCategoryId}
              checked={selectedCategoryIdList?.includes(item.CongressCategoryId)}
              onChange={() => handleChangeCategory(item.CongressCategoryId)}
            />
          ))}
        </div>

        {/* 초기화 및 적용하기 */}
        <div {...stylex.props(Styles.ButtonContainer)}>
          <button
            type="button"
            onClick={handleClickReset}
            {...stylex.props(Styles.Button, Styles.isReset, Typography.SubTextLargeMedium)}
          >
            초기화
          </button>
          <button
            type="button"
            onClick={handleClickSubmit}
            {...stylex.props(Styles.Button, Styles.isApply, Typography.SubTextLargeMedium)}
          >
            적용하기
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default ReservationFilter;

const Styles = stylex.create({
  Container: {
    padding: '16px',
  },
  Title: {
    marginBottom: '8px',
    color: `${colors.gray50}`,
  },
  RadioContainer: {
    marginBottom: '24px',
    display: 'flex',
    gap: '8px',
  },
  ButtonContainer: {
    display: 'flex',
    gap: '8px',
  },
  Button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '13px 18px',
    borderRadius: '12px',
  },
  isReset: {
    width: 'fit-content',
    flexShrink: 0,
    backgroundColor: `${colors.gray20}`,
    color: `${colors.gray900}`,
  },
  isApply: {
    width: '100%',
    backgroundColor: `${colors.red500}`,
    color: `${colors.white500}`,
  },
});
