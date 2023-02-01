-- migrate:up
CREATE TABLE `payments`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`order_id` INT NOT NULL,
`payment_type_id` INT NOT NULL,
`payment_status_id` INT NOT NULL,
`currency` VARCHAR(20) NOT NULL,
`payment_key` INT NOT NULL UNIQUE,
CONSTRAINT payments_types_fk FOREIGN KEY (payment_type_id) REFERENCES payments_types (id),
CONSTRAINT payments_status_fk FOREIGN KEY (payment_status_id) REFERENCES payments_status (id)
ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `payments`;
