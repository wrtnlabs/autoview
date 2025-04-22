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
  // Destructure pagination metadata for header information
  const {
    list,
    totalResult,
    totalPage,
    page,
  } = input.data;

  // Map each user to a DataListItemProps for display
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = list.map((user) => {
    // Avatar: show user's profile image if available; otherwise fallback to initials via name
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      src: user.profileImage ?? undefined,
      name: user.nickname,
      size: 40,
    };

    // Nickname rendered as text
    const nameText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: user.nickname,
      variant: "body1",
    };

    // Reason rendered as a chip for visual emphasis
    const reasonChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: user.reason,
      size: "small",
      variant: "outlined",
    };

    return {
      type: "DataListItem",
      // Label section contains avatar + nickname
      label: [avatar, nameText],
      // Value section contains the reason chip
      value: reasonChip,
    };
  });

  // Construct the DataList component containing all items
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // CardHeader showing pagination status
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Page ${page} of ${totalPage}`,
    description: `Showing ${list.length} of ${totalResult} total results`,
  };

  // CardContent wrapping the data list
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Return a vertical card combining header and content for a responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
