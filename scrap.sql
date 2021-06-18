\c nc_games_test

SELECT reviews.owner, reviews.title, reviews.review_id, reviews.category, reviews.review_img_url, reviews.created_at, reviews.votes, COUNT(*) AS comment_count 
FROM reviews 
LEFT JOIN comments 
ON reviews.review_id = comments.review_id 
WHERE reviews.category = 'social deduction' 
GROUP BY reviews.review_id 
ORDER BY created_at DESC;

