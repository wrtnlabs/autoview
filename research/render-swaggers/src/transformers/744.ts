import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiReposEnvironmentsVariables {
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
type IAutoViewTransformerInputType = Schema.IApiReposEnvironmentsVariables.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract variables array, defaulting to empty if undefined
  const variables = input.variables ?? [];

  // If there are no variables, display a friendly message
  if (variables.length === 0) {
    return {
      type: "Text",
      content: "No variables found in this environment.",
      variant: "body1",
    };
  }

  // Map each variable into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = variables.map((variable) => {
    // Convert ISO timestamps to a localized, human-readable format
    const createdAt = new Date(variable.created_at).toLocaleString();
    const updatedAt = new Date(variable.updated_at).toLocaleString();

    // Compose a Markdown block for the variable details.
    // Markdown gives us richer text formatting (bold, code spans, line breaks).
    const detailMarkdown = `
**Value:** \`${variable.value}\`

**Created At:** ${createdAt}  
**Updated At:** ${updatedAt}
    `.trim();

    return {
      type: "DataListItem",

      // Use a Text component for the label (the variable name)
      label: {
        type: "Text",
        content: variable.name,
        variant: "subtitle1",
      },

      // Use a Markdown component to render the details
      value: {
        type: "Markdown",
        content: detailMarkdown,
      },
    };
  });

  // Return a DataList containing all items
  return {
    type: "DataList",
    childrenProps: items,
  };
}
