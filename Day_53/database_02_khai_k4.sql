-- DROP TABLE IF EXISTS customers, products, order_list, order_detail, customers_ordered, products_ordered;

CREATE TABLE "customers" (
  "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" character varying(50) NOT NULL,
  "email" character varying(100),
  "phone" character varying(11) NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT customers_email_unique UNIQUE (email),
  CONSTRAINT customers_phone_unique UNIQUE (phone)
);

CREATE TABLE "products" (
  "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" text NOT NULL,
  "code" character varying(50) NOT NULL,
  "price" money DEFAULT 0,
  "stock" integer DEFAULT 0,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT products_code_unique UNIQUE (code)
);

CREATE TABLE "customers_ordered" (
  "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" character varying(50) NOT NULL,
  "email" character varying(100),
  "phone" character varying(11) NOT NULL,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT customers_ordered_email_unique UNIQUE (email),
  CONSTRAINT customers_ordered_phone_unique UNIQUE (phone)
);

CREATE TABLE "order_list" (
  "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  "customer_id" integer,
  "customers_ordered_id" integer,
  "total_product" integer DEFAULT 0,
  "total_amount" numeric DEFAULT 0,
  "status_order" character varying(50),
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE TABLE "products_ordered" (
  "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  "name" text NOT NULL,
  "code" character varying(50) NOT NULL,
  "price" money DEFAULT 0,
  "stock" integer DEFAULT 0,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id"),
  CONSTRAINT products_ordered_code_unique UNIQUE (code)
);

CREATE TABLE "order_detail" (
  "id" integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  "product_id" integer,
  "products_ordered_id" integer,
  "order_list_id" integer,
  "units" integer DEFAULT 0,
  "total_price" money DEFAULT 0,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  PRIMARY KEY ("id")
);

ALTER TABLE IF EXISTS "order_list" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");
ALTER TABLE IF EXISTS "order_list" ADD FOREIGN KEY ("customers_ordered_id") REFERENCES "customers_ordered" ("id");

ALTER TABLE IF EXISTS "order_detail" ADD FOREIGN KEY ("order_list_id") REFERENCES "order_list" ("id");
ALTER TABLE IF EXISTS "order_detail" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");
ALTER TABLE IF EXISTS "order_detail" ADD FOREIGN KEY ("products_ordered_id") REFERENCES "products_ordered" ("id");
