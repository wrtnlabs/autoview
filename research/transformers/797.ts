import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * An SSH key granting access to a single repository.
     *
     * @title Deploy Key
    */
    export type deploy_key = {
        id: number & tags.Type<"int32">;
        key: string;
        url: string;
        title: string;
        verified: boolean;
        created_at: string;
        read_only: boolean;
        added_by?: string | null;
        last_used?: string | null;
        enabled?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.deploy_key;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Helper to format ISO date strings to a human-readable form.
   * Falls back to the original value on parse failure.
   */
  function formatDate(iso: string | undefined | null): string {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  }

  // Prepare a list of data items to render in a DataList
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "ID" },
    value: { type: "Text", content: input.id.toString() }
  });

  // Repository URL with a link button
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Repository URL" },
    value: {
      type: "Button",
      label: "Open",
      href: input.url,
      variant: "text",
      color: "primary"
    }
  });

  // SSH key shown as a code block via Markdown
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "SSH Key" },
    value: {
      type: "Markdown",
      // Use triple backticks for code block, specifying 'ssh' for syntax highlighting
      content: "ssh\n" + input.key + "\n```"
    }
  });

  // Creation timestamp
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created At" },
    value: { type: "Text", content: formatDate(input.created_at) }
  });

  // Last used timestamp, or 'Never' if absent
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Last Used" },
    value: {
      type: "Text",
      content: input.last_used ? formatDate(input.last_used) : "Never"
    }
  });

  // Added by (optional)
  if (input.added_by != null) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Added By" },
      value: { type: "Text", content: input.added_by }
    });
  }

  // Read-only status as a Chip for quick visual cue
  listItems.push({
    type: "DataListItem",
    label: { type: "Text", content: "Permission" },
    value: {
      type: "Chip",
      label: input.read_only ? "Read-Only" : "Writable",
      color: input.read_only ? "warning" : "success",
      variant: "filled"
    }
  });

  // Enabled flag, if explicitly set
  if (input.enabled !== undefined) {
    listItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Enabled" },
      value: {
        type: "Chip",
        label: input.enabled ? "Yes" : "No",
        color: input.enabled ? "green" : "gray",
        variant: "outlined"
      }
    });
  }

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Card header: show title and a chip indicating verified/unverified
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    description: `Deploy Key #${input.id}`,
    endElement: {
      type: "Chip",
      label: input.verified ? "Verified" : "Unverified",
      color: input.verified ? "success" : "error",
      variant: "filled"
    }
  };

  // Card content: wrap the DataList in a CardContent component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Return a vertical card combining header and content
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}
