const getLocalStorage = (): [] => localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')!) : [];
const setLocalStorage = (arr: any[]): void => localStorage.setItem('cities', JSON.stringify(arr));

export { getLocalStorage, setLocalStorage };
