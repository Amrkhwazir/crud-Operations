import express from "express";
import { deletePost, getPost, updatePost, userPost } from "../controllers/crudController.js";

const postRoutes = express.Router();

postRoutes.post('/', userPost);
postRoutes.get('/', getPost);
postRoutes.put('/:id', updatePost);
postRoutes.delete('/:id', deletePost);

export default postRoutes;