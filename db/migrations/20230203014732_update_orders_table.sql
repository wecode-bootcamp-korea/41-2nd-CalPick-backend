-- migrate:up
ALTER TABLE `orders` ADD `seat_info` VARCHAR(20) NOT NULL; 

-- migrate:down

