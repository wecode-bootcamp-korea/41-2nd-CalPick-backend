-- migrate:up
CREATE TABLE `provinces` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE provinces;
