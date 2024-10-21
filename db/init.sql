CREATE TABLE IF NOT EXISTS "User" (
        "user_id"       INTEGER,
        "login_name"    TEXT NOT NULL UNIQUE,
        "password"      TEXT NOT NULL,
        "type"  TEXT NOT NULL CHECK(type in ("Customer", "Driver", "Restaurant")),
        PRIMARY KEY("user_id" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Customer" (
        "customer_id"   INTEGER,
        "customer_name" TEXT NOT NULL,
        "delivery_address"      TEXT,
        "phone_number"  TEXT,
        PRIMARY KEY("customer_id"),
        FOREIGN KEY("customer_id") REFERENCES "User"("user_id")
);

CREATE TABLE IF NOT EXISTS "Restaurant" (
        "restaurant_id" INTEGER,
        "restaurant_name"       TEXT,
        "restaurant_address"    TEXT,
        "opening_time"  TEXT,
        "contact"       TEXT,
        PRIMARY KEY("restaurant_id"),
        FOREIGN KEY("restaurant_id") REFERENCES "User"("user_id")
);

CREATE TABLE IF NOT EXISTS "Driver" (
        "driver_id"     INTEGER,
        "car_model"     TEXT,
        "car_color"     TEXT,
        "driver_license"        TEXT,
        "license_plate" TEXT,
        "phone_number"  TEXT,
        PRIMARY KEY("driver_id"),
        FOREIGN KEY("driver_id") REFERENCES "User"("user_id")
);

CREATE TABLE IF NOT EXISTS "Dish" (
        "dish_id"       INTEGER,
        "restaurant_id" INTEGER,
        "item_name"     TEXT NOT NULL,
        "price" REAL NOT NULL DEFAULT 0,
        "introduction"  TEXT,
        PRIMARY KEY("dish_id" AUTOINCREMENT)
        FOREIGN KEY("restaurant_id") REFERENCES "Restaurant"("restaurant_id")
);

CREATE TABLE IF NOT EXISTS "Orders" (
        "orders_id"      INTEGER,
        "customer_id"   INTEGER NOT NULL,
        "order_date"    TEXT NOT NULL,
        "delivery_window_id"    INTEGER,
        "order_status"  TEXT NOT NULL CHECK(order_status in ("Pending", "Delivery", "Done")),
        PRIMARY KEY("orders_id" AUTOINCREMENT),
        FOREIGN KEY("customer_id") REFERENCES "Customer"("customer_id")
        FOREIGN KEY("delivery_window_id") REFERENCES "Delivery_Window"("delivery_window_id")
);

CREATE TABLE IF NOT EXISTS "Order_Item" (
        "order_item_id" INTEGER,
        "orders_id"      INTEGER NOT NULL,
        "dish_id"       INTEGER NOT NULL,
        "quantity"      INTEGER NOT NULL,
        PRIMARY KEY("order_item_id" AUTOINCREMENT),
        FOREIGN KEY("dish_id") REFERENCES "Dish"("dish_id"),
        FOREIGN KEY("orders_id") REFERENCES "Order"("orders_id")
);

CREATE TABLE IF NOT EXISTS "Delivery" (
        "delivery_id"   INTEGER,
        "orders_id"      INTEGER NOT NULL,
        "driver_id"     INTEGER NOT NULL,
        "delivery_status"       TEXT NOT NULL CHECK(delivery_status in ("Delivery", "Done")),
        "delivery_date" DATE NOT NULL,
        PRIMARY KEY("delivery_id" AUTOINCREMENT),
        FOREIGN KEY("driver_id") REFERENCES "Driver"("driver_id"),
        FOREIGN KEY("orders_id") REFERENCES "Order"("orders_id")
);

CREATE TABLE IF NOT EXISTS "Delivery_Route" (
        "delivery_route_id"     INTEGER,
        "delivery_id"   INTEGER NOT NULL,
        "start_location"        TEXT NOT NULL,
        "end_location"  TEXT NOT NULL,
        "sequence"      INTEGER NOT NULL,
        "start_time"    DATE NOT NULL,
        "end_time"      DATE NOT NULL,
        PRIMARY KEY("delivery_route_id" AUTOINCREMENT),
        FOREIGN KEY("delivery_id") REFERENCES "Delivery"("delivery_id")
);

CREATE TABLE "Delivery_Window" (
        "delivery_window_id"    INTEGER,
        "start_time"    DATE NOT NULL,
        "end_time"      DATE NOT NULL,
        PRIMARY KEY("delivery_window_id" AUTOINCREMENT)
);