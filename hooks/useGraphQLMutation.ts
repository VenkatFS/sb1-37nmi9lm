import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DocumentNode, useMutation } from '@apollo/client';
import { setData, setError, setLoading } from '@/lib/redux/slices/graphqlSlice';

export function useGraphQLMutation<T = any>(
  mutation: DocumentNode,
  options = {}
) {
  const dispatch = useDispatch();
  const [mutate, { data, loading, error }] = useMutation<T>(mutation, {
    ...options,
    onCompleted: (data) => {
      dispatch(setData(data));
      options?.onCompleted?.(data);
    },
    onError: (error) => {
      dispatch(setError(error.message));
      options?.onError?.(error);
    },
  });

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  return { mutate, data, loading, error };
}