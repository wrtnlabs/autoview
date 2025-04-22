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
type IAutoViewTransformerInputType = Schema.package_version;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to create simple text components
    const createText = (
        content: string,
        variant: IAutoView.IAutoViewTextProps["variant"] = "body2",
        color?: IAutoView.IAutoViewTextProps["color"]
    ): IAutoView.IAutoViewTextProps => ({
        type: "Text",
        content,
        variant,
        color,
    });

    // Helper to create link buttons for URL fields
    const createLinkButton = (url: string, label?: string): IAutoView.IAutoViewButtonProps => ({
        type: "Button",
        variant: "text",
        size: "small",
        href: url,
        label: label ?? url,
    });

    // Helper to create a single chip
    const createChip = (
        label: string,
        color: IAutoView.IAutoViewChipProps["color"] = "gray"
    ): IAutoView.IAutoViewChipProps => ({
        type: "Chip",
        label,
        variant: "filled",
        color,
    });

    // Helper to create a chip group from an array of strings
    const createChipGroup = (
        labels: string[],
        maxItems?: number
    ): IAutoView.IAutoViewChipGroupProps => ({
        type: "ChipGroup",
        childrenProps: labels.map((lbl) => createChip(lbl)),
        maxItems,
    });

    // Map package_type to a visually distinct chip color
    const packageTypeColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        npm: "orange",
        maven: "indigo",
        rubygems: "pink",
        docker: "teal",
        nuget: "violet",
        container: "cyan",
    };

    // Build DataList items for each property
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID
    items.push({
        type: "DataListItem",
        label: createText("ID", "subtitle2"),
        value: createText(input.id.toString()),
    });

    // Name
    items.push({
        type: "DataListItem",
        label: createText("Name", "subtitle2"),
        value: createText(input.name, "body1"),
    });

    // Description (if present)
    if (input.description) {
        items.push({
            type: "DataListItem",
            label: createText("Description", "subtitle2"),
            // Use Markdown component for rich display if needed
            value: {
                type: "Markdown",
                content: input.description,
            },
        });
    }

    // License (if present)
    if (input.license) {
        items.push({
            type: "DataListItem",
            label: createText("License", "subtitle2"),
            value: createText(input.license),
        });
    }

    // URLs
    items.push({
        type: "DataListItem",
        label: createText("Package URL", "subtitle2"),
        value: createLinkButton(input.url, "View Package"),
    });
    items.push({
        type: "DataListItem",
        label: createText("HTML URL", "subtitle2"),
        value: createLinkButton(input.package_html_url, "Open in Browser"),
    });
    if (input.html_url) {
        items.push({
            type: "DataListItem",
            label: createText("Additional URL", "subtitle2"),
            value: createLinkButton(input.html_url),
        });
    }

    // Timestamps
    items.push({
        type: "DataListItem",
        label: createText("Created At", "subtitle2"),
        value: createText(new Date(input.created_at).toLocaleString()),
    });
    items.push({
        type: "DataListItem",
        label: createText("Updated At", "subtitle2"),
        value: createText(new Date(input.updated_at).toLocaleString()),
    });
    if (input.deleted_at) {
        items.push({
            type: "DataListItem",
            label: createText("Deleted At", "subtitle2"),
            value: createText(new Date(input.deleted_at).toLocaleString(), "body2", "error"),
        });
    }

    // Metadata (if present)
    if (input.metadata) {
        // Package type chip
        items.push({
            type: "DataListItem",
            label: createText("Type", "subtitle2"),
            value: createChip(
                input.metadata.package_type,
                packageTypeColorMap[input.metadata.package_type] ?? "gray"
            ),
        });

        // Container tags
        const containerTags = input.metadata.container?.tags;
        if (containerTags && containerTags.length > 0) {
            items.push({
                type: "DataListItem",
                label: createText("Container Tags", "subtitle2"),
                value: createChipGroup(containerTags),
            });
        }

        // Docker tags
        const dockerTags = input.metadata.docker?.tag;
        if (dockerTags && dockerTags.length > 0) {
            items.push({
                type: "DataListItem",
                label: createText("Docker Tags", "subtitle2"),
                value: createChipGroup(dockerTags),
            });
        }
    }

    // Compose the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    // Build a vertical card with header and content
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: input.description,
        // Use an archive/package icon
        startElement: {
            type: "Icon",
            id: "archive",
            size: 28,
            color: "blue",
        },
    };

    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [dataList],
    };

    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };

    return card;
}
