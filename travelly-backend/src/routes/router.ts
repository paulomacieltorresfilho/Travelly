import { Router } from "express";
import { UsuarioController } from "./controllers/UsuarioController";
import { DestinoController } from "./controllers/DestinoController";
import { AvaliacaoController } from "./controllers/AvaliacaoController";
import { ViewsController } from "./controllers/ViewsController";
import multer from "multer";
import { PacoteController } from "./controllers/PacotesController";

const router = Router();

//! tratamento para rota aceitar arquivo
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/jfif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Tipo de arquivo inválido. Apenas imagens são permitidas."));
    }
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});

//! rotas referentes a tabela usuario
router.post("/usuario/create", UsuarioController.createUser);
router.get("/usuario/get/:id", UsuarioController.getUser);
router.get("/usuario/getAll", UsuarioController.getAllUsers);
router.patch("/usuario/update", UsuarioController.updateUser);
router.delete("/usuario/delete", UsuarioController.deleteUser);

//! rotas referentes a tabela destino
router.post(
  "/destino/create",
  upload.single("imagem"),
  DestinoController.createDestiny
);
router.get("/destino/get/:id", DestinoController.getDestiny);
router.get("/destino/getAll", DestinoController.getAllDestinies);
router.patch(
  "/destino/update",
  upload.single("imagem"),
  DestinoController.updateDestiny
);
router.delete("/destino/delete", DestinoController.deleteDestiny);

//! rotas referentes a tabela avaliacao
router.post("/avaliacao/create", AvaliacaoController.createAvaliacao);
router.get("/avaliacao/get/:id", AvaliacaoController.getAvaliacao);
router.get("/avaliacao/getAll", AvaliacaoController.getAllAvaliacoes);
router.patch("/avaliacao/update", AvaliacaoController.updateAvaliacao);
router.delete("/avaliacao/delete", AvaliacaoController.deleteAvaliacao);

//! rotas para views
router.get("/views/get-ratings-info", ViewsController.getAllRatingsInfo);
router.get("/views/get/:id", ViewsController.getRatingInfo);

//! rotas para pacotes_turisticos
router.get("/views/get-destiny-packs/:id", PacoteController.getPackageInfo);
router.post("/views/update-package-prices", PacoteController.updatePackagePrices);

export { router };
