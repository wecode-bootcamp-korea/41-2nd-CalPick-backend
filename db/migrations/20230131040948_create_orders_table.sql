-- migrate:up
CREATE TABLE `orders`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`order_name` VARCHAR(50) NOT NULL,
`total_amount` DECIMAL(10, 3) NOT NULL,
`order_pk` VARCHAR(100) NOT NULL,
`user_id` INT NOT NULL,
`test_id` INT NOT NULL,
`order_status_id` INT NOT NULL,
`created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT orders_user_fk FOREIGN KEY (user_id) REFERENCES users (id),
CONSTRAINT orders_test_fk FOREIGN KEY (test_id) REFERENCES tests (id),
CONSTRAINT orders_status_fk FOREIGN KEY (order_status_id) REFERENCES orders_status (id)
ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `orders`;


