import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export type codespaces_org_secret = {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url?: string;
    };
}
type IAutoViewTransformerInputType = Schema.codespaces_org_secret;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper: format ISO timestamps into localized strings
    const formatTimestamp = (iso: string): string => {
        try {
            const d = new Date(iso);
            return isNaN(d.getTime()) ? iso : d.toLocaleString();
        } catch {
            // Fallback to the original string if parsing fails
            return iso;
        }
    };

    const createdAt = formatTimestamp(input.created_at);
    const updatedAt = formatTimestamp(input.updated_at);

    // Map visibility to a semantic chip color
    const visibilityColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
        all: 'success',
        private: 'error',
        selected: 'warning',
    };

    // Build a data list of properties (created, updated, repos link if any)
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: 'DataListItem',
            // Use a simple Text for the label
            label: { type: 'Text', content: 'Created At', variant: 'subtitle2' },
            // Show formatted timestamp
            value: { type: 'Text', content: createdAt, variant: 'body2' },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Updated At', variant: 'subtitle2' },
            value: { type: 'Text', content: updatedAt, variant: 'body2' },
        },
    ];

    // If the secret is scoped to selected repositories, show a button to view them
    if (input.visibility === 'selected' && input.selected_repositories_url) {
        dataListItems.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Repositories', variant: 'subtitle2' },
            value: {
                type: 'Button',
                label: 'View Repositories',
                variant: 'text',
                color: 'primary',
                size: 'small',
                href: input.selected_repositories_url,
            },
        });
    }

    return {
        // Use a vertical card to stack header, content, and footer
        type: 'VerticalCard',
        childrenProps: [
            // Card header: show secret name and visibility with a lock icon
            {
                type: 'CardHeader',
                title: input.name,
                description: `Visibility: ${input.visibility}`,
                startElement: {
                    type: 'Icon',
                    id: 'lock',
                    color: 'gray',
                    size: 20,
                },
            },
            // Card content: a data list of the secret's metadata
            {
                type: 'CardContent',
                childrenProps: {
                    type: 'DataList',
                    childrenProps: dataListItems,
                },
            },
            // Card footer: a chip summarizing the visibility
            {
                type: 'CardFooter',
                childrenProps: {
                    type: 'Chip',
                    label: input.visibility,
                    color: visibilityColorMap[input.visibility] || 'secondary',
                    size: 'small',
                    variant: 'outlined',
                },
            },
        ],
    };
}
