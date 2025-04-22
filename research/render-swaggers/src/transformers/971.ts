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
    // If there are no package versions, display a friendly message using Markdown
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### 📦 No package versions found\n\nThere are currently no versions to display."
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Helper: map package_type to a chip color
    const packageTypeColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        npm: "orange",
        maven: "indigo",
        rubygems: "red",
        docker: "cyan",
        nuget: "teal",
        container: "blue",
    };

    // Build a List of ListItems, one per package version
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map(version => {
        // Format the creation date for readability
        let createdAtLabel = "";
        try {
            const date = new Date(version.created_at);
            createdAtLabel = date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        } catch {
            // Fallback to raw string if parsing fails
            createdAtLabel = version.created_at;
        }

        // Build an array of chips: first the package_type, then any container/docker tags
        const chips: IAutoView.IAutoViewChipProps[] = [];

        if (version.metadata?.package_type) {
            chips.push({
                type: "Chip",
                label: version.metadata.package_type,
                variant: "outlined",
                size: "small",
                color: packageTypeColorMap[version.metadata.package_type] || "gray",
            });
        }

        if (version.metadata?.container?.tags) {
            for (const tag of version.metadata.container.tags) {
                chips.push({
                    type: "Chip",
                    label: `container:${tag}`,
                    variant: "outlined",
                    size: "small",
                    color: "secondary",
                });
            }
        }

        if (version.metadata?.docker?.tag) {
            for (const tag of version.metadata.docker.tag) {
                chips.push({
                    type: "Chip",
                    label: `docker:${tag}`,
                    variant: "outlined",
                    size: "small",
                    color: "secondary",
                });
            }
        }

        // Build the ListItemProps for this version
        const listItem: IAutoView.IAutoViewListItemProps = {
            type: "ListItem",
            title: version.name,
            description: `${version.description ?? "No description"} (Created: ${createdAtLabel})`,
            // Clicking the item will navigate to the HTML URL if available, else to the API URL
            href: version.html_url ?? version.url,
            // A package icon at the start
            startElement: {
                type: "Icon",
                id: "box",
                color: "blue",
                size: 24,
            } as IAutoView.IAutoViewIconProps,
            // Show chips at the end summarizing metadata
            endElement: chips.length > 0 ? chips : undefined,
        };

        return listItem;
    });

    // Return the List component wrapping all items
    return {
        type: "List",
        childrenProps: listItems,
    } as IAutoView.IAutoViewListProps;
}
