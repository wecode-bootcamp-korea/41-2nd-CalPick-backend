-- migrate:up
DROP index `mobile_number` ON `verification_codes`;
ALTER TABLE `verification_codes` ADD UNIQUE KEY (mobile_number, verification_code);
-- migrate:down

