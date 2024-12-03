import React from 'react';
import { useDispatch } from 'react-redux';
import stylex from '@stylexjs/stylex';
import BottomSheet from '@src/components/ui/BottomSheet';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import Input from '@src/components/ui/Input';
import useInput from '@src/hooks/useInput';
import { hideModal } from '@src/slices/modal';

let bottomSheetId = 'add-congress-room-bottom-sheet';

const AddCongressRoomBottomSheet = () => {
  const [name, handleChangeName] = useInput<string>('');
  const [description, handleChangeDescription] = useInput<string>('');
  const dispatch = useDispatch();

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
        </div>
        <div {...stylex.props(Styles.ButtonContainer)}>
          <button type="button" {...stylex.props(Styles.Button, Styles.CancelButton, Typography.TextSmallMedium)}>
            닫기
          </button>
          <button type="button" {...stylex.props(Styles.Button, Styles.RegisterButton, Typography.TextSmallMedium)}>
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
});
