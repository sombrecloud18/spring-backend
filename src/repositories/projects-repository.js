import { pool } from '../db.js';

export async function getProjects() {
  const { rows } = await pool.query('SELECT * FROM projects');
  return rows;
}