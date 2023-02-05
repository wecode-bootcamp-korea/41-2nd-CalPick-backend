-- migrate:up
ALTER TABLE `verification_codes` ADD `verification_code` INT NOT NULL UNIQUE;

-- migrate:down

