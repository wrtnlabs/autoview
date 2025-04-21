import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type secret_scanning_scan_history = {
        incremental_scans?: Schema.secret_scanning_scan[];
        pattern_update_scans?: Schema.secret_scanning_scan[];
        backfill_scans?: Schema.secret_scanning_scan[];
        custom_pattern_backfill_scans?: {
            /**
             * The type of scan
            */
            type?: string;
            /**
             * The state of the scan. Either "completed", "running", or "pending"
            */
            status?: string;
            /**
             * The time that the scan was completed. Empty if the scan is running
            */
            completed_at?: (string & tags.Format<"date-time">) | null;
            /**
             * The time that the scan was started. Empty if the scan is pending
            */
            started_at?: (string & tags.Format<"date-time">) | null;
            /**
             * Name of the custom pattern for custom pattern scans
            */
            pattern_name?: string;
            /**
             * Level at which the custom pattern is defined, one of "repository", "organization", or "enterprise"
            */
            pattern_scope?: string;
        }[];
    };
    /**
     * Information on a single scan performed by secret scanning on the repository
    */
    export type secret_scanning_scan = {
        /**
         * The type of scan
        */
        type?: string;
        /**
         * The state of the scan. Either "completed", "running", or "pending"
        */
        status?: string;
        /**
         * The time that the scan was completed. Empty if the scan is running
        */
        completed_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The time that the scan was started. Empty if the scan is pending
        */
        started_at?: (string & tags.Format<"date-time">) | null;
    };
}
type IAutoViewTransformerInputType = Schema.secret_scanning_scan_history;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO timestamp or return placeholder
  const formatDate = (iso: string | null | undefined): string =>
    iso ? new Date(iso).toLocaleString() : "N/A";

  // Map scan status to chip color
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    completed: "green",
    running: "orange",
    pending: "blue",
  };

  // Flatten all scans into a unified array with a human-friendly type label
  const allScans: Array<{
    typeLabel: string;
    status?: string;
    started_at?: string | null;
    completed_at?: string | null;
  }> = [];

  if (input.incremental_scans && input.incremental_scans.length > 0) {
    for (const scan of input.incremental_scans) {
      allScans.push({
        typeLabel: "Incremental Scan",
        status: scan.status,
        started_at: scan.started_at,
        completed_at: scan.completed_at,
      });
    }
  }

  if (input.pattern_update_scans && input.pattern_update_scans.length > 0) {
    for (const scan of input.pattern_update_scans) {
      allScans.push({
        typeLabel: "Pattern Update Scan",
        status: scan.status,
        started_at: scan.started_at,
        completed_at: scan.completed_at,
      });
    }
  }

  if (input.backfill_scans && input.backfill_scans.length > 0) {
    for (const scan of input.backfill_scans) {
      allScans.push({
        typeLabel: "Backfill Scan",
        status: scan.status,
        started_at: scan.started_at,
        completed_at: scan.completed_at,
      });
    }
  }

  if (input.custom_pattern_backfill_scans && input.custom_pattern_backfill_scans.length > 0) {
    for (const scan of input.custom_pattern_backfill_scans) {
      const name = scan.pattern_name ?? "Custom Pattern";
      allScans.push({
        typeLabel: `Custom Pattern: ${name}`,
        status: scan.status,
        started_at: scan.started_at,
        completed_at: scan.completed_at,
      });
    }
  }

  // If there are no scans, show a friendly markdown notice
  if (allScans.length === 0) {
    return {
      type: "Markdown",
      content: "## 🔍 No secret scanning history available.",
    };
  }

  // Build a DataList of scan entries with visual chips for status and timestamps
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = allScans.map(scan => {
    // Compose chips: status + timestamps
    const chips: IAutoView.IAutoViewChipProps[] = [];

    // Status chip with color coding
    if (scan.status) {
      chips.push({
        type: "Chip",
        label: scan.status.charAt(0).toUpperCase() + scan.status.slice(1),
        color: statusColorMap[scan.status] ?? "gray",
        size: "small",
        variant: "filled",
      });
    }

    // Started timestamp chip
    chips.push({
      type: "Chip",
      label: `Started: ${formatDate(scan.started_at)}`,
      size: "small",
      variant: "outlined",
    });

    // Completed timestamp chip (only if available)
    if (scan.completed_at) {
      chips.push({
        type: "Chip",
        label: `Completed: ${formatDate(scan.completed_at)}`,
        size: "small",
        variant: "outlined",
      });
    }

    // Wrap chips in a ChipGroup for better layout
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chips,
    };

    // Label text for the scan type
    const labelText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: scan.typeLabel,
      variant: "subtitle2",
    };

    return {
      type: "DataListItem",
      label: labelText,
      value: chipGroup,
    };
  });

  // Return the DataList component
  return {
    type: "DataList",
    childrenProps: dataListItems,
  };
}
