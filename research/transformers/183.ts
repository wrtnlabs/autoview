import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type CallLog = {
    channelId?: string;
    missedReason?: string;
    direction?: string;
    state?: string;
    from?: string;
    to?: string;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    engagedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    closedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
    userChatId?: string;
    managerIds?: string[];
};
type IAutoViewTransformerInputType = CallLog[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We choose to visualize the call logs using a vertical card layout.
  // The card header shows a title with a phone icon, and the card content contains a data list.
  // Each call log is transformed into a DataListItem with an avatar (displaying the caller’s name)
  // and a markdown component that formats the details in a visually friendly manner.

  // Map each call log into a DataListItem component.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.map((log) => {
    // Create an avatar component to serve as the label.
    // Here we display the caller's name if available; if not, we use "?".
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: log.from ? log.from : "?",
      variant: "info",
      size: 32, // Adjust size as needed for responsiveness.
    };

    // Build a markdown string to represent the call log details.
    // We use markdown formatting (bold labels) to improve visual readability.
    let markdownContent = "";
    if (log.channelId) {
      markdownContent += `**Channel:** ${log.channelId}\n\n`;
    }
    if (log.missedReason) {
      markdownContent += `**Missed Reason:** ${log.missedReason}\n\n`;
    }
    if (log.direction) {
      markdownContent += `**Direction:** ${log.direction}\n\n`;
    }
    if (log.state) {
      markdownContent += `**State:** ${log.state}\n\n`;
    }
    if (log.from) {
      markdownContent += `**From:** ${log.from}\n\n`;
    }
    if (log.to) {
      markdownContent += `**To:** ${log.to}\n\n`;
    }
    if (log.createdAt) {
      markdownContent += `**Created At:** ${new Date(log.createdAt).toLocaleString()}\n\n`;
    }
    if (log.updatedAt) {
      markdownContent += `**Updated At:** ${new Date(log.updatedAt).toLocaleString()}\n\n`;
    }
    if (log.engagedAt) {
      markdownContent += `**Engaged At:** ${new Date(log.engagedAt).toLocaleString()}\n\n`;
    }
    if (log.closedAt) {
      markdownContent += `**Closed At:** ${new Date(log.closedAt).toLocaleString()}\n\n`;
    }
    if (log.userChatId) {
      markdownContent += `**User Chat ID:** ${log.userChatId}\n\n`;
    }
    if (log.managerIds && log.managerIds.length > 0) {
      markdownContent += `**Manager IDs:** ${log.managerIds.join(', ')}\n\n`;
    }
    // If no data was collected, provide a fallback message.
    if (markdownContent.trim() === "") {
      markdownContent = "No details available.";
    }

    // Return the DataListItem component.
    return {
      type: "DataListItem",
      label: avatar,
      // The value is rendered as markdown to ensure rich formatting.
      value: {
        type: "Markdown",
        content: markdownContent,
      } as IAutoView.IAutoViewMarkdownProps,
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // If the input array is empty, create a fallback DataList component with a message.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems.length > 0 ? dataListItems : [{
      type: "DataListItem",
      value: {
        type: "Markdown",
        content: "No call logs available.",
      } as IAutoView.IAutoViewMarkdownProps,
    }],
  };

  // Compose the final vertical card.
  // The card header includes a "Call Logs" title with a phone icon to enhance visual appeal.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Call Logs",
        startElement: {
          // Use an icon to represent call logs; the id should correspond to a valid icon name.
          type: "Icon",
          id: "phone",
          color: "blue",
          size: 24, // Suitable for both desktop and mobile views.
        } as IAutoView.IAutoViewIconProps,
      } as IAutoView.IAutoViewCardHeaderProps,
      {
        type: "CardContent",
        childrenProps: dataList,
      } as IAutoView.IAutoViewCardContentProps,
    ],
  };

  // Return the assembled UI component.
  return verticalCard;
}
