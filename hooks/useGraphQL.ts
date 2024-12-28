import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DocumentNode, OperationVariables, useQuery, useMutation } from '@apollo/client';
import { setData, setError, setLoading } from '@/lib/store/slices/graphqlSlice';

export const useGraphQLQuery = <T = any>(
  query: DocumentNode,
  variables?: OperationVariables,
  options = {}
) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useQuery<T>(query, {
    variables,
    ...options,
  });

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading, dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setData(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error.message));
    }
  }, [error, dispatch]);

  return { data, loading, error };
};

export const useGraphQLMutation = <T = any>(
  mutation: DocumentNode,
  options = {}
) => {
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
};