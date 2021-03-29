const UserSchema = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  //getProfile
  info(req, res, next) {
    UserSchema.findByEmail({ _id: req.params.id }).then((user) =>
      res.status(200).json(user)
    );
  }

  //signup
  async signup(req, res, next) {
    const check = await UserSchema.findOne({ email: req.body.email });
    if (check) {
      return res.status(400).send("Email đã được đăng ký!");
    }
    try {
      const data = req.body;
      const user = await UserSchema.create(data);
      if (user) {
        res.status(200).send("Đăng ký thành công!");
        const token = jwt.sign({ user }, process.env.SECRET_SIGN, {
          expiresIn: "1d",
        });
        res.status(201).json({ token, user: user });
      }
    } catch (err) {
      console.log(err);
    }
  }

  //login

  async login(req, res, next) {
    try {
      const user = await UserSchema.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send("Tài khoản chưa được đăng ký!");
      }
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) {
        return res.status(400).send("Sai mật khẩu!");
      }
      const token = jwt.sign({ user }, process.env.SECRET_SIGN, {
        expiresIn: "1d",
      });
      res.status(200).json({ token, user: user });
      res.status(200).send("Đăng nhập thành công!");
    } catch (error) {}
  }
}

module.exports = new UserController();
