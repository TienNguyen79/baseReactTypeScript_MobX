import { toast } from 'react-toastify';

class ToastUtil{

    public info(message:string, autoClose?: number) {
        toast.info(message, {
            position: "top-right",
            autoClose: autoClose ?? 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })
    }

    public success(message:string, id?: any) {
        toast.success(message, {
            toastId: id,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true
        })
    }

    public warning(message:string, id?: any, autoClose?: number) {
        toast.warn(message, {
            toastId: id,
            position: "top-right",
            autoClose: autoClose ?? 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })
    }

    public error(message:string, id?: any) {
        toast.error(message ?? 'Đã có lỗi xảy ra!', {
            toastId: id,
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        })
    }

    public update(message: any, type: "success" | "error", toastUpdate: any) {
        toast.update(toastUpdate, {
            render: message, 
            type: type, 
            isLoading: false, 
            autoClose: 3000,
            closeOnClick: true,
        })
    }
}

export const toastUtil = new ToastUtil();

