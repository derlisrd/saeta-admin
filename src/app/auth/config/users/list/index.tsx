

import Notificacion from "./_components/noti";
import PasswordModal from "./_modals/password";
import PermisosModal from "./_modals/permisos";
import UsersList from "./list";
import UserProvider from "./provider";

function Users() {
  return <UserProvider>
    <PermisosModal />
    <PasswordModal />
    <UsersList />
    <Notificacion />
  </UserProvider>
}

export default Users;