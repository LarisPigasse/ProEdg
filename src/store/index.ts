import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // I reducer verranno aggiunti in seguito
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
