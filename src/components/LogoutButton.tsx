import { toast } from "react-toastify";
import { logout } from "../services/auth.service";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
      // ניתוב מחדש / ניקוי state
      toast.success("התנתקת בהצלחה")
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("שגיאה בהתנתקות")
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
