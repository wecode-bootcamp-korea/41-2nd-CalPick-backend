-- migrate:up
CREATE TABLE `test_sites_seats` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`seat_id` INT NOT NULL,
`test_site_id` INT NOT NULL,
`is_booked` BOOLEAN NOT NULL DEFAULT FALSE,
CONSTRAINT test_seats_fk FOREIGN KEY (seat_id) REFERENCES seats (id),
CONSTRAINT test_sites_fk FOREIGN KEY (test_site_id) REFERENCES test_sites (id)
ON DELETE CASCADE
);

-- migrate:down
DROP TABLE `test_sites_seats`;
