-- migrate:up
CREATE Table `social_types`(
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `type` VARCHAR(50) NOT NULL
);

-- migrate:down
DROP TABLE `social_types`; 
