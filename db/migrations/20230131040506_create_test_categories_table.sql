-- migrate:up
CREATE TABLE `test_categories` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE `test_categories`;
