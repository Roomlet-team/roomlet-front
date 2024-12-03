interface ReturnType {
  close: () => void; // 모달 닫기
  handleClickCancel: React.MouseEventHandler<HTMLButtonElement>; // 취소 클릭
  handleClickOk: React.MouseEventHandler<HTMLButtonElement>; // 확인 클릭
}

/**
 * Modal 및 BottomSheet 에서 닫기, 취소, 확인 기능을 다룬 함수를 반환하는 Custom Hook
 * @param modalElementId 생성한 모달의 요소 id
 * @param onOk 확인 버튼을 클릭했을 때 실행시킬 함수
 * @param onCancel 취소 혹은 닫기 버튼을 클릭했을 때 실행시킬 함수
 * @returns
 */
function useModal(
  modalElementId: string,
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void
): ReturnType {
  /**
   * 모달 닫기
   */
  const close = () => {
    const targetConfirmModalElement = document.getElementById(modalElementId);
    if (targetConfirmModalElement) {
      targetConfirmModalElement?.remove();
    }
  };

  /**
   * 취소 버튼을 눌렀을 때
   */
  const handleClickCancel: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    // onCancel가 존재하면, onCandle 함수 실행
    if (onCancel) {
      onCancel(e);
    }

    // 모달 닫기
    close();
  };

  /**
   * 확인 버튼을 눌렀을 때
   */
  const handleClickOk: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
    // onOk가 존재하면, onOk 함수 실행
    if (onOk) {
      onOk(e);
    }

    // 모달 닫기
    close();
  };

  return { close, handleClickCancel, handleClickOk };
}

export default useModal;
