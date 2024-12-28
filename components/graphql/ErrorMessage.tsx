import { Alert } from '@mui/material';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
      {message}
    </Alert>
  );
}