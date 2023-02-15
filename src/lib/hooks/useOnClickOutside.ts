import { useEffect, MutableRefObject } from "react";

/**
 * @param {MutableRefObject<any>} ref - reference to the element
 * @param {(val: any) => void} handler - callback function that will run on the outside click of the given dom element
 */
export const useOnClickOutside = (
  ref: MutableRefObject<any>,
  handler: (val: any) => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
