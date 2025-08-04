import { pool } from '../db.js';

export const findUser = async (username, password)  => {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    return rows[0] || null;
}
