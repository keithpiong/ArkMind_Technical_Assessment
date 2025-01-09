import {Router} from "express";
import {getAllItemsController, getItemByIdController, createItemController, deleteItemController, updateItemController,} from "../controllers/item.controller";

const router = Router();

router.get('/', getAllItemsController)

router.post('/', createItemController);

router.get('/:id', getItemByIdController);

router.delete('/:id', deleteItemController);

router.put('/:id', updateItemController);

export default router;