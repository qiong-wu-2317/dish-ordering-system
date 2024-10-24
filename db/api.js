import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function getRestaurants(query, page, pageSize) {
  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    SELECT * FROM Restaurant
    WHERE restaurant_name LIKE @query
    ORDER BY restaurant_name
    LIMIT @pageSize
    OFFSET @offset;
  `);

  const params = {
    "@query": "%"+ query + "%",
    "@pageSize": pageSize || 10000,
    "@offset": ((page||1) - 1) * pageSize,
  };

  try {
    return await stmt.all(params);
  } finally {
    await stmt.finalize();
    db.close();
  }
}

export async function getRestaurantCount(query) {

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    SELECT COUNT(*) AS count
    FROM Restaurant
    WHERE restaurant_name LIKE @query
  `);

  const params = {
    "@query": "%"+ query + "%",
  };

  try {
    return (await stmt.get(params)).count;
  } finally {
    await stmt.finalize();
    db.close();
  }
}

export async function getRestaurantByID(restaurant_id) {
  console.log("getRestaurantByID", restaurant_id);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    SELECT * FROM Restaurant
    WHERE restaurant_id = @restaurant_id;
  `);

  const params = {
    "@restaurant_id": restaurant_id,
  };

  try {
    return await stmt.get(params);
  } finally {
    await stmt.finalize();
    db.close();
  }
}

export async function updateRestaurantByID(restaurant_id, rest) {
  console.log("updateReferenceByID", restaurant_id, rest);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    UPDATE Restaurant
    SET
      restaurant_name = @restaurant_name,
      restaurant_address = @restaurant_address,
      opening_time = @opening_time,
      contact = @contact
    WHERE
      restaurant_id = @restaurant_id;
  `);

  const params = {
    "@restaurant_id": restaurant_id,
    "@restaurant_name": rest.restaurant_name,
    "@restaurant_address": rest.restaurant_address,
    "@opening_time": rest.opening_time,
    "@contact": rest.contact
  };

  try {
    return await stmt.run(params);
  } finally {
    await stmt.finalize();
    db.close();
  }
}

export async function deleteRestaurantByID(restaurant_id) {
  console.log("deleteRestaurantByID", restaurant_id);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    DELETE FROM Restaurant
    WHERE
      restaurant_id = @restaurant_id;
  `);

  const params = {
    "@restaurant_id": restaurant_id,
  };

  try {
    return await stmt.run(params);
  } finally {
    await stmt.finalize();
    db.close();
  }
}

export async function insertRestaurant(rest) {
  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`INSERT INTO
    Restaurant(restaurant_name, restaurant_address, opening_time, contact)
    VALUES (@restaurant_name, @restaurant_address, @opening_time, @contact);`);

  try {
    return await stmt.run({
      "@restaurant_name": rest.restaurant_name,
      "@restaurant_address": rest.restaurant_address,
      "@opening_time": rest.opening_time,
      "@contact": rest.contact
    });
  } finally {
    await stmt.finalize();
    db.close();
  }
}

export async function getDishesByRestaurantID(restaurant_id) {
  console.log("getAuthorsByReferenceID", restaurant_id);

  const db = await open({
    filename: "./db/database.db",
    driver: sqlite3.Database,
  });

  const stmt = await db.prepare(`
    SELECT * FROM Dish
    WHERE restaurant_id = @restaurant_id;
  `);

  const params = {
    "@restaurant_id": restaurant_id,
  };

  try {
    return await stmt.all(params);
  } finally {
    await stmt.finalize();
    db.close();
  }
}


export async function getDishes(query, page, pageSize) {

    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
  
    const stmt = await db.prepare(`
      SELECT Dish.*, Restaurant.restaurant_name FROM Dish
      LEFT JOIN Restaurant USING(restaurant_id)
      WHERE dish_name LIKE @query
      ORDER BY price
      LIMIT @pageSize
      OFFSET @offset;
    `);
  
    const params = {
      "@query": "%"+ query + "%",
      "@pageSize": pageSize,
      "@offset": (page - 1) * pageSize,
    };
  
    try {
      return await stmt.all(params);
    } finally {
      await stmt.finalize();
      db.close();
    }
  }
  
  export async function getDishCount(query) {
  
    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
  
    const stmt = await db.prepare(`
      SELECT COUNT(*) AS count
      FROM Dish
      WHERE dish_name LIKE @query
    `);
  
    const params = {
      "@query": "%"+ query + "%",
    };
  
    try {
      return (await stmt.get(params)).count;
    } finally {
      await stmt.finalize();
      db.close();
    }
  }

  export async function insertDish(res) {
    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
  
    const stmt = await db.prepare(`INSERT INTO
      Dish(dish_name, restaurant_id, price, introduction)
      VALUES (@dish_name, @restaurant_id, @price, @introduction);`);
  
    try {
      return await stmt.run({
        "@dish_name": res.dish_name,
        "@restaurant_id": res.restaurant_id,
        "@price": res.price,
        "@introduction": res.introduction
      });
    } finally {
      await stmt.finalize();
      db.close();
    }
  }

  export async function deleteDishByID(dish_id) {
    console.log("deleteDishByID", dish_id);
  
    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
  
    const stmt = await db.prepare(`
      DELETE FROM Dish
      WHERE
        dish_id = @dish_id;
    `);
  
    const params = {
      "@dish_id": dish_id,
    };
  
    try {
      return await stmt.run(params);
    } finally {
      await stmt.finalize();
      db.close();
    }
  }

  export async function getDishByID(dish_id) {
    console.log("getDishByID", dish_id);
  
    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
  
    const stmt = await db.prepare(`
      SELECT Dish.*, Restaurant.restaurant_name FROM Dish
      LEFT JOIN Restaurant USING(restaurant_id)
      WHERE dish_id = @dish_id;
    `);
  
    const params = {
      "@dish_id": dish_id,
    };
  
    try {
      return await stmt.get(params);
    } finally {
      await stmt.finalize();
      db.close();
    }
  }
  
  export async function updateDishByID(dish_id, dish) {
    console.log("updateDishByID", dish_id, dish);
  
    const db = await open({
      filename: "./db/database.db",
      driver: sqlite3.Database,
    });
  
    const stmt = await db.prepare(`
      UPDATE Dish
      SET
        restaurant_id = @restaurant_id,
        price = @price,
        introduction = @introduction
      WHERE
        dish_id = @dish_id;
    `);
  
    const params = {
      "@restaurant_id": dish.restaurant_id,
      "@dish_id": dish_id,
      "@price": dish.price,
      "@introduction": dish.introduction
    };
  
    try {
      return await stmt.run(params);
    } finally {
      await stmt.finalize();
      db.close();
    }
  }