const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://budanianikhil2004:Nb%402004%40@cluster.vrkaf.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

// 🔹 Register API (Without Password Hashing)
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await EmployeeModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Save user with plain text password (Not Secure)
    const employee = new EmployeeModel({ name, email, password });
    await employee.save();

    console.log("New Employee Registered:", employee);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔹 Login API (Without Hashing)
app.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;
      console.log("Login Request:", email, password); // Debugging

      const user = await Employee.findOne({ email });

      if (!user) {
          console.log("No user found with this email");
          return res.json({ error: "No record exists" });
      }

      console.log("User Found:", user);

      if (user.password !== password) {
          console.log("Incorrect password");
          return res.json({ error: "Invalid credentials" });
      }

      console.log("Login successful");
      res.json({ message: "Login successful" });

  } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
