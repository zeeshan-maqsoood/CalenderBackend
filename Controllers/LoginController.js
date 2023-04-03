const SignUpModel = require('../Schema/SignupSchema');
const SignupControllerFunction = async (req, res) => {
  const { name, email, password } = req.body.values;
  const existEmail = await SignUpModel.findOne({ email: email });
  try {
    if (existEmail) {
      throw new Error('This Email is Already Exists');
    } else if (!existEmail) {
      const signupUser = await SignUpModel({
        UserName: name,
        email: email,
        password: password,
        role: 'User',
      });
      await signupUser.save();
      res
        .status(200)
        .json({ data: signupUser, message: 'You Are Registered Successfully' });
    }
    // await signupUser.save();
  } catch (error) {
    if (existEmail) {
      res.status(404).json('This Email Is ALready Exists');
    } else {
      res.status(400).json(error);
    }
  }
};

const loginControllerFunction = async (req, res) => {
  const { email, password } = req.body.values;
  try {
    const loginUser = await SignUpModel.findOne({
      email: email,
      password: password,
    });
    if (loginUser !== null) {
      const { _id, email, UserName, role } = loginUser;
      res.status(200).json({
        _id: _id,
        email: email,
        UserName: UserName,
        role: role,
        message: 'You Are Logged in Succcessfully',
      });
    } else {
      res.status(404).json('Invalid Credentials');
    }
  } catch (error) {
    res.status(404).json(error);
  }
};
module.exports = { SignupControllerFunction, loginControllerFunction };
