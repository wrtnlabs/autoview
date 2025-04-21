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
  // We will render the entire hierarchy as a mermaid graph for a visual tree.
  // Mermaid diagrams render well on both desktop and mobile in Markdown.
  const lines: string[] = ["mermaid", "graph TD"];

  // Sanitize an ID to a valid mermaid node identifier (must start with a letter, no spaces)
  const sanitizeId = (raw: string): string =>
    "N" + raw.replace(/[^a-zA-Z0-9_]/g, "_");

  // Escape quotes in labels
  const escapeLabel = (label: string): string =>
    label.replace(/"/g, '\\"');

  // Recursive function to declare nodes and edges
  function traverse(
    node: Schema.IShoppingChannelCategory.IHierarchical
  ): void {
    const nodeId = sanitizeId(node.id);
    const label = `${escapeLabel(node.name)} (${escapeLabel(node.code)})`;
    // Declare the node with a label
    lines.push(`  ${nodeId}["${label}"]`);

    // Recurse into children
    for (const child of node.children) {
      const childId = sanitizeId(child.id);
      // Draw an edge from this node to its child
      lines.push(`  ${nodeId} --> ${childId}`);
      traverse(child);
    }
  }

  // Root channel node
  const rootId = sanitizeId(input.id);
  const rootLabel = `${escapeLabel(input.name)} (${escapeLabel(input.code)})`;
  lines.push(`  ${rootId}["${rootLabel}"]`);

  // Connect root channel to top‐level categories
  for (const cat of input.categories) {
    const catId = sanitizeId(cat.id);
    lines.push(`  ${rootId} --> ${catId}`);
    traverse(cat);
  }

  lines.push("```");
  const content = lines.join("\n");

  // Return a markdown component that includes our mermaid diagram
  return {
    type: "Markdown",
    content,
  };
}
