-- migrate:up
ALTER TABLE `test_sites` ADD `seats_num` INT NOT NULL DEFAULT 25; 

-- migrate:down

