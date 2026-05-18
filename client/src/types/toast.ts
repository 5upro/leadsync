export type ToastType = "success" | "error";

export interface ToastProps {
	msg: string;
	type?: ToastType;
}

export interface ToastState {
	msg: string;
	type: ToastType;
}
