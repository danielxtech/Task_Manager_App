import { useState } from "react";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  // Enhanced inline styles
  const styles = {
    container: {
      maxWidth: "400px",
      margin: "50px auto",
      padding: "30px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
      backgroundColor: "#007bff",
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
    <div style={{ backgroundColor: "#f4f7fc", minHeight: "100vh", padding: "20px" }}>
      <style>
        {`
          input:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
          }
          button:hover {
            background-color: #0056b3;
            transform: translateY(-1px);
          }
          a:hover {
            color: #0056b3;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>

        <form onSubmit={handleLogin} style={styles.form}>
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
            Login
          </button>
        </form>

        <div style={styles.linkText}>
          Don't have an account?{" "}
          <a href="/register" style={styles.link}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;