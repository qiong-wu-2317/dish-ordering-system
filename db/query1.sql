-- query to see what are customers ordering  in each order
SELECT 
c.customer_name, o.order_date, group_concat(d.dish_name) AS dishes
FROM 
orders AS o
LEFT JOIN Order_Item AS oi USING (orders_id)
LEFT JOIN Dish AS d USING(dish_id)
LEFT JOIN Customer as c USING(customer_id)
GROUP BY oi.orders_id
ORDER BY order_date