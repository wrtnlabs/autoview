import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Project columns contain cards of work.
     *
     * @title Project Column
    */
    export type project_column = {
        url: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
        cards_url: string & tags.Format<"uri">;
        /**
         * The unique identifier of the project column
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project column
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.project_column;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a GitHub project column into a card with interactive elements
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Card header: displays the column name, its ID, and an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `ID: ${input.id}`,
    startElement: {
      type: "Icon",
      id: "columns",    // use a representative icon
      color: "teal",
      size: 32,
    },
  };

  // 2. Build a DataList of relevant fields:
  //    - clickable buttons for URLs
  //    - chips/text for IDs and timestamps
  const detailsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: [{ type: "Markdown", content: "**Column URL**" }],
        value: {
          type: "Button",
          variant: "text",
          color: "blue",
          startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
          label: "Open",
          href: input.url,
        },
      },
      {
        type: "DataListItem",
        label: [{ type: "Markdown", content: "**Project URL**" }],
        value: {
          type: "Button",
          variant: "text",
          color: "blue",
          startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
          label: "Open",
          href: input.project_url,
        },
      },
      {
        type: "DataListItem",
        label: [{ type: "Markdown", content: "**Cards URL**" }],
        value: {
          type: "Button",
          variant: "text",
          color: "blue",
          startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
          label: "Open",
          href: input.cards_url,
        },
      },
      {
        type: "DataListItem",
        label: [{ type: "Markdown", content: "**Node ID**" }],
        value: {
          type: "Chip",
          label: input.node_id,
          variant: "outlined",
        },
      },
      {
        type: "DataListItem",
        label: [{ type: "Markdown", content: "**Created At**" }],
        value: {
          type: "Text",
          variant: "body2",
          content: input.created_at,
        },
      },
      {
        type: "DataListItem",
        label: [{ type: "Markdown", content: "**Updated At**" }],
        value: {
          type: "Text",
          variant: "body2",
          content: input.updated_at,
        },
      },
    ],
  };

  // 3. Wrap the list inside the card content
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: detailsList,
  };

  // 4. Assemble the VerticalCard for a responsive single-column layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}
