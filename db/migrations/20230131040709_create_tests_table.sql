-- migrate:up
CREATE TABLE `tests` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`test_category_id` INT NULL,
`test_date` DATETIME NOT NULL,
`test_site_seat_id` INT NOT NULL,
CONSTRAINT tests_category_fk FOREIGN KEY (test_category_id) REFERENCES test_categories (id),
CONSTRAINT tests_site_seat_fk FOREIGN KEY (test_site_seat_id) REFERENCES test_sites_seats (id)
ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `tests`;
