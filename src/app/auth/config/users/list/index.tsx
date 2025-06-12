

import PermisosModal from "./_modals/permisos";
import UsersList from "./list";
import UserProvider from "./provider";

function Users() {
  return <UserProvider>
    <PermisosModal />
    <UsersList />
  </UserProvider>
}

export default Users;