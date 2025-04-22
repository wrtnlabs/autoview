import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A version of a software package
     *
     * @title Package Version
    */
    export type package_version = {
        /**
         * Unique identifier of the package version.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the package version.
        */
        name: string;
        url: string;
        package_html_url: string;
        html_url?: string;
        license?: string;
        description?: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        deleted_at?: string & tags.Format<"date-time">;
        /**
         * @title Package Version Metadata
        */
        metadata?: {
            package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
            /**
             * @title Container Metadata
            */
            container?: {
                tags: string[];
            };
            /**
             * @title Docker Metadata
            */
            docker?: {
                tag?: string[];
            };
        };
    };
}
type IAutoViewTransformerInputType = Schema.package_version[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No package versions available.**",
        };
    }

    // Helper: map package_type to FontAwesome icon IDs and colors
    const typeIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
        npm:       { id: "npm",       color: "red"    },
        maven:     { id: "coffee",    color: "orange" },
        rubygems:  { id: "gem",       color: "violet" },
        docker:    { id: "docker",    color: "cyan"   },
        nuget:     { id: "box",       color: "blue"   },
        container: { id: "box",       color: "gray"   },
    };

    // Build DataList items for each package version
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((v) => {
        // Determine package type icon (fallback to archive)
        const pkgType = v.metadata?.package_type ?? "";
        const iconInfo = typeIconMap[pkgType] ?? { id: "archive", color: "gray" };

        // Build chips for container tags (if any)
        const containerTags = v.metadata?.container?.tags ?? [];
        const containerChips: IAutoView.IAutoViewChipProps[] = containerTags.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "outlined",
            color: "secondary",
        }));

        // Build chips for docker tags (if any)
        const dockerTags = v.metadata?.docker?.tag ?? [];
        const dockerChips: IAutoView.IAutoViewChipProps[] = dockerTags.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "outlined",
            color: "info",
        }));

        // Format creation date to a human‐readable string
        const createdDate = (() => {
            try {
                return new Date(v.created_at).toLocaleDateString();
            } catch {
                return v.created_at;
            }
        })();

        // Assemble detail components (Markdown, Text, ChipGroups, Button)
        const details: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Description as markdown, if present
        if (v.description) {
            details.push({
                type: "Markdown",
                content: v.description,
            });
        }

        // Created date with calendar icon inline in a Text component
        details.push({
            type: "Text",
            variant: "caption",
            content: [
                "Created: ",
                { type: "Icon", id: "calendar", size: 16, color: "gray" },
                " " + createdDate,
            ],
        });

        // Container tags group (show up to 3)
        if (containerChips.length > 0) {
            details.push({
                type: "ChipGroup",
                childrenProps: containerChips,
                maxItems: 3,
            });
        }

        // Docker tags group (show up to 3)
        if (dockerChips.length > 0) {
            details.push({
                type: "ChipGroup",
                childrenProps: dockerChips,
                maxItems: 3,
            });
        }

        // Detail link button
        const link = v.html_url ?? v.url;
        details.push({
            type: "Button",
            label: "Details",
            href: link,
            variant: "outlined",
            color: "primary",
            size: "small",
        });

        // Return a DataListItem with an icon label and detailed value
        return {
            type: "DataListItem",
            label: {
                // Show the package type icon prominently
                type: "Icon",
                id: iconInfo.id,
                size: 32,
                color: iconInfo.color,
            },
            value: details,
        };
    });

    // Finally, wrap all items in a DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
