import { useDispatch } from 'react-redux';
import { hideModal, showModal } from '@src/slices/modal';

type ReturnType = {
  renderModal: (Component: () => React.JSX.Element, props: { [key in string]: any }) => () => void;
};

/**
 * Modal 및 BottomSheet 가 MainLayout 컴포넌트 안에서 render되게 하는 custom hook
 * @returns renderModal 함수 반환
 */
function useRenderModal(): ReturnType {
  const dispatch = useDispatch();

  const renderModal = (Component, props) => {
    dispatch(showModal(<Component {...props} />));

    return () => {
      dispatch(hideModal());
    };
  };

  return { renderModal };
}

export default useRenderModal;
