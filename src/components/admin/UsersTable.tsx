import { useEffect, useState } from "react";
import { getAdminUsers } from "../../services/admin.service";
// types/user.ts
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
        // אם השרת מחזיר { users: [...] }
        setUsers(data.data.users || []);
        console.log(data.data.users)
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;

  return (<>

    <h2>Users</h2>

    <table border={1} cellPadding={5} cellSpacing={0}>
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
            <td>{user.role}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default UsersTable;