// books.reducer.js
import { createSlice } from '@reduxjs/toolkit';
import { cards } from '../../share/data';

// Перевіряємо, чи є дані  у локальному сховищі, якщо немає - використовуємо дефолтні дані
const storedCards = JSON.parse(localStorage.getItem('cards'));
if (!storedCards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}
const defaultCards = storedCards || cards;
const initialState = {
    cards: defaultCards,
    filteredCards: [], // Додали поле для зберігання відфільтрованих 
};

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10);
            action.payload.borrowDate = formattedDate;
            state.cards.push(action.payload);
            localStorage.setItem('cards', JSON.stringify(state.cards));
        },
        removeCard: (state, action) => {
            state.cards = state.cards.filter(card => card.id !== action.payload);
            localStorage.setItem('cards', JSON.stringify(state.cards));
        },
        updateCard: (state, action) => {
            const { id } = action.payload;
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10);
            console.log(formattedDate, id); 
            const index = state.cards.findIndex(card => card.id === id);
            if (index !== -1) {
                state.cards[index].returnDate = formattedDate;
                localStorage.setItem('cards', JSON.stringify(state.cards));
            }
        },

        sortCards: (state, action) => {
            const { field, isNumber } = action.payload;
            state.cards.sort((a, b) => {
                const valueA = isNumber ? a[field] : (a[field] && a[field].toLowerCase());
                const valueB = isNumber ? b[field] : (b[field] && b[field].toLowerCase());

                return valueA > valueB ? 1 : -1;

            });
        },
        filterCards: (state, action) => {
            const searchQuery = action.payload.toLowerCase(); // Конвертуємо пошуковий запит в нижній регістр

            // Фільтруємо книги та оновлюємо стан з відфільтрованим списком книг
            state.filteredCards = state.cards.filter(card => {
                return card.book.toLowerCase().includes(searchQuery) ||
                    card.visitor.toLowerCase().includes(searchQuery);
            });
        },
        unsortedCards: (state) => {
            state.filteredCards = [];
        },
    },
});

export const {
    addCard,
    removeCard,
    sortCards,
    filterCards,
    unsortedCards,
    updateCard,
} = cardSlice.actions;

export default cardSlice.reducer;
