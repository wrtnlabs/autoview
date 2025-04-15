import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type ChatSessionsView = {
    sessions?: ChatSession[];
};
type ChatSession = {
    key?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    chatId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    teamChatSectionId?: string;
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
    allMentionImportant?: boolean;
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
type IAutoViewTransformerInputType = ChatSessionsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Check if chat sessions exist. If not, return a Markdown component with a friendly message.
  if (!input.sessions || input.sessions.length === 0) {
    // Use a Markdown component to display a no-data message.
    return {
      type: "Markdown",
      content: "### No Chat Sessions Available\n\nThere are currently no chat sessions to display."
    };
  }

  // Map each ChatSession into a DataListItem component.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = input.sessions.map((session) => {
    // Choose a primary identifier for the session, preferring chatId then id.
    const sessionId = session.chatId || session.id || "Unknown Session";

    // Prepare visual elements to be composed in the label.
    // We'll mix an icon (if there are unread messages) and a Markdown component for the session summary.
    const labelComponents: (
      | IAutoView.IAutoViewIconProps
      | IAutoView.IAutoViewMarkdownProps
    )[] = [];

    // If there are unread messages (non-zero unread count), add an attention icon.
    if (session.unread && session.unread > 0) {
      labelComponents.push({
        id: "bell", // using "bell" as an example icon name
        type: "Icon",
        color: "red",
        size: 16
      });
    } else {
      // When no unread messages, we can still use a different icon, for example, a chat icon.
      labelComponents.push({
        id: "chat", // using "chat" as an example icon name
        type: "Icon",
        color: "blue",
        size: 16
      });
    }

    // Compose a markdown string summary.
    // We use markdown formatting to bold the sessionId and lightly display associated details.
    const markdownSummary = `**Session:** ${sessionId}  
**Team:** ${session.teamChatSectionId || "N/A"}  
**Chat Type:** ${session.chatType || "N/A"}`;

    labelComponents.push({
      type: "Markdown",
      content: markdownSummary
    });

    // Prepare detailed information for the value component using Markdown.
    // This provides additional context, such as alert counts and timestamps.
    const details: string[] = [];
    if (session.alert !== undefined) {
      details.push(`**Alert:** ${session.alert}`);
    }
    if (session.unread !== undefined) {
      details.push(`**Unread:** ${session.unread}`);
    }
    if (session.updatedAt !== undefined) {
      details.push(`**Updated At:** ${new Date(session.updatedAt).toLocaleString()}`);
    }
    if (session.createdAt !== undefined) {
      details.push(`**Created At:** ${new Date(session.createdAt).toLocaleString()}`);
    }
    // Join detail lines together with a line break for markdown
    const detailMarkdown = details.join("  \n");

    // Compose the DataListItem using the allowed types.
    return {
      type: "DataListItem",
      // label accepts a union or an array, so we assign our array of components.
      label: labelComponents,
      // value is also flexible; using Markdown to present extra information.
      value: {
        type: "Markdown",
        content: detailMarkdown || "No additional details available."
      }
    };
  });

  // Return a DataList component containing all the chat session items. 
  // DataList is a presentation component for displaying lists.
  return {
    type: "DataList",
    childrenProps: listItems
  };
}
