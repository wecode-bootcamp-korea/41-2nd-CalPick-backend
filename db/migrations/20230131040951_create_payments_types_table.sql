-- migrate:up
CREATE TABLE `payments_status`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`payment_status` VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE `payments_status`;
