-- migrate:up
CREATE TABLE seats (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`seat_info` VARCHAR(20) NOT NULL
);

-- migrate:down
DROP TABLE seats; 
