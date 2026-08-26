import { useEffect, useState } from "react";
import { getAdminUsers, updateUserRole } from "../../services/admin.service";
import type { User } from "../../services/auth.service";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(data.data.users || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      const updatedUser = await updateUserRole(id, newRole);

      setUsers((prev) => prev.map((u) => (u._id === id ? updatedUser : u)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading users...</div>;

  return (
    <>
      {/* <h2>משתמשים</h2> */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="role-switch">
                    <button
                      className={user.role === "user" ? "active" : ""}
                      onClick={() => handleRoleChange(user._id, "user")}
                    >
                      User
                    </button>

                    <button
                      className={user.role === "admin" ? "active" : ""}
                      onClick={() => handleRoleChange(user._id, "admin")}
                    >
                      Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UsersTable;
