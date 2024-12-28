import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DocumentNode, OperationVariables, useQuery } from '@apollo/client';
import { setData, setError, setLoading } from '@/lib/redux/slices/graphqlSlice';

export function useGraphQLQuery<T = any>(
  query: DocumentNode,
  variables?: OperationVariables,
  options = {}
) {
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
}