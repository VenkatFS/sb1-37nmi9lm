'use client';

import { gql } from '@apollo/client';
import { useGraphQLMutation } from '@/hooks/useGraphQL';

const UPDATE_EXAMPLE = gql`
  mutation UpdateExample($id: ID!, $name: String!) {
    updateExample(id: $id, name: $name) {
      id
      name
    }
  }
`;

interface UpdateExampleData {
  updateExample: {
    id: string;
    name: string;
  };
}

interface UpdateExampleVariables {
  id: string;
  name: string;
}

export function ExampleMutation() {
  const { mutate, loading, error } = useGraphQLMutation<UpdateExampleData>(UPDATE_EXAMPLE);

  const handleUpdate = async () => {
    try {
      await mutate({
        variables: {
          id: '1',
          name: 'New Name',
        },
      });
    } catch (err) {
      console.error('Error updating example:', err);
    }
  };

  return (
    <div>
      <button
        onClick={handleUpdate}
        disabled={loading}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        {loading ? 'Updating...' : 'Update Example'}
      </button>
      {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
    </div>
  );
}