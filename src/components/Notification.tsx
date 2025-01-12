import {ToastOptions, toast} from "react-toastify";

const defaultOptions: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const Notification = {
    success: (message: string, options?: ToastOptions) =>
        toast.success(message, { ...defaultOptions, ...options }),

    error: (message: string, options?: ToastOptions) =>
        toast.error(message, { ...defaultOptions, ...options }),

    info: (message: string, options?: ToastOptions) =>
        toast.info(message, { ...defaultOptions, ...options }),

    warning: (message: string, options?: ToastOptions) =>
        toast.warn(message, { ...defaultOptions, ...options }),

    custom: (message: string, options?: ToastOptions) =>
        toast(message, { ...defaultOptions, ...options }),
};