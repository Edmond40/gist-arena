-- Alter Post.content to LONGTEXT and Post.summary to TEXT
ALTER TABLE `Post`
  MODIFY `content` LONGTEXT NOT NULL,
  MODIFY `summary` TEXT NULL;
