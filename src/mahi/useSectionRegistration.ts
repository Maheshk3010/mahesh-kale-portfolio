import { useEffect, useRef } from "react";
import { navigationService } from "./navigation";

/**
 * Registers a DOM element as a navigable portfolio section.
 * Returns a ref to attach to the section's root element.
 */
export function useSectionRegistration<T extends HTMLElement = HTMLElement>(
  id: string | undefined,
  title: string,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!id || !ref.current) return;
    return navigationService.register({ id, title, element: ref.current });
  }, [id, title]);

  return ref;
}
