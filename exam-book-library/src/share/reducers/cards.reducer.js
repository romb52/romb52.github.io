import { createSlice } from '@reduxjs/toolkit';
import { cards } from '../../share/data';

// Перевіряємо, чи є дані  у локальному сховищі, якщо немає - використовуємо дефолтні дані
const storedCards = JSON.parse(localStorage.getItem('cards'));
if (!storedCards) {
    localStorage.setItem('cards', JSON.stringify(cards));
}
const defaultCards = storedCards || books;
const initialState = {
    cards: defaultCards,
    filteredCards: [], // Додали поле для зберігання відфільтрованих 
};

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {                  // Додавання нової картки
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10);
            action.payload.borrowDate = formattedDate;       // Додати поточну дату як дату видачі
            state.cards.push(action.payload);           // Додати нову картку до списку карток
            localStorage.setItem('cards', JSON.stringify(state.cards));    // Зберегти зміни в локальне сховище
        },
        removeCard: (state, action) => {                      // Видалення картки за її id
            state.cards = state.cards.filter(card => card.id !== action.payload);    // Видалити картку зі списку
            localStorage.setItem('cards', JSON.stringify(state.cards));              // Зберегти зміни в локальне сховище
        },
        updateCard: (state, action) => {                       // Оновлення дати повернення картки за її id
            const { id } = action.payload;
            const currentDate = new Date();
            const formattedDate = currentDate.toISOString().slice(0, 10);
            const index = state.cards.findIndex(card => card.id === id);
            if (index !== -1) {
                state.cards[index].returnDate = formattedDate;        // Оновити дату повернення
                localStorage.setItem('cards', JSON.stringify(state.cards));   // Зберегти зміни в локальне сховище

                if (state.filteredCards.length > 0) {
                    const findex = state.filteredCards.findIndex(card => card.id === id);
                    state.filteredCards[findex].returnDate = formattedDate;
                }
            }

        },
        sortCards: (state, action) => {                        // Сортування списку карток за вказаним полем
            const { field, isNumber } = action.payload;
            state.cards.sort((a, b) => {
                const valueA = isNumber ? a[field] : (a[field] && a[field].toLowerCase());
                const valueB = isNumber ? b[field] : (b[field] && b[field].toLowerCase());

                return valueA > valueB ? 1 : -1;

            });
        },
        filterCards: (state, action) => {                       // Фільтрація списку карток за пошуковим запитом
            const searchQuery = action.payload.toLowerCase(); // Конвертуємо пошуковий запит в нижній регістр
            // Фільтруємо книги та оновлюємо стан з відфільтрованим списком книг
            state.filteredCards = state.cards.filter(card => {
                return card.book.toLowerCase().includes(searchQuery) ||
                    card.visitor.toLowerCase().includes(searchQuery);
            });
        },
        unsortedCards: (state) => {           // Скидання відфільтрованих карток до початкового стану
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
