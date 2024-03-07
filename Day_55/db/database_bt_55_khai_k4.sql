--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    status boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, status, created_at, updated_at) FROM stdin;
1	user 1	user1@gmail.com	f	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
3	user 3	user3@gmail.com	f	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
5	user 5	user5@gmail.com	f	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
7	user 7	user7@gmail.com	f	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
9	user 9	user9@gmail.com	f	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
2	user 2	user2@gmail.com	t	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
4	user 4	user4@gmail.com	t	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
6	user 6	user6@gmail.com	t	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
8	user 8	user8@gmail.com	t	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
10	user 10	user10@gmail.com	t	2024-01-16 09:08:40.667214-08	2024-01-16 09:08:40.667214-08
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 13, true);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

