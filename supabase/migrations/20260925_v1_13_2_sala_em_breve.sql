-- DESPERTA MEMBERS V1.13.2
-- Sala de Comando: mantém Aula 01 e Aula 02 publicadas e
-- transforma as semanas futuras em "Em breve".
-- Pode ser executado mais de uma vez.

DO $$
DECLARE
  v_program_id uuid;
  v_module_1 uuid;
  v_module_2 uuid;
  v_module_3 uuid;
BEGIN
  SELECT id INTO v_program_id
  FROM public.programs
  WHERE slug = 'sala-de-comando'
  LIMIT 1;

  IF v_program_id IS NULL THEN
    RAISE EXCEPTION 'Sala de Comando não encontrada.';
  END IF;

  SELECT id INTO v_module_1 FROM public.modules WHERE program_id=v_program_id AND position=1 LIMIT 1;
  SELECT id INTO v_module_2 FROM public.modules WHERE program_id=v_program_id AND position=2 LIMIT 1;
  SELECT id INTO v_module_3 FROM public.modules WHERE program_id=v_program_id AND position=3 LIMIT 1;

  UPDATE public.modules SET status='published' WHERE id=v_module_1;
  UPDATE public.modules SET status='coming_soon' WHERE id IN (v_module_2,v_module_3);

  UPDATE public.lessons
  SET status='published', updated_at=now()
  WHERE program_id=v_program_id AND title IN ('Aula 01','Aula 02');

  UPDATE public.lessons
  SET status='coming_soon', updated_at=now()
  WHERE program_id=v_program_id
    AND title IN ('Aula 03','Aula 04','Aula 05','Aula 06','Aula 07','Aula 08','Aula 09','Aula 10','Aula 11','Aula 12');
END $$;
