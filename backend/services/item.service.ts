import db from '../db';
import { Item, NewItem } from '../models/item.model';
import { RowDataPacket, FieldPacket } from 'mysql2';

export const getAllItems = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM items');
    return rows;
  } catch (err) {
    throw new Error('Error fetching items: ' + err);
  }
};


export const getItemById = async (id: number): Promise<Item | null> => {
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0] as Item;
  } catch (err) {
    throw new Error('Error fetching item by ID: ' + err);
  }
};

export const createItem = async (newItem: NewItem): Promise<Item> => {
  try {
    // Create new item in db
    const [result] = await db.execute('INSERT INTO items (name, price, description) VALUES (?, ?, ?)', [
      newItem.name,
      newItem.price,
      newItem.description,
    ]);

    // Return newly created item
    const insertId = (result as any).insertId;
    
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [insertId]);

    const item = (rows as RowDataPacket[])[0] as Item;

    return item;
  } catch (err) {
    // console.error('Error creating item:', err);
    throw new Error('Error creating new item');
  }
};

export const deleteItemById = async (id: number): Promise<boolean> => {
  try {
    const [result] = await db.execute('DELETE FROM items WHERE id = ?', [id]);

    // Check if any rows were affected (if the item with this id exists)
    if ((result as any).affectedRows === 0) {
      return false;
    }
    return true;
  } catch (err) {
    // console.error('Error deleting item:', err);
    throw new Error('Error deleting item');
  }
};

export const updateItemById = async (id: number, updatedData: Partial<Item>): Promise<Item | null> => {
  try {
    // Get data from payload
    const { name, price, description } = updatedData;
    const updatedAt = new Date(); 

    // Update the item in the database
    const [result] = await db.execute(
      'UPDATE items SET name = ?, price = ?, description = ?, updatedAt = ? WHERE id = ?',
      [name, price, description, updatedAt, id]
    );

    // Check if the item was found and updated
    if ((result as any).affectedRows === 0) {
      return null;
    }

    // Fetch the updated item from the database
    const [rows] = await db.execute('SELECT * FROM items WHERE id = ?', [id]);

    const item = (rows as RowDataPacket[])[0] as Item;

    return item;
  } catch (err) {
    // console.error('Error updating item:', err);
    throw new Error('Error updating item');
  }
};