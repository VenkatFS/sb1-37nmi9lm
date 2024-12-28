import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GraphQLState {
  data: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: GraphQLState = {
  data: null,
  loading: false,
  error: null,
};

const graphqlSlice = createSlice({
  name: 'graphql',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setData, setError, resetState } = graphqlSlice.actions;
export default graphqlSlice.reducer;