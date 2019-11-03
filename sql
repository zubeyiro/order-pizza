--
-- PostgreSQL database dump
--

-- Dumped from database version 12.0
-- Dumped by pg_dump version 12.0

-- Started on 2019-11-03 18:09:04 +03

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
-- TOC entry 209 (class 1259 OID 16424)
-- Name: order_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_products (
    id integer NOT NULL,
    order_id smallint NOT NULL,
    product_id smallint NOT NULL,
    quantity smallint NOT NULL,
    price_unit real NOT NULL,
    price_total real NOT NULL,
    created_at timestamp(4) with time zone NOT NULL,
    updated_at timestamp(4) with time zone
);


ALTER TABLE public.order_products OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16422)
-- Name: order_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_products_id_seq OWNER TO postgres;

--
-- TOC entry 3175 (class 0 OID 0)
-- Dependencies: 208
-- Name: order_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_products_id_seq OWNED BY public.order_products.id;


--
-- TOC entry 207 (class 1259 OID 16416)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    customer_name character varying(50) NOT NULL,
    customer_surname character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    phone character varying(25) NOT NULL,
    address character varying(50) NOT NULL,
    postal_code character varying(20) NOT NULL,
    city character varying(30) NOT NULL,
    total_amount real NOT NULL,
    status character varying(20) NOT NULL,
    created_at timestamp(4) with time zone NOT NULL,
    updated_at timestamp(4) with time zone
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16414)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 3176 (class 0 OID 0)
-- Dependencies: 206
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 205 (class 1259 OID 16408)
-- Name: pizza_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizza_products (
    id integer NOT NULL,
    pizza_id smallint NOT NULL,
    name character varying(20) NOT NULL,
    is_active boolean NOT NULL,
    price real NOT NULL
);


ALTER TABLE public.pizza_products OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16406)
-- Name: pizza_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizza_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizza_products_id_seq OWNER TO postgres;

--
-- TOC entry 3177 (class 0 OID 0)
-- Dependencies: 204
-- Name: pizza_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizza_products_id_seq OWNED BY public.pizza_products.id;


--
-- TOC entry 203 (class 1259 OID 16396)
-- Name: pizzas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pizzas (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    is_active boolean NOT NULL
);


ALTER TABLE public.pizzas OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16394)
-- Name: pizzas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pizzas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pizzas_id_seq OWNER TO postgres;

--
-- TOC entry 3178 (class 0 OID 0)
-- Dependencies: 202
-- Name: pizzas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pizzas_id_seq OWNED BY public.pizzas.id;


--
-- TOC entry 3027 (class 2604 OID 16427)
-- Name: order_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products ALTER COLUMN id SET DEFAULT nextval('public.order_products_id_seq'::regclass);


--
-- TOC entry 3026 (class 2604 OID 16419)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 3025 (class 2604 OID 16411)
-- Name: pizza_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza_products ALTER COLUMN id SET DEFAULT nextval('public.pizza_products_id_seq'::regclass);


--
-- TOC entry 3024 (class 2604 OID 16399)
-- Name: pizzas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas ALTER COLUMN id SET DEFAULT nextval('public.pizzas_id_seq'::regclass);


--
-- TOC entry 3169 (class 0 OID 16424)
-- Dependencies: 209
-- Data for Name: order_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_products (id, order_id, product_id, quantity, price_unit, price_total, created_at, updated_at) FROM stdin;
1	10	1	1	5.99	5.99	2019-11-03 00:00:00+03	\N
2	10	2	1	7.99	7.99	2019-11-03 00:00:00+03	\N
3	11	1	1	5.99	5.99	2019-11-03 00:00:00+03	\N
4	11	2	2	7.99	15.98	2019-11-03 00:00:00+03	\N
5	12	1	1	5.99	5.99	2019-11-03 00:00:00+03	\N
6	12	2	2	7.99	15.98	2019-11-03 00:00:00+03	\N
7	13	1	1	5.99	5.99	2019-11-03 00:00:00+03	\N
8	13	2	2	7.99	15.98	2019-11-03 00:00:00+03	\N
9	14	1	1	5.99	5.99	2019-11-03 15:31:21.094+03	\N
10	14	2	2	7.99	15.98	2019-11-03 15:31:21.096+03	\N
11	15	2	2	7.99	15.98	2019-11-03 15:33:18.531+03	\N
12	16	2	2	7.99	15.98	2019-11-03 15:55:51.91+03	\N
13	20	2	2	7.99	15.98	2019-11-03 16:28:47.234+03	\N
14	21	2	2	7.99	15.98	2019-11-03 16:28:49.664+03	\N
15	22	2	2	7.99	15.98	2019-11-03 16:48:06.334+03	\N
17	23	2	2	7.99	15.98	2019-11-03 16:48:41.407+03	\N
16	23	4	3	7.99	23.97	2019-11-03 16:48:41.405+03	2019-11-03 16:53:40.088+03
\.


--
-- TOC entry 3167 (class 0 OID 16416)
-- Dependencies: 207
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, customer_name, customer_surname, email, phone, address, postal_code, city, total_amount, status, created_at, updated_at) FROM stdin;
10	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	13.98	created	2019-11-03 00:00:00+03	\N
11	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	21.97	created	2019-11-03 00:00:00+03	\N
12	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	21.97	created	2019-11-03 00:00:00+03	\N
14	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	21.97	created	2019-11-03 15:31:21.09+03	\N
15	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	15.98	created	2019-11-03 15:33:18.525+03	\N
16	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	15.98	created	2019-11-03 15:55:51.902+03	\N
20	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	15.98	created	2019-11-03 16:28:47.229+03	\N
21	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	15.98	created	2019-11-03 16:28:49.662+03	\N
22	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	15.98	created	2019-11-03 16:48:06.328+03	\N
23	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	39.95	delivered	2019-11-03 16:48:41.401+03	2019-11-03 16:56:56.584+03
13	Zubeyir	OZTURK	zubeyrozturk@gmail.com	123454677	Schafferstr 34	59174	Kamen	21.97	cancelled	2019-11-03 00:00:00+03	2019-11-03 17:00:22.883+03
\.


--
-- TOC entry 3165 (class 0 OID 16408)
-- Dependencies: 205
-- Data for Name: pizza_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizza_products (id, pizza_id, name, is_active, price) FROM stdin;
1	1	Small	t	5.99
2	1	Medium	t	7.99
3	1	X Large	f	10.99
4	2	Medium	t	7.99
5	2	X Large	t	10.99
\.


--
-- TOC entry 3163 (class 0 OID 16396)
-- Dependencies: 203
-- Data for Name: pizzas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pizzas (id, name, is_active) FROM stdin;
1	Margarita	t
2	Tuna Fisch	t
\.


--
-- TOC entry 3179 (class 0 OID 0)
-- Dependencies: 208
-- Name: order_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_products_id_seq', 19, true);


--
-- TOC entry 3180 (class 0 OID 0)
-- Dependencies: 206
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 23, true);


--
-- TOC entry 3181 (class 0 OID 0)
-- Dependencies: 204
-- Name: pizza_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizza_products_id_seq', 5, true);


--
-- TOC entry 3182 (class 0 OID 0)
-- Dependencies: 202
-- Name: pizzas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pizzas_id_seq', 2, true);


--
-- TOC entry 3035 (class 2606 OID 16429)
-- Name: order_products order_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_products
    ADD CONSTRAINT order_products_pkey PRIMARY KEY (id);


--
-- TOC entry 3033 (class 2606 OID 16421)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3031 (class 2606 OID 16413)
-- Name: pizza_products pizza_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizza_products
    ADD CONSTRAINT pizza_products_pkey PRIMARY KEY (id);


--
-- TOC entry 3029 (class 2606 OID 16401)
-- Name: pizzas pizzas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pizzas
    ADD CONSTRAINT pizzas_pkey PRIMARY KEY (id);


-- Completed on 2019-11-03 18:09:05 +03

--
-- PostgreSQL database dump complete
--

