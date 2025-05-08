import { Router } from "express";
import * as cepController from "../controllers/cepController";

const router = Router();

router.get("/sync", cepController.sync);
router.get("/ceps", cepController.list);
router.get("/ceps/:cep", cepController.get);
router.put("/ceps/:cep", cepController.update);
router.patch("/ceps/:cep/favorito", cepController.favorite);

export default router;
