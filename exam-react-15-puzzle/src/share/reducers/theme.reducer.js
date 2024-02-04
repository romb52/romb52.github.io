import { createSlice } from '@reduxjs/toolkit';

const initialState = () => { return localStorage.getItem('theme') ? localStorage.getItem('theme') : getAutoTheme() }


const getAutoTheme = () => {
    const currentHour = new Date().getHours();
    console.log(currentHour);
    return currentHour >= 8 && currentHour < 17 ? 'light' : 'dark';    
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            localStorage.setItem('theme', action.payload);
            return action.payload;
        },       
        setAutoTheme: (state) => {
            const autoTheme = getAutoTheme();
            localStorage.setItem('theme', autoTheme);
            return autoTheme;
        },
    },
});

export const { setTheme, setAutoTheme } = themeSlice.actions;
export default themeSlice.reducer;