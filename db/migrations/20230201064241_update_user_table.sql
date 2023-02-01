-- migrate:up
ALTER TABLE `users` 
CHANGE `user_name` `username` VARCHAR(50),
CHANGE `social_pk` `social_id` VARCHAR(200);

ALTER TABLE `users`
MODIFY COLUMN `username` VARCHAR(50) NOT NULL;

-- migrate:down

