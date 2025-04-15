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
  // Extract user and online information from the input.
  const user = input.user;
  const online = input.online;

  // Compose a Card Header to display the user's basic information.
  // This header uses an avatar or fallback icon to represent the user visually.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: (user && user.name) ? user.name : "Unknown User",
    description: (online && online.personType) ? `Online as ${online.personType}` : "Offline",
  };

  // If the user has an avatar URL, use it; otherwise, use an icon (e.g., a user icon).
  if (user && user.avatarUrl) {
    cardHeader.startElement = {
      type: "Avatar",
      src: user.avatarUrl,
      name: user.name || "User Avatar",
      variant: "primary", // Using a primary variant for visual emphasis
      size: 40,         // Allowed sizes include 40
    };
  } else {
    cardHeader.startElement = {
      type: "Icon",
      id: "user",       // Reference a common user icon in kebab-case
      color: "blue",    // Select a color that is visually appealing
      size: 24,         // Standard icon size for header
    };
  }

  // Compose the content details using a Markdown component to enhance readability
  // Markdown format enables rich text styling and is preferred over plain text.
  let markdownContent = "";
  if (user) {
    // Add available details using Markdown formatting
    markdownContent += user.email ? `**Email:** ${user.email}\n\n` : "";
    markdownContent += user.memberId ? `**Member ID:** ${user.memberId}\n\n` : "";
    markdownContent += user.country ? `**Country:** ${user.country}\n\n` : "";
    // If no additional details are available, display a default message.
    if (!markdownContent) {
      markdownContent = "No additional user details available.";
    }
  } else {
    markdownContent = "User data not available.";
  }
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Render the details using the Markdown component for better visual appeal.
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Compose the Card Footer with a call-to-action element.
  // If the user has a userId, provide a "View Profile" button with a clickable link;
  // otherwise, display an info icon as a fallback.
  let footerComponent: IAutoView.IAutoViewComponentProps;
  if (user && user.userId) {
    footerComponent = {
      type: "Button",
      label: "View Profile",
      href: `https://profile.example.com/${user.userId}`,
      variant: "contained",
      color: "primary",
    } as IAutoView.IAutoViewButtonProps;
  } else {
    footerComponent = {
      type: "IconButton",
      icon: "info",
      variant: "outlined",
      color: "blue",
      size: "small",
    } as IAutoView.IAutoViewIconButtonProps;
  }
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerComponent,
  };

  // Compose the final vertical card.
  // The use of a card design ensures the UI is organized, visually engaging,
  // and easily adapts to different screen sizes including mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };

  // Return the composed UI component props.
  return verticalCard;
}
