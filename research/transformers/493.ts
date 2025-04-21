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
    // Sort versions by creation date descending (newest first)
    const sorted = [...input].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Helper to format ISO date strings into a user-friendly form
    const formatDate = (iso: string) => {
        const d = new Date(iso);
        // e.g. "Jan 1, 2023"
        return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    };

    // If there are no versions, show a placeholder text
    if (sorted.length === 0) {
        return {
            type: "VerticalCard",
            childrenProps: [
                {
                    type: "CardHeader",
                    title: "Package Versions",
                    description: "No versions available",
                    startElement: {
                        type: "Icon",
                        id: "box-open",   // open box icon to indicate package
                        size: 24,
                        color: "gray"
                    }
                }
            ]
        };
    }

    // Map each version to a DataListItem component
    const items: IAutoView.IAutoViewDataListItemProps[] = sorted.map(version => {
        // Determine the icon id for the package type; fall back to a generic file icon
        const pkgType = version.metadata?.package_type;
        const iconId = pkgType && typeof pkgType === "string" ? pkgType : "file";

        return {
            type: "DataListItem",
            // Using a Text component for the version name (label)
            label: [
                {
                    type: "Text",
                    content: version.name,
                    variant: "subtitle1"
                }
            ],
            // Using a Text component for the creation date (value)
            value: [
                {
                    type: "Text",
                    content: formatDate(version.created_at),
                    variant: "body2",
                    color: "gray"
                }
            ],
            // Show an icon representing the package type
            startElement: {
                type: "Icon",
                id: iconId,
                color: "blue",
                size: 20
            },
            // Provide a link button to the package version's HTML URL
            endElement: {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt", // external link icon
                    size: 16,
                    color: "primary"
                },
                label: "View",
                href: version.html_url ?? version.url // fallback if html_url is missing
            }
        };
    });

    // Compose the final card with header and a data list inside the content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Package Versions",
                description: `${sorted.length} version${sorted.length > 1 ? "s" : ""}`,
                startElement: {
                    type: "Icon",
                    id: "box-open",
                    size: 24,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                // Wrap the list of versions in a DataList for a clean layout
                childrenProps: {
                    type: "DataList",
                    childrenProps: items
                }
            }
        ]
    };
}
