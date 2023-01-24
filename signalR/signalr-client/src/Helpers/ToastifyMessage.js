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

export const SuccessToastify = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const ErrorToastify = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
