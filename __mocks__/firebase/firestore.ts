export const getFirestore = jest.fn();
export const collection = jest.fn();
export const getDocs = jest.fn();
export const getDoc = jest.fn();
export const addDoc = jest.fn();
export const doc = jest.fn();
export const query = jest.fn();
export const limit = jest.fn();
export const where = jest.fn();
export const setDoc = jest.fn();
export const updateDoc = jest.fn();
export const deleteDoc = jest.fn();
export const serverTimestamp = jest.fn();
export const increment = jest.fn();
export const onSnapshot = jest.fn((query, callback) => {
  callback({
    forEach: jest.fn((callback) => {
      const doc = { id: 'testId', data: () => ({ userId: 'testUser', label: 'Type1', price: 100 }) };
      callback(doc);
    }),
  });
  return jest.fn(); 
});

