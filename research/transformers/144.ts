import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace legacy {
    export namespace open {
        export namespace v4 {
            export type LegacyV4UserView = {
                user?: legacy.v4.LegacyV4User;
                online?: Online;
            };
        }
    }
    export namespace v4 {
        export type LegacyV4User = {
            id?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            channelId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            memberId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            veilId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            unifiedId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            name?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            profile?: {
                [key: string]: {};
            };
            profileOnce?: profile.UserProfile;
            tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
            alert?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            unread?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            popUpChatId?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            blocked?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            unsubscribed?: boolean;
            hasChat?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            hasPushToken?: boolean & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            language?: string & tags.Default<"en">;
            country?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            city?: string & tags.JsonSchemaPlugin<{
                readOnly: true
            }>;
            latitude?: number & tags.JsonSchemaPlugin<{
                format: "double",
                readOnly: true
            }>;
            longitude?: number & tags.JsonSchemaPlugin<{
                format: "double",
                readOnly: true
            }>;
            web?: WebInfo;
            mobile?: MobileInfo;
            sessionsCount?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int32",
                readOnly: true
            }>;
            lastSeenAt?: number & tags.JsonSchemaPlugin<{
                format: "int64",
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
            expireAt?: number & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64",
                readOnly: true
            }>;
            managedKey?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
                format: "int64"
            }>;
            member?: boolean;
            email?: string;
            userId?: string;
            avatarUrl?: string;
            managed?: boolean;
            mobileNumber?: string & tags.Default<"+18004424000">;
            systemLanguage?: string & tags.Default<"en">;
        };
    }
}
namespace profile {
    export type UserProfile = {
        [key: string]: {};
    };
}
type WebInfo = {
    device?: string;
    os?: string;
    osName?: string;
    browser?: string;
    browserName?: string;
    sessionsCount?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    lastSeenAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
};
type MobileInfo = {
    device?: string;
    os?: string;
    osName?: string;
    appName?: string;
    appVersion?: string;
    sdkName?: string;
    sdkVersion?: string;
    sessionsCount?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
        format: "int32"
    }>;
    lastSeenAt?: number & tags.JsonSchemaPlugin<{
        format: "int64"
    }>;
};
type Online = {
    channelId?: string;
    personType?: string;
    personId?: string;
    id?: string;
};
type IAutoViewTransformerInputType = legacy.open.v4.LegacyV4UserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract user and online status from the input.
  const user = input.user;
  const online = input.online;

  // If no user data is provided, fallback to a Markdown component indicating absence of data.
  if (!user) {
    return {
      type: "Markdown",
      content: "### No User Data\nUser information is not available at the moment."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Create an Avatar component for the user if an avatar URL is provided.
  const avatarComponent: IAutoView.IAutoViewAvatarProps | undefined = user.avatarUrl
    ? {
        type: "Avatar",
        src: user.avatarUrl,
        name: user.name || "User",
        // Choose a moderate size; available sizes are predefined numbers,
        // adjust as necessary for responsiveness.
        size: 56,
        // Use a primary variant color for the avatar.
        variant: "primary"
      }
    : undefined;

  // Create a CardHeader component to display the user's name and optionally an avatar icon.
  const headerComponent: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user.name || "Unnamed User",
    // Optionally include a description with online status.
    description: online && online.personType ? `Status: ${online.personType}` : undefined,
    // Use the avatar component if available.
    startElement: avatarComponent
  };

  // Compose content detail.
  // Instead of a plain text string, we leverage Markdown to format multi-line details.
  // This markdown block will display key user information.
  const markdownContent = `
**User ID:** ${user.id || "N/A"}  
**Email:** ${user.email || "N/A"}  
**Member ID:** ${user.memberId || "N/A"}
  `.trim();

  // Create a CardContent component that uses a Markdown component to show detailed info.
  const contentComponent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Optionally, add an IconButton to represent online status if the online object is present.
  // The IconButton will use a green circle icon if online; otherwise, it is not rendered.
  const onlineIndicator = online
    ? {
        type: "IconButton",
        icon: "circle", // Assuming "circle" is a valid kebab-case icon name from the icon set.
        // We set color to "green" if online is present.
        color: "green",
        size: "small"
      } as IAutoView.IAutoViewIconButtonProps
    : undefined;

  // If the online indicator exists, we add it to the CardHeader's endElement for improved visualization.
  if (onlineIndicator) {
    // As per allowed types, endElement can be a single component from the allowed list.
    headerComponent.endElement = onlineIndicator;
  }

  // Finally, compose a VerticalCard component that groups the header and content together.
  // Using a vertical card ensures the UI is responsive and adapts well to mobile devices.
  const cardComponent: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      headerComponent,
      contentComponent
    ]
  };

  // Return the full composed component as the visualization of the input data.
  return cardComponent;
}
