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
  const user = input.user || {};
  const online = input.online !== undefined;

  // Helper to build DataList items
  const makeItem = (
    labelText: string,
    valueComponent: IAutoView.IAutoViewPresentationComponentProps
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: labelText },
    value: valueComponent,
  });

  // Construct the avatar with online indicator color
  const avatar: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: user.avatarUrl,
    name: user.name,
    variant: online ? "green" : "gray",
    size: 40,
  };

  // Build the list of user properties
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // User IDs
  if (user.id) {
    dataItems.push(makeItem("ID", { type: "Text", content: user.id }));
  }
  if (user.userId) {
    dataItems.push(makeItem("User ID", { type: "Text", content: user.userId }));
  }
  if (user.channelId) {
    dataItems.push(makeItem("Channel", { type: "Text", content: user.channelId }));
  }

  // Online status
  dataItems.push(
    makeItem(
      "Status",
      {
        type: "Icon",
        id: "circle",
        color: online ? "green" : "gray",
        size: 12,
      }
    )
  );

  // Location
  const locationParts: string[] = [];
  if (user.city) locationParts.push(user.city);
  if (user.country) locationParts.push(user.country);
  const locationText = locationParts.join(", ") || "Unknown";
  dataItems.push(makeItem("Location", { type: "Text", content: locationText }));

  // Last seen
  if (typeof user.lastSeenAt === "number") {
    const seen = new Date(user.lastSeenAt).toLocaleString();
    dataItems.push(makeItem("Last Seen", { type: "Text", content: seen }));
  }

  // Sessions count
  if (typeof user.sessionsCount === "number") {
    dataItems.push(
      makeItem("Sessions", { type: "Text", content: String(user.sessionsCount) })
    );
  }

  // Alert count as a badge on a bell icon
  if (typeof user.alert === "number") {
    dataItems.push(
      makeItem(
        "Alerts",
        {
          type: "Badge",
          count: user.alert,
          maxCount: 99,
          showZero: false,
          childrenProps: {
            type: "Icon",
            id: "bell",
            color: "red",
            size: 16,
          },
        }
      )
    );
  }

  // Tags as a ChipGroup
  if (Array.isArray(user.tags) && user.tags.length > 0) {
    const chips: IAutoView.IAutoViewChipProps[] = user.tags.map((tag) => ({
      type: "Chip",
      label: tag,
      variant: "outlined",
      size: "small",
    }));
    dataItems.push(
      makeItem("Tags", {
        type: "ChipGroup",
        childrenProps: chips,
      })
    );
  }

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Footer icons for web and mobile presence
  const footerIcons: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (user.web && (user.web.browser || user.web.device)) {
    footerIcons.push({
      type: "Icon",
      id: "globe",
      color: "blue",
      size: 20,
    });
  }
  if (user.mobile && (user.mobile.appName || user.mobile.device)) {
    footerIcons.push({
      type: "Icon",
      id: "mobile-alt",
      color: "teal",
      size: 20,
    });
  }
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    // if no icons, childrenProps can be omitted or empty
    ...(footerIcons.length > 0 ? { childrenProps: footerIcons } : {}),
  };

  // Header with avatar, name, and subtitle
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: avatar,
    title: user.name || "Unknown User",
    description: user.userId,
  };

  // Assemble the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, { type: "CardContent", childrenProps: [dataList] }, footer],
  };

  return card;
}
