import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

import { AppState } from './state'

export enum stateType {
    default,
    loading,
    error,
}

export type RetrievalState = {
    state: stateType,
    errorMessage?: string,
}

const initialState: RetrievalState = {
    state: stateType.default,
    errorMessage: '',
};

const setDefault: CaseReducer<RetrievalState> = state => {
    state.state = stateType.default;
};

const setLoading: CaseReducer<RetrievalState> = (state) => {
    state.state = stateType.loading;
};

const setError: CaseReducer<RetrievalState, PayloadAction<string>> = (state, action) => {
    state.state = stateType.error;
    state.errorMessage = action.payload;
};

export const retrievalSlice = createSlice({
    name: 'retrieval',
    initialState,
    reducers: {
        setDefault,
        setLoading,
        setError
    }
});

export const selectState = (state: AppState) => state.retrieval.state;
export const selectErrorMessage = (state: AppState) => state.retrieval.errorMessage;