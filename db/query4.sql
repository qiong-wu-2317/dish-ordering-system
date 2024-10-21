--query the delivery that car model do not contain 'o', routes passed 'court' and order date between '3/01/2024' AND '7/01/2024'
SELECT 
de.delivery_id, de.delivery_status, o.order_date, dd.driver_name
FROM 
Delivery AS de
LEFT JOIN Delivery_Route AS dr USING (delivery_id)
LEFT JOIN Driver AS dd USING (driver_id)
LEFT JOIN Orders AS o USING (orders_id)
WHERE
dd.car_model NOT LIKE '%o%'
AND
(dr.start_location LIKE '%Court%' OR dr.end_location LIKE '%Court%')
AND
order_date BETWEEN '3/01/2024' AND '7/01/2024'