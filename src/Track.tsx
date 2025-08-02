import React, { useState, useContext, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Goal = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

export type GoalContextType = {
  goal: Goal;
  setGoal: React.Dispatch<React.SetStateAction<Goal>>;
};

export type Progress = {
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
};

export type ProgressContextType = {
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
};

const defaultGoals: Goal = {
  calories: 2000,
  carbs: 230,
  protein: 90,
  fat: 25,
};

const progresses: Progress = {
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0,
};

export const goalContext = createContext<GoalContextType | undefined>(
  undefined,
);

export const progressContext = createContext<ProgressContextType | undefined>(
  undefined,
);

export const useGoal = () => {
  const context = useContext(goalContext);
  if (!context) {
    throw new Error('useTheme must be used in GoalProvider');
  }
  return context;
};

export const useProgress = () => {
  const context = useContext(progressContext);
  if (!context) {
    throw new Error('useTheme must be used in ProgressProvider');
  }
  return context;
};

export const GoalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [goal, setGoal] = useState<Goal>(defaultGoals);

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const goals = await AsyncStorage.getItem('goals');
        if (goals) {
          setGoal(JSON.parse(goals));
        } else {
          setGoal(defaultGoals);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadGoals();
  }, []);

  return (
    <goalContext.Provider value={{ goal, setGoal }}>
      {children}
    </goalContext.Provider>
  );
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [progress, setProgress] = useState<Progress>(progresses);

  return (
    <progressContext.Provider value={{ progress, setProgress }}>
      {children}
    </progressContext.Provider>
  );
};
