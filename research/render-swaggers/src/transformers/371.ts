import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Thread Subscription
     *
     * @title Thread Subscription
    */
    export type thread_subscription = {
        subscribed: boolean;
        ignored: boolean;
        reason: string | null;
        created_at: (string & tags.Format<"date-time">) | null;
        url: string & tags.Format<"uri">;
        thread_url?: string & tags.Format<"uri">;
        repository_url?: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.thread_subscription;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract repository name from URL if available, fallback to generic title
  const repoUrl = input.repository_url;
  const repoName = repoUrl
    ? repoUrl.split("/").slice(-2).join("/")
    : "Subscription";

  // Determine icon for repository link (GitHub icon if GitHub URL, else generic link)
  const repoIconId = repoUrl?.includes("github.com") ? "github" : "link";

  // Format created_at date to a human-readable string
  const createdAtLabel = input.created_at
    ? new Date(input.created_at).toLocaleString()
    : null;

  // Build status chips for subscribed and ignored flags
  const statusChips: IAutoView.IAutoViewChipProps[] = [
    {
      type: "Chip",
      label: input.subscribed ? "Subscribed" : "Not Subscribed",
      color: input.subscribed ? "success" : "gray",
      size: "small",
      variant: "filled",
    },
    {
      type: "Chip",
      label: input.ignored ? "Ignored" : "Not Ignored",
      color: input.ignored ? "error" : "gray",
      size: "small",
      variant: "filled",
    },
  ];

  // Build action buttons for subscription, thread, and repository links
  const actionButtons: IAutoView.IAutoViewButtonProps[] = [];

  // Button to view the subscription details
  actionButtons.push({
    type: "Button",
    label: ["View Subscription"],
    href: input.url,
    variant: "outlined",
    size: "small",
    startElement: { type: "Icon", id: "link", size: 16 },
  });

  // Optional button to view the thread itself
  if (input.thread_url) {
    actionButtons.push({
      type: "Button",
      label: ["View Thread"],
      href: input.thread_url,
      variant: "outlined",
      size: "small",
      startElement: { type: "Icon", id: "comments", size: 16 },
    });
  }

  // Optional button to open the repository
  if (repoUrl) {
    actionButtons.push({
      type: "Button",
      label: ["Open Repo"],
      href: repoUrl,
      variant: "outlined",
      size: "small",
      startElement: { type: "Icon", id: repoIconId, size: 16 },
    });
  }

  // Header of the card showing the repo name and creation date
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: repoName,
    description: createdAtLabel ? `Created at ${createdAtLabel}` : undefined,
    startElement: { type: "Icon", id: repoIconId, size: 20, color: "blue" },
  };

  // Content of the card: status chips and optional reason markdown
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "ChipGroup",
      childrenProps: statusChips,
      maxItems: statusChips.length,
    },
  ];
  if (input.reason) {
    contentChildren.push({
      type: "Markdown",
      content: `**Reason:** ${input.reason}`,
    });
  }
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Footer of the card with action buttons
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: actionButtons,
  };

  // Return the assembled vertical card
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}
