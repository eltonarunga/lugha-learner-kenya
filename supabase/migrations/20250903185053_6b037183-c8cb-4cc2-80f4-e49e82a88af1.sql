-- Add questions for Swahili Basic Greetings lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index) VALUES
('994c920b-1395-41ec-a8ec-fa9c60b0d09a', 'How do you say "Hello" in Swahili?', 
 ARRAY['Jambo', 'Asante', 'Karibu', 'Kwaheri'], 0, 
 'Jambo is the most common greeting in Swahili, similar to "Hello" in English.', 1),
('994c920b-1395-41ec-a8ec-fa9c60b0d09a', 'What does "Habari" mean?', 
 ARRAY['Goodbye', 'News/How are things?', 'Thank you', 'Welcome'], 1, 
 'Habari means "news" and is used as a greeting asking "how are things?" or "what''s the news?"', 2),
('994c920b-1395-41ec-a8ec-fa9c60b0d09a', 'How do you say "Good morning" in Swahili?', 
 ARRAY['Habari za jioni', 'Habari za asubuhi', 'Habari za mchana', 'Habari za usiku'], 1, 
 'Habari za asubuhi means "good morning" - literally "news of the morning".', 3);

-- Add questions for Swahili Family Words lesson  
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index) VALUES
('30e25a23-ac9e-4c68-a585-77f6e9dd55a4', 'How do you say "mother" in Swahili?', 
 ARRAY['Baba', 'Mama', 'Dada', 'Kaka'], 1, 
 'Mama means mother in Swahili.', 1),
('30e25a23-ac9e-4c68-a585-77f6e9dd55a4', 'What does "Baba" mean?', 
 ARRAY['Brother', 'Sister', 'Father', 'Uncle'], 2, 
 'Baba means father in Swahili.', 2),
('30e25a23-ac9e-4c68-a585-77f6e9dd55a4', 'How do you say "child" in Swahili?', 
 ARRAY['Mtoto', 'Mzee', 'Ndugu', 'Rafiki'], 0, 
 'Mtoto means child in Swahili.', 3);

-- Add questions for Swahili Numbers lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index) VALUES
('35ab3cea-bbfc-4e9b-801f-f9480d07544a', 'How do you say "one" in Swahili?', 
 ARRAY['Moja', 'Mbili', 'Tatu', 'Nne'], 0, 
 'Moja means one in Swahili.', 1),
('35ab3cea-bbfc-4e9b-801f-f9480d07544a', 'What number is "tano"?', 
 ARRAY['Three', 'Four', 'Five', 'Six'], 2, 
 'Tano means five in Swahili.', 2),
('35ab3cea-bbfc-4e9b-801f-f9480d07544a', 'How do you say "ten" in Swahili?', 
 ARRAY['Saba', 'Nane', 'Tisa', 'Kumi'], 3, 
 'Kumi means ten in Swahili.', 3);

-- Add questions for Kikuyu Basic Greetings lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index) VALUES
('020df148-a8cd-400a-a6e8-accbffb2b4ca', 'How do you say "Hello" in Kikuyu?', 
 ARRAY['Wega', 'Asante', 'Githomo', 'Cia'], 0, 
 'Wega is a common greeting in Kikuyu.', 1),
('020df148-a8cd-400a-a6e8-accbffb2b4ca', 'What does "Wikire atia?" mean?', 
 ARRAY['Good morning', 'How are you?', 'Thank you', 'Goodbye'], 1, 
 'Wikire atia? means "How are you?" in Kikuyu.', 2);

-- Add questions for Luo Basic Greetings lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index) VALUES
('d473572b-7d2e-481e-a7fa-0c77349080cd', 'How do you say "Hello" in Luo?', 
 ARRAY['Misawa', 'Erokamano', 'Amosi', 'Oriti'], 0, 
 'Misawa is a common greeting in Luo.', 1),
('d473572b-7d2e-481e-a7fa-0c77349080cd', 'What does "Idhi nadi?" mean?', 
 ARRAY['Good evening', 'How are you?', 'Welcome', 'Thank you'], 1, 
 'Idhi nadi? means "How are you?" in Luo.', 2);

-- Add proverb questions for Nandi Proverbs lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index, proverb_text, cultural_meaning, language_origin) VALUES
('a9d2ad75-3c03-4c80-a205-0133baa01507', 'What does the Nandi proverb "Kibagenge ne tilil" teach us?', 
 ARRAY['Patience brings wisdom', 'Unity is strength', 'Hard work pays off', 'Respect your elders'], 1, 
 'This proverb emphasizes the importance of working together and supporting each other in the community.',
 1, 'Kibagenge ne tilil', 'Unity is strength - when people come together, they can accomplish great things', 'Nandi'),
('a9d2ad75-3c03-4c80-a205-0133baa01507', 'What is the meaning of "Magutyo ne bulyonto"?', 
 ARRAY['Love conquers all', 'Knowledge is power', 'Time heals wounds', 'Actions speak louder than words'], 1, 
 'This proverb teaches that wisdom and knowledge are the most valuable possessions one can have.',
 2, 'Magutyo ne bulyonto', 'Knowledge is power - education and wisdom are the greatest treasures', 'Nandi');

-- Add proverb questions for Swahili Sayings lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index, proverb_text, cultural_meaning, language_origin) VALUES
('3ac5be1a-37e1-4c56-b7a2-f1a8847d58a2', 'What does "Haba na uongozi" mean?', 
 ARRAY['Love and leadership', 'Patience and wisdom', 'Unity and strength', 'Hope and guidance'], 0, 
 'This Swahili saying emphasizes that good leadership must be coupled with love and compassion.',
 1, 'Haba na uongozi', 'Love and leadership go hand in hand - effective leaders lead with their hearts', 'Swahili'),
('3ac5be1a-37e1-4c56-b7a2-f1a8847d58a2', 'What is the wisdom behind "Subira huvuta heri"?', 
 ARRAY['Hard work brings success', 'Patience brings good fortune', 'Unity creates strength', 'Knowledge is power'], 1, 
 'This proverb teaches that patience and perseverance will eventually lead to good outcomes.',
 2, 'Subira huvuta heri', 'Patience brings good fortune - those who wait and persevere will be rewarded', 'Swahili');

-- Add proverb questions for Luo Traditional Wisdom lesson
INSERT INTO questions (lesson_id, question_text, options, correct_answer, explanation, order_index, proverb_text, cultural_meaning, language_origin) VALUES
('e1b86033-70f7-48b0-b2b5-a1f0a0b6ee9d', 'What does the Luo saying "Rieko dwaro chuny maber" teach?', 
 ARRAY['Wisdom requires a good heart', 'Strength comes from unity', 'Knowledge is inherited', 'Patience brings peace'], 0, 
 'This proverb emphasizes that true wisdom can only come from having a pure and good heart.',
 1, 'Rieko dwaro chuny maber', 'Wisdom requires a good heart - intelligence without moral character is meaningless', 'Luo'),
('e1b86033-70f7-48b0-b2b5-a1f0a0b6ee9d', 'What is the meaning of "Oganda mo emomiyo teko"?', 
 ARRAY['Knowledge brings power', 'Unity gives strength', 'Patience brings wisdom', 'Love conquers all'], 1, 
 'This saying teaches that when people come together as one community, they become strong and powerful.',
 2, 'Oganda mo emomiyo teko', 'Unity gives strength - a united community is powerful and resilient', 'Luo');