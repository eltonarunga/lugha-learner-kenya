-- Add support for different lesson types and cultural content
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS lesson_type text DEFAULT 'vocabulary';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS cultural_context text;

-- Add proverb-specific fields to questions
ALTER TABLE questions ADD COLUMN IF NOT EXISTS proverb_text text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS cultural_meaning text;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS language_origin text;

-- Insert African proverb lessons
INSERT INTO lessons (title, description, language_code, level, order_index, xp_reward, lesson_type, cultural_context) VALUES
('Wisdom of the Elders: Nandi Proverbs', 'Learn traditional Nandi proverbs and their deeper meanings', 'nandi', 1, 1, 25, 'proverbs', 'Traditional Nandi wisdom passed down through generations'),
('Swahili Sayings', 'Discover the wisdom of Swahili proverbs and cultural expressions', 'swahili', 1, 2, 25, 'proverbs', 'East African coastal wisdom and Bantu cultural values'),
('Luo Traditional Wisdom', 'Explore the profound meanings behind Luo proverbs', 'luo', 1, 3, 25, 'proverbs', 'Nilotic wisdom from the shores of Lake Victoria'),
('Kikuyu Ancestral Teachings', 'Learn from the wisdom of Kikuyu elders and their sayings', 'kikuyu', 1, 4, 25, 'proverbs', 'Central Kenya highland wisdom and Gikuyu traditions');

-- Insert proverb questions for Nandi lesson
INSERT INTO questions (lesson_id, question_text, proverb_text, cultural_meaning, language_origin, options, correct_answer, explanation, order_index) VALUES
((SELECT id FROM lessons WHERE title = 'Wisdom of the Elders: Nandi Proverbs' LIMIT 1), 
'What does this Nandi proverb mean: "A cow falls although it has four legs, so what of a man with two legs"?', 
'A cow falls although it has four legs, so what of a man with two legs',
'Even the strong can fail; we must be humble and not judge others too harshly',
'nandi',
ARRAY['Even the strong can fail; we must be humble', 'Cows are stronger than humans', 'Two legs are better than four', 'Animals are more stable than people'],
0,
'This proverb teaches humility. Even a cow with four stable legs can fall, so humans with only two legs should not judge others who stumble.',
1),

((SELECT id FROM lessons WHERE title = 'Wisdom of the Elders: Nandi Proverbs' LIMIT 1),
'The Nandi saying "The firewood in the attic cannot laugh at the one in the fire" teaches us:',
'The firewood in the attic cannot laugh at the one in the fire',
'Do not mock others'' suffering as you may face the same fate',
'nandi',
ARRAY['Don''t mock others'' suffering; you may face it too', 'Keep firewood dry in the attic', 'Fire is dangerous for wood', 'Attics are safer than fires'],
0,
'This teaches empathy and humility. The firewood waiting in the attic should not mock the wood burning in the fire, as it will eventually face the same fate.',
2);

-- Insert Swahili proverb questions
INSERT INTO questions (lesson_id, question_text, proverb_text, cultural_meaning, language_origin, options, correct_answer, explanation, order_index) VALUES
((SELECT id FROM lessons WHERE title = 'Swahili Sayings' LIMIT 1),
'What wisdom does "Haba ya mvua haijui mlima unaotetemeka" (The rain cloud doesn''t know which mountain trembles) convey?',
'Haba ya mvua haijui mlima unaotetemeka',
'We often don''t realize the impact of our actions on others',
'swahili',
ARRAY['We don''t realize our impact on others', 'Mountains fear rain clouds', 'Weather is unpredictable', 'Clouds are ignorant'],
0,
'This proverb teaches us to be mindful of how our actions affect others, as we may not always see the consequences.',
1),

((SELECT id FROM lessons WHERE title = 'Swahili Sayings' LIMIT 1),
'The Swahili saying "Usiposikiza wazazi wako, dunia itakufunza" means:',
'Usiposikiza wazazi wako, dunia itakufunza',
'If you don''t listen to your parents, the world will teach you',
'swahili',
ARRAY['The world will teach you if you ignore parents', 'Parents know everything', 'Education comes from the world', 'Children should travel'],
0,
'This emphasizes the importance of respecting parental wisdom and guidance to avoid learning harder lessons from life.',
2);

-- Insert Luo proverb questions
INSERT INTO questions (lesson_id, question_text, proverb_text, cultural_meaning, language_origin, options, correct_answer, explanation, order_index) VALUES
((SELECT id FROM lessons WHERE title = 'Luo Traditional Wisdom' LIMIT 1),
'What does the Luo proverb "Jakom ok nyal loko wi nam" (A leader cannot change the mind of the people) teach us?',
'Jakom ok nyal loko wi nam',
'True leadership requires the consent and support of the people',
'luo',
ARRAY['Leadership requires people''s consent', 'Leaders are powerless', 'People never change their minds', 'Democracy is impossible'],
0,
'This proverb emphasizes that effective leadership comes from serving the people and earning their trust, not from force.',
1);

-- Insert Kikuyu proverb questions  
INSERT INTO questions (lesson_id, question_text, proverb_text, cultural_meaning, language_origin, options, correct_answer, explanation, order_index) VALUES
((SELECT id FROM lessons WHERE title = 'Kikuyu Ancestral Teachings' LIMIT 1),
'The Kikuyu saying "Gutiri mwana wa nyina wiki" (There is no child of only their mother) means:',
'Gutiri mwana wa nyina wiki',
'It takes a community to raise a child properly',
'kikuyu',
ARRAY['It takes a community to raise a child', 'Children need both parents', 'Mothers are not enough', 'Families must be large'],
0,
'This proverb emphasizes the importance of community involvement in child-rearing and the African value of collective responsibility.',
1);