-- 1st event for account_id-1 -> public event but only 1 user under the account
INSERT INTO user_events (user_id, event_id, account_id) VALUES (1, 1, 1); 
--2nd event for account_id-3 ->, public event seen by both users under the account 
INSERT INTO user_events (user_id, event_id, account_id) VALUES (3, 2, 3);
INSERT INTO user_events (user_id, event_id, account_id) VALUES (4, 2, 3);
--3rd event for account_id-3 -> private event, only seen by Leon
INSERT INTO user_events (user_id, event_id, account_id) VALUES (4, 3, 3);
-- 4th event, public event--therefore seen by all 3 users under the account 
INSERT INTO user_events (user_id, event_id, account_id) VALUES (5, 4, 4); 
INSERT INTO user_events (user_id, event_id, account_id) VALUES (6, 4, 4); 
INSERT INTO user_events (user_id, event_id, account_id) VALUES (7, 4, 4); 