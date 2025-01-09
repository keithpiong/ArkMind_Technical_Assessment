import { Request, Response, NextFunction } from 'express';
import {getAllItems, getItemById, createItem, deleteItemById, updateItemById} from "../services/item.service";
import { NewItem, Item } from '../models/item.model';
import { z } from 'zod';

export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export const getItemByIdController = async (
  req: Request<{ id: number }>, // Explicitly specify route parameter types
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);

    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const createItemController = async (
  req: Request<{}, {}, NewItem>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
     // Validate Data
     const itemValidation = z.object({
      name: z.string().min(1, "Name is required"),
      price: z.number()
        .positive("Price must be a positive number")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
          message: "Price must have at most 2 decimal places",
        }),
      description: z.string().min(1, "Description is required"),
    });

    const parsedData = itemValidation.parse(req.body);

    const newItem = await createItem(parsedData);

    res.status(201).json(newItem);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: "Validation error", errors: err.errors });
      return;
    }
    next(err);
  }
};

export const deleteItemController = async (
  req: Request<{ id: number }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await deleteItemById(id);

    if (!result) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    next(err);
  }
};


export const updateItemController = async (
  req: Request<{ id: number }, {}, Item>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
  
     // Validate Data
     const itemValidation = z.object({
      name: z.string().min(1, "Name is required"),
      price: z.number()
        .positive("Price must be a positive number")
        .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
          message: "Price must have at most 2 decimal places",
        }),
      description: z.string().min(1, "Description is required"),
    });

    const parsedData = itemValidation.parse(req.body);

    const updatedItem = await updateItemById(id, parsedData);

    if (!updatedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};