-- migrate:up
CREATE TABLE `test_sites` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(200) NOT NULL,
  `district_id` INT NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `lat` DECIMAL(20, 15) NOT NULL,
  `lng` DECIMAL(20, 15) NOT NULL,
  CONSTRAINT test_sites_districts_fk FOREIGN KEY (district_id) REFERENCES districts (id)
  ON DELETE CASCADE 
);

-- migrate:down
DROP TABLE `test_sites`; 
