import { useEffect } from "react";

export default function useClickOutside(ref, callback, ) {
  const refs = Array.isArray(ref) ? ref : [ref];
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      const currents = refs.map((ref) => ref.current);
      const trigger = currents.every((current) => current && !current.contains(event.target));
      if (trigger) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, refs);
}
