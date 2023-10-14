import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ILazyParams } from '../../models/lazyTable/ILazyParams.model'

const initialLazyParams: ILazyParams = {
  page: 0,
  size: 10
};


const lazyParamsReducer = createSlice({
  name: 'lazyParams',
  initialState: initialLazyParams,
  reducers: {
    setLazyParams: (
      state,
      { payload }: PayloadAction<Partial<ILazyParams>>
    ) => {
      return { ...state, ...payload };
    },
  },
})

export const { setLazyParams } = lazyParamsReducer.actions

export default lazyParamsReducer.reducer

export const selectLazyParams = (state: RootState) => state.lazyParams
