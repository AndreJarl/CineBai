import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useContentStore = create(
  persist(
    (set) => ({
      contentType: 'movie',
      setContentType: (type) => set({ contentType: type }),
    }),
    {
      name: 'content-type-storage', // Key name in localStorage
      getStorage: () => localStorage, // Optional, defaults to localStorage
    }
  )
);

