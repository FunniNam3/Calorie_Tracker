import React, { useState, useContext, createContext } from 'react';

export type Goal = {
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
};

export type GoalContextType = {
  goal: Goal;
  setGoal: React.Dispatch<React.SetStateAction<Goal>>;
};

export type Progress = {
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
};

export type ProgressContextType = {
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
};

const goals: Goal = {
  calories: 2000,
  carbs: 230,
  protein: 90,
  fiber: 25,
};

const progresses: Progress = {
  calories: 500,
  carbs: 150,
  protein: 30,
  fiber: 10,
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
  const [goal, setGoal] = useState<Goal>(goals);

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
