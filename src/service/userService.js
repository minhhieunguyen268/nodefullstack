import bcrypt from "bcryptjs";
import db from "../models/index.js";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// ================= CREATE =================
const createNewUser = async (email, password, username) => {
  const hashPass = hashUserPassword(password);

  return await db.User.create({
    email,
    password: hashPass,
    username,
  });
};

// ================= READ =================
const getUserList = async () => {
  return await db.User.findAll({
    raw: true, // trả về object thuần
  });
};

const getUserById = async (id) => {
  return await db.User.findOne({
    where: { id },
    raw: true,
  });
};

// ================= UPDATE =================
const updateUser = async (email, username, id) => {
  return await db.User.update(
    { email, username },
    { where: { id } }
  );
};

// ================= DELETE =================
const deleteUser = async (id) => {
  return await db.User.destroy({
    where: { id },
  });
};

export default {
  createNewUser,
  getUserList,
  getUserById,
  updateUser,
  deleteUser,
};
