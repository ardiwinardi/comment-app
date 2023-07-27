import { useState } from "react";

export default function useDisclosure(defaultValue?: boolean) {
  const [open, setIsOpen] = useState(defaultValue ?? false);

  const control = {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(!open),
  };

  return { open, control };
}
