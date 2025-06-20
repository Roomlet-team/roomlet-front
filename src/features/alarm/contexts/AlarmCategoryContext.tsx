import React, { createContext, useContext, useState } from 'react';
import { AlarmCategory } from '@src/queries/alarm/useGetNotificationsInfiniteQuery';

interface AlarmCategoryContextType {
  category: AlarmCategory;
  setCategory: (category: AlarmCategory) => void;
}

const AlarmCategoryContext = createContext<AlarmCategoryContextType | undefined>(undefined);

export const AlarmCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<AlarmCategory>(null);

  return <AlarmCategoryContext.Provider value={{ category, setCategory }}>{children}</AlarmCategoryContext.Provider>;
};

export const useAlarmCategory = () => {
  const context = useContext(AlarmCategoryContext);
  if (context === undefined) {
    throw new Error('useAlarmCategory는 반드시 AlarmCategoryProvider 안에서 사용되어야 합니다.');
  }
  return context;
};
