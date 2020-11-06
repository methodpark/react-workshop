import { combineReducers } from '@reduxjs/toolkit'

import { climateSlice, ClimateState } from './climate'
import { retrievalSlice, RetrievalState } from './retrieval'

export type AppState = {
    climate: ClimateState,
    retrieval: RetrievalState,
};

export default combineReducers<AppState>({
    climate: climateSlice.reducer,
    retrieval: retrievalSlice.reducer,
});