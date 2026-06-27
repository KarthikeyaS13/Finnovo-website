import { open, Database } from 'sqlite';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs/promises';

export interface Submission {
  id: string;
  fullName: string;
  companyName: string;
  workEmail: string;
  phoneNumber?: string;
  primaryInterest: string;
  messageDetails: string;
  createdAt: string;
  scheduledDate?: string;
  scheduledTime?: string;
  duration?: string;
  meetingMode?: string;
}

let dbInstance: Database | null = null;

export async function getDbConnection() {
  if (dbInstance) return dbInstance;
  
  const dbDir = path.join(process.cwd(), 'data');
  const dbPath = path.join(dbDir, 'database.sqlite');
  
  // Make sure directory exists
  try {
    await fs.mkdir(dbDir, { recursive: true });
  } catch (err) {
    console.error('Failed to create data directory:', err);
  }
  
  // Open the database file
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  // Create table if it doesn't exist
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      fullName TEXT NOT NULL,
      companyName TEXT NOT NULL,
      workEmail TEXT NOT NULL,
      phoneNumber TEXT,
      primaryInterest TEXT NOT NULL,
      messageDetails TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      scheduledDate TEXT,
      scheduledTime TEXT,
      duration TEXT,
      meetingMode TEXT
    )
  `);

  // Run migrations dynamically to support existing tables
  try {
    await dbInstance.exec(`ALTER TABLE submissions ADD COLUMN scheduledDate TEXT`);
  } catch (e) {}
  try {
    await dbInstance.exec(`ALTER TABLE submissions ADD COLUMN scheduledTime TEXT`);
  } catch (e) {}
  try {
    await dbInstance.exec(`ALTER TABLE submissions ADD COLUMN duration TEXT`);
  } catch (e) {}
  try {
    await dbInstance.exec(`ALTER TABLE submissions ADD COLUMN meetingMode TEXT`);
  } catch (e) {}

  return dbInstance;
}

export async function getSubmissions(): Promise<Submission[]> {
  try {
    const db = await getDbConnection();
    const rows = await db.all<Submission[]>('SELECT * FROM submissions ORDER BY createdAt DESC');
    return rows;
  } catch (error) {
    console.error('Failed to read submissions from SQLite:', error);
    return [];
  }
}

export async function addSubmission(submission: Omit<Submission, 'id' | 'createdAt'>): Promise<Submission> {
  try {
    const db = await getDbConnection();
    
    const newSubmission: Submission = {
      ...submission,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString()
    };
    
    await db.run(
      `INSERT INTO submissions (id, fullName, companyName, workEmail, phoneNumber, primaryInterest, messageDetails, createdAt, scheduledDate, scheduledTime, duration, meetingMode)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newSubmission.id,
        newSubmission.fullName,
        newSubmission.companyName,
        newSubmission.workEmail,
        newSubmission.phoneNumber || null,
        newSubmission.primaryInterest,
        newSubmission.messageDetails,
        newSubmission.createdAt,
        newSubmission.scheduledDate || null,
        newSubmission.scheduledTime || null,
        newSubmission.duration || null,
        newSubmission.meetingMode || null
      ]
    );
    
    return newSubmission;
  } catch (error) {
    console.error('Failed to write submission to SQLite:', error);
    throw error;
  }
}

export async function deleteSubmission(id: string): Promise<boolean> {
  try {
    const db = await getDbConnection();
    const result = await db.run('DELETE FROM submissions WHERE id = ?', [id]);
    return (result.changes ?? 0) > 0;
  } catch (error) {
    console.error('Failed to delete submission from SQLite:', error);
    return false;
  }
}
