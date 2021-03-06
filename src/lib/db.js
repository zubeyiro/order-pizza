const { Pool } = require('pg')
const fs = require('fs');

const pool = new Pool({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
    ssl: false,
})


async function _setupDB() {
    let _sql = [
        "CREATE TABLE order_products (id SERIAL NOT NULL, order_id smallint NOT NULL, product_id smallint NOT NULL, quantity smallint NOT NULL, price_unit real NOT NULL, price_total real NOT NULL, created_at timestamp(4) with time zone NOT NULL, updated_at timestamp(4) with time zone);",
        "CREATE TABLE orders ( id SERIAL NOT NULL, customer_name character varying(50) NOT NULL, customer_surname character varying(50) NOT NULL, email character varying(50) NOT NULL, phone character varying(25) NOT NULL, address character varying(50) NOT NULL, postal_code character varying(20) NOT NULL, city character varying(30) NOT NULL, total_amount real NOT NULL, status character varying(20) NOT NULL, created_at timestamp(4) with time zone NOT NULL, updated_at timestamp(4) with time zone );",
        "CREATE TABLE pizza_products (id SERIAL NOT NULL, pizza_id smallint NOT NULL, name character varying(20) NOT NULL,is_active boolean NOT NULL, price real NOT NULL);",
        "CREATE TABLE pizzas (id SERIAL NOT NULL, name character varying(50) NOT NULL, is_active boolean NOT NULL);",
        "INSERT INTO pizzas (name, is_active) VALUES ('Margarita', true);",
        "INSERT INTO pizzas (name, is_active) VALUES ('Tuna Fisch', true);",
        "INSERT INTO pizza_products (pizza_id, name, is_active, price) VALUES ('1', 'Small', true, 5.99);",
        "INSERT INTO pizza_products (pizza_id, name, is_active, price) VALUES ('1', 'Medium', true, 6.99);",
        "INSERT INTO pizza_products (pizza_id, name, is_active, price) VALUES ('2', 'Large', true, 8.99);",
        "INSERT INTO pizza_products (pizza_id, name, is_active, price) VALUES ('2', 'X Large', true, 10.99);",
    ]

    try {
        await pool.query('SELECT id FROM pizzas')
    } catch (e) {
        for (let i = 0; i < _sql.length; i++) {
            await pool.query(_sql[i])
        }

        console.log("DB up")
    }
}

_setupDB()

module.exports = { pool }