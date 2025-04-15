import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type ManagersView = {
        managers?: Manager[];
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
type IAutoViewTransformerInputType = desk.ManagersView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the managers list from the input. If not defined, default to an empty array.
  const managers = input.managers ?? [];

  // For each manager, we create a DataListItem to display their key information.
  // We use visual elements: an avatar for the manager picture (or fallback initials if missing),
  // and markdown components to render text in a friendly and styled manner.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = managers.map((manager) => {
    // Compose an Avatar component if the manager has an avatarUrl.
    // If not, we still create an Avatar component which will show initials based on the name.
    const avatarComponent: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: manager.avatarUrl, // may be undefined which is acceptable
      name: manager.name,
      size: 40 // chosen size for mobile responsiveness
    };

    // Markdown component to display the manager's name.
    const nameMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: manager.name
    };

    // Prepare an array of components for the "label" of the DataListItem.
    // We include the avatar and the manager's name using markdown.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      avatarComponent,
      nameMarkdown
    ];

    // Prepare an array for the "value" field.
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // If the email should be shown and is available, add it as a markdown component.
    if (manager.showEmailToFront && manager.email) {
      valueComponents.push({
        type: "Markdown",
        content: `**Email:** ${manager.email}`
      });
    }
    // If the description should be shown and is available, add it as a markdown component.
    if (manager.showDescriptionToFront && manager.description) {
      valueComponents.push({
        type: "Markdown",
        content: manager.description
      });
    }

    // Assemble the DataListItem for this manager.
    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents.length > 0 ? valueComponents : undefined
    };
  });

  // If there are no managers, we prepare a fallback DataListItem that informs the user.
  const dataListChildren: IAutoView.IAutoViewDataListItemProps[] = dataListItems.length > 0
    ? dataListItems
    : [
        {
          type: "DataListItem",
          label: [
            {
              type: "Markdown",
              content: "No managers available at the moment."
            }
          ]
        }
      ];

  // Create a DataList component and inject all the DataListItem components.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListChildren
  };

  // Compose the CardContent component to wrap our DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // Build a CardHeader component to provide a title and description of the managers view.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Managers Overview",
    description: "An overview of all active managers with their key details."
    // Optionally, one can add a startElement with an icon if needed.
  };

  // Finally, assemble a VerticalCard component to encapsulate the entire UI.
  // Using a VerticalCard ensures a responsive layout on both desktop and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the final composed component props.
  return verticalCard;
}
