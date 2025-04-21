import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type actions_repository_permissions = {
        enabled: Schema.actions_enabled;
        allowed_actions?: Schema.allowed_actions;
        selected_actions_url?: Schema.selected_actions_url;
    };
    /**
     * Whether GitHub Actions is enabled on the repository.
    */
    export type actions_enabled = boolean;
    /**
     * The permissions policy that controls the actions and reusable workflows that are allowed to run.
    */
    export type allowed_actions = "all" | "local_only" | "selected";
    /**
     * The API URL to use to get or set the actions and reusable workflows that are allowed to run, when `allowed_actions` is set to `selected`.
    */
    export type selected_actions_url = string;
}
type IAutoViewTransformerInputType = Schema.actions_repository_permissions;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Build a list of DataListItemProps to represent each field
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // 1. Enabled flag: show a green check or red cross icon with text
    items.push({
        type: "DataListItem",
        // Label on the left
        label: [{
            type: "Text",
            content: "Enabled",
            variant: "body2",
        }],
        // Value on the right: icon + text
        value: [
            {
                type: "Icon",
                id: input.enabled ? "check-circle" : "times-circle",
                color: input.enabled ? "green" : "red",
                size: 20,
            },
            {
                type: "Text",
                content: input.enabled ? "Yes" : "No",
                variant: "body2",
                color: input.enabled ? "green" : "red",
            },
        ],
    });

    // 2. Allowed actions: show as a colored chip
    if (input.allowed_actions !== undefined) {
        // map permission string to a human-friendly label & color
        const mapping: Record<string, { label: string; color: IAutoView.IAutoViewChipProps["color"] }> = {
            all: { label: "All", color: "primary" },
            local_only: { label: "Local Only", color: "warning" },
            selected: { label: "Selected", color: "info" },
        };
        const info = mapping[input.allowed_actions] || { label: input.allowed_actions, color: "gray" };

        items.push({
            type: "DataListItem",
            label: [{
                type: "Text",
                content: "Allowed Actions",
                variant: "body2",
            }],
            value: {
                type: "Chip",
                label: info.label,
                color: info.color,
                size: "small",
                variant: "filled",
            },
        });
    }

    // 3. If allowed_actions is 'selected', provide a button to open the selected_actions_url
    if (input.allowed_actions === "selected" && input.selected_actions_url) {
        items.push({
            type: "DataListItem",
            label: [{
                type: "Text",
                content: "Selected Actions URL",
                variant: "body2",
            }],
            value: {
                type: "Button",
                variant: "outlined",
                color: "primary",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    color: "blue",
                    size: 16,
                },
                label: "Open",
                href: input.selected_actions_url,
            },
        });
    }

    // Compose the DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    // Build the card header with an icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Actions Permissions",
        description: "GitHub Actions settings for this repository",
        startElement: {
            type: "Icon",
            id: "cogs",
            color: "blue",
            size: 24,
        },
    };

    // Wrap the DataList in CardContent
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Return a vertical card with header and content
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
