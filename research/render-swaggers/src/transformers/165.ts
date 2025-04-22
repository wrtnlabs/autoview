import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingChannel {
        /**
         * Hierarchical channel information with children categories.
        */
        export type IHierarchical = {
            /**
             * Children categories with hierarchical structure.
             *
             * @title Children categories with hierarchical structure
            */
            categories: Schema.IShoppingChannelCategory.IHierarchical[];
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
            /**
             * Identifier code.
             *
             * @title Identifier code
            */
            code: string;
            /**
             * Name of the channel.
             *
             * @title Name of the channel
            */
            name: string;
        };
    }
    export namespace IShoppingChannelCategory {
        /**
         * Hierarchical category information with children categories.
        */
        export type IHierarchical = {
            /**
             * List of children categories with hierarchical structure.
             *
             * @title List of children categories with hierarchical structure
            */
            children: Schema.IShoppingChannelCategory.IHierarchical[];
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Identifier code of the category.
             *
             * The code must be unique in the channel.
             *
             * @title Identifier code of the category
            */
            code: string;
            /**
             * Parent category's ID.
             *
             * @title Parent category's ID
            */
            parent_id: null | (string & tags.Format<"uuid">);
            /**
             * Representative name of the category.
             *
             * The name must be unique within the parent category. If no parent exists,
             * then the name must be unique within the channel between no parent
             * categories.
             *
             * @title Representative name of the category
            */
            name: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to sanitize IDs for mermaid (must start with letter, no hyphens)
    const sanitize = (id: string): string => {
        // Replace non-alphanumeric with underscore, prefix with 'n' if starting with digit
        let clean = id.replace(/[^a-zA-Z0-9]/g, "_");
        if (/^[0-9]/.test(clean)) clean = "n" + clean;
        return clean;
    };

    // Traverse the category tree to build mermaid nodes and edges
    const nodes: Set<string> = new Set();
    const edges: string[] = [];

    const traverse = (node: Schema.IShoppingChannelCategory.IHierarchical) => {
        const nodeId = sanitize(node.id);
        // Define the node label using the category name (escape brackets)
        const label = node.name.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
        nodes.add(`${nodeId}["${label}"]`);
        for (const child of node.children || []) {
            const childId = sanitize(child.id);
            // Ensure the child node is defined
            traverse(child);
            // Create an edge from parent to child
            edges.push(`${nodeId} --> ${childId}`);
        }
    };

    // Build mermaid definitions for all top-level categories
    if (input.categories && input.categories.length > 0) {
        for (const top of input.categories) {
            traverse(top);
        }
        // Compose mermaid diagram code
        const mermaidLines = [
            "graph TD",
            // Node definitions
            ...Array.from(nodes),
            // Edge definitions
            ...edges,
        ];
        const mermaid = mermaidLines.join("\n");

        // Compose markdown content with title and mermaid diagram
        const content = [
            `## Channel: ${input.name}`,
            `*Code:* \`${input.code}\`  `,
            `*Created:* ${new Date(input.created_at).toLocaleString()}`,
            "",
            "mermaid",
            mermaid,
            "```",
        ].join("\n");

        return {
            type: "Markdown",
            content,
        };
    } else {
        // Fallback: no categories to display, show a friendly message
        return {
            type: "Text",
            variant: "body1",
            content: "No categories available for this channel.",
        };
    }
}
