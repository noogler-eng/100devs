import { Turnstile } from "@marsidev/react-turnstile";
import axios from "axios";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState<string>("sharad@gmail.com");
  const [token, setToken] = useState<string>("");
  const [otp, setOtp] = useState<string>("123456");
  const [newPassword, setNewPassword] = useState<string>("sharad");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert("Please complete the captcha first!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/reset-password",
        {
          email: "sharad@gmail.com",
          otp,
          new_password: newPassword,
          token,
        }
      );
      console.log("Response:", response.data);
      alert("Password reset successful!");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password. Try again.");
    }
  };

  const handleGetOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/get-otp", {
        email: "sharad@gmail.com",
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div>
      <h2>Hi, I am Sharad</h2>

      <form onSubmit={handleGetOtp}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">get otp</button>
      </form>

      {/* Turnstile Challenge */}
      <div>
        <Turnstile
          siteKey="0x4AAAAAABCoHbJQRWgRDFg3"
          onSuccess={(newToken) => {
            console.log("Token received:", newToken);
            setToken(newToken);
          }}
        />
      </div>

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default App;
