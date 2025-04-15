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
  // This transform function aggregates chat session data from the input
  // and returns a responsive UI component to display the sessions.
  //
  // The chosen layout is a VerticalCard which holds a header and a content section.
  // The header shows an icon and title while the content displays a DataList (if available)
  // where each session is represented by a DataListItem with an icon and formatted markdown details.
  //
  // In case no chat sessions are provided, a friendly markdown message is shown instead.

  // 1. Create a card header component for clearly labeling the UI.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Chat Sessions",
    description: "Overview of current chat sessions",
    // The startElement accepts specific component types (e.g., Icon), so we use an Icon for visual engagement.
    startElement: {
      type: "Icon",
      id: "chat", // Assuming "chat" is a valid kebab-case icon name from the icon library.
      color: "blue",
      size: 24
    }
  };

  // 2. Process the sessions from input.
  // Ensure sessions is an array. If not provided, use an empty array.
  const sessions = input.sessions ?? [];
  // This array will hold our DataList items.
  let listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (sessions.length > 0) {
    listItems = sessions.map((session) => {
      // Compose the label for the session using an icon and text.
      // Allowed types for label are strictly enforced, so we use Icon and Text components.
      const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        {
          type: "Icon",
          id: "chat", // Reusing the chat icon for clarity.
          color: "blue",
          size: 16
        },
        {
          type: "Text",
          variant: "h6",
          color: "primary",
          content: session.id ? session.id : "Unknown Session"
        }
      ];

      // Compose session details using a markdown component for a better visual presentation.
      // Markdown is used to minimize raw text and make content more engaging.
      const detailsMarkdown = `
**Chat ID:** ${session.chatId ?? 'N/A'}  
**Chat Type:** ${session.chatType ?? 'N/A'}  
**Person Type:** ${session.personType ?? 'N/A'}  
**Unread Messages:** ${session.unread ?? 0}
      `.trim();

      const valueComponent: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: detailsMarkdown
      };

      // Return the DataListItem for this session.
      return {
        type: "DataListItem",
        label: labelComponents,
        value: valueComponent
      };
    });
  }

  // 3. Build the content section of the card depending on the data.
  let cardContentComponent: IAutoView.IAutoViewCardContentProps;
  if (listItems.length > 0) {
    // When sessions are available, wrap the DataList in a CardContent component.
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: listItems
    };
    cardContentComponent = {
      type: "CardContent",
      childrenProps: dataList
    };
  } else {
    // If there are no sessions, display a markdown message.
    const noSessionMessage: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: "**No chat sessions available.**"
    };
    cardContentComponent = {
      type: "CardContent",
      childrenProps: noSessionMessage
    };
  }

  // 4. Compose the final VerticalCard component.
  // VerticalCard is chosen for clarity and responsive design, making it suitable for mobiles.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContentComponent
    ]
  };

  // Return the composed value of type IAutoView.IAutoViewComponentProps.
  return verticalCard;
}
