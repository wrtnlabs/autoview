import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_UserType {
        export type ProfileList_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_UserType.ProfileList_gt_;
        };
    }
    export namespace PaginationResponseType_lt_UserType {
        export type ProfileList_gt_ = {
            list: Schema.UserType.Acquaintance[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace UserType {
        export type Acquaintance = {
            /**
             * 사용자의 별칭, 설정하지 않는 경우도 있다.
            */
            nickname: string;
            id: number;
            /**
             * 사용자의 프로필 이미지
            */
            profileImage?: string | null;
            reason: "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C" | "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C";
        };
    }
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_UserType.ProfileList_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure paging information and list of users
  const {
    data: { list, count, totalPage, page },
  } = input;

  // Map each acquaintance to a DataListItem with an avatar, name, and reason chip
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = list.map((user) => {
    // Avatar component: uses profileImage if present, otherwise the user's initials
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.profileImage ?? undefined,
      name: user.nickname,
      variant: "primary",
      size: 40,
    };

    // Text component for the user's nickname
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: user.nickname,
      variant: "body1",
    };

    // Chip component showing the reason for acquaintance
    const reasonChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: user.reason,
      variant: "outlined",
      size: "small",
    };

    return {
      type: "DataListItem",
      // Label shows avatar and name side by side
      label: [avatar, nameText],
      // Value shows the reason chip
      value: reasonChip,
    };
  });

  // Wrap the items into a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Card header showing title and paging summary, with a users icon
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Acquaintances",
    description: `${count} total · Page ${page} of ${totalPage}`,
    startElement: {
      type: "Icon",
      id: "users",
      color: "teal",
      size: 24,
    },
  };

  // Card content containing our DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return a vertical card that encapsulates header and list content.
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
