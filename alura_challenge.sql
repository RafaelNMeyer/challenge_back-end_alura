--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3 (Ubuntu 14.3-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.3 (Ubuntu 14.3-0ubuntu0.22.04.1)

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
-- Name: expenditures; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expenditures (
    id integer NOT NULL,
    description text,
    value double precision,
    date date,
    category character varying(50)
);


ALTER TABLE public.expenditures OWNER TO postgres;

--
-- Name: expenditures_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expenditures_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.expenditures_id_seq OWNER TO postgres;

--
-- Name: expenditures_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expenditures_id_seq OWNED BY public.expenditures.id;


--
-- Name: recipts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipts (
    id integer NOT NULL,
    description text,
    value double precision,
    date date
);


ALTER TABLE public.recipts OWNER TO postgres;

--
-- Name: recipts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipts_id_seq OWNER TO postgres;

--
-- Name: recipts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipts_id_seq OWNED BY public.recipts.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(40) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: expenditures id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expenditures ALTER COLUMN id SET DEFAULT nextval('public.expenditures_id_seq'::regclass);


--
-- Name: recipts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipts ALTER COLUMN id SET DEFAULT nextval('public.recipts_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: expenditures; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expenditures (id, description, value, date, category) FROM stdin;
1	water	600	2022-05-30	others
2	light	600	2022-05-30	others
4	food	900	2022-05-30	others
5	gas	900	2022-06-30	others
\.


--
-- Data for Name: recipts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipts (id, description, value, date) FROM stdin;
1	salary	4000 2022-05-01	others
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password) FROM stdin;
8	joao	jao@mail.com	$2b$10$mO8kyxiwSJ5YhfAqoU624.3ulAeFJxccMN4OVyBUIBzPtvFlV19ia
\.


--
-- Name: expenditures_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expenditures_id_seq', 5, true);


--
-- Name: recipts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipts_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 8, true);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- PostgreSQL database dump complete
--

