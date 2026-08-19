const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("admin123", 10),
    role: "admin",
    name: "Admin User"
  },
  {
    id: 2,
    username: "editor",
    password: bcrypt.hashSync("editor123", 10),
    role: "editor",
    name: "Editor User"
  },
  {
    id: 3,
    username: "viewer",
    password: bcrypt.hashSync("viewer123", 10),
    role: "viewer",
    name: "Viewer User"
  }
];

module.exports = users;