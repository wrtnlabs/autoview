import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Try_lt_UserType {
    export type Retuation_gt_ = {
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
        data: UserType.Retuation;
    };
}
namespace UserType {
    export type Retuation = {
        /**
         * 지금까지 질문을 한 횟수로, 게시글과 무관하게 질문 횟수는 한 번 더 카운트해준다.
        */
        question: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 답변을 한 횟수
        */
        answer: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 최상위로 채택된 답변의 수로, 시간이 지남에 따라 변동될 수 있다
        */
        adopted: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 글을 작성한 수
        */
        writing: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        /**
         * 좋아요를 받은 수로, 게시글과 댓글 모두를 합한 것을 의미한다.
        */
        likes: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
        id: number & tags.JsonSchemaPlugin<{
            "x-typia-required": true,
            "x-typia-optional": false
        }>;
    };
}
type IAutoViewTransformerInputType = Try_lt_UserType.Retuation_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the user reputation data from the input.
  const stats = input.data;

  // Create a set of chips to visually display each statistic.
  // Each chip uses an icon (via IAutoViewIconProps) to enhance the UI visually,
  // making it more engaging and easier to comprehend at a glance.
  const chips: IAutoView.IAutoViewChipProps[] = [
    {
      type: "Chip",
      label: `Questions: ${stats.question}`,
      // "help" icon used for questions.
      startElement: {
        type: "Icon",
        id: "help",
        color: "teal",
        size: 16,
      },
    },
    {
      type: "Chip",
      label: `Answers: ${stats.answer}`,
      // "comment" icon used for answers.
      startElement: {
        type: "Icon",
        id: "comment",
        color: "green",
        size: 16,
      },
    },
    {
      type: "Chip",
      label: `Adopted: ${stats.adopted}`,
      // "check-circle" icon used for adopted answers.
      startElement: {
        type: "Icon",
        id: "check-circle",
        color: "blue",
        size: 16,
      },
    },
    {
      type: "Chip",
      label: `Writing: ${stats.writing}`,
      // "edit" icon used for writing contributions.
      startElement: {
        type: "Icon",
        id: "edit",
        color: "orange",
        size: 16,
      },
    },
    {
      type: "Chip",
      label: `Likes: ${stats.likes}`,
      // "thumbs-up" icon used for likes received.
      startElement: {
        type: "Icon",
        id: "thumbs-up",
        color: "red",
        size: 16,
      },
    },
  ];

  // Group the chips using a ChipGroup so that they are laid out in a cohesive, responsive manner.
  // This helps especially on mobile devices where screen real estate is limited.
  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: chips,
    maxItems: chips.length,
  };

  // Create a CardHeader for the UI card.
  // The header provides a title and a description along with a visual icon,
  // which improves the visual appeal and provides context to the user.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "User Reputation",
    description: "Summary of user contributions",
    startElement: {
      type: "Icon",
      id: "user",
      color: "blue",
      size: 24,
    },
  };

  // Wrap the chip group inside a CardContent component.
  // This encapsulates the statistic chips in the card's content section.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: chipGroup, // Accepts a single component (ChipGroup) as its children.
  };

  // Compose a VerticalCard component to aggregate the header and content.
  // A vertical card layout is responsive and works well on both larger screens and mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  // Return the fully composed UI component.
  return verticalCard;
}
