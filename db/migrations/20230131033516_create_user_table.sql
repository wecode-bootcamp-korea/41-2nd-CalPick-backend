-- migrate:up
CREATE TABLE `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(200) NULL,
	`mobile_number` VARCHAR(50) NULL
  `user_name` VARCHAR(50) NULL DEFAULT "USER",
	`social_pk` VARCHAR(200) UNIQUE NULL,
	`social_type_id` INT NOT NULL,
	`mobile_number` VARCHAR(20) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT users_social_fk FOREIGN KEY users (soical_type_id) REFERENCES social_types (id)
	ON DELETE CASCADE
);

-- migrate:down
DROP TABLE users; 




