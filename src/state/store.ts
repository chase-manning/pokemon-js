import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
