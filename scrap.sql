\c nc_games_test

SELECT * FROM reviews 
WHERE category = 'social deduction'
ORDER BY created_at DESC;

