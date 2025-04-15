import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace TryPagination_lt_UserType {
    export type ProfileList_gt_ = {
        result: true & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        code: 1000 & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        requestToResponse?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        data: PaginationResponseType_lt_UserType.ProfileList_gt_;
    };
}
namespace PaginationResponseType_lt_UserType {
    export type ProfileList_gt_ = {
        list: UserType.Acquaintance[] & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        count: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        totalResult: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        totalPage: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        search?: string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>;
        page: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
    };
}
namespace UserType {
    export type Acquaintance = {
        /**
         * 사용자의 별칭, 설정하지 않는 경우도 있다.
        */
        nickname: string & tags.JsonSchemaPlugin<{
            "x-typia-metaTags": [
                {
                    kind: "minLength",
                    value: 1
                },
                {
                    kind: "maxLength",
                    value: 50
                }
            ],
            "x-typia-jsDocTags": [
                {
                    name: "minLength",
                    text: [
                        {
                            text: "1",
                            kind: "text"
                        }
                    ]
                },
                {
                    name: "maxLength",
                    text: [
                        {
                            text: "50",
                            kind: "text"
                        }
                    ]
                }
            ],
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 사용자의 프로필 이미지
        */
        profileImage?: (string & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | null;
        reason: "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C" | "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C";
    };
}
type IAutoViewTransformerInputType = TryPagination_lt_UserType.ProfileList_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract pagination data and user list from the input.
  const { data } = input;
  const { list, count, totalPage, page } = data;

  // Create an array of DataList items from each user in the list.
  // Each item displays a visual avatar (if available) or an icon as fallback,
  // and information about the user using markdown.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = list.map((user) => {
    // Choose avatar if a profile image exists; use an icon otherwise.
    const avatarOrIcon = user.profileImage 
      ? {
          // The Avatar component accepts a src, an optional name, a variant and a size.
          type: "Avatar",
          src: user.profileImage,
          name: user.nickname,
          variant: "primary",
          size: 40,
        } as IAutoView.IAutoViewAvatarProps
      : {
          // Icon fallback when profile image is not available.
          type: "Icon",
          id: "user", // Assuming "user" is a valid icon id in kebab-case.
          color: "blue",
          size: 40,
        } as IAutoView.IAutoViewIconProps;

    // Use markdown to display user information.
    // Here we include the nickname and the reason text.
    const userMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `### ${user.nickname}\n\n**ID:** ${user.id}\n\n**Reason:** ${user.reason}`,
    };

    return {
      type: "DataListItem",
      // Label is reserved for visual element (avatar or icon)
      label: avatarOrIcon,
      // Value is the markdown content displaying user details.
      value: userMarkdown,
    };
  });

  // Compose the main UI as a vertical card with a header and content.
  // The header uses an icon element and markdown-enhanced title/description.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // CardHeader displays a summary title and page information.
        type: "CardHeader",
        title: "User Profiles",
        description: `Page ${page} of ${totalPage}`,
        // Use an icon for a visually engaging header start element.
        startElement: {
          type: "Icon",
          id: "users", // Assuming "users" is available; you can change to an appropriate icon id.
          color: "teal",
          size: 24,
        } as IAutoView.IAutoViewIconProps,
      },
      {
        // CardContent contains additional details and the data list.
        type: "CardContent",
        childrenProps: [
          // A markdown component summarizing the overall results.
          {
            type: "Markdown",
            content: `**Total Users:** ${count}\n\n**Current Page:** ${page}`,
          } as IAutoView.IAutoViewMarkdownProps,
          // A DataList component to display each user profile.
          {
            type: "DataList",
            childrenProps: dataListItems,
          } as IAutoView.IAutoViewDataListProps,
        ],
      },
    ],
  };

  // Return the composed UI component.
  return verticalCard;
}
