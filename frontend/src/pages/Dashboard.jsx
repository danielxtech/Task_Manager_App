import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/tasks", {
        headers: {
          Authorization: token,
        },
      });

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks",
        { title },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (task) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${task._id}`,
        {
          title: task.title,
          completed: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/tasks/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Enhanced inline styles with colors and transition-ready properties
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f7fc",
      minHeight: "100vh",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    logoutBtn: {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "8px 16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "14px",
      transition: "all 0.2s ease",
    },
    addSection: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "30px",
    },
    input: {
      width: "70%",
      padding: "10px",
      fontSize: "16px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      marginRight: "10px",
      transition: "border-color 0.2s",
    },
    addBtn: {
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "6px",
      cursor: "pointer",
      fontSize: "16px",
      transition: "all 0.2s ease",
    },
    taskCard: {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      transition: "transform 0.2s, box-shadow 0.2s",
    },
    completeBtn: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    deleteBtn: {
      backgroundColor: "#6c757d",
      color: "white",
      border: "none",
      padding: "6px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      marginLeft: "10px",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Global style for hover effects and extra transitions */}
      <style>
        {`
          button:hover {
            opacity: 0.85;
            transform: translateY(-1px);
          }
          input:focus {
            outline: none;
            border-color: #28a745;
            box-shadow: 0 0 0 3px rgba(40,167,69,0.1);
          }
          .task-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          }
        `}
      </style>

      <div style={styles.header}>
        <h1 style={{ color: "#2c3e50", margin: 0 }}>Task Manager Dashboard</h1>
        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <div style={styles.addSection}>
        <h2 style={{ color: "#2c3e50", marginTop: 0 }}>Add Task</h2>
        <div>
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
          <button onClick={addTask} style={styles.addBtn}>
            Add Task
          </button>
        </div>
      </div>

      <hr style={{ margin: "20px 0" }} />

      <h2 style={{ color: "#2c3e50" }}>My Tasks</h2>

      {tasks.length === 0 ? (
        <p style={{ color: "#6c757d", fontStyle: "italic" }}>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            className="task-card"
            style={styles.taskCard}
          >
            <h3 style={{ margin: "0 0 8px 0", color: "#343a40" }}>{task.title}</h3>
            <p style={{ margin: "0 0 12px 0" }}>
              Status:{" "}
              {task.completed ? (
                <span style={{ color: "#28a745", fontWeight: "bold" }}>Completed ✅</span>
              ) : (
                <span style={{ color: "#ffc107", fontWeight: "bold" }}>Pending ⏳</span>
              )}
            </p>
            <div>
              {!task.completed && (
                <button onClick={() => completeTask(task)} style={styles.completeBtn}>
                  Complete
                </button>
              )}
              <button onClick={() => deleteTask(task._id)} style={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;