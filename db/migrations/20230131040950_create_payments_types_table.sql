-- migrate:up
CREATE TABLE `payments_types`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`payment_types` VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE `payments_types`;