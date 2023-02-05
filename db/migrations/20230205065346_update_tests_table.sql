-- migrate:up
ALTER TABLE `tests` ADD `is_booked` BOOLEAN NOT NULL DEFAULT FALSE;

-- migrate:down

