'use client';

import { gql } from '@apollo/client';
import { Box, Typography, Paper } from '@mui/material';
import { useGraphQLQuery } from '@/hooks/useGraphQLQuery';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Example Data:
      </Typography>
      <Box component="pre" sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        {JSON.stringify(data, null, 2)}
      </Box>
    </Paper>
  );
}