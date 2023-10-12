import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ILoginDto } from '../../models/login/ILoginResponse.model'

type AuthState = {
  user: ILoginDto['personalDetails'] | null
  token: ILoginDto['token'] | null
}

const slice = createSlice({
  name: 'authSlice',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<AuthState>
    ) => {
      state.user = user
      state.token = token
    },
  },
})

export const { setCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.authSlice.user
