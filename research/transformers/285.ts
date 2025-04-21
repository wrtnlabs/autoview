import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace TryPagination_lt_CommentType {
        export type CommentsByArcile_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.PaginationResponseType_lt_CommentType.CommentsByArcile_gt_;
        };
    }
    export namespace PaginationResponseType_lt_CommentType {
        export type CommentsByArcile_gt_ = {
            list: Schema.Merge_lt_CommentType.RootComment_comma__space___type_gt_[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace Merge_lt_CommentType {
        export type RootComment_comma__space___type_gt_ = {
            id: number;
            /**
             * 작성자의 아이디
            */
            writerId: number & tags.Type<"int32">;
            /**
             * 게시글 내용
            */
            contents: string;
            createdAt: string | any;
            /**
             * 이미지의 아이디로 없을 수도 있다.
             * 없는 경우에는 그 게시글에 달린 것으로, xPosition, yPosition을 무시한다.
            */
            imageId?: number | null;
            /**
             * 소수점을 포함한 좌표 값
            */
            xPosition?: (string & tags.Pattern<"^(-?\\d+\\.?\\d*|(-?\\d+\\.?\\d*))$">) | number | null;
            /**
             * 소수점을 포함한 좌표 값
            */
            yPosition?: (string & tags.Pattern<"^(-?\\d+\\.?\\d*|(-?\\d+\\.?\\d*))$">) | number | null;
            writer: Schema.UserType.Profile;
        };
    }
    export type Date = any;
    export namespace UserType {
        export type Profile = {
            /**
             * 사용자의 별칭, 설정하지 않는 경우도 있다.
            */
            nickname: string;
            id: number;
            /**
             * 사용자의 프로필 이미지
            */
            profileImage?: string | null;
        };
    }
}
type IAutoViewTransformerInputType = Schema.TryPagination_lt_CommentType.CommentsByArcile_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const comments = input.data.list;

    // If no comments, show a friendly markdown message
    if (!comments || comments.length === 0) {
        return {
            type: "Markdown",
            content: "**No comments available.**"
        };
    }

    // Helper to safely format dates
    const formatDate = (raw: string | any): string => {
        try {
            const d = new Date(raw);
            if (isNaN(d.getTime())) throw new Error("Invalid date");
            return d.toLocaleString();
        } catch {
            // Fall back to raw string if parsing fails
            return String(raw);
        }
    };

    // Build DataListItemProps for each comment
    const items: IAutoView.IAutoViewDataListItemProps[] = comments.map((comment) => {
        const { writer, contents, createdAt, xPosition, yPosition } = comment;

        // Avatar for the commenter, will show initials if profileImage is missing
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            src: writer.profileImage ?? undefined,
            name: writer.nickname,
            variant: "primary",
            size: 32
        };

        // Main comment text as markdown (supports richer formatting)
        const commentMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: contents
        };

        // Timestamp text in a caption style
        const timestampText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "caption",
            content: formatDate(createdAt)
        };

        // If coordinates exist, show them as chips for quick visual scanning
        const coordinateChips: IAutoView.IAutoViewChipProps[] = [];
        if (xPosition != null) {
            coordinateChips.push({
                type: "Chip",
                label: `x: ${xPosition}`,
                color: "info",
                variant: "outlined",
                size: "small"
            });
        }
        if (yPosition != null) {
            coordinateChips.push({
                type: "Chip",
                label: `y: ${yPosition}`,
                color: "info",
                variant: "outlined",
                size: "small"
            });
        }
        const coordinateGroup: IAutoView.IAutoViewChipGroupProps | undefined =
            coordinateChips.length > 0
                ? {
                      type: "ChipGroup",
                      childrenProps: coordinateChips
                  }
                : undefined;

        // Assemble the DataListItem: label shows avatar + name, value shows content, timestamp, and optional coords
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            avatar,
            {
                type: "Text",
                variant: "subtitle2",
                content: writer.nickname
            }
        ];

        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            commentMarkdown,
            timestampText
        ];
        if (coordinateGroup) {
            valueComponents.push(coordinateGroup);
        }

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });

    // Wrap all items in a DataList for a clean, responsive list layout
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    return dataList;
}
