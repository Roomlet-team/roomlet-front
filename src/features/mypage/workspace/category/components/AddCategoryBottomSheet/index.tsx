import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import stylex from '@stylexjs/stylex';
import BottomSheet from '@src/components/ui/BottomSheet';
import { colors, Typography } from '../../../../../../../public/styles/vars.stylex';
import Input from '@src/components/ui/Input';
import useInput from '@src/hooks/useInput';
import { hideModal } from '@src/slices/modal';
import { addCategory } from '../../slices/category';
import useGetCategoryListQuery from '@src/queries/category/useGetCategoryListQuery';
import usePutCongressCategory from '../../queries/usePutCongressCategory';

let bottomSheetId = 'add-category-bottom-sheet';

type AddCategoryMode = 'immediate' | 'deferred';

interface AddCategoryBottomSheetProps {
  mode?: AddCategoryMode;
}

const AddCategoryBottomSheet = ({ mode = 'deferred' }: AddCategoryBottomSheetProps) => {
  const [name, handleChangeName] = useInput<string>('');
  const [validMsg, setValidMsg] = useState<string>('');
  const dispatch = useDispatch();
  const { data } = useGetCategoryListQuery();
  const mutation = usePutCongressCategory();

  useEffect(() => {
    // 카테고리 이름이 입력되면 경고 메시지 초기화
    if (name.length > 0) {
      setValidMsg('');
    }
  }, [name]);

  const handleClickDeferredRegister = () => {
    if (data?.congressCategoryList.find((item) => item.categoryName === name)) {
      setValidMsg('이미 존재하는 카테고리입니다.');
      return;
    }

    dispatch(addCategory({ categoryName: name }));
    dispatch(hideModal());
  };

  const handleClickImmediateRegister = () => {
    if (data?.congressCategoryList.find((item) => item.categoryName === name)) {
      setValidMsg('이미 존재하는 카테고리입니다.');
      return;
    }

    mutation.mutate({
      congressCategoryList: [...data.congressCategoryList, { categoryName: name }],
      deleteCongressCategoryList: [],
    });
    dispatch(hideModal());
  };

  return (
    <BottomSheet id={bottomSheetId} onClick={() => dispatch(hideModal())}>
      <div {...stylex.props(Styles.Container)}>
        <p {...stylex.props(Typography.SubtitleRegularSemiBold, Styles.Title)}>카테고리 추가</p>
        <div {...stylex.props(Styles.InputContainer)}>
          <Input type="text" placeholder="카테고리 명을 입력해주세요" value={name} onChange={handleChangeName} />
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
            onClick={mode === 'immediate' ? handleClickImmediateRegister : handleClickDeferredRegister}
            {...stylex.props(Styles.Button, Styles.RegisterButton, Typography.TextSmallMedium)}
          >
            등록
          </button>
        </div>
      </div>
    </BottomSheet>
  );
};

export default AddCategoryBottomSheet;

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
