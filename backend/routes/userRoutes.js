import express from "express";

import { getProfile, login, register } from "../controllers/userController.js";

const authRoutes = express.Router();
 
authRoutes.post('/register', register);
authRoutes.post('/login', login);
authRoutes.get('/', getProfile);

export default authRoutes;