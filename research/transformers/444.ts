import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Secrets for GitHub Dependabot for an organization.
     *
     * @title Dependabot Secret for an Organization
    */
    export type organization_dependabot_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Visibility of a secret
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.organization_dependabot_secret;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map visibility to a friendly chip color
  const visibilityColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    all: "green",
    private: "red",
    selected: "orange",
  };
  const chipColor = visibilityColorMap[input.visibility] ?? "gray";

  // Header: secret name with a lock icon and visibility chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    startElement: {
      type: "Icon",
      id: "lock",
      color: "gray",
      size: 24,
    },
    endElement: {
      type: "Chip",
      label: input.visibility,
      color: chipColor,
      variant: "outlined",
      size: "small",
    },
  };

  // Utility to safely format ISO date-time strings
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // Build a list of data points: created/updated timestamps and optional link
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At", variant: "body2", color: "tertiary" },
      value: { type: "Text", content: formatDate(input.created_at), variant: "body1" },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Updated At", variant: "body2", color: "tertiary" },
      value: { type: "Text", content: formatDate(input.updated_at), variant: "body1" },
    },
  ];

  if (input.selected_repositories_url) {
    // Offer a direct link to view selected repositories
    dataItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Repositories", variant: "body2", color: "tertiary" },
      value: {
        type: "Button",
        label: "View",
        variant: "text",
        color: "primary",
        size: "small",
        href: input.selected_repositories_url,
        startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
      },
    });
  }

  // Wrap the list in a DataList component for structured layout
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataItems,
    },
  };

  // Compose a vertical card for an engaging, responsive display
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
