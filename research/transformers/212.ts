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
  // Extract user and online status from the input.
  const { user, online } = input;
  
  // If no user data is available, return a simple markdown component informing the user.
  if (!user) {
    return {
      type: "Markdown",
      content: "## No User Data Available\nWe couldn’t find any user information to display."
    };
  }
  
  // Prepare the avatar component for the card header's start element.
  // Use the user's avatarUrl if available and the user name to render the avatar.
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: user.avatarUrl, // assumes valid URI if provided
    name: user.name,
    variant: "primary",
    size: 40
  };

  // Prepare an online status indicator as an icon.
  // If an online id exists then we show a "user-check" icon in green color,
  // otherwise we show a "user-minus" icon in gray color.
  const onlineIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    // Use kebab-case icon names without prefix.
    id: online && online.id ? "user-check" : "user-minus",
    color: online && online.id ? "green" : "gray",
    size: 16
  };

  // Compose the card header component.
  // The header displays a title (user name) and a brief description.
  // It incorporates the avatar as startElement and the online status icon as endElement.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user.name || "Unknown User",
    description: user.email ? `Email: ${user.email}` : undefined,
    startElement: avatar,
    endElement: onlineIcon
  };

  // Compose a markdown string for detailed user information.
  // We use markdown to keep text presentation engaging.
  let markdownContent = `### User Details\n`;
  markdownContent += user.id ? `- **ID:** ${user.id}\n` : "";
  markdownContent += user.type ? `- **Type:** ${user.type}\n` : "";
  markdownContent += user.mobileNumber ? `- **Mobile:** ${user.mobileNumber}\n` : "";
  markdownContent += user.landlineNumber ? `- **Landline:** ${user.landlineNumber}\n` : "";
  markdownContent += user.tags && user.tags.length > 0 ? `- **Tags:** ${user.tags.join(", ")}\n` : "";

  // Compose the card content component using markdown.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps accepts a single presentation component; we use a markdown component.
    childrenProps: {
      type: "Markdown",
      content: markdownContent.trim()
    }
  };

  // Finally, wrap the header and content components into a vertical card.
  // This card is responsive and structured for both web and mobile.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed vertical card as the output.
  return verticalCard;
}
