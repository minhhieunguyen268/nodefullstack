import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
  Promise: bluebird,
});

const hashUserPassword = (uesrPassword) => {
  const hashPassword = bcrypt.hashSync(uesrPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  const hashPass = hashUserPassword(password);

   await connection.execute(
    "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
    [email, hashPass, username]
  );
};

const getUserList = async () => {
  try {
    const [rows, fields] = await connection.execute("Select * from users");
    return rows;
  } catch (error) {
    console.log(">>>check error ", error);
  }
};

const deleteUser = async (id) => {
    await connection.execute(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
}

const getUserById = async (id) => {
    const [rows, fields] = await connection.execute(
    "SELECT * FROM users WHERE id = ?",
    [id] );
    return rows[0];
}

const updateUser = async (email, username, id) => {

   await connection.execute(
    "UPDATE users SET email = ?, username = ? WHERE id = ?",
    [email, username, id]
  );
};

export default {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUser,
};
