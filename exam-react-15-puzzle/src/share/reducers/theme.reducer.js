import { createSlice } from '@reduxjs/toolkit';

const initialState = () => { return localStorage.getItem('theme') ? localStorage.getItem('theme') : getAutoTheme() }
const themes = ['light', 'dark', 'winter', 'summer'];

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
        random: (state) => {
            const randomIndex = Math.floor(Math.random() * themes.length);
            const randomTheme = themes[randomIndex];
            localStorage.setItem('theme', randomTheme);
            return randomTheme;
        },
        setAutoTheme: (state) => {
            const autoTheme = getAutoTheme();
            localStorage.setItem('theme', autoTheme);
            return autoTheme;
        },
    },
});

export const { setTheme, random, setAutoTheme } = themeSlice.actions;
export default themeSlice.reducer;