export type FoodItem = {
  id: number;
  name: string;
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
};

export type MealItem = {
  day: Date;
  type: string;
  foods: string;
  servings: string;
  calories: number;
  carbs: number;
  protein: number;
  fiber: number;
};
