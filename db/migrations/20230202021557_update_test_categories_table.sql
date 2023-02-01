-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE `test_categories` ADD `price` DECIMAL(10, 3) NOT NULL; 
SET FOREIGN_KEY_CHECKS = 1;
-- migrate:down

