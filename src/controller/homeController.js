// get the client
import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt",
});

const handleHelloWord = (req, res) => {
  const name = "minhhieu";
  return res.render("home.ejs", { name });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;

  
  connection.query(
    'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
    [email, password, username],
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );

  return res.send("hand create new user");
};

export default {
  handleHelloWord,
  handleUserPage,
  handleCreateNewUser,
};
