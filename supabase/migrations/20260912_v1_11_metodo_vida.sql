-- DESPERTA MEMBERS V1.11 — Método VIDA em 7 dias
-- Cria o curso em RASCUNHO e OCULTO da vitrine, com 1 módulo e 8 aulas.
-- Pode ser executado mais de uma vez sem duplicar o conteúdo.

DO $$
DECLARE
  v_program_id uuid;
  v_module_id uuid;
  v_lesson_id uuid;
BEGIN
  -- Programa
  INSERT INTO public.programs (
    slug, title, subtitle, description, cover_url,
    status, content_type, catalog_visible, position, updated_at
  ) VALUES (
    'metodo-vida-em-7-dias',
    'Método VIDA em 7 dias',
    NULL,
    NULL,
    '/metodo-vida-em-7-dias.jpg',
    'draft',
    'course',
    false,
    2,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    cover_url = EXCLUDED.cover_url,
    status = 'draft',
    content_type = 'course',
    catalog_visible = false,
    updated_at = now();

  SELECT id INTO v_program_id
  FROM public.programs
  WHERE slug = 'metodo-vida-em-7-dias'
  LIMIT 1;

  -- Módulo único
  SELECT id INTO v_module_id
  FROM public.modules
  WHERE program_id = v_program_id
    AND position = 1
  ORDER BY created_at
  LIMIT 1;

  IF v_module_id IS NULL THEN
    INSERT INTO public.modules (program_id, title, description, position, status)
    VALUES (v_program_id, 'Método VIDA em 7 dias', NULL, 1, 'published')
    RETURNING id INTO v_module_id;
  ELSE
    UPDATE public.modules
    SET title = 'Método VIDA em 7 dias',
        description = NULL,
        position = 1,
        status = 'published'
    WHERE id = v_module_id;
  END IF;

  -- Aula 1 — Boas-vindas
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=1
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Boas-vindas',1,0,'youtube','https://www.youtube.com/embed/G5al-1htQf8','published',now());
  ELSE
    UPDATE public.lessons SET title='Boas-vindas',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/G5al-1htQf8',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 2 — Dia 01
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=2
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 01',2,0,'youtube','https://www.youtube.com/embed/OE6cLlj0kyk','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 01',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/OE6cLlj0kyk',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 3 — Dia 02
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=3
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 02',3,0,'youtube','https://www.youtube.com/embed/3z1PavSBGj4','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 02',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/3z1PavSBGj4',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 4 — Dia 03
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=4
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 03',4,0,'youtube','https://www.youtube.com/embed/KQss77xTtRg','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 03',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/KQss77xTtRg',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 5 — Dia 04
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=5
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 04',5,0,'youtube','https://www.youtube.com/embed/nZrKhtmzjPw','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 04',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/nZrKhtmzjPw',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 6 — Dia 05
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=6
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 05',6,0,'youtube','https://www.youtube.com/embed/fHzMRZ2nCV0','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 05',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/fHzMRZ2nCV0',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 7 — Dia 06
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=7
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 06',7,0,'youtube','https://www.youtube.com/embed/BHSDWnyt3Es','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 06',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/BHSDWnyt3Es',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 8 — Dia 07
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_id AND position=8
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_id,'Dia 07',8,0,'youtube','https://www.youtube.com/embed/6ogUqJHDeeE','published',now());
  ELSE
    UPDATE public.lessons SET title='Dia 07',duration_seconds=0,video_provider='youtube',video_url='https://www.youtube.com/embed/6ogUqJHDeeE',status='published',updated_at=now() WHERE id=v_lesson_id;
  END IF;
END $$;
