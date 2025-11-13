import { CustomAxiosError } from '@src/types/axios/error';
import { UseMutationResult } from '@tanstack/react-query';
import styles from '@src/components/ui/Toast/styles/styles.module.css';
import { Slide, toast } from 'react-toastify';
import { ToastContent } from '@src/components/ui/Toast';

interface MutationWithToastProps<TData, TError, TVariables> {
  mutation: UseMutationResult<TData, TError, TVariables>;
  message: {
    pending: string;
    success: string;
    error: string;
  };
}

/**
 * 뮤테이션 상태에 따라 토스트 메시지를 표시하는 커스텀 훅
 * @param mutation - 뮤테이션 객체
 * @param message - 토스트 메시지 객체
 * @returns - 뮤테이션 상태에 따라 토스트 메시지를 표시하는 함수
 */
const useMutationWithToast = <TData, TError, TVariables>({
  mutation,
  message,
}: MutationWithToastProps<TData, TError, TVariables>) => {
  const mutateWithToast = (data: TVariables) => {
    toast.promise(
      mutation.mutateAsync(data),
      {
        pending: {
          render: () => <ToastContent message={message.pending} type="pending" />,
          icon: false,
        },
        success: {
          render: () => <ToastContent message={message.success} type="success" />,
          icon: false,
        },
        error: {
          render: ({ data: error }: { data: CustomAxiosError }) => {
            const errorCode = error?.status;
            const errorMessage = error?.response?.data?.message?.errMsg || `${message.error} (code: ${errorCode})`;
            return <ToastContent message={errorMessage} type="error" />;
          },
          icon: false,
        },
      },
      {
        position: 'bottom-center',
        autoClose: 1500,
        closeButton: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: styles['toast-container'],
        transition: Slide, // Bounce, Slide, Zoom, Flip, Fade
      }
    );
  };

  return { mutateWithToast };
};

export default useMutationWithToast;
