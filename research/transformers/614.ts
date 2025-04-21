import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposActionsVariables {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            variables: Schema.actions_variable[];
        };
    }
    /**
     * @title Actions Variable
    */
    export type actions_variable = {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
    };
}
type IAutoViewTransformerInputType = Schema.IApiReposActionsVariables.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no variables, show a friendly markdown message
  if (!input.variables || input.variables.length === 0) {
    return {
      type: "Markdown",
      content: "### No variables found\nThere are no repository actions variables to display."
    };
  }

  // Convert each action variable into a DataListItem with icon, name, value, and timestamps
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.variables.map(variable => {
    // Convert ISO timestamps into locale-specific, human‐readable strings
    const createdAt = new Date(variable.created_at).toLocaleString();
    const updatedAt = new Date(variable.updated_at).toLocaleString();

    return {
      type: "DataListItem",
      // On the left, an icon plus the variable's name
      label: [
        { type: "Icon", id: "tag", size: 16, color: "teal" },
        { type: "Text", content: variable.name, variant: "subtitle2" }
      ],
      // On the right, show value and timestamps as stacked text
      value: [
        { type: "Text", content: `Value: ${variable.value}`, variant: "body2", color: "primary" },
        { type: "Text", content: `Created: ${createdAt}`, variant: "caption", color: "gray" },
        { type: "Text", content: `Updated: ${updatedAt}`, variant: "caption", color: "gray" }
      ]
    };
  });

  // Wrap all items in a DataList component
  const dataListProps: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Create a card header showing the total count
  const headerProps: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: { type: "Icon", id: "list", size: 32, color: "blue" },
    title: `Actions Variables (${input.total_count})`,
    description: "A summary of all repository actions variables"
  };

  // Embed the DataList in the card content
  const contentProps: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataListProps
  };

  // Return a vertical card containing the header and the list,
  // which adapts nicely to both desktop and mobile form factors
  return {
    type: "VerticalCard",
    childrenProps: [headerProps, contentProps]
  };
}
