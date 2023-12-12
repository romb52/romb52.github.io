import { createAsyncThunk, SerializedError } from '@reduxjs/toolkit';
import { auth, IAuth } from '../reducers/auth.reducer';
import { url } from '../url';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  clearErrors,
  IErrorResponse,
  setError,
} from '../reducers/error.reducer';
import { startLoading, stopLoading } from '../reducers/loader.reducer';
interface IRequest {
  body: {
    email: string;
    password: string;
    username?: string;
  };
  path: string;
}
interface IResponse {
  user: IAuth;
}
export const fetchAuth = createAsyncThunk(
  'auth',
  async ({ body, path }: IRequest, { dispatch }) => {
    try {
      dispatch(startLoading());
      const res: AxiosResponse<IResponse> = await axios.post<IResponse>(
        url + path,
        { user: { ...body } },
        { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch(auth(res.data.user));
      dispatch(stopLoading());
    } catch (e) {
      dispatch(stopLoading());
      if (axios.isAxiosError(e)) {
        const error: AxiosError<SerializedError> = e;

        if (error.response) {
          const errorData: IErrorResponse = error.response.data;
          if (errorData.errors) {
            dispatch(setError({ errors: errorData.errors }));
          } else if (errorData.message) {
            dispatch(setError({ message: errorData.message }));
          } else {
            dispatch(setError({ message: 'Невідома помилка1' }));
          }
        }
        setTimeout(() => {
          dispatch(clearErrors());
        }, 5000);
        return;
      }

      dispatch(setError({ message: 'Невідома помилка2' }));
      setTimeout(() => {
        dispatch(clearErrors());
      }, 5000);
    }
  }
);
