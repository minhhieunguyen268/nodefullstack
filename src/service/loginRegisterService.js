import bcrypt from "bcryptjs";
import db from "../models/index.js";
import { getGroupWithRoles } from "./JWTService.js";
import { createJWT } from "../middleware/JWTAction.js";
import dotenv from 'dotenv';
dotenv.config();

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

const checkPassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const checkEmailExist = async (userEmail) => {
  let isExist = await db.User.findOne({
    where: { email: userEmail },
  });
  return isExist ? true : false;
};

const checkPhoneNumberExist = async (phoneNumber) => {
  let isExist = await db.User.findOne({
    where: { phoneNumber: phoneNumber },
  });
  return isExist ? true : false;
};

const registerNewUser = async (userData) => {
  try {
    let checkEmail = await checkEmailExist(userData.email);
    if (checkEmail) {
      return {
        EM: "Your email is already in used, please try another email!",
        EC: "1",
        DT: "",
      };
    }

    let checkPhoneNumber = await checkPhoneNumberExist(userData.phoneNumber);
    if (checkPhoneNumber) {
      return {
        EM: "Your phone number is already in used, please try another phone number!",
        EC: "1",
        DT: "",
      };
    }

    const hashPass = hashUserPassword(userData.password);
    await db.User.create({
      email: userData.email,
      password: hashPass,
      phoneNumber: userData.phoneNumber,
      username: userData.username,
      groupId: 4,
    });

    return { EM: "Register successs!", EC: "0", DT: "" };
  } catch (error) {
    return { EM: "Error from server!", EC: "-1", DT: "" };
  }
};

const handleUserLogin = async (rawData) => {
  try {
    let checkEmail = await checkEmailExist(rawData.valueLogin);
    let checkPhoneNumber = await checkPhoneNumberExist(rawData.valueLogin);

    if (!checkEmail && !checkPhoneNumber) {
      return {
        EM: "Your email or phone number is not exist, please try another email or phone number!",
        EC: "1",
        DT: "",
      };
    }

    let user = await db.User.findOne({
      where: checkEmail
        ? { email: rawData.valueLogin }
        : { phoneNumber: rawData.valueLogin },
      raw: true,
    });

    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword) {
        const groupWithRoles = await getGroupWithRoles(user);
        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN
        }
        let token = createJWT(payload);
        return {
          EM: "Login success!",
          EC: "0",
          DT: {
            access_token: token,
            groupWithRoles
          },
        };
      } else {
        return { EM: "Your password is incorrect!", EC: "1", DT: "" };
      }
    }
  } catch (error) {
    return { EM: "Error from server!", EC: "-1", DT: "" };
  }
};

export default {
  registerNewUser,
  handleUserLogin,
};
