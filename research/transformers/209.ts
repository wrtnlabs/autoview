import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type UserView = {
        user?: user.User;
        online?: Online;
    };
}
namespace user {
    export type User = {
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
        type?: "member" | "lead" | "unified";
        name?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        mobileNumberQualified?: boolean & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        emailQualified?: boolean & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        profile?: {
            [key: string]: {};
        };
        profileOnce?: profile.UserProfile;
        tags?: string[] & tags.MinItems<0> & tags.MaxItems<20> & tags.UniqueItems;
        userImportTags?: string[] & tags.MinItems<0> & tags.MaxItems<30>;
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
        blocked?: boolean;
        blockedKey?: string;
        unsubscribeEmail?: boolean;
        unsubscribeEmailUpdatedAt?: number & tags.JsonSchemaPlugin<{
            format: "int64"
        }>;
        unsubscribeTexting?: boolean;
        unsubscribeTextingUpdatedAt?: number & tags.JsonSchemaPlugin<{
            format: "int64"
        }>;
        hasChat?: boolean & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        mainChatId?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        hasPushToken?: boolean & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        language?: string & tags.Default<"en">;
        country?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        timeZone?: string & tags.JsonSchemaPlugin<{
            readOnly: true
        }>;
        province?: string & tags.JsonSchemaPlugin<{
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
        version?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int64",
            readOnly: true
        }>;
        managedKey?: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            format: "int64"
        }>;
        named?: boolean;
        member?: boolean;
        email?: string;
        avatarUrl?: string;
        mobileNumber?: string & tags.Default<"+18004424000">;
        landlineNumber?: string & tags.Default<"+18004424000">;
        constrainted?: boolean;
        systemLanguage?: string & tags.Default<"en">;
    };
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
type IAutoViewTransformerInputType = desk.UserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We choose to display the data inside a vertical card.
  // The card header presents the user's primary details, including an avatar and online status icon.
  // The card content uses a markdown component to present additional details using markdown formatting.
  
  // Prepare the CardHeader start element: an avatar for the user if an avatarUrl is provided.
  const avatarElement: IAutoView.IAutoViewAvatarProps | undefined = input.user && input.user.avatarUrl
    ? {
        type: "Avatar",
        src: input.user.avatarUrl,
        // A default variant is selected; you can adjust based on business logic.
        variant: "primary",
        // Choose a size that is responsive (medium size for example)
        size: 40,
        name: input.user.name
      }
    : undefined;
  
  // Prepare CardHeader end element: an icon to indicate online status.
  // Allowed types for endElement include Icon.
  const onlineIcon: IAutoView.IAutoViewIconProps | undefined = input.online
    ? {
        type: "Icon",
        id: "circle", // assuming "circle" displays a status indicator
        color: "green", // green icon represents online status
        size: 16
      }
    : undefined;
  
  // Compose markdown content for card content.
  // Use markdown syntax for a visually appealing display.
  // We include available fields, fallback to an empty string if not provided.
  let markdownContent = "";
  if (input.user) {
    // Compose a markdown block with user information.
    markdownContent += `## User Details\n`;
    if (input.user.type) {
      markdownContent += `- **Type:** ${input.user.type}\n`;
    }
    if (input.user.email) {
      markdownContent += `- **Email:** ${input.user.email}\n`;
    }
    if (input.user.mobileNumber) {
      markdownContent += `- **Mobile:** ${input.user.mobileNumber}\n`;
    }
    if (input.user.channelId) {
      markdownContent += `- **Channel ID:** ${input.user.channelId}\n`;
    }
    if (input.user.city || input.user.province) {
      const location = [input.user.city, input.user.province].filter(Boolean).join(", ");
      markdownContent += `- **Location:** ${location}\n`;
    }
  } else {
    // If no user data is provided, indicate this fact
    markdownContent = "## No User Data\n\nUser information is currently unavailable.";
  }
  
  // Prepare the CardContent element with markdown view.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can be a single component or an array; here we use a markdown component.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };
  
  // Prepare the CardHeader element.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.user && input.user.name ? input.user.name : "Unknown User",
    description: input.user && input.user.email ? input.user.email : "",
    // Only assign startElement if an avatar is available.
    startElement: avatarElement,
    // Only assign endElement if the online icon is available.
    endElement: onlineIcon
  };
  
  // Compose the final vertical card that includes header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps here is an array of components (header and content)
    childrenProps: [cardHeader, cardContent]
  };
  
  // Return the composed visual component.
  return verticalCard;
}
