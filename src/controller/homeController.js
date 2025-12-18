import userService from "../service/userService.js";

const handleHelloWord = (req, res) => {
  const name = "minhhieu";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  userService.createNewUser(email, password, username);
  //   let check = bcrypt.compareSync(password, hashPassword);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  return res.redirect("/user");
};

const getUpdateUserPage = async (req, res) => {
  let idUser = req.params.id;
  let User = await userService.getUserById(idUser);
  return res.render("user-update.ejs", { User });
};

const handleUpdateNewUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  userService.updateUser(email, username, id);

  return res.redirect("/user");
};

export default {
  handleHelloWord,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateNewUser,
};
