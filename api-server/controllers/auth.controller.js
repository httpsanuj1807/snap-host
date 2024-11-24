const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

async function githubAuth(req, res) {
  const { userDetails, access_token, expirationTime } = req.body;

  const email = userDetails?.email;

  // check if the user already exist else save in the databse

  if (!email) {
    return res
      .status(400)
      .json({ message: "Invalid input. Email is required!" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const user = new User(userDetails);
      await user.save();
    }

    const token = jwt.sign({ access_token, userId: user._id }, process.env.JWT_SECRET);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        expires: new Date(expirationTime),
      })
      .status(200)
      .json({ messgae: "Login Successfully", data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


async function isVerifiedUser(req, res, next){

    if(req.access_token && req.userId){


        try{

          const user = await User.findOne({ _id: req.userId });
          return res.status(200).json({messgae: "User is Authenticated.", data: user});

        }
        catch(err){

          return res.status(200).json({messgae: "Unauthorized request."});

        }
        
    
    }

    return res.status(401).json({message: "Unauthorized request."});

}

module.exports = {githubAuth, isVerifiedUser};