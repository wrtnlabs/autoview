import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An export of a codespace. Also, latest export details for a codespace can be fetched with id = latest
     *
     * @title Fetches information about an export of a codespace.
    */
    export type codespace_export_details = {
        /**
         * State of the latest export
        */
        state?: string | null;
        /**
         * Completion time of the last export operation
        */
        completed_at?: (string & tags.Format<"date-time">) | null;
        /**
         * Name of the exported branch
        */
        branch?: string | null;
        /**
         * Git commit SHA of the exported branch
        */
        sha?: string | null;
        /**
         * Id for the export details
        */
        id?: string;
        /**
         * Url for fetching export details
        */
        export_url?: string;
        /**
         * Web url for the exported branch
        */
        html_url?: string | null;
    };
}
type IAutoViewTransformerInputType = Schema.codespace_export_details;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build an array of DataListItemProps dynamically based on available fields
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // State field with colored icon
  if (input.state != null) {
    const lower = input.state.toLowerCase();
    // Map common keywords to icon colors
    const stateColor = lower.includes("error")
      ? "red"
      : lower.includes("success")
      ? "green"
      : "blue";

    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "info-circle", color: stateColor, size: 16 },
        { type: "Text", content: `State: ${input.state}` },
      ],
    });
  }

  // Completed timestamp with calendar icon
  if (input.completed_at) {
    const date = new Date(input.completed_at);
    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "calendar-alt", color: "gray", size: 16 },
        { type: "Text", content: `Completed: ${date.toLocaleString()}` },
      ],
    });
  }

  // Branch name with branch icon
  if (input.branch) {
    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "code-branch", color: "blue", size: 16 },
        { type: "Text", content: `Branch: ${input.branch}` },
      ],
    });
  }

  // Commit SHA with key icon
  if (input.sha) {
    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "key", color: "teal", size: 16 },
        { type: "Text", content: `Commit: ${input.sha}` },
      ],
    });
  }

  // ID with fingerprint icon
  if (input.id) {
    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "fingerprint", color: "violet", size: 16 },
        { type: "Text", content: `ID: ${input.id}` },
      ],
    });
  }

  // Export URL as a button
  if (input.export_url) {
    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "download", color: "green", size: 16 },
        { type: "Text", content: "Download Export" },
      ],
      value: {
        type: "Button",
        label: "Download",
        href: input.export_url,
        variant: "outlined",
        color: "primary",
      },
    });
  }

  // HTML URL as a button
  if (input.html_url) {
    items.push({
      type: "DataListItem",
      label: [
        { type: "Icon", id: "link", color: "blue", size: 16 },
        { type: "Text", content: "View in Browser" },
      ],
      value: {
        type: "Button",
        label: "Open",
        href: input.html_url,
        variant: "outlined",
        color: "secondary",
      },
    });
  }

  // If no details are available, show a friendly markdown message
  if (items.length === 0) {
    return {
      type: "Markdown",
      content: "### No export details available.\nPlease try again later or check your inputs.",
    };
  }

  // Return a DataList for a clean, responsive layout
  return {
    type: "DataList",
    childrenProps: items,
  };
}
