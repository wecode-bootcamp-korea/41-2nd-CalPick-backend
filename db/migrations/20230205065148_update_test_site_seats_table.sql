-- migrate:up
SET FOREIGN_KEY_CHECKS = 0;
ALTER TABLE `test_sites_seats` DROP `is_booked`;
SET FOREIGN_KEY_CHECKS = 1;



-- migrate:down

