-- =============================================================================
-- Keep Screen ON — email registry (Supabase / PostgreSQL)
--
-- One-way email gate. The app only calls
--   submit_keep_screen_on_email(text, text, text, text)
-- and never reads from the table. All insert/update logic lives in Postgres.
--
-- First-touch fields (source, user_agent, referrer) are frozen at signup so
-- rows stay meaningful even if the site, routes, or UI change later.
--
-- Run once in the Supabase SQL Editor (or via migration).
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS citext;
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- ---------------------------------------------------------------------------
-- Table
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public."Keep Screen ON" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email citext NOT NULL,
  date_added timestamptz NOT NULL DEFAULT timezone('utc', now()),
  source text NOT NULL,
  submission_count integer NOT NULL DEFAULT 1,
  user_agent text NULL,
  referrer text NULL,

  CONSTRAINT keep_screen_on_email_unique UNIQUE (email),

  CONSTRAINT keep_screen_on_email_not_empty
    CHECK (char_length(btrim(email::text)) > 0),

  CONSTRAINT keep_screen_on_email_max_length
    CHECK (char_length(email::text) <= 254),

  CONSTRAINT keep_screen_on_email_format
    CHECK (email::text ~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),

  CONSTRAINT keep_screen_on_source_not_empty
    CHECK (char_length(btrim(source)) > 0),

  CONSTRAINT keep_screen_on_source_max_length
    CHECK (char_length(source) <= 64),

  CONSTRAINT keep_screen_on_submission_count_positive
    CHECK (submission_count >= 1),

  CONSTRAINT keep_screen_on_user_agent_max_length
    CHECK (user_agent IS NULL OR char_length(user_agent) <= 512),

  CONSTRAINT keep_screen_on_referrer_max_length
    CHECK (referrer IS NULL OR char_length(referrer) <= 2048)
);

COMMENT ON TABLE public."Keep Screen ON" IS
  'One-way email registry for Keep Screen ON. Submit via submit_keep_screen_on_email() only.';

COMMENT ON COLUMN public."Keep Screen ON".id IS
  'Stable internal row identifier. Never exposed to the app.';

COMMENT ON COLUMN public."Keep Screen ON".email IS
  'Unique, normalized (lowercase, trimmed) address. Immutable after insert.';

COMMENT ON COLUMN public."Keep Screen ON".date_added IS
  'UTC timestamp of the first successful submission. Immutable.';

COMMENT ON COLUMN public."Keep Screen ON".source IS
  'Short app-defined signup origin label (e.g. email-popup). First touch only; immutable.';

COMMENT ON COLUMN public."Keep Screen ON".submission_count IS
  'Total successful submissions for this email. Starts at 1; increments on re-entry.';

COMMENT ON COLUMN public."Keep Screen ON".user_agent IS
  'Browser user agent at first submission. Immutable.';

COMMENT ON COLUMN public."Keep Screen ON".referrer IS
  'Document referrer URL at first submission, stored as submitted. Immutable.';


-- ---------------------------------------------------------------------------
-- Internal write gate (blocks every path except the submit RPC)
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.keep_screen_on_assert_internal_write()
RETURNS void
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF current_setting('keep_screen_on.internal_write', true) IS DISTINCT FROM 'true' THEN
    RAISE EXCEPTION 'Direct writes are not permitted.'
      USING ERRCODE = '42501';
  END IF;
END;
$$;


CREATE OR REPLACE FUNCTION public.keep_screen_on_guard_insert()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  PERFORM public.keep_screen_on_assert_internal_write();

  IF NEW.submission_count <> 1 THEN
    RAISE EXCEPTION 'submission_count must be 1 on first insert.'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;


CREATE OR REPLACE FUNCTION public.keep_screen_on_guard_update()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  PERFORM public.keep_screen_on_assert_internal_write();

  IF NEW.id IS DISTINCT FROM OLD.id THEN
    RAISE EXCEPTION 'id is immutable.'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.email IS DISTINCT FROM OLD.email THEN
    RAISE EXCEPTION 'Email addresses are immutable.'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.date_added IS DISTINCT FROM OLD.date_added THEN
    RAISE EXCEPTION 'date_added is immutable.'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.source IS DISTINCT FROM OLD.source THEN
    RAISE EXCEPTION 'source is immutable.'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.user_agent IS DISTINCT FROM OLD.user_agent THEN
    RAISE EXCEPTION 'user_agent is immutable.'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.referrer IS DISTINCT FROM OLD.referrer THEN
    RAISE EXCEPTION 'referrer is immutable.'
      USING ERRCODE = '42501';
  END IF;

  IF NEW.submission_count <> OLD.submission_count + 1 THEN
    RAISE EXCEPTION 'submission_count may only increment by 1.'
      USING ERRCODE = '42501';
  END IF;

  RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS trg_keep_screen_on_guard_insert ON public."Keep Screen ON";
