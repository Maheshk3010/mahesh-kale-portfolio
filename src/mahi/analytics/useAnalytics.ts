import { useSyncExternalStore } from "react";
import { analyticsService } from "./analyticsService";
import type { AnalyticsSnapshot } from "./types";

/** Reactive read of the current analytics snapshot. */
export function useAnalytics(): AnalyticsSnapshot {
  return useSyncExternalStore(
    (cb) => analyticsService.subscribe(cb),
    analyticsService.getSnapshot,
    analyticsService.getServerSnapshot,
  );
}
