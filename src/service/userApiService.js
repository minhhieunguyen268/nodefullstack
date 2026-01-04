import db from "../models/index.js";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const getAllUsers = async () => {
  try {
    let users = await db.User.findAll({
        attributes: ["id", "username", "email", "phoneNumber", "sex"],
        include: [{ model: db.Group, attributes: ['name', 'description'] }]
    });
    if (users && users.length > 0) {
      return { EM: "Get all users successfully", EC: 0, DT: users };
    } else {
      return { EM: "No users found", EC: 0, DT: [] };
    }
  } catch (error) {
    return { EM: "Error from server", EC: -1, DT: "" };
  }
};

const createNewUser = async (data) => {
  try {
    let exist = await db.User.findOne({
      where: { email: data.email }
    });

    if (exist) {
      return {
        EM: "Email already exists",
        EC: 1,
        DT: ""
      };
    }

    const hashPass = await hashUserPassword(data.password);

    await db.User.create({
      email: data.email,
      password: hashPass,
      phoneNumber: data.phoneNumber,
      username: data.username,
      address: data.address,
      sex: data.sex,
      groupId: data.groupId,
    });

    return {
      EM: "User created successfully",
      EC: 0,
      DT: ""
    };
  } catch (error) {
    return {
      EM: "Error from server",
      EC: -1,
      DT: ""
    };
  }
};

const editUser = async (data) => {
  try {
    let user = await db.User.findOne({ where: { id: data.id } });
    if (user) {
      user.username = data.username;
      user.address = data.address;
      user.sex = data.sex;
      user.groupId = data.groupId;
      await user.save();
    }
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    let user = await db.User.findByPk(userId);
    if (user) {
      await user.destroy();
    }
  } catch (error) {
    throw error;
  }
};

const getUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        let { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phoneNumber", "address", "sex"],
            include: [{
                model: db.Group,
                attributes: ['id', 'name', 'description']
            }],
        });

        return {
            EM: "Get users with pagination successfully",
            EC: 0,
            DT: {
                totalItems: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                users: rows
            }
        };
    } catch (error) {
        console.error("Pagination error:", error);
        return {
            EM: "Error from server",
            EC: -1,
            DT: ""
        };
    }
};

export default {
  getAllUsers,
  createNewUser,
  editUser,
  deleteUser,
  getUsersWithPagination,
};