CREATE TRIGGER trg_keep_screen_on_guard_insert
  BEFORE INSERT ON public."Keep Screen ON"
  FOR EACH ROW
  EXECUTE FUNCTION public.keep_screen_on_guard_insert();

DROP TRIGGER IF EXISTS trg_keep_screen_on_guard_update ON public."Keep Screen ON";
CREATE TRIGGER trg_keep_screen_on_guard_update
  BEFORE UPDATE ON public."Keep Screen ON"
  FOR EACH ROW
  EXECUTE FUNCTION public.keep_screen_on_guard_update();


-- ---------------------------------------------------------------------------
-- Submit RPC — the only app-facing entry point
-- ---------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.submit_keep_screen_on_email(
  p_email text,
  p_source text,
  p_user_agent text DEFAULT NULL,
  p_referrer text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_email citext;
  v_source text;
  v_user_agent text;
  v_referrer text;
  v_now timestamptz := timezone('utc', now());
BEGIN
  IF p_email IS NULL OR btrim(p_email) = '' THEN
    RAISE EXCEPTION 'A valid email is required.'
      USING ERRCODE = '22023';
  END IF;

  IF p_source IS NULL OR btrim(p_source) = '' THEN
    RAISE EXCEPTION 'A valid source is required.'
      USING ERRCODE = '22023';
  END IF;

  v_email := lower(btrim(p_email));
  v_source := btrim(p_source);

  IF char_length(v_email::text) > 254 THEN
    RAISE EXCEPTION 'A valid email is required.'
      USING ERRCODE = '22023';
  END IF;

  IF v_email::text !~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$' THEN
    RAISE EXCEPTION 'A valid email is required.'
      USING ERRCODE = '22023';
  END IF;

  IF char_length(v_source) > 64 THEN
    RAISE EXCEPTION 'A valid source is required.'
      USING ERRCODE = '22023';
  END IF;

  v_user_agent := NULLIF(btrim(COALESCE(p_user_agent, '')), '');
  IF v_user_agent IS NOT NULL AND char_length(v_user_agent) > 512 THEN
    v_user_agent := left(v_user_agent, 512);
  END IF;

  v_referrer := NULLIF(btrim(COALESCE(p_referrer, '')), '');
  IF v_referrer IS NOT NULL AND char_length(v_referrer) > 2048 THEN
    v_referrer := left(v_referrer, 2048);
  END IF;

  PERFORM set_config('keep_screen_on.internal_write', 'true', true);

  INSERT INTO public."Keep Screen ON" (
    email,
    date_added,
    source,
    submission_count,
    user_agent,
    referrer
  )
  VALUES (
    v_email,
    v_now,
    v_source,
    1,
    v_user_agent,
    v_referrer
  )
  ON CONFLICT ON CONSTRAINT keep_screen_on_email_unique DO UPDATE
    SET submission_count = public."Keep Screen ON".submission_count + 1;
END;
$$;

COMMENT ON FUNCTION public.submit_keep_screen_on_email(text, text, text, text) IS
  'Register an email or increment submission_count on re-entry. First-touch metadata is preserved. Returns nothing.';


-- ---------------------------------------------------------------------------
-- Row Level Security & privileges
-- ---------------------------------------------------------------------------

ALTER TABLE public."Keep Screen ON" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Keep Screen ON" FORCE ROW LEVEL SECURITY;

-- No SELECT / INSERT / UPDATE / DELETE policies for anon or authenticated.
-- service_role (Supabase dashboard) retains full access via BYPASSRLS.

REVOKE ALL ON TABLE public."Keep Screen ON" FROM PUBLIC, anon, authenticated;
REVOKE TRUNCATE ON TABLE public."Keep Screen ON" FROM PUBLIC, anon, authenticated;

DROP FUNCTION IF EXISTS public.submit_keep_screen_on_email(text);

REVOKE ALL ON FUNCTION public.submit_keep_screen_on_email(text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_keep_screen_on_email(text, text, text, text) TO anon, authenticated;

REVOKE ALL ON FUNCTION public.keep_screen_on_assert_internal_write() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.keep_screen_on_guard_insert() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.keep_screen_on_guard_update() FROM PUBLIC, anon, authenticated;
