import { pool } from '../db.js';

export const createUser = async (userData) => {
    const { username, password, firstName, lastName, age } = userData;
    const { rows } = await pool.query(
      `INSERT INTO users (username, password, first_name, last_name, age) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING user_id AS id, username, first_name AS "firstName", last_name AS "lastName", age`,
      [username, password, firstName, lastName, age]
    );
    return rows[0];
};

export const findUserByUsername = async (username) => {
    const { rows } = await pool.query(
      'SELECT user_id AS id, username, password FROM users WHERE username = $1',
      [username]
    );
    return rows[0] || null;
};