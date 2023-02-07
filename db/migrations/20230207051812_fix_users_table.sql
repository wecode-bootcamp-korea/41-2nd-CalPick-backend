-- migrate:up
ALTER TABLE `users` MODIFY `social_type_id` INT NULL;

-- migrate:down

