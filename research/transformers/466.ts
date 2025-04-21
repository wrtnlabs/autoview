import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * API Insights usage stats for a user
     *
     * @title User Stats
    */
    export type api_insights_user_stats = {
        actor_type?: string;
        actor_name?: string;
        actor_id?: number & tags.Type<"int32">;
        integration_id?: (number & tags.Type<"int32">) | null;
        oauth_application_id?: (number & tags.Type<"int32">) | null;
        total_request_count?: number & tags.Type<"int32">;
        rate_limited_request_count?: number & tags.Type<"int32">;
        last_rate_limited_timestamp?: string | null;
        last_request_timestamp?: string;
    }[];
}
type IAutoViewTransformerInputType = Schema.api_insights_user_stats;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Sort users by total requests descending for a more meaningful ranking
  const sortedStats = [...input].sort(
    (a, b) => (b.total_request_count ?? 0) - (a.total_request_count ?? 0)
  );

  // Map each user stat to a DataListItem component
  const items: IAutoView.IAutoViewDataListItemProps[] = sortedStats.map((stat) => {
    // Create an avatar with the user's name (initials or full name)
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: stat.actor_name ?? "Unknown",
      variant: "blue",
    };

    // Label area: avatar + user name
    const label: IAutoView.IAutoViewPresentationComponentProps[] = [
      avatar,
      {
        type: "Text",
        // Use subtitle style for names
        variant: "subtitle1",
        content: stat.actor_name ?? "Unknown user",
      },
    ];

    // Chip showing total request count
    const totalChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${stat.total_request_count ?? 0}`,
      color: "primary",
      variant: "filled",
      size: "medium",
      startElement: {
        type: "Icon",
        id: "database",  // FontAwesome "fa-database"
        color: "blue",
        size: 16,
      },
    };

    // Chip showing rate-limited count with color coding
    const rateChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${stat.rate_limited_request_count ?? 0}`,
      // If any rate-limited requests exist, highlight in error color
      color: stat.rate_limited_request_count && stat.rate_limited_request_count > 0 ? "error" : "success",
      variant: "outlined",
      size: "medium",
      startElement: {
        type: "Icon",
        id: stat.rate_limited_request_count && stat.rate_limited_request_count > 0 ? "ban" : "check-circle",
        color: stat.rate_limited_request_count && stat.rate_limited_request_count > 0 ? "red" : "green",
        size: 16,
      },
    };

    // Markdown component for last request timestamp to allow styling (bold label)
    const lastRequestMd: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Last Request:** ${stat.last_request_timestamp ?? "N/A"}`,
    };

    // Markdown component for last rate-limited timestamp if present
    const lastRateMd: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `**Last Rate-Limited:** ${stat.last_rate_limited_timestamp ?? "Never"}`,
    };

    // Combine chips and markdown into the value area
    const value: IAutoView.IAutoViewPresentationComponentProps[] = [
      totalChip,
      rateChip,
      lastRequestMd,
      lastRateMd,
    ];

    return {
      type: "DataListItem",
      label,
      value,
    };
  });

  // Return a DataList that holds all user stat items
  return {
    type: "DataList",
    childrenProps: items,
  };
}
