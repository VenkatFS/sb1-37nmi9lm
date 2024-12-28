import { CircularProgress, Box } from '@mui/material';

export function LoadingSpinner() {
  return (
    <Box display="flex" justifyContent="center" p={2}>
      <CircularProgress />
    </Box>
  );
}