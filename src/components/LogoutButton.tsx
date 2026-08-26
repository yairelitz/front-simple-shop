import { toast } from "react-toastify";
import { logout, type User } from "../services/auth.service";

type LogoutProps = {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const LogoutButton = ({ setUser }: LogoutProps) => {
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      // ניתוב מחדש / ניקוי state
      toast.success("התנתקת בהצלחה")
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("שגיאה בהתנתקות")
    }
  };

  return (
  <button className="logout-btn" onClick={handleLogout}>
    התנתק
  </button>
);
};

export default LogoutButton;
