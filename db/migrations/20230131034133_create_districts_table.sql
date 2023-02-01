-- migrate:up
CREATE TABLE `districts` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`province_id` INT NOT NULL,
  `name` VARCHAR(20) NOT NULL,
	CONSTRAINT distircts_province_fk FOREIGN KEY (province_id) REFERENCES provinces (id)
	ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `districts`;
