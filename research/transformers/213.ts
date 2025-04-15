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
  // Check if user data is available. If not, return a simple Badge component with an alert icon.
  if (!input.user) {
    // Here we use a Badge with an Icon inside to indicate a missing user.
    return {
      type: "Badge",
      childrenProps: {
        type: "Icon",
        id: "exclamation-triangle", // Indicates missing data
        color: "red",
        size: 20,
      } as IAutoView.IAutoViewIconProps,
      count: 0,
      dot: true,
    };
  }

  // Compose the card header using user information.
  // For visual engagement, an Avatar is used as the start element.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.user.name ?? "Unknown User",
    description: input.user.email ?? "",
    startElement: {
      // The Avatar component to visually represent the user.
      type: "Avatar",
      src: input.user.avatarUrl || "", // Use the user's avatar URL if available.
      name: input.user.name || "",
      variant: "primary",
      size: 40,
    } as IAutoView.IAutoViewAvatarProps,
    // If online information is present, display a status icon.
    endElement: input.online
      ? {
          type: "Icon",
          id: "circle", // A simple circle icon can serve as a status indicator.
          color: "green",
          size: 12,
        } as IAutoView.IAutoViewIconProps
      : undefined,
  };

  // Build a markdown string to show additional user details in an engaging way.
  // Markdown is preferred to plain text so that formatting (like bullet lists and bold labels) are applied.
  let markdownContent = "";
  if (input.user.id) {
    markdownContent += `- **User ID:** ${input.user.id}\n`;
  }
  if (input.user.channelId) {
    markdownContent += `- **Channel ID:** ${input.user.channelId}\n`;
  }
  if (input.user.memberId) {
    markdownContent += `- **Member ID:** ${input.user.memberId}\n`;
  }
  if (input.user.veilId) {
    markdownContent += `- **Veil ID:** ${input.user.veilId}\n`;
  }
  if (input.user.mobileNumber) {
    markdownContent += `- **Mobile Number:** ${input.user.mobileNumber}\n`;
  }
  if (input.user.email) {
    markdownContent += `- **Email:** ${input.user.email}\n`;
  }
  // If no details were added, provide a fallback message.
  if (!markdownContent) {
    markdownContent = "No additional details available.";
  }

  // Use the Markdown component for rendering textual details.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    } as IAutoView.IAutoViewMarkdownProps,
  };

  // Combine header and content into a Vertical Card for a responsive and engaging layout.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  // Return the final composed visual representation of the user data.
  return verticalCard;
}
