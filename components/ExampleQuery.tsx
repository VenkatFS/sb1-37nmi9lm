'use client';

import { gql } from '@apollo/client';
import { useGraphQLQuery } from '@/hooks/useGraphQL';

const GET_EXAMPLE = gql`
  query GetExample {
    example {
      id
      name
    }
  }
`;

interface ExampleData {
  example: {
    id: string;
    name: string;
  };
}

export function ExampleQuery() {
  const { data, loading, error } = useGraphQLQuery<ExampleData>(GET_EXAMPLE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Example Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}