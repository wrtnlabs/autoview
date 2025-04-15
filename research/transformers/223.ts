import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace TryPagination_lt_CommentType {
    export type CommentsByArcile_gt_ = {
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
        data: PaginationResponseType_lt_CommentType.CommentsByArcile_gt_;
    };
}
namespace PaginationResponseType_lt_CommentType {
    export type CommentsByArcile_gt_ = {
        list: Merge_lt_CommentType.RootComment_comma__space___type_gt_[] & tags.JsonSchemaPlugin<{
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
namespace Merge_lt_CommentType {
    export type RootComment_comma__space___type_gt_ = {
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 작성자의 아이디
        */
        writerId: number & tags.Type<"int32"> & tags.JsonSchemaPlugin<{
            "x-typia-metaTags": [
                {
                    kind: "type",
                    value: "int"
                }
            ],
            "x-typia-jsDocTags": [
                {
                    name: "type",
                    text: [
                        {
                            text: "int",
                            kind: "text"
                        }
                    ]
                }
            ],
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 게시글 내용
        */
        contents: string & tags.JsonSchemaPlugin<{
            "x-typia-metaTags": [
                {
                    kind: "minLength",
                    value: 1
                },
                {
                    kind: "maxLength",
                    value: 1000
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
                            text: "1000",
                            kind: "text"
                        }
                    ]
                }
            ],
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        createdAt: (string & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>) | any;
        /**
         * 이미지의 아이디로 없을 수도 있다.
         * 없는 경우에는 그 게시글에 달린 것으로, xPosition, yPosition을 무시한다.
        */
        imageId?: (number & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | null;
        /**
         * 소수점을 포함한 좌표 값
        */
        xPosition?: (string & tags.Pattern<"^(-?\\d+\\.?\\d*|(-?\\d+\\.?\\d*))$"> & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | (number & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | null;
        /**
         * 소수점을 포함한 좌표 값
        */
        yPosition?: (string & tags.Pattern<"^(-?\\d+\\.?\\d*|(-?\\d+\\.?\\d*))$"> & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | (number & tags.JsonSchemaPlugin<{
            "x-typia-required": false,
            "x-typia-optional": true
        }>) | null;
        writer: UserType.Profile;
    };
}
type Date = any;
namespace UserType {
    export type Profile = {
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
    };
}
type IAutoViewTransformerInputType = TryPagination_lt_CommentType.CommentsByArcile_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the list of comments from the input.
  // If the list is missing or empty, we ensure that childrenProps becomes an empty array.
  const comments = input.data && Array.isArray(input.data.list) ? input.data.list : [];

  // Map each comment into an AutoView DataListItem component.
  // We use Markdown components to visually enhance the text and incorporate images when available.
  const childrenProps: IAutoView.IAutoViewDataListItemProps[] = comments.map(comment => {
    // Compose the writer information as markdown.
    // If a profile image URL is provided, use markdown image syntax to show it,
    // followed by the writer's nickname in bold.
    const writer = comment.writer;
    let writerMarkdown = "";
    if (writer.profileImage) {
      writerMarkdown = `![${writer.nickname}](${writer.profileImage})  \n**${writer.nickname}**`;
    } else {
      writerMarkdown = `**${writer.nickname}**`;
    }

    // Compose the comment content using markdown.
    // The markdown includes the comment content and the creation date.
    const contentMarkdown = `${comment.contents}  \n*Posted on: ${comment.createdAt}*`;

    return {
      type: "DataListItem",
      // The label shows the writer information.
      label: {
        type: "Markdown",
        content: writerMarkdown
      },
      // The value shows the main comment content.
      value: {
        type: "Markdown",
        content: contentMarkdown
      }
    };
  });

  // If there are no comments available, we add a single DataListItem indicating this.
  if (childrenProps.length === 0) {
    childrenProps.push({
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "**No comments available**"
      },
      value: {
        type: "Markdown",
        content: ""
      }
    });
  }

  // Compose the final UI component.
  // We use a DataList to encapsulate the series of comment items.
  // The DataList is a suitable container for rendering lists of items responsively.
  const component: IAutoView.IAutoViewComponentProps = {
    type: "DataList",
    childrenProps: childrenProps
  };

  return component;
}
