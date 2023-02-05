-- migrate:up
ALTER TABLE `tests` ADD `date_register_by` DATETIME NOT NULL;
ALTER TABLE `tests` ADD `date_release_by` DATETIME NOT NULL;

-- migrate:down

