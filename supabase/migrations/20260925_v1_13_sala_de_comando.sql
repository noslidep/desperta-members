-- DESPERTA MEMBERS V1.13 — Sala de Comando
-- Estrutura inicial da mentoria: 12 semanas / 3 módulos / 12 aulas.
-- Aula 01 e Aula 02 ficam publicadas com vídeo.
-- Aulas 03 a 12 ficam cadastradas como rascunho para liberação semanal.
-- O curso nasce em RASCUNHO e OCULTO da vitrine para teste controlado.
-- Seguro para reexecução: não rebaixa aulas/módulos que já tenham sido publicados depois.

DO $$
DECLARE
  v_program_id uuid;
  v_module_1 uuid;
  v_module_2 uuid;
  v_module_3 uuid;
  v_lesson_id uuid;
BEGIN
  -- Programa
  INSERT INTO public.programs (
    slug, title, subtitle, description, cover_url,
    status, content_type, catalog_visible, position, updated_at
  ) VALUES (
    'sala-de-comando',
    'Sala de Comando',
    'Mentoria em grupo • Online • 12 semanas',
    'Mentoria em grupo com encontros semanais ao longo de 12 semanas, organizada em uma jornada de 3 meses.',
    '/sala-de-comando.jpg',
    'draft',
    'mentoring',
    false,
    3,
    now()
  )
  ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    description = EXCLUDED.description,
    cover_url = EXCLUDED.cover_url,
    content_type = 'mentoring',
    position = EXCLUDED.position,
    updated_at = now();

  SELECT id INTO v_program_id
  FROM public.programs
  WHERE slug = 'sala-de-comando'
  LIMIT 1;

  -- MÓDULO 1 — publicado porque já há aulas disponíveis
  SELECT id INTO v_module_1
  FROM public.modules
  WHERE program_id = v_program_id AND position = 1
  ORDER BY created_at LIMIT 1;

  IF v_module_1 IS NULL THEN
    INSERT INTO public.modules (program_id, title, description, position, status)
    VALUES (v_program_id, 'Mês 01', 'Semanas 01 a 04', 1, 'published')
    RETURNING id INTO v_module_1;
  ELSE
    UPDATE public.modules
       SET title = 'Mês 01', description = 'Semanas 01 a 04', position = 1, status = 'published'
     WHERE id = v_module_1;
  END IF;

  -- MÓDULO 2 — preparado, mas ainda não visível para alunas
  SELECT id INTO v_module_2
  FROM public.modules
  WHERE program_id = v_program_id AND position = 2
  ORDER BY created_at LIMIT 1;

  IF v_module_2 IS NULL THEN
    INSERT INTO public.modules (program_id, title, description, position, status)
    VALUES (v_program_id, 'Mês 02', 'Semanas 05 a 08', 2, 'draft')
    RETURNING id INTO v_module_2;
  ELSE
    UPDATE public.modules
       SET title = 'Mês 02', description = 'Semanas 05 a 08', position = 2
     WHERE id = v_module_2;
  END IF;

  -- MÓDULO 3 — preparado, mas ainda não visível para alunas
  SELECT id INTO v_module_3
  FROM public.modules
  WHERE program_id = v_program_id AND position = 3
  ORDER BY created_at LIMIT 1;

  IF v_module_3 IS NULL THEN
    INSERT INTO public.modules (program_id, title, description, position, status)
    VALUES (v_program_id, 'Mês 03', 'Semanas 09 a 12', 3, 'draft')
    RETURNING id INTO v_module_3;
  ELSE
    UPDATE public.modules
       SET title = 'Mês 03', description = 'Semanas 09 a 12', position = 3
     WHERE id = v_module_3;
  END IF;

  -- Aula 01 — publicada
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id = v_program_id AND module_id = v_module_1 AND position = 1
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,summary,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_1,'Aula 01',NULL,1,0,'youtube','https://www.youtube.com/embed/vKQyDJCs280','published',now());
  ELSE
    UPDATE public.lessons SET title='Aula 01',video_provider='youtube',video_url='https://www.youtube.com/embed/vKQyDJCs280',status='published',updated_at=now()
     WHERE id=v_lesson_id;
  END IF;

  -- Aula 02 — publicada
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id = v_program_id AND module_id = v_module_1 AND position = 2
   ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,summary,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_1,'Aula 02',NULL,2,0,'youtube','https://www.youtube.com/embed/UTeUanXdJvY','published',now());
  ELSE
    UPDATE public.lessons SET title='Aula 02',video_provider='youtube',video_url='https://www.youtube.com/embed/UTeUanXdJvY',status='published',updated_at=now()
     WHERE id=v_lesson_id;
  END IF;

  -- Aula 03 — placeholder semanal
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_1 AND position=3 ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_1,'Aula 03',3,0,'youtube',NULL,'draft',now());
  ELSE
    UPDATE public.lessons SET title='Aula 03',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Aula 04 — placeholder semanal
  v_lesson_id := NULL;
  SELECT id INTO v_lesson_id FROM public.lessons
   WHERE program_id=v_program_id AND module_id=v_module_1 AND position=4 ORDER BY created_at LIMIT 1;
  IF v_lesson_id IS NULL THEN
    INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
    VALUES(v_program_id,v_module_1,'Aula 04',4,0,'youtube',NULL,'draft',now());
  ELSE
    UPDATE public.lessons SET title='Aula 04',updated_at=now() WHERE id=v_lesson_id;
  END IF;

  -- Mês 02 — Aulas 05 a 08
  FOR i IN 1..4 LOOP
    v_lesson_id := NULL;
    SELECT id INTO v_lesson_id FROM public.lessons
     WHERE program_id=v_program_id AND module_id=v_module_2 AND position=i ORDER BY created_at LIMIT 1;
    IF v_lesson_id IS NULL THEN
      INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
      VALUES(v_program_id,v_module_2,'Aula ' || lpad((i+4)::text,2,'0'),i,0,'youtube',NULL,'draft',now());
    ELSE
      UPDATE public.lessons SET title='Aula ' || lpad((i+4)::text,2,'0'),updated_at=now() WHERE id=v_lesson_id;
    END IF;
  END LOOP;

  -- Mês 03 — Aulas 09 a 12
  FOR i IN 1..4 LOOP
    v_lesson_id := NULL;
    SELECT id INTO v_lesson_id FROM public.lessons
     WHERE program_id=v_program_id AND module_id=v_module_3 AND position=i ORDER BY created_at LIMIT 1;
    IF v_lesson_id IS NULL THEN
      INSERT INTO public.lessons(program_id,module_id,title,position,duration_seconds,video_provider,video_url,status,updated_at)
      VALUES(v_program_id,v_module_3,'Aula ' || lpad((i+8)::text,2,'0'),i,0,'youtube',NULL,'draft',now());
    ELSE
      UPDATE public.lessons SET title='Aula ' || lpad((i+8)::text,2,'0'),updated_at=now() WHERE id=v_lesson_id;
    END IF;
  END LOOP;
END $$;
