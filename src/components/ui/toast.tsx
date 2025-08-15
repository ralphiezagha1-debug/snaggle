// src/components/ui/toast.tsx
import * as ToastPrimitives from "@radix-ui/react-toast";

// Minimal shim so other files can import these names.
// (You can style these later; this unblocks the build.)

export const ToastProvider = ToastPrimitives.Provider;
export const ToastViewport = ToastPrimitives.Viewport;

export const Toast = ToastPrimitives.Root;
export const ToastTitle = ToastPrimitives.Title;
export const ToastDescription = ToastPrimitives.Description;
export const ToastClose = ToastPrimitives.Close;
export const ToastAction = ToastPrimitives.Action;

export type {
  ToastProviderProps,
  ToastViewportProps,
  ToastProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastCloseProps,
  ToastActionProps,
} from "@radix-ui/react-toast";
