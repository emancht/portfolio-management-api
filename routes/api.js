import * as PortfolioController from "../app/controllers/PortfolioController.js";
import * as UserController from "../app/controllers/UserController.js";


import express from "express";
import AuthMiddleware from "../app/middleware/AuthMiddleware.js";
import { upload } from "../app/utilities/multerConfig.js";
const router = express.Router()

// User Routes
router.post("/Register", upload.single('image'), UserController.Register)
router.post("/Login", UserController.Login)
router.get("/Logout", AuthMiddleware, UserController.Logout)



/// Portfolio Routes
router.post('/CreatePortfolio', AuthMiddleware, upload.single('img'), PortfolioController.savePortfolio);
router.get('/ReadPortfolio/:portfolioID', PortfolioController.getPortfolio);
router.post('/UpdatePortfolio/:portfolioID', AuthMiddleware, upload.single('img'), PortfolioController.savePortfolio);

router.get('/DeletePortfolio/:portfolioID', AuthMiddleware, PortfolioController.removePortfolio);
router.get('/PortfolioList', AuthMiddleware, PortfolioController.portfolioList);


export default router;