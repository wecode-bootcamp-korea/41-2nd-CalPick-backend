-- migrate:up
ALTER TABLE `orders` 
CHANGE `order_pk` `order_code` VARCHAR(100);

-- migrate:down

