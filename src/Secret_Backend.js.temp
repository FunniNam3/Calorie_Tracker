import { Alert } from 'react-native';
import * as sqlite from 'sqlite3';

function startDB() {
  db = new sqlite.Database('../databases/tracker.db', err => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
    }
  });

  db.run(
    `CREATE TABLE IF NOT EXISTS meals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      day DATE NOT NULL,
      type TEXT NOT NULL,
      food TEXT NOT NULL,
      servings TEXT NOT NULL
    )`,
    err => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created successfully.');
      }
    },
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS food (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      calories FLOAT,
      protien FLOAT,
      fiber FLOAT
    )`,
    err => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Table created successfully.');
      }
    },
  );

  db.close(err => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

function dropDB(drop) {
  db = new sqlite.Database('../databases/tracker.db', err => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
    }
  });

  if (typeof drop !== 'string') {
    console.error('Error: drop must be string');
    return;
  } else {
    db.run('DROP TABLE' + drop, err => {
      if (err) {
        console.error('Error dropping table', err.message);
      } else {
        console.log('Table dropped');
      }
    });
  }

  db.close(err => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

function addToDB(select, item) {
  db = new sqlite.Database('../databases/tracker.db', err => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
    }
  });

  if (typeof select !== 'string') {
    console.error('Error: select must be string');
    return;
  } else if (select === 'meals') {
    db.run(
      'INSERT INTO meals (day, type, food, servings) VALUES (?, ?, ?, ?);',
      item,
      function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
        } else {
          console.log('Data inserted successfully. Last ID:', this.lastID);
        }
      },
    );
  } else if (select === 'food') {
    db.run(
      'INSERT INTO food (name, calories, protien, fiber) VALUES (?, ?, ?, ?);',
      item,
      function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
        } else {
          console.log('Data inserted successfully. Last ID:', this.lastID);
        }
      },
    );
  }

  db.close(err => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

function editDB(selectDB, id, item, edit) {
  db = new sqlite.Database('../databases/tracker.db', err => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
    }
  });

  if (typeof selectDB !== 'string') {
    console.error('Error: select must be string');
    return;
  } else if (selectDB === 'food' || selectDB === 'meals') {
    db.run(
      'UPDATE ' + selectDB + ' SET ' + item + '= (?) WHERE id=(?);',
      [edit, id],
      function (err) {
        if (err) {
          console.error('Error updating data:', err.message);
        } else {
          console.log('Data updated successfully. Last ID:', this.lastID);
        }
      },
    );
  }

  db.close(err => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

function deleteItem(selectDB, id) {
  db = new sqlite.Database('../databases/tracker.db', err => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the database.');
    }
  });

  if (typeof selectDB !== 'string') {
    console.error('Error: select must be string');
    return;
  } else if (selectDB === 'food' || selectDB === 'meals') {
    db.run('DELETE FROM ' + selectDB + ' WHERE id=(?);', id, function (err) {
      if (err) {
        console.error('Error updating data:', err.message);
      } else {
        console.log('Data updated successfully. Last ID:', this.lastID);
      }
    });
  }

  db.close(err => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
}

function getAll(selectDB) {
  if (typeof selectDB !== 'string') {
    console.error('Error: select must be string');
    return;
  } else if (selectDB === 'food' || selectDB === 'meals') {
    db = new sqlite.Database('../databases/tracker.db', err => {
      if (err) {
        console.error('Error opening database:', err.message);
      } else {
        console.log('Connected to the database.');
      }
    });

    db.all('SELECT * FROM food', (err, rows) => {
      if (err) {
        console.error('Error querying data:', err.message);
      } else {
        rows.forEach(row => Alert.alert(row));
      }
    });

    db.close(err => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
}

/////////////////////////////////////////////////////////////////////////////

// SAMPLE CODE

// const sqlite = require('sqlite').verbose();

// editDB('food', 1, 'id', 1);

// addToDB('food', ['chicken tender', 112, 7, 0.3]);

// deleteItem('food', 1);

// db = new sqlite.Database('../databases/tracker.db', err => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to the database.');
//   }
// });

// db.all('SELECT * FROM food', (err, rows) => {
//   if (err) {
//     console.error('Error querying data:', err.message);
//   } else {
//     rows.forEach(row => console.log(row));
//   }
// });

// db.close(err => {
//   if (err) {
//     console.error('Error closing database:', err.message);
//   } else {
//     console.log('Database connection closed.');
//   }
// });

/////////////////////////////////////////////////////////////////////////////

export { startDB, dropDB, addToDB, editDB, getAll };
