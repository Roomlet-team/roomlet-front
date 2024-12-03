import { createRoot } from 'react-dom/client';

let root = null;

/**
 * Modal 및 BottomSheet 가 MainLayout 컴포넌트 안에서 생성되게 하는 custom hook
 * @param modalElementId 생성한 모달의 요소 id
 * @param onOk 확인 버튼을 클릭했을 때 실행시킬 함수
 * @param onCancel 취소 혹은 닫기 버튼을 클릭했을 때 실행시킬 함수
 * @returns
 */
function useCreateModal(modalElementId: string, Component, props) {
  // 모달 생성
  const divElement = document.createElement('div');
  divElement.id = modalElementId;
  divElement.style.cssText = 'position: absolute; top: 0; width: 100%; height: 100vh;';
  document.getElementById('main-layout').appendChild(divElement);
  root = createRoot(divElement);

  root.render(<Component {...props} />);
}

export default useCreateModal;
