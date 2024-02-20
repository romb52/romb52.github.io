// books.reducer.js
import { createSlice } from '@reduxjs/toolkit';
import { books } from '../../share/data';

// Перевіряємо, чи є дані книг у локальному сховищі, якщо немає - використовуємо дефолтні дані
const storedBooks = JSON.parse(localStorage.getItem('books'));
if (!storedBooks) {
  localStorage.setItem('books', JSON.stringify(books));
}
const defaultBooks = storedBooks || books; 
const initialState = {
  books: defaultBooks,
  filteredBooks: [], // Додали поле для зберігання відфільтрованих книг
};

export const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push(action.payload);
      localStorage.setItem('books', JSON.stringify(state.books));
    },
    removeBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload);
      localStorage.setItem('books', JSON.stringify(state.books));
    },
    updateBook: (state, action) => {
      const { id, ...updatedBook } = action.payload;
      const index = state.books.findIndex(book => book.id === id);
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...updatedBook };
         localStorage.setItem('books', JSON.stringify(state.books));
      }
    },
    increaseBookCount: (state, action) => {
      const { id } = action.payload;
      console.log(id)
      const index = state.books.findIndex(book => book.id === parseInt(id));
      if (index !== -1) {
        state.books[index].copiesAvailable++;
        localStorage.setItem('books', JSON.stringify(state.books));
      }
    },
    decreaseBookCount: (state, action) => {
      const { id } = action.payload;
      console.log(id)
      const index = state.books.findIndex(book => book.id === parseInt(id));
      if (index !== -1 && state.books[index].copiesAvailable > 0) {
        state.books[index].copiesAvailable--;
        localStorage.setItem('books', JSON.stringify(state.books));        
      }
    },
    sortBooks: (state, action) => {
      const { field,  isNumber } = action.payload;
      state.books.sort((a, b) => {
        const valueA = isNumber ? a[field] : (a[field] && a[field].toLowerCase());
        const valueB = isNumber ? b[field] : (b[field] && b[field].toLowerCase());
       
          return valueA > valueB ? 1 : -1;
       
      });
    },
    filterBooks: (state, action) => {
      const searchQuery = action.payload.toLowerCase(); // Конвертуємо пошуковий запит в нижній регістр

      // Фільтруємо книги та оновлюємо стан з відфільтрованим списком книг
      state.filteredBooks = state.books.filter(book => {
        return book.title.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery);
      });
    },
    unsortedBooks: (state) => {
      state.filteredBooks = [];
    },
  },
});

export const {
  addBook,
  removeBook,
  updateBook,
  increaseBookCount,
  decreaseBookCount,
  sortBooks,
  filterBooks,
  unsortedBooks 
} = bookSlice.actions;

export default bookSlice.reducer;
