import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsActionsVariables {
        export type GetResponse = {
            total_count: number & tags.Type<"int32">;
            variables: Schema.organization_actions_variable[];
        };
    }
    /**
     * Organization variable for GitHub Actions.
     *
     * @title Actions Variable for an Organization
    */
    export type organization_actions_variable = {
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
        /**
         * Visibility of a variable
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.IApiOrgsActionsVariables.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to map visibility strings to color scales
    const mapVisibilityColor = (visibility: string): IAutoView.IAutoViewChipProps["color"] => {
        switch (visibility) {
            case "private":
                return "error";
            case "selected":
                return "warning";
            case "all":
            default:
                return "success";
        }
    };

    // If there are no variables, show a simple markdown note
    if (input.total_count === 0) {
        return {
            type: "Markdown",
            content: "### No Actions Variables Found\n\nThere are no organization variables to display."
        };
    }

    // Build a list item for each variable
    const items: IAutoView.IAutoViewDataListItemProps[] = input.variables.map((v) => {
        // Chip for variable visibility
        const visibilityChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: v.visibility,
            variant: "outlined",
            color: mapVisibilityColor(v.visibility),
            size: "small"
        };

        // Optional chip for selected repositories link
        const repoChip: IAutoView.IAutoViewChipProps | undefined = v.selected_repositories_url
            ? {
                  type: "Chip",
                  label: "Repos",
                  startElement: {
                      type: "Icon",
                      id: "link",
                      size: 16,
                      color: "blue"
                  },
                  variant: "outlined",
                  size: "small"
              }
            : undefined;

        // Group chips for metadata: created and updated timestamps (and repos if present)
        const metadataChips: IAutoView.IAutoViewChipProps[] = [
            {
                type: "Chip",
                label: `Created: ${new Date(v.created_at).toLocaleString()}`,
                startElement: {
                    type: "Icon",
                    id: "calendar-alt",
                    size: 16,
                    color: "gray"
                },
                variant: "outlined",
                size: "small"
            },
            {
                type: "Chip",
                label: `Updated: ${new Date(v.updated_at).toLocaleString()}`,
                startElement: {
                    type: "Icon",
                    id: "edit",
                    size: 16,
                    color: "gray"
                },
                variant: "outlined",
                size: "small"
            }
        ];
        if (repoChip) {
            metadataChips.push(repoChip);
        }

        // Markdown block to show the variable value in a code block
        const valueMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: [
                "",
                v.value.replace(/```/g, "\\`\\`\\`"), // escape any backticks
                "```"
            ].join("\n")
        };

        return {
            type: "DataListItem",
            // Label: variable name and its visibility chip
            label: [
                {
                    type: "Text",
                    content: v.name
                },
                visibilityChip
            ],
            // Value: show the code block plus metadata chips
            value: [
                valueMarkdown,
                {
                    type: "ChipGroup",
                    childrenProps: metadataChips
                }
            ]
        };
    });

    // Compose a data list for all items
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    // Wrap the list in a vertical card showing the total count
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Organization Variables (${input.total_count})`,
                startElement: {
                    type: "Icon",
                    id: "database",
                    size: 20,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                childrenProps: dataList
            }
        ]
    };
}
