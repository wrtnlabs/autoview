import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4UserView = {
                    user?: Schema.legacy.v4.LegacyV4User;
                    online?: Schema.Online;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4User = {
                id?: string;
                channelId?: string;
                memberId?: string;
                veilId?: string;
                unifiedId?: string;
                name?: string;
                profile?: {
                    [key: string]: {};
                };
                profileOnce?: Schema.profile.UserProfile;
                tags?: string[] & tags.MinItems<0> & tags.MaxItems<10> & tags.UniqueItems;
                alert?: number & tags.Type<"int32">;
                unread?: number & tags.Type<"int32">;
                popUpChatId?: string;
                blocked?: boolean;
                unsubscribed?: boolean;
                hasChat?: boolean;
                hasPushToken?: boolean;
                language?: string & tags.Default<"en">;
                country?: string;
                city?: string;
                latitude?: number;
                longitude?: number;
                web?: Schema.WebInfo;
                mobile?: Schema.MobileInfo;
                sessionsCount?: number & tags.Type<"int32">;
                lastSeenAt?: number;
                createdAt?: number;
                updatedAt?: number;
                expireAt?: number;
                version?: number & tags.Type<"int32">;
                managedKey?: number & tags.Type<"int32">;
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
    export namespace profile {
        export type UserProfile = {
            [key: string]: {};
        };
    }
    export type WebInfo = {
        device?: string;
        os?: string;
        osName?: string;
        browser?: string;
        browserName?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type MobileInfo = {
        device?: string;
        os?: string;
        osName?: string;
        appName?: string;
        appVersion?: string;
        sdkName?: string;
        sdkVersion?: string;
        sessionsCount?: number & tags.Type<"int32">;
        lastSeenAt?: number;
    };
    export type Online = {
        channelId?: string;
        personType?: string;
        personId?: string;
        id?: string;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4UserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no user data, show a friendly markdown message.
  if (!input.user) {
    return {
      type: "Markdown",
      content: "## No user data available\nPlease check back later or verify the user ID."
    };
  }

  const user = input.user;

  // Determine online status
  const isOnline = Boolean(input.online && input.online.id);

  // --- Card Header ---
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Use avatar if available, otherwise fallback to initials
    startElement: {
      type: "Avatar",
      src: user.avatarUrl,
      name: user.name,
      variant: "primary",
      size: 40
    },
    title: user.name || "Unknown User",
    description:
      (user.city && user.country)
        ? `${user.city}, ${user.country}`
        : user.country || user.city || undefined,
    // Show a colored chip for online/offline status
    endElement: {
      type: "Chip",
      label: isOnline ? "Online" : "Offline",
      color: isOnline ? "success" : "gray",
      size: "small",
      variant: "filled"
    }
  };

  // --- Data List Items ---
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Email
  if (user.email) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "envelope",
        size: 16,
        color: "gray"
      },
      value: {
        type: "Text",
        content: user.email
      }
    });
  }

  // Location (city, country)
  if (user.city || user.country) {
    const location = [user.city, user.country].filter(Boolean).join(", ");
    items.push({
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "map-marker-alt",
        size: 16,
        color: "gray"
      },
      value: {
        type: "Text",
        content: location
      }
    });
  }

  // Sessions count
  if (typeof user.sessionsCount === "number") {
    items.push({
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "users",
        size: 16,
        color: "gray"
      },
      value: {
        type: "Text",
        content: user.sessionsCount.toString()
      }
    });
  }

  // Last seen
  if (typeof user.lastSeenAt === "number") {
    items.push({
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "clock",
        size: 16,
        color: "gray"
      },
      value: {
        type: "Text",
        content: new Date(user.lastSeenAt).toLocaleString()
      }
    });
  }

  // Account creation
  if (typeof user.createdAt === "number") {
    items.push({
      type: "DataListItem",
      label: {
        type: "Icon",
        id: "calendar-plus",
        size: 16,
        color: "gray"
      },
      value: {
        type: "Text",
        content: new Date(user.createdAt).toLocaleDateString()
      }
    });
  }

  // --- Card Content with DataList ---
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: items
    }
  };

  // --- Tags as Chip Group in Footer ---
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined;
  if (Array.isArray(user.tags) && user.tags.length > 0) {
    const chipItems: IAutoView.IAutoViewChipProps[] = user.tags.map((tag) => ({
      type: "Chip",
      label: tag,
      size: "small",
      variant: "filled",
      color: "primary"
    }));
    cardFooter = {
      type: "CardFooter",
      childrenProps: {
        type: "ChipGroup",
        childrenProps: chipItems,
        maxItems: 10
      }
    };
  }

  // Assemble the vertical card components
  const children: Array<
    IAutoView.IAutoViewCardHeaderProps |
    IAutoView.IAutoViewCardContentProps |
    IAutoView.IAutoViewCardFooterProps
  > = [header, cardContent];

  if (cardFooter) {
    children.push(cardFooter);
  }

  // Return the composed VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: children
  };
}
