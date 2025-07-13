import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

import { FoodItem, MealItem } from './Items.tsx';

const DBName = 'tracker.db';
const foodtable = 'food';
const mealtable = 'meals';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({ name: DBName, location: 'default' });
};

export const createTables = async (db: SQLiteDatabase) => {
  const mealQuery = `CREATE TABLE IF NOT EXISTS ${mealtable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day DATE NOT NULL,
      type INTEGER NOT NULL,
      foods TEXT NOT NULL,
      servings TEXT NOT NULL,
      calories REAL NOT NULL,
      carbs REAL NOT NULL,
      protein REAL NOT NULL,
      fiber REAL NOT NULL
    );`;

  await db.executeSql(mealQuery);

  const foodQuery = `CREATE TABLE IF NOT EXISTS ${foodtable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      calories FLOAT,
      carbs FLOAT,
      protein FLOAT,
      fiber FLOAT
    );`;

  await db.executeSql(foodQuery);
};

export const getFoodItems = async (db: SQLiteDatabase): Promise<FoodItem[]> => {
  try {
    const foodItems: FoodItem[] = [];
    const results = await db.executeSql(`SELECT * FROM ${foodtable}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        foodItems.push(result.rows.item(index));
      }
    });
    return foodItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get foodItems!');
  }
};

export const getMealItems = async (db: SQLiteDatabase): Promise<MealItem[]> => {
  try {
    const mealItems: MealItem[] = [];
    const results = await db.executeSql(`SELECT * FROM ${mealtable}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        mealItems.push(result.rows.item(index));
      }
    });
    return mealItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get mealItems!');
  }
};

export const getTodayMealItems = async (
  db: SQLiteDatabase,
): Promise<MealItem[]> => {
  try {
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString();
    const mealItems: MealItem[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${mealtable} where day = ${formattedDate}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        mealItems.push(result.rows.item(index));
      }
    });
    return mealItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get mealItems!');
  }
};

export const getTodayBreakfastItems = async (
  db: SQLiteDatabase,
): Promise<MealItem[]> => {
  try {
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString();
    const mealItems: MealItem[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${mealtable} where day = ${formattedDate} && type = 0`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        mealItems.push(result.rows.item(index));
      }
    });
    return mealItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get mealItems!');
  }
};

export const getTodayLunchItems = async (
  db: SQLiteDatabase,
): Promise<MealItem[]> => {
  try {
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString();
    const mealItems: MealItem[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${mealtable} where day = ${formattedDate} && type = 1`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        mealItems.push(result.rows.item(index));
      }
    });
    return mealItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get mealItems!');
  }
};

export const getTodayDinnerItems = async (
  db: SQLiteDatabase,
): Promise<MealItem[]> => {
  try {
    const currentDate: Date = new Date();
    const formattedDate: string = currentDate.toLocaleDateString();
    const mealItems: MealItem[] = [];
    const results = await db.executeSql(
      `SELECT * FROM ${mealtable} where day = ${formattedDate} && type = 2`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        mealItems.push(result.rows.item(index));
      }
    });
    return mealItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get mealItems!');
  }
};

export const saveFoodItems = async (
  db: SQLiteDatabase,
  foodItems: FoodItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${foodtable}(id, name, calories, protein, fiber` +
    foodItems
      .map(
        i =>
          `(${i.id}, '${i.name}', '${i.calories}', '${i.carbs}', '${i.protein}', '${i.fiber}')`,
      )
      .join(',');

  return db.executeSql(insertQuery);
};

export const saveFoodItem = async (db: SQLiteDatabase, foodItem: FoodItem) => {
  const insertQuery = `
    INSERT OR REPLACE INTO ${foodtable}
    (name, calories, carbs, protein, fiber)
    VALUES (?, ?, ?, ?, ?);
  `;

  const params = [
    foodItem.name,
    foodItem.calories,
    foodItem.carbs,
    foodItem.protein,
    foodItem.fiber,
  ];

  return db.executeSql(insertQuery, params);
};

export const saveMealItems = async (
  db: SQLiteDatabase,
  mealItems: MealItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${mealtable}(day, type, foods, servings, calories, carbs, protein, fiber` +
    mealItems
      .map(
        i =>
          `(${i.day}, '${i.type}', '${i.foods}', '${i.servings}', '${i.calories}', '${i.carbs}', '${i.protein}', '${i.fiber}')`,
      )
      .join(',');

  return db.executeSql(insertQuery);
};

export const saveMealItem = async (db: SQLiteDatabase, mealItem: MealItem) => {
  const insertQuery = `
    INSERT OR REPLACE INTO ${mealtable}
    (day, type, foods, servings, calories, carbs, protein, fiber)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const params = [
    mealItem.day,
    mealItem.type,
    mealItem.foods,
    mealItem.servings,
    mealItem.calories,
    mealItem.carbs,
    mealItem.protein,
    mealItem.fiber,
  ];
  return db.executeSql(insertQuery, params);
};

export const deleteFoodItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${foodtable} WHERE id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteMealItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${mealtable} WHERE id = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteFoodTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${foodtable}`;

  await db.executeSql(query);
};

export const deleteMealTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${mealtable}`;

  await db.executeSql(query);
};
