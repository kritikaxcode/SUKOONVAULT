require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const app = express();
const PORT = 5000;


// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// JWT authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    req.user = user;
    next();
  });
};

// Test database connection
pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("Database connection failed:", error.message);
  } else {
    console.log("PostgreSQL connected successfully ✅");
  }
});

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "SUKOONVAULT backend is running 🚀",
  });
});

// Health check API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SUKOONVAULT API is healthy",
  });
});

// Get resources from PostgreSQL
app.get("/api/resources", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM resources ORDER BY id"
    );

    res.json({
      success: true,
      resources: result.rows,
    });
  } catch (error) {
    console.error("Error fetching resources:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resources",
    });
  }
});

// User registration API
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Save user in PostgreSQL
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name, email, passwordHash]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    // Duplicate email
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
});

// User login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user by email
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare entered password with stored hash
    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    //create JWT tokens
const token = jwt.sign(
  {
    userId: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h",
  }
);

// Login successful
res.json({
  success: true,
  message: "Login successful",
  token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
});
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});

// Protected profile API
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE id = $1",
      [req.user.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Profile error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
});

app.post("/api/check-ins", authenticateToken, async (req, res) => {
  try {
    const { mood, stress_level, sleep_hours, note } = req.body;

    if (!mood || !stress_level) {
      return res.status(400).json({
        success: false,
        message: "Mood and stress level are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO check_ins
       (user_id, mood, stress_level, sleep_hours, note)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        req.user.userId,
        mood,
        stress_level,
        sleep_hours || null,
        note || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Check-in saved successfully",
      checkIn: result.rows[0],
    });
  } catch (error) {
    console.error("Check-in error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to save check-in",
    });
  }
});

app.get("/api/check-ins", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, mood, stress_level, sleep_hours, note, created_at
       FROM check_ins
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.userId]
    );

    res.json({
      success: true,
      checkIns: result.rows,
    });
  } catch (error) {
    console.error("Check-in history error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch check-ins",
    });
  }
});

app.get("/api/counsellors", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, specialization, email, phone, available
       FROM counsellors
       WHERE available = TRUE
       ORDER BY id`
    );

    res.json({
      success: true,
      counsellors: result.rows,
    });
  } catch (error) {
    console.error("Counsellors error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch counsellors",
    });
  }
});
app.post("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const { counsellor_id, appointment_date, note } = req.body;

    if (!counsellor_id || !appointment_date) {
      return res.status(400).json({
        success: false,
        message: "Counsellor and appointment date are required",
      });
    }

    const counsellor = await pool.query(
      "SELECT id FROM counsellors WHERE id = $1 AND available = TRUE",
      [counsellor_id]
    );

    if (counsellor.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Counsellor not available",
      });
    }

    const result = await pool.query(
      `INSERT INTO appointments
       (user_id, counsellor_id, appointment_date, note)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [
        req.user.userId,
        counsellor_id,
        appointment_date,
        note || null,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Appointment request submitted",
      appointment: result.rows[0],
    });
  } catch (error) {
    console.error("Appointment error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
    });
  }
});

app.get("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         a.id,
         a.appointment_date,
         a.status,
         a.note,
         a.created_at,
         c.name AS counsellor_name,
         c.specialization
       FROM appointments a
       JOIN counsellors c ON a.counsellor_id = c.id
       WHERE a.user_id = $1
       ORDER BY a.appointment_date ASC`,
      [req.user.userId]
    );

    res.json({
      success: true,
      appointments: result.rows,
    });
  } catch (error) {
    console.error("Appointments error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
    });
  }
});
app.get("/api/emergency-resources", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, description, contact, available_24x7
       FROM emergency_resources
       ORDER BY id`
    );

    res.json({
      success: true,
      resources: result.rows,
    });
  } catch (error) {
    console.error("Emergency resources error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch emergency resources",
    });
  }
});

app.post("/api/ai/chat", authenticateToken, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/interactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          model: "gemini-3.8-flash",
          input: `
You are SUKOONVAULT, a supportive mental-health companion for college students.

Rules:
- Be empathetic, calm, and non-judgmental.
- Do not diagnose mental-health conditions.
- Do not claim to be a therapist or doctor.
- Give practical, general wellbeing guidance.
- Encourage professional help when appropriate.
- If the student appears to be in immediate danger or may harm themselves or someone else, encourage them to contact emergency services or a qualified mental-health professional immediately.

Student message:
${message}
          `,
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini response status:", response.status);
console.log("Gemini response data:", data);

    if (!response.ok) {
      console.error("Gemini API error:", data);

      return res.status(500).json({
        success: false,
        message: "Gemini API request failed",
      });
    }

    res.json({
      success: true,
      reply: data.steps
  ?.find((step) => step.type === "model_output")
  ?.content
  ?.map((item) => item.text || "")
  .join("") || "Sorry, I could not generate a response.",
    });
  } catch (error) {
    console.error("AI chat error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to generate AI response",
    });
  }
});

app.get("/api/analytics/overview", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        COUNT(*) AS total_check_ins,
        ROUND(AVG(mood), 2) AS average_mood,
        ROUND(AVG(stress_level), 2) AS average_stress,
        ROUND(AVG(sleep_hours), 2) AS average_sleep_hours
      FROM check_ins
    `);

    res.json({
      success: true,
      analytics: result.rows[0],
    });
  } catch (error) {
    console.error("Analytics error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch analytics",
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SUKOONVAULT server running on http://localhost:${PORT}`);
});