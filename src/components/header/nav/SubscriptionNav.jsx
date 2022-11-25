import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import toast from "react-hot-toast";

// import { ConfirmDialog } from "primereact/confirmdialog"; // To use <ConfirmDialog> tag
// import { confirmDialog } from "primereact/confirmdialog"; // To use confirmDialog method

export default function SubscriptionNav() {
  // const [visible, setVisible] = useState(boolean(false));
  const { user, handleLogout } = useContext(UserContext);
  // const confirm = () => {
  //   confirmDialog({
  //     message: "Are you sure you want to proceed?",
  //     header: "Confirmation",
  //     icon: "pi pi-exclamation-triangle",
  //     accept: () => acceptFunc(),
  //     reject: () => rejectFunc(),
  //   });
  // };

  return (
    <>
      {Object.keys(user).length ? (
        <>
          <div>{user.name}</div>
          <button
            className="text-2xl border px-5 py-0 hover:text-sky-400 hover:border-sky-400"
            onClick={handleLogout}
          >
            Logout!
          </button>

          {/* <ConfirmDialog
            visible={visible}
            onHide={() => setVisible(false)}
            message="Are you sure you want to proceed?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            accept={accept}
            reject={reject}
          />

          <Button
            onClick={() => setVisible(true)}
            icon="pi pi-check"
            label="Confirm"
          /> */}
        </>
      ) : (
        <Link to={"/login/"}>
          <button className="text-2xl border px-5 py-0 hover:text-sky-400 hover:border-sky-400">
            Login
          </button>
        </Link>
      )}
    </>
  );
}
