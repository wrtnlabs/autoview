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
  // If no user data is provided, render a markdown component with a friendly message.
  // The markdown component is used instead of plain text to improve readability.
  if (!input || !input.user) {
    return {
      type: "Markdown",
      content: "### No User Data Available\nPlease check your data source."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  const user = input.user;

  // Create an Avatar component if an avatar URL is provided.
  // The avatar component will act as the visual representation of the user.
  const avatarComponent: IAutoView.IAutoViewAvatarProps | undefined = user.avatarUrl
    ? {
        type: "Avatar",
        src: user.avatarUrl,
        name: user.name || "User",
        // Allowed sizes: 4 | 8 | 12 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 56 | 64 | 72. Choosing 40.
        size: 40,
        variant: "primary"
      }
    : undefined;

  // Build a Card Header component to display the primary user details.
  // The header includes the user's name and an online/offline status.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user.name || "Unnamed User",
    description: input.online ? "Online" : "Offline",
    // Only assign the avatar component if it exists.
    startElement: avatarComponent
  };

  // Gather additional user details to display using a markdown component.
  // Markdown is preferred over plain text to allow better styling.
  const details: string[] = [];

  if (user.email) {
    details.push(`**Email:** ${user.email}`);
  }
  if (user.memberId) {
    details.push(`**Member ID:** ${user.memberId}`);
  }
  if (user.channelId) {
    details.push(`**Channel:** ${user.channelId}`);
  }
  if (typeof user.alert !== "undefined") {
    details.push(`**Alerts:** ${user.alert}`);
  }
  if (user.country) {
    details.push(`**Country:** ${user.country}`);
  }
  if (user.city) {
    details.push(`**City:** ${user.city}`);
  }

  // Fallback message if no additional details are available.
  const markdownText = details.length > 0 ? details.join("\n\n") : "No additional details available.";

  // Define a Markdown component to render the details.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: markdownText
  };

  // Wrap the markdown details inside a Card Content component.
  // This allows the content to be visually grouped and organized.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownComponent
  };

  // Compose a Vertical Card component that aggregates the header and content.
  // A vertical arrangement is chosen to be responsive and user friendly on mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}
