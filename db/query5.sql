--query to see orders wanted delivery time and suggested delivery time.
select orders_id, order_date, 
dw.start_time||" to "||dw.end_time AS wanted_window,
( 
	CASE
		WHEN count(DISTINCT d.restaurant_id) <3 
		THEN '9:00AM to 11:00AM'
		ELSE '1:00PM to 4:00PM'
	END
) AS suggested_window
from Orders AS o
left join Order_Item AS oi USING(orders_id)
LEFT JOIN Dish as d ON oi.dish_id = d.dish_id
left join Delivery_Window AS dw USING(delivery_window_id)
GROUP BY o.orders_id