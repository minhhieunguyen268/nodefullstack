import loginRegisterService from "../service/loginRegisterService.js";

const testApi = (req, res) => {
  return res
    .status(200)
    .json({ message: "API is working!", data: "testt api" });
};

const handleRegister = async (req, res) => {
  try {
    if (!req.body.email || !req.body.phoneNumber || !req.body.password) {
      return res
        .status(400)
        .json({ EM: "Missing inputs parameter!", EC: "1", DT: "" });
    }

    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ EM: "Your password must be at least 6 characters!", EC: "1", DT: "" });
    }

    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
  } catch (error) {
    return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
  }
}

export default {
  testApi,
  handleRegister,
  handleLogin,
};
