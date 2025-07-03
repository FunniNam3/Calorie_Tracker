export type FoodItem = {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
};

export type MealItem = {
  id: number;
  day: Date;
  type: number;
  foods: string;
  servings: string;
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
};
