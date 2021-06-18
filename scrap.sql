\c nc_games_test

SELECT comments.comment_id, comments.votes, comments.created_at, comments.author, comments.body FROM comments
WHERE comments.review_id = 2
ORDER BY created_at DESC;

