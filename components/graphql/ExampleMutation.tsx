'use client';

import { gql } from '@apollo/client';
import { Button } from '@mui/material';
import { useGraphQLMutation } from '@/hooks/useGraphQLMutation';
import { ErrorMessage } from './ErrorMessage';

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
    <>
      <Button
        variant="contained"
        onClick={handleUpdate}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? 'Updating...' : 'Update Example'}
      </Button>
      {error && <ErrorMessage message={error.message} />}
    </>
  );
}