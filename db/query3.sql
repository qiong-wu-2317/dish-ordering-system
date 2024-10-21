--a query to find restaurants that average dish price is lower than $25
SELECT 
r.restaurant_name, r.restaurant_address, r.opening_time, min(d.price) AS min_dish_price, max(d.price) AS max_dish_price,
rank() OVER (ORDER BY avg(d.price)) AS cheapness_rank
FROM 
Restaurant AS r
LEFT JOIN dish AS d
GROUP BY d.restaurant_id
HAVING avg(d.price)  < 25
order by cheapness_rank