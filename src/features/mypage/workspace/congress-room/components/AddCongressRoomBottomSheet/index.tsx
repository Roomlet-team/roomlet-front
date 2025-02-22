import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import stylex from '@stylexjs/stylex';
import BottomSheet from '@src/components/ui/BottomSheet';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import Input from '@src/components/ui/Input';
import useInput from '@src/hooks/useInput';
import { addCongressRoom } from '../../slice/congressRoom';
import { hideModal } from '@src/slices/modal';
import useGetCongressRoomListQuery from '@src/queries/congress/useGetCongressRoomListQuery';

let bottomSheetId = 'add-congress-room-bottom-sheet';

const AddCongressRoomBottomSheet = () => {
  const [name, handleChangeName] = useInput<string>('');
  const [validMsg, setValidMsg] = useState<string>('');
  const [description, handleChangeDescription] = useInput<string>('');
  const dispatch = useDispatch();
  const { data } = useGetCongressRoomListQuery();

  useEffect(() => {
    if (name.length > 0) {
      setValidMsg('');
    }
  }, [name]);

  const handleClickRegister = () => {
    if (data?.congressRoomList.find((item) => item.roomName === name)) {
      setValidMsg('이미 존재하는 회의실입니다.');
      return;
    }

    dispatch(addCongressRoom({ roomName: name, roomDescription: description }));
    dispatch(hideModal());
  };

  return (
    <BottomSheet id={bottomSheetId} onClick={() => dispatch(hideModal())}>
      <div {...stylex.props(Styles.Container)}>
        <p {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.Title)}>회의실 추가</p>
        <div {...stylex.props(Styles.InputContainer)}>
          <Input type="text" placeholder="회의실 이름을 입력해주세요" value={name} onChange={handleChangeName} />
          <Input
            type="text"
            placeholder="회의실 설명을 입력해주세요"
            value={description}
            onChange={handleChangeDescription}
          />
          {validMsg && <p {...stylex.props(Styles.ValidMsg, Typography.CaptionRegularRegular)}>{validMsg}</p>}
        </div>
        <div {...stylex.props(Styles.ButtonContainer)}>
          <button
            type="button"
            onClick={() => dispatch(hideModal())}
            {...stylex.props(Styles.Button, Styles.CancelButton, Typography.TextSmallMedium)}
          >
            닫기
          </button>
          <button
            type="button"
            onClick={handleClickRegister}
            {...stylex.props(Styles.Button, Styles.RegisterButton, Typography.TextSmallMedium)}
          >
            등록
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default AddCongressRoomBottomSheet;

const Styles = stylex.create({
  Container: {
    padding: '24px 16px',
  },
  Title: {
    marginBottom: '24px',
    textAlign: 'center',
  },
  InputContainer: {
    marginBottom: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  ButtonContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'space-between',
  },
  Button: {
    padding: '16px',
    borderRadius: '20px',
    flex: 1,
  },
  CancelButton: {
    background: colors.gray20,
    color: colors.gray60,
  },
  RegisterButton: {
    background: colors.red500,
    color: colors.white500,
  },
  ValidMsg: {
    color: colors.red500,
  },
});
