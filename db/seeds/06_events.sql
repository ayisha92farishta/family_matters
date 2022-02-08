--INSERT into events ( event_name) VALUES ( 'Granma Birthday');
INSERT into events (event_name, event_description, all_day,start_time, end_time) VALUES ('Parent Teacher meeting', 'welcome', FALSE, '13:00:00', '14:30:00');
INSERT into events (event_name,all_day, start_time, end_time, is_private , event_address) VALUES ('Graduation after Party ', FALSE, '17:00:00', '21:00:00', TRUE, 'At Pauls yatch'); -- Private event
INSERT into events (event_name,all_day,start_time, end_time) VALUES ('Soccer Practice', FALSE, '12:00:00', '14:30:00');