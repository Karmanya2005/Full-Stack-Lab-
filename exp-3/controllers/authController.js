const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("../data/users");

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required"
      });
    }

    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  login
};