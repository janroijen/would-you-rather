import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import questionsReducer from './questionsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer
  },
});
