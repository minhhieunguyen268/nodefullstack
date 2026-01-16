import jwt from "jsonwebtoken";

const createJWT = (payload) => {
  // const payload = { name: "hieu", address: "travinh"};
  let key = process.env.JWT_SECRET;

  let token = null;

  try {
    token = jwt.sign(payload, key);

    //    {
    //   expiresIn: process.env.JWT_EXPIRES_IN
    // }
  } catch (err) {
    console.log(err);
  }

  //console.log(">>>token", token);
  return token;
};

const verifyToken = (token) => {
  let key = process.env.JWT_SECRET;
  let data = null;

  try {
    let decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(">>>err", error);
  }
  console.log(">>>data", data);
  return data;
};

export { createJWT, verifyToken };
