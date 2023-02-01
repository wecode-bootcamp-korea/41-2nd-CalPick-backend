-- migrate:up
CREATE TABLE `verification_codes`(
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`verification_code` INT NOT NULL,
`created_at` DATETIME NOT NULL, 
`expiry_at` DATETIME NOT NULL 
);

-- migrate:down
DROP TABLE `verification_codes`;