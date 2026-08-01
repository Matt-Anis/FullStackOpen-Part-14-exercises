import { getAllUsers } from "../services/users";
import Link from "next/link";

const Users = async () => {
  const users = await getAllUsers();

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
