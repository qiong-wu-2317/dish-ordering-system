--find restaurants that sells pizza
SELECT 
restaurant_name, restaurant_address, opening_time
FROM
 Restaurant
WHERE
restaurant_id in
(
	SELECT 
	restaurant_id
	FROM
	Dish
	WHERE
	dish_name like '%pizza%'
)