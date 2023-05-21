import { RefObject, useEffect } from "react";

type Handler = () => void;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  triggerRef: RefObject<T>,
  handler: Handler
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const { current: el } = ref;
      const { current: triggerEl } = triggerRef;

      if (
        !el?.contains(event.target as Node) &&
        !triggerEl?.contains(event.target as Node)
      ) {
        handler();
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
}

export default useOnClickOutside;
