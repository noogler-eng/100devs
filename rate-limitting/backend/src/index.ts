import express from "express";
import dotnev from "dotenv";
import { rateLimit } from "express-rate-limit";
import generateOtp from "./utils/getOtp";
dotnev.config();

// this rate limiter valid in which in 15 min we can only do 100 req
// extra request leads to rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

const app = express();
app.use(express.json());
// here rate-limiter will be applied to all the endpoints
app.use(limiter);

// in memory database
const otpStore: Record<string, string> = {};

// sending the otp tp the user email or mobile (authorised save in database)
// if there is no user then returning user error or navigating to the signup page
app.post("/get-otp", (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      res.status(400).json({
        msg: "please enter email",
      });
    }

    const otp: string = generateOtp();
    otpStore[email] = otp;
    console.log(`otp generated for email ${email}: `, otp);
    res.status(201).json({
      otp: otp,
      msg: `otp generated successfully for ${email}`,
    });
  } catch (error) {
    console.log("error while generating otp", error);
    res.status(500).json({
      msg: "server side error",
    });
  }
});

// when user forget password then reseting the password then there
// will be send otp functionality which will create an otp
// this is to reset password by conforming is the otp is valid or not
app.post("/reset-password", (req, res) => {
  try {
    const { email, otp, new_password } = req.body;
    if (!email || !otp || !new_password) {
      res.status(400).json({
        msg: "please enter credentails correctly",
      });
    }

    if (otpStore[email] == otp) {
      console.log(`otp has been matched for ${email}`);
      // we are deleting the object fromt he store
      delete otpStore[email];
      console.log(`password has been changed for ${email}`);
      res.status(200).json({
        status: "OK",
        msg: "otp! matched",
      });
    } else {
      res.status(400).json({
        status: "NOK",
        msg: "wrong otp!",
      });
    }
  } catch (error) {
    console.log("error while reseting password", error);
    res.status(500).json({
      msg: "server side error",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    msg: "server is running",
  });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running at: http://localhost:${port}`);
});
