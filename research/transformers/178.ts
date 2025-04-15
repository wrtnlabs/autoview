import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type ManagersInfiniteScrollingView = {
        next?: string;
        managers?: Manager[];
        onlines?: Online[];
        operatorStatuses?: operator.OperatorStatus[];
    };
}
type Manager = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    channelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    accountId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    name: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    description?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    showDescriptionToFront?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    nameDescI18nMap?: {
        [key: string]: NameDesc;
    };
    profile?: {
        [key: string]: {};
    };
    email?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    showEmailToFront?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileNumber?: string & tags.Default<"+18004424000"> & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    showMobileNumberToFront?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    roleId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    removed?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    removedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    displayAsChannel?: boolean;
    defaultGroupWatch?: "all" | "info" | "none";
    defaultDirectChatWatch?: "all" | "info" | "none";
    defaultUserChatWatch?: "all" | "info" | "none";
    chatAlertSound?: "none" | "drop" | "woody" | "bounce" | "crystal" | "xylo" | "quickKnock" | "candy" | "shine";
    meetAlertSound?: "cute" | "basic" | "gentle" | "marimba";
    showPrivateMessagePreview?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorScore?: number & tags.JsonSchemaPlugin<{
        format: "float",
        readOnly: true
    }>;
    touchScore?: number & tags.JsonSchemaPlugin<{
        format: "float",
        readOnly: true
    }>;
    avatar?: TinyFile;
    operatorEmailReminder?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    receiveUnassignedAlert?: boolean;
    receiveUnassignedChatAlert?: boolean;
    receiveUnassignedMeetAlert?: boolean;
    operator?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorStatusId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    defaultAllMentionImportant?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    userMessageImportant?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    assignableUserChatTypes?: ("sync" | "async")[] & tags.UniqueItems;
    autoAssignCapacity?: number & tags.Type<"uint32"> & tags.Maximum<100> & tags.JsonSchemaPlugin<{
        format: "int32",
        readOnly: true
    }>;
    enableAutoAssignOnSync?: boolean;
    statusEmoji?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    statusText?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    statusClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    doNotDisturb?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    doNotDisturbClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    accountDoNotDisturb?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    accountDoNotDisturbClearAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    enableReactedMessageIndex?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    enableTeamMentionedMessageIndex?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    operatorUpdatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    pcInboxMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileInboxMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    pcTeamChatMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    mobileTeamChatMeetAlert?: boolean & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    managerId?: string;
    avatarUrl?: string;
    /**
     * @deprecated
    */
    meetOperator?: boolean;
    emailForFront?: string;
    mobileNumberForFront?: string & tags.Default<"+18004424000">;
};
type NameDesc = {
    name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
    description?: string;
};
type TinyFile = {
    bucket: string;
    key: string;
    width?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    height?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
};
type Online = {
    channelId?: string;
    personType?: string;
    personId?: string;
    id?: string;
};
namespace operator {
    export type OperatorStatus = {
        id?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        managerId: string;
        channelId: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        operatorStatusType?: "waiting" | "chat" | "call" | "postCall" | "meet" | "eat" | "rest" | "inMeeting" | "education" | "otherWork" | "off" | "vacation";
        enable?: boolean & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        createdAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        updatedAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        typeUpdatedAt?: number & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
    };
}
type IAutoViewTransformerInputType = desk.ManagersInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We will compose our output as a vertical card that organizes the data into a header,
  // a data list (for managers and operator statuses) and a footer with a "Load More" button if applicable.
  
  // Build header for the card
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Managers & Operators Overview",
    description: "Summary of managers and their operator statuses along with online user counts."
    // Optionally, we could set startElement or endElement with icons if desired.
  };

  // Prepare an array that will aggregate list items (data list items) to display managers, operator statuses, and online count.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // If managers exist, add a header list item (as a markdown component) and then list each manager.
  if (input.managers && input.managers.length > 0) {
    // Add a markdown header for managers section.
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "### Managers"
      },
      value: {
        type: "Markdown",
        content: ""
      }
    });

    // Loop through all managers and create an item for each one.
    input.managers.forEach((manager) => {
      // Create an array of components for the label: if an avatar URL exists then show an avatar along with the name.
      const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
      
      if (manager.avatarUrl) {
        // Use an Avatar component to show the manager's image.
        labelComponents.push({
          type: "Avatar",
          src: manager.avatarUrl,
          name: manager.name,
          // Optionally, you could choose a variant or size; here we use defaults.
          size: 40
        });
      }
      // Always add a markdown component with the manager's name.
      labelComponents.push({
        type: "Markdown",
        content: `**Name:** ${manager.name}`
      });
      
      // Build a markdown content string for additional manager details (email and mobile if available)
      let detailsContent = "";
      if (manager.email) {
        detailsContent += `**Email:** ${manager.email}\n\n`;
      }
      if (manager.mobileNumber) {
        detailsContent += `**Mobile:** ${manager.mobileNumber}\n\n`;
      }
      if (manager.description) {
        detailsContent += `**Description:** ${manager.description}\n\n`;
      }

      listItems.push({
        type: "DataListItem",
        // The label accepts either a single component or an array. Here we provide an array.
        label: labelComponents,
        value: {
          type: "Markdown",
          content: detailsContent || "No additional details provided."
        }
      });
    });
  }

  // If operator statuses exist, add section header and list each operator status.
  if (input.operatorStatuses && input.operatorStatuses.length > 0) {
    // Add a markdown header for operator statuses.
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "### Operator Statuses"
      },
      value: {
        type: "Markdown",
        content: ""
      }
    });

    input.operatorStatuses.forEach((op) => {
      // Build a markdown content string summarizing operator status details.
      let opDetails = `**Manager ID:** ${op.managerId}\n\n`;
      opDetails += op.operatorStatusType ? `**Status:** ${op.operatorStatusType}\n\n` : "";
      opDetails += typeof op.enable === "boolean" ? `**Enabled:** ${op.enable}\n\n` : "";
      listItems.push({
        type: "DataListItem",
        label: {
          type: "Markdown",
          content: `**Operator ID:** ${op.id || "N/A"}`
        },
        value: {
          type: "Markdown",
          content: opDetails
        }
      });
    });
  }

  // If online users exist, add a summary entry.
  if (input.onlines && input.onlines.length > 0) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "### Online Users"
      },
      value: {
        type: "Markdown",
        content: `Total Online: **${input.onlines.length}**`
      }
    });
  }

  // Compose the main data list component to hold all list items.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Build the card footer. If there is a "next" page link, show a "Load More" button.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.next) {
    cardFooter = {
      type: "CardFooter",
      // Use a Button component in the footer to allow users to load more data.
      childrenProps: {
        type: "Button",
        label: "Load More",
        href: input.next,
        variant: "contained",
        color: "primary"
      }
    };
  }

  // Assemble the vertical card
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps can be an array containing header, content, and optionally footer.
    childrenProps: cardFooter ? [cardHeader, { type: "CardContent", childrenProps: dataList }, cardFooter]
                            : [cardHeader, { type: "CardContent", childrenProps: dataList }]
  };

  return verticalCard;
}
