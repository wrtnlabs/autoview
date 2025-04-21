import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ManagerView = {
                    manager?: Schema.legacy.v4.LegacyV4Manager;
                    online?: Schema.legacy.v4.LegacyV4Online;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Manager = {
                id?: string;
                channelId?: string;
                accountId?: string;
                name: string;
                description?: string;
                showDescriptionToFront?: boolean;
                nameDescI18nMap?: {
                    [key: string]: Schema.NameDesc;
                };
                profile?: {
                    [key: string]: {};
                };
                email: string;
                showEmailToFront?: boolean;
                mobileNumber?: string & tags.Default<"+18004424000">;
                showMobileNumberToFront?: boolean;
                role: "owner" | "member";
                removed?: boolean;
                createdAt?: number;
                displayAsChannel?: boolean;
                defaultGroupWatch?: "all" | "info" | "none";
                defaultDirectChatWatch?: "all" | "info" | "none";
                defaultUserChatWatch?: "all" | "info" | "none";
                operatorScore?: number;
                touchScore?: number;
                avatar?: Schema.TinyFile;
                operatorEmailReminder?: boolean;
                operator?: boolean;
                statusEmoji?: string;
                statusText?: string;
                statusClearAt?: number;
                managerId?: string;
                avatarUrl?: string;
                emailForFront?: string;
                mobileNumberForFront?: string & tags.Default<"+18004424000">;
            };
            export type LegacyV4Online = {
                channelId?: string;
                personType?: string;
                personId?: string;
                id?: string;
            };
        }
    }
    export type NameDesc = {
        name: string & tags.Pattern<"^[^@#$%:/\\\\]+$">;
        description?: string;
    };
    export type TinyFile = {
        bucket: string;
        key: string;
        width?: number & tags.Type<"int32">;
        height?: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ManagerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const manager = input.manager;
  // If there's no manager data, show a friendly markdown message
  if (!manager) {
    return {
      type: "Markdown",
      content: "*No manager data available.*",
    };
  }

  // Determine if the manager is currently online
  const isOnline =
    !!input.online &&
    input.online.personId !== undefined &&
    input.online.personId === manager.id;

  // Build the avatar component (uses initials if no src)
  const avatarProps: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: manager.avatarUrl,
    name: manager.name,
    size: 40,
  };

  // If online, wrap the avatar with a green dot badge
  const startElement = isOnline
    ? ({
        type: "Badge",
        dot: true,
        color: "green",
        offset: { vertical: "top", horizontal: "right" },
        childrenProps: avatarProps,
      } as IAutoView.IAutoViewBadgeProps)
    : avatarProps;

  // Build the card header showing name and role
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: manager.name,
    description: manager.role,
    startElement,
  };

  // Helper to push a data-list item if the value exists
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  function addItem(label: string, value?: string) {
    if (value !== undefined && value !== "") {
      items.push({
        type: "DataListItem",
        label: { type: "Text", content: label },
        value: { type: "Text", content: value },
      });
    }
  }

  // Email (respect front‐end visibility)
  const email =
    manager.showEmailToFront && manager.emailForFront
      ? manager.emailForFront
      : manager.email;
  addItem("Email", email);

  // Mobile number (respect front‐end visibility)
  const mobile =
    manager.showMobileNumberToFront && manager.mobileNumberForFront
      ? manager.mobileNumberForFront
      : manager.mobileNumber;
  addItem("Mobile", mobile);

  // Description (if allowed to front-end)
  if (manager.showDescriptionToFront) {
    addItem("Description", manager.description);
  }

  // Created date, formatted to locale
  if (manager.createdAt !== undefined) {
    const date = new Date(manager.createdAt).toLocaleDateString();
    addItem("Created", date);
  }

  // Default watch settings
  addItem("Group Watch", manager.defaultGroupWatch);
  addItem("Direct Chat Watch", manager.defaultDirectChatWatch);
  addItem("User Chat Watch", manager.defaultUserChatWatch);

  // Scores
  if (manager.operatorScore !== undefined) {
    addItem("Operator Score", String(manager.operatorScore));
  }
  if (manager.touchScore !== undefined) {
    addItem("Touch Score", String(manager.touchScore));
  }

  // DisplayAsChannel flag
  if (manager.displayAsChannel !== undefined) {
    addItem("Channel Mode", manager.displayAsChannel ? "Enabled" : "Disabled");
  }

  // Status emoji & text
  if (manager.statusEmoji || manager.statusText) {
    const statusText =
      (manager.statusEmoji ? manager.statusEmoji + " " : "") +
      (manager.statusText ?? "");
    addItem("Status", statusText);
  }

  // If no details were added, show a fallback message
  const contentComponent: IAutoView.IAutoViewPresentationComponentProps =
    items.length > 0
      ? ({
          type: "DataList",
          childrenProps: items,
        } as IAutoView.IAutoViewDataListProps)
      : ({
          type: "Markdown",
          content: "*No details to display.*",
        } as IAutoView.IAutoViewMarkdownProps);

  // Wrap the data-list (or markdown) in a CardContent
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponent,
  };

  // Return a vertical card combining header + content
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
