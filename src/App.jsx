
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("loginUsers") || "[]"
    );

    const cleanEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === cleanEmail)) {
      setMessage("Email already registered. Please login.");
      return;
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      password: password,
    };

    users.push(newUser);
    localStorage.setItem("loginUsers", JSON.stringify(users));

    setMessage("Registration successful! Please login.");
    setEmail(cleanEmail);
    setName("");
    setPassword("");
    setShowPassword(false);
    setPage("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("loginUsers") || "[]"
    );

    const cleanEmail = email.trim().toLowerCase();

    const foundUser = users.find(
      (u) => u.email === cleanEmail && u.password === password
    );

    if (!foundUser) {
      setMessage("Invalid email or password.");
      return;
    }

    setUser(foundUser);
    setPage("dashboard");
    setMessage("");
    setPassword("");
    setShowPassword(false);
  };

  const handleLogout = () => {
    setUser(null);
    setEmail("");
    setPassword("");
    setMessage("");
    setShowPassword(false);
    setPage("login");
  };

  return (
    <main className="app-container">
      {page === "register" && (
        <section className="form-card">
          <h1>Register</h1>
          <p className="subtitle">Create your account</p>

          <form onSubmit={handleRegister}>
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}"
                title="Use 8+ characters with uppercase, lowercase, number and special character"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>
            </div>

            <button type="submit">Register</button>
          </form>

          {message && <p className="message">{message}</p>}

          <p className="switch-page">
            Already have an account?{" "}
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setPage("login");
                setMessage("");
              }}
            >
              Login
            </button>
          </p>
        </section>
      )}

      {page === "login" && (
        <section className="form-card">
          <h1>Login</h1>
          <p className="subtitle">Welcome back!</p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                👁
              </span>
            </div>

            <button type="submit">Login</button>
          </form>

          {message && <p className="message">{message}</p>}

          <p className="switch-page">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setPage("register");
                setMessage("");
              }}
            >
              Register
            </button>
          </p>
        </section>
      )}

      {page === "dashboard" && user && (
        <section className="form-card dashboard">
          <h1>Dashboard</h1>
          <h2>Welcome, {user.name}!</h2>
          <p>You have logged in successfully.</p>

          <p className="user-email">
            <strong>Email:</strong> {user.email}
          </p>

          <button type="button" onClick={handleLogout}>
            Logout
          </button>

          <button
            type="button"
            className="back-button"
            onClick={() => setPage("login")}
          >
            Back to Login
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
