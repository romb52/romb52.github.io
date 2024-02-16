// action - об'єкт з одним обов'язковим полем 'type', друге поле 'payload' - необов'язкове - данні для роботи зі state
export const reducer = (state, action) => {
  const { type, payload } = action;
  const id = payload.id ? payload.id : payload;
  const ind = state.findIndex((item) => item.id === id);
  switch (type) {
    case 'add':
      if (ind !== -1) {
        state[ind].count += 1;
      }
      return [...state];

    case 'minus':
      if (ind !== -1) {
        state[ind].count -= 1;
      }
      return [...state];
    case 'delete':
      if (ind !== -1) {
        const arr = [...state.slice(0, ind), ...state.slice(ind + 1)];
        return arr;
      }
    case 'new_book':
      state.push(payload);
      return [...state];
    case 'change_book':
      if (ind !== -1) {
        state[ind] = payload;
      }
      return [...state];
    case 'sort':
      const { isAZ, name, isNumber } = payload;
      let arr;
      if (!isNumber) {
        arr = state.sort((a, b) =>
          isAZ ? a[name].localeCompare(b[name]) : b[name].localeCompare(a[name])
        );
      }

      if (isNumber) {
        arr = state.sort((a, b) =>
          isAZ ? a[name] - b[name] : b[name] - a[name]
        );
      }
      return [...arr];
    default:
      return state;
  }
};