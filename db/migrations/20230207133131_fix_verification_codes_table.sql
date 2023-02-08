-- migrate:up
ALTER TABLE `verification_codes` DROP `verification_code`;
ALTER TABLE `verification_codes` DROP `mobile_number`;
ALTER TABLE `verification_codes` ADD `verification_code` VARCHAR(20) NOT NULL;
ALTER TABLE `verification_codes` ADD `mobile_number` VARCHAR(20) NOT NULL;
ALTER TABLE `verification_codes` ADD UNIQUE KEY (mobile_number, verification_code);

-- migrate:down

