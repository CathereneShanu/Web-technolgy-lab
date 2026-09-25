import { useState } from "react";
import "./App.css";
import StatCard from "./components/StatCard";
import Navbar from "./components/Navbar";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState("");
  const courses = [
  "Web Technology",
  "Database Management",
  "Machine Learning",
  "Computer Networks"
];
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="header">
        <Navbar />
        <button
          className="profile-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Theme
        </button>
      </header>

      <main className="dashboard">
        <section className="welcome">
          <h1>Welcome Back!</h1>
          <p>Here is your academic overview.</p>
        </section>

        <section className="cards">
          <StatCard title="Courses" value="6" />
          <StatCard title="Assignments" value="12" />
          <StatCard title="Attendance" value="92%" />
          <StatCard title="CGPA" value="8.7" />
        </section>

        <section className="course-section">
            <h2>My Courses</h2>
            <div className="course-list">
            {courses.map((course, index) => (
              <div className="course-item" key={index}>
              {course}
              </div>
            ))}
            </div>
        </section>

        <section className="task-section">
          <h2>Add Task</h2>

          <input
            type="text"
            placeholder="Enter a task"
            value={task}
            onChange={(event) => setTask(event.target.value)}
          />

          <button onClick={() => alert(task)}>Add</button>
        </section>
      </main>
    </div>
  );
}

export default App;