-- migrate:up
ALTER TABLE `verification_codes` 
ADD mobile_number VARCHAR(20) NOT NULL UNIQUE,
ADD is_verified BOOLEAN DEFAULT FALSE;

-- migrate:down

