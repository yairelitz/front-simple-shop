import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await register({ name, email, password });
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) {
          setError("משתמש כבר קיים");
        } else {
          setError("שגיאת שרת");
        }
      } else {
        // כל שגיאה אחרת
        setError("שגיאה לא צפויה");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>הרשמה</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="שם"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="אימייל"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          placeholder="סיסמה"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button disabled={loading}>{loading ? "נרשם..." : "הירשם"}</button>
      </form>

      <p>
        כבר יש לך חשבון? <Link to="/login">התחברות</Link>
      </p>
    </div>
  );
}
