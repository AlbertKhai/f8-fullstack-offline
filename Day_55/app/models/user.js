/** Tư duy model
 * Mỗi model sẽ tương ứng với 1 table
 * 1 controller có thể có nhiều model
 */

/** Ko lọc
 * SELECT * FROM users ORDER BY id DESC
 *
 */

const sql = require("../utils/db");

module.exports = {
    all: (status, keyword) => {
        let filter = sql`WHERE true`;

        if (status === "active" || status === "inactive") {
            filter = sql`${filter} AND status=${status === "active"}`;
        }

        if (keyword) {
            filter = sql`${filter} AND (name ILIKE ${
                "%" + keyword + "%"
            } OR email ILIKE ${"%" + keyword + "%"}) `;
        }

        return sql`SELECT * FROM users ${filter} ORDER BY id ASC`;
    },
    create: async (name, email, status) => {
        await sql`INSERT INTO users(name, email, status) VALUES (${name}, ${email}, ${
            status === "on"
        })`;
        return sql`SELECT * FROM users ORDER BY id DESC`;
    },
    edit: async (id, name, email, status) => {
        await sql`UPDATE users SET name = ${name}, email = ${email}, status = ${
            status === "on"
        }, updated_at = NOW() WHERE id = ${id}`;
        return sql`SELECT * FROM users ORDER BY updated_at DESC`;
    },
    delete: async (id) => {
        await sql`DELETE FROM users WHERE id = ${id}`;
        return sql`SELECT * FROM users ORDER BY updated_at DESC`;
    },
    checkDuplicateEmail: async (value, id) => {
        let filter = sql`AND true`;

        if (id) {
            filter = sql`AND ${id} != users.id`;
        }

        return sql`SELECT * FROM users WHERE ${value} ILIKE users.email ${filter}`;
    },
};
