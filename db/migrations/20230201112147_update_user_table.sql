-- migrate:up
ALTER TABLE `users` 
MODIFY `mobile_number` VARCHAR(20) NULL;

-- migrate:down

