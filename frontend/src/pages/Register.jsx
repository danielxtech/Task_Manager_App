import { useState } from "react";
import api from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful!");

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };

  // Enhanced inline styles (matching Login component)
  const styles = {
    pageWrapper: {
      backgroundColor: "#f4f7fc",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    card: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      backgroundColor: "white",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    title: {
      color: "#2c3e50",
      marginBottom: "24px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    input: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxSizing: "border-box",
    },
    button: {
      width: "100%",
      backgroundColor: "#28a745",  // green for register (different from login blue)
      color: "white",
      border: "none",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginTop: "8px",
    },
    linkText: {
      marginTop: "20px",
      fontSize: "14px",
      color: "#555",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
      transition: "color 0.2s",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <style>
        {`
          input:focus {
            outline: none;
            border-color: #28a745;
            box-shadow: 0 0 0 3px rgba(40,167,69,0.1);
          }
          button:hover {
            background-color: #218838;
            transform: translateY(-1px);
          }
          a:hover {
            color: #0056b3;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.card}>
        <h1 style={styles.title}>Register</h1>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <div style={styles.linkText}>
          Already have an account?{" "}
          <a href="/" style={styles.link}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;