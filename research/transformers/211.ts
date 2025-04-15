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
  // Extract "user" and "online" data from the input.
  const { user, online } = input;

  // Prepare an Avatar component if user data is available.
  // This component will serve as the starting visual element in our card header.
  const avatar: IAutoView.IAutoViewAvatarProps | undefined = user && (user.avatarUrl || user.name)
    ? {
        type: "Avatar", // discriminator for the avatar component
        src: user.avatarUrl, // use avatarUrl if provided
        name: user.name,     // fallback name in the Avatar component
        size: 40             // using a moderate size that works well on mobile and desktop
      }
    : undefined;

  // Compose the card header component with a title and description.
  // Use "Avatar" as the startElement to make the UI visually appealing.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader", // discriminator for the card header
    title: user && user.name ? user.name : "Unknown User",
    description: user && user.email ? user.email : "No email provided",
    startElement: avatar // allowed because CardHeader.startElement accepts IAutoViewAvatarProps, among others
  };

  // Create a Markdown component to display additional user details in a table format.
  // This approach minimizes plain text clutter and leverages markdown formatting for better readability.
  let markdownContent = "";
  if (user) {
    // Construct a markdown table with available user properties.
    // Edge values are handled with a fallback "N/A" if the field is missing.
    markdownContent = `| Property      | Value                |
| ------------- | -------------------- |
| ID            | ${user.id ?? "N/A"}  |
| Type          | ${user.type ?? "N/A"}|
| Mobile Number | ${user.mobileNumber ?? "N/A"} |
| Country       | ${user.country ?? "N/A"} |
| City          | ${user.city ?? "N/A"} |
`;
  } else {
    markdownContent = "No user details available.";
  }
  const cardMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown", // discriminator for markdown component
    content: markdownContent
  };

  // Prepare an Icon component to visually represent the user's online status.
  // Here, "circle" is chosen as an assumed icon.
  // The color is set to green for online, otherwise gray.
  const onlineIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon", // discriminator for icon component
    id: "circle", // assumed icon that represents a status indicator
    color: online ? "green" : "gray",
    size: 16      // ensure the icon is not too prominent for mobile screens
  };

  // Compose the card content by combining the markdown and the online indicator icon.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent", // discriminator for card content
    // Both markdown and icon components are valid children of the card content.
    childrenProps: [
      cardMarkdown,
      onlineIcon
    ]
  };

  // Finally, compose a vertical card that encapsulates the header and content.
  // This card layout is responsive and works well across devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard", // discriminator for vertical card layout
    childrenProps: [
      cardHeader,
      cardContent
    ]
  };

  // Return the final composed UI component.
  return verticalCard;
}
