-- migrate:up
CREATE TABLE `calendars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(50) NOT NULL,
  `class_name` varchar(20) DEFAULT 'ticket',
  `color` varchar(100) NOT NULL DEFAULT 'pink',
  `editable` tinyint(1) DEFAULT '1',
  `start_editable` tinyint(1) DEFAULT '1',
  `duration_editable` tinyint(1) DEFAULT '1',
  `resource_editable` tinyint(1) DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(1000) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `calendar_user_id_fk` (`user_id`),
  CONSTRAINT `calendar_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);
-- migrate:down
DROP TABLE `calendars`
