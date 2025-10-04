import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice.ts';

const store = configureStore({
    reducer: {
        todosData: todoSlice
    }
});

export default store