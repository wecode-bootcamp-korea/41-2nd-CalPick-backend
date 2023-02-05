-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
-- ALTER TABLE `tests`DROP FOREIGN KEY `tests_site_seat_fk`;
-- ALTER TABLE `tests` CHANGE `test_site_seat_id` `tests_site_id` INT NOT NULL;
ALTER TABLE `tests` ADD CONSTRAINT `test_site_fk` FOREIGN KEY (tests_site_id) REFERENCES test_sites (id);
SET FOREIGN_KEY_CHECKS = 1;
-- migrate:down

