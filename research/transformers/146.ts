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
  // Extract the user and online info from the input
  const { user, online } = input;

  // Build the card header, which will display the user's name and avatar (or fallback icon)
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: user && user.name ? user.name : "Unknown User",
    // Optionally add a description if desired (can include extra user details)
    description: user && user.userId ? `User ID: ${user.userId}` : undefined,
    // Use startElement to display the user's avatar or a default icon if no avatar URL available
    startElement: user && user.avatarUrl
      ? {
          type: "Avatar",
          src: user.avatarUrl,
          name: user.name ? user.name : "Avatar",
          // Choose a variant based on available user information (this can be adjusted as needed)
          variant: "primary",
          size: 40
        }
      : {
          // Fallback: using an icon to represent the user
          type: "Icon",
          id: "user", // assumes 'user' is a valid icon name in kebab-case (without prefix)
          color: "blue",
          size: 20
        }
  };

  // Aggregate various user details that merit being presented.
  // We prefer visual markdown formatting to present the data in an engaging manner.
  const details: string[] = [];
  if (user) {
    if (user.email) {
      details.push(`**Email:** ${user.email}`);
    }
    if (user.mobileNumber) {
      details.push(`**Mobile:** ${user.mobileNumber}`);
    }
    if (user.country) {
      details.push(`**Country:** ${user.country}`);
    }
    if (user.city) {
      details.push(`**City:** ${user.city}`);
    }
    // Add additional user details if needed.
  } else {
    details.push("No user data available.");
  }
  // Combine details into a markdown-friendly string with bold labels.
  const markdownContent = details.join("\n\n");

  // Create a card content component that uses a markdown component
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Wrap the markdown component as the content for the card.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    } as IAutoView.IAutoViewMarkdownProps
  };

  // Optionally, if online info is provided, add a card footer to display online status.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (online) {
    // Use a button component to highlight online status visually.
    cardFooter = {
      type: "CardFooter",
      childrenProps: {
        type: "Button",
        label: "Online",
        color: "success",
        variant: "contained",
        // Optionally, you could expand here by adding an icon inside the button via startElement.
        // Ensure that the icon component is one of the allowed types.
      } as IAutoView.IAutoViewButtonProps
    };
  }

  // Compose the final UI as a vertical card, which is responsive and suitable for mobile.
  // The card includes header, content and optionally a footer if online data is available.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // childrenProps accepts an array of components. We include cardHeader and cardContent,
    // and conditionally include cardFooter.
    childrenProps: cardFooter ? [cardHeader, cardContent, cardFooter] : [cardHeader, cardContent]
  };

  // Return the vertical card as the final output.
  return verticalCard as IAutoView.IAutoViewComponentProps;
}
