-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE `tests` DROP FOREIGN KEY `tests_site_seat_fk`;
ALTER TABLE `tests` DROP `test_site_seat_id`;
ALTER TABLE `tests` ADD `test_site_id` INT NOT NULL; 
ALTER TABLE `tests` ADD CONSTRAINT `tests_site_fk` FOREIGN KEY (test_site_id) REFERENCES test_sites (id);

-- migrate:down
