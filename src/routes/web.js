import express from "express";
import homeController from '../controller/homeController.js'
const router = express.Router();


const initWebRoutes = (app) => {
  // router.get("/", (req, res) => {
  //   return res.send("Hello world");
  // });
  router.get("/", homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.post("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateNewUser);
  return app.use("/", router);
};

export default initWebRoutes;
