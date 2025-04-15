import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4SessionsView = {
                sessions?: legacy.v4.LegacyV4ChatSession[];
            };
        }
    }
    export namespace v4 {
        export type LegacyV4ChatSession = {
            key?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            chatId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            chatKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            updatedKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            unreadKey?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            alert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            unread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            watch?: "all" | "info" | "none";
            readAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            receivedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            postedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            updatedAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            createdAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            id?: string;
            chatType?: string;
            personType?: string;
            personId?: string;
        };
    }
}
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4SessionsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no sessions exist, return a Markdown component indicating the empty state.
  if (!input.sessions || input.sessions.length === 0) {
    return {
      content: "## No Sessions Available\nThere are no chat sessions to display at this time.",
      type: "Markdown",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map each LegacyV4ChatSession to a DataListItem component
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.sessions.map((session) => {
    // Compose label: We prefer an icon accompanied by key text information.
    // The allowed types for label include Icon and Text components.
    const labelComponents: (IAutoView.IAutoViewIconProps | IAutoView.IAutoViewTextProps)[] = [];

    // If a chat type is provided, add an icon to represent the session visually.
    if (session.chatType) {
      labelComponents.push({
        id: "chat", // Assuming a generic "chat" icon from the icon set; the id should be in kebab-case.
        type: "Icon",
        color: "blue",
        size: 16,
      } as IAutoView.IAutoViewIconProps);
    }
    // Add a text component representing the session ID or fallback value.
    labelComponents.push({
      content: `**Session ID:** ${session.id ?? "N/A"}`,
      type: "Text",
      variant: "subtitle2",
      color: "primary",
    } as IAutoView.IAutoViewTextProps);

    // Compose session details using Markdown formatting.
    // We list any relevant session values in a concise bullet list.
    const details: string[] = [];
    if (session.chatId) {
      details.push(`- **Chat ID:** ${session.chatId}`);
    }
    if (session.channelId) {
      details.push(`- **Channel ID:** ${session.channelId}`);
    }
    if (session.chatType) {
      details.push(`- **Type:** ${session.chatType}`);
    }
    // Show numeric fields if available.
    if (typeof session.unread === "number") {
      details.push(`- **Unread Count:** ${session.unread}`);
    }
    if (typeof session.alert === "number") {
      details.push(`- **Alert Level:** ${session.alert}`);
    }
    if (session.personId) {
      details.push(`- **Person ID:** ${session.personId}`);
    }
    // If no details are provided, display a fallback message.
    const markdownContent = details.length > 0 ? details.join("\n") : "No additional details provided.";

    // Build and return the DataListItem for this session.
    return {
      label: labelComponents,
      value: {
        // Use a Markdown component for the value to make the display engaging.
        content: markdownContent,
        type: "Markdown",
      } as IAutoView.IAutoViewMarkdownProps,
      type: "DataListItem",
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Compose the final DataList component aggregating all session items.
  // This component will be responsive and is suitable for both web and mobile displays.
  return {
    childrenProps: listItems,
    type: "DataList",
  } as IAutoView.IAutoViewDataListProps;
}
