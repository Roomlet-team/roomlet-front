import { QueryClient, useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { CustomAxiosError } from '@src/types/axios/error';

/**
 * 룸렛에서 axios로 api를 호출할 때 사용되는 CustomAxiosError로 Error 타입을 재지정한 커스텀 훅
 * @param options react-query에서 사용하던 options와 동일
 * @param queryClient react-query에서 사용하던 queryClient와 동일
 * @returns
 */
function useCustomMutation<TData = unknown, TError = CustomAxiosError, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient
): UseMutationResult<TData, TError, TVariables> {
  return useMutation<TData, TError, TVariables>(options, queryClient);
}

export default useCustomMutation;
