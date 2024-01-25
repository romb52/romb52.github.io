import { createAction, props } from '@ngrx/store';

export const checkAuthAction = createAction(
  '[Auth] check',
  props<{ token: string; username: string, id: number }>()
);

export const loginAction = createAction(
  '[Auth] login',
  props<{ token: string; username: string; id: number }>()
);

export const logoutAction = createAction('[Auth] logout');
