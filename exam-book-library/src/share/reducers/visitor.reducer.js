import { createSlice } from '@reduxjs/toolkit';
import { visitors } from '../../share/data';


const storedVisitors = JSON.parse(localStorage.getItem('visitors'));
if (!storedVisitors) {
  localStorage.setItem('visitors', JSON.stringify(visitors));
}
const defaultVisitors = storedVisitors || visitors; 
const initialState = {
  visitors: defaultVisitors,
  filteredVisitors: [], 
};

export const visitorsSlice = createSlice({
  name: 'visitors',
  initialState,
  reducers: {
    addVisitor: (state, action) => {
      state.visitors.push(action.payload);
      localStorage.setItem('visitors', JSON.stringify(state.visitors));
    },
    removeVisitor: (state, action) => {
      state.visitors = state.visitors.filter(visitor => visitor.id !== action.payload);
      localStorage.setItem('visitors', JSON.stringify(state.visitors));
    },
    updateVisitor: (state, action) => {
      const { id, ...updateVisitor } = action.payload;
      const index = state.visitors.findIndex(visitor => visitor.id === id);
      if (index !== -1) {
        state.visitors[index] = { ...state.visitors[index], ...updateVisitor };
         localStorage.setItem('visitors', JSON.stringify(state.visitors));
      }
    },
    // increaseBookCount: (state, action) => {
    //   const { id } = action.payload;
    //   const index = state.books.findIndex(book => book.id === id);
    //   if (index !== -1) {
    //     state.books[index].count++;
    //   }
    // },
    // decreaseBookCount: (state, action) => {
    //   const { id } = action.payload;
    //   const index = state.books.findIndex(book => book.id === id);
    //   if (index !== -1 && state.books[index].count > 0) {
    //     state.books[index].count--;
    //   }
    // },
    sortVisitors: (state, action) => {
      const { field,  isNumber } = action.payload;
      state.visitors.sort((a, b) => {
        const valueA = isNumber ? a[field] : (a[field] && a[field].toLowerCase());
        const valueB = isNumber ? b[field] : (b[field] && b[field].toLowerCase());
       
          return valueA > valueB ? 1 : -1;
       
      });
    },
    filterVisitors: (state, action) => {
      const searchQuery = action.payload.toLowerCase(); // Конвертуємо пошуковий запит в нижній регістр

      
      state.filteredVisitors = state.visitors.filter(visitor => {
        return visitor.name.toLowerCase().includes(searchQuery) ||
        visitor.tel.includes(searchQuery);
      });
    },
    unsortedVisitors: (state) => {
      state.filteredVisitors = [];
    },
  },
});

export const {
    addVisitor,
    removeVisitor,
    updateVisitor,
  // increaseBookCount,
  // decreaseBookCount,
  sortVisitors,
  filterVisitors,
  unsortedVisitors 
} = visitorsSlice.actions;

export default visitorsSlice.reducer;