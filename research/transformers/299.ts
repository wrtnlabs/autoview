import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace Try_lt_UserType {
        export type Retuation_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: Schema.UserType.Retuation;
        };
    }
    export namespace UserType {
        export type Retuation = {
            /**
             * 지금까지 질문을 한 횟수로, 게시글과 무관하게 질문 횟수는 한 번 더 카운트해준다.
            */
            question: number;
            /**
             * 답변을 한 횟수
            */
            answer: number;
            /**
             * 최상위로 채택된 답변의 수로, 시간이 지남에 따라 변동될 수 있다
            */
            adopted: number;
            /**
             * 글을 작성한 수
            */
            writing: number;
            /**
             * 좋아요를 받은 수로, 게시글과 댓글 모두를 합한 것을 의미한다.
            */
            likes: number;
            id: number;
        };
    }
}
type IAutoViewTransformerInputType = Schema.Try_lt_UserType.Retuation_gt_;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure the response payload for easy access
  const { data } = input;

  // Define the metrics we want to visualize, each with an FA icon and a color
  const metrics: Array<{
    label: string;
    iconId: string;
    value: number;
    color: Exclude<IAutoView.IAutoViewIconProps["color"], undefined>;
  }> = [
    { label: "Questions", iconId: "question-circle", value: data.question, color: "blue" },
    { label: "Answers",   iconId: "reply",           value: data.answer,   color: "green" },
    { label: "Adopted",   iconId: "check-circle",    value: data.adopted,  color: "teal" },
    { label: "Writings",  iconId: "edit",            value: data.writing,  color: "orange" },
    { label: "Likes",     iconId: "thumbs-up",       value: data.likes,    color: "red" },
  ];

  // Transform each metric into a DataListItemProps object
  const listItems: IAutoView.IAutoViewDataListItemProps[] = metrics.map(metric => ({
    type: "DataListItem",
    // The label is composed of an icon followed by text for clarity
    label: [
      {
        type: "Icon",
        id: metric.iconId,
        color: metric.color,
        size: 20,
      },
      {
        type: "Text",
        content: metric.label,
      },
    ],
    // Display the numeric value; could be replaced with a Chip or Badge if desired
    value: {
      type: "Text",
      content: metric.value.toString(),
    },
  }));

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Compose the final UI as a card with a header and the metrics list
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "User Statistics",
    description: `User ID: ${data.id}`,
    // Use a user icon for a visual cue
    startElement: {
      type: "Icon",
      id: "user",
      color: "indigo",
      size: 24,
    },
  };

  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Embed the DataList inside the card content
    childrenProps: dataList,
  };

  // Return a vertically stacked card for a clean, responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };
}
