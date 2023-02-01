-- migrate:up
CREATE TABLE `orders_status`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`status_type` VARCHAR(20)
);

-- migrate:down
DROP TABLE `orders_status`;
