import { toast } from "react-toastify";

export const InfoToastify = (message) => {
  toast.info(message, {
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
