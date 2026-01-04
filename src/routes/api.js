import express from "express";
import apiController from '../controller/apiController.js'
import userController from '../controller/userController.js'
import groupController from '../controller/groupController.js'
const router = express.Router();


const initApiRoutes = (app) => {
  router.get("/test-api", apiController.testApi);
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);

  router.get("/user/show", userController.handleGetAllUsers);
  router.post("/user/create", userController.handleCreateNewUser);
  router.put("/user/edit", userController.handleEditUser);
  router.delete("/user/delete/:id", userController.handleDeleteUser);

  router.get("/group/show", groupController.handleGetAllGroups);

  return app.use("/api/v1", router);
};

export default initApiRoutes;