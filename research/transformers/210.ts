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
  // We are visualizing user information in a Vertical Card format.
  // The idea is to display the user's avatar and name prominently, along with online status and additional details rendered as markdown.
  
  // Prepare the card header.
  // For the startElement, if the user's avatarUrl exists, we render an Avatar component.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.user && input.user.name ? input.user.name : "Unknown User",
    // If online information is present, we display "Online" in the description.
    description: input.online ? "Online" : "Offline",
    // Display the avatar if available.
    startElement: input.user && input.user.avatarUrl
      ? {
          type: "Avatar",
          src: input.user.avatarUrl,
          name: input.user.name || "User Avatar",
          size: 40 // choose an appropriate size for responsiveness
        }
      : undefined,
    // If online status exists, we create a badge that shows a green circle icon.
    // The CardHeader endElement accepts types such as Icon or Badge.
    endElement: input.online
      ? {
          type: "Badge",
          // childrenProps only accepts one of the allowed types. Here we use an Icon to indicate online status.
          childrenProps: {
            type: "Icon",
            id: "circle", // assuming "circle" is a valid icon in the used icon set (kebab-case without prefix)
            color: "green",
            size: 12
          }
        }
      : undefined
  };

  // Construct markdown content to show additional user details.
  // Using markdown allows us to format text with headers and bullet points,
  // thus making the presentation more engaging than raw plain text.
  let markdownContent = "";
  if (input.user) {
    markdownContent = `
# User Details

- **Email:** ${input.user.email ? input.user.email : "N/A"}
- **Mobile Number:** ${input.user.mobileNumber ? input.user.mobileNumber : "N/A"}
- **User Type:** ${input.user.type ? input.user.type : "N/A"}
- **Member ID:** ${input.user.memberId ? input.user.memberId : "N/A"}
- **City:** ${input.user.city ? input.user.city : "N/A"}
`;
  } else {
    // Fallback message when no user data is available.
    markdownContent = `
# No User Data

User details are not available at this time.
`;
  }

  // Prepare the card content, using the Markdown component for rich text formatting.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // childrenProps can be a single Markdown component (which is of type IAutoViewMarkdownProps).
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose the final UI as a Vertical Card
  // VerticalCard's childrenProps accepts a one or more card sections.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
