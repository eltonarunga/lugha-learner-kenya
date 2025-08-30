-- Drop and recreate the get_public_questions RPC to include proverb fields
DROP FUNCTION IF EXISTS public.get_public_questions(uuid);

CREATE OR REPLACE FUNCTION public.get_public_questions(lesson_id uuid)
 RETURNS TABLE(id uuid, lesson_id uuid, question_text text, image_url text, audio_url text, options text[], order_index integer, proverb_text text, cultural_meaning text, language_origin text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public', 'pg_temp'
AS $function$
  SELECT 
    q.id,
    q.lesson_id,
    q.question_text,
    q.image_url,
    q.audio_url,
    q.options,
    q.order_index,
    q.proverb_text,
    q.cultural_meaning,
    q.language_origin
  FROM public.questions q
  WHERE q.lesson_id = get_public_questions.lesson_id
  ORDER BY q.order_index;
$function$;