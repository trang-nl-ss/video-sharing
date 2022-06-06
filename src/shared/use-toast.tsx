import { AlertStatus } from "@chakra-ui/alert";
import {
  ToastPositionWithLogical,
  useToast as useToastChakra,
} from "@chakra-ui/toast";

export interface ToastType {
  status?: AlertStatus;
  title: string;
  position?: ToastPositionWithLogical;
  isCloseable?: boolean;
}

const DEFAULT_DURATION = 3000;

export interface ToastContextState {
  newToast: (toastType: ToastType) => void;
}

export function useToast(): ToastContextState {
  const toast = useToastChakra();

  const newToast = (toastType: ToastType) => {
    toast({
      title: toastType.title,
      position: "top",
      status: toastType.status || "error",
      isClosable: toastType.isCloseable,
      duration: DEFAULT_DURATION,
    });
  };
  return {
    newToast,
  };
}
