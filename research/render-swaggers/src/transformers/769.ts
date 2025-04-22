import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A repository import from an external source.
     *
     * @title Import
    */
    export type _import = {
        vcs: string | null;
        use_lfs?: boolean;
        /**
         * The URL of the originating repository.
        */
        vcs_url: string;
        svc_root?: string;
        tfvc_project?: string;
        status: "auth" | "error" | "none" | "detecting" | "choose" | "auth_failed" | "importing" | "mapping" | "waiting_to_push" | "pushing" | "complete" | "setup" | "unknown" | "detection_found_multiple" | "detection_found_nothing" | "detection_needs_auth";
        status_text?: string | null;
        failed_step?: string | null;
        error_message?: string | null;
        import_percent?: (number & tags.Type<"int32">) | null;
        commit_count?: (number & tags.Type<"int32">) | null;
        push_percent?: (number & tags.Type<"int32">) | null;
        has_large_files?: boolean;
        large_files_size?: number & tags.Type<"int32">;
        large_files_count?: number & tags.Type<"int32">;
        project_choices?: {
            vcs?: string;
            tfvc_project?: string;
            human_name?: string;
        }[];
        message?: string;
        authors_count?: (number & tags.Type<"int32">) | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        authors_url: string & tags.Format<"uri">;
        repository_url: string & tags.Format<"uri">;
        svn_root?: string;
    };
}
type IAutoViewTransformerInputType = Schema._import;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map import status to a Chip color
  const statusColor = (() => {
    switch (input.status) {
      case "error":
      case "auth_failed":
        return "error";
      case "complete":
        return "success";
      case "importing":
      case "pushing":
      case "mapping":
        return "warning";
      case "detecting":
      case "choose":
      case "waiting_to_push":
      case "setup":
      case "detection_needs_auth":
      case "detection_found_multiple":
      case "detection_found_nothing":
        return "info";
      case "none":
      case "unknown":
        return "gray";
      default:
        return "primary";
    }
  })();

  // Helper to create a Text component for simple labels
  const createText = (text: string): IAutoView.IAutoViewTextProps => ({
    type: "Text",
    content: text,
  });

  // Helper to create a small outlined Chip
  const createChip = (
    label: string,
    color: IAutoView.IAutoViewChipProps["color"] = "primary"
  ): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label,
    color,
    size: "small",
    variant: "outlined",
  });

  // Build rows for the DataList
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // VCS type
  listItems.push({
    type: "DataListItem",
    label: [createText("VCS")],
    value: createChip(input.vcs ?? "unknown", input.vcs ? "primary" : "gray"),
  });

  // LFS usage
  if (typeof input.use_lfs === "boolean") {
    listItems.push({
      type: "DataListItem",
      label: [createText("Large File Storage")],
      value: createChip(
        input.use_lfs ? "Enabled" : "Disabled",
        input.use_lfs ? "success" : "error"
      ),
    });
  }

  // TFVC Project (optional)
  if (input.tfvc_project) {
    listItems.push({
      type: "DataListItem",
      label: [createText("TFVC Project")],
      value: createText(input.tfvc_project),
    });
  }

  // Source URL
  listItems.push({
    type: "DataListItem",
    label: [createText("Source URL")],
    value: {
      type: "Button",
      label: "View",
      variant: "text",
      size: "small",
      href: input.vcs_url,
    },
  });

  // Repository page
  listItems.push({
    type: "DataListItem",
    label: [createText("Repository URL")],
    value: {
      type: "Button",
      label: "Open",
      variant: "text",
      size: "small",
      href: input.html_url,
    },
  });

  // Progress percentages
  if (typeof input.import_percent === "number") {
    listItems.push({
      type: "DataListItem",
      label: [createText("Import Progress")],
      value: createText(`${input.import_percent}%`),
    });
  }
  if (typeof input.push_percent === "number") {
    listItems.push({
      type: "DataListItem",
      label: [createText("Push Progress")],
      value: createText(`${input.push_percent}%`),
    });
  }

  // Commit count
  if (typeof input.commit_count === "number") {
    listItems.push({
      type: "DataListItem",
      label: [createText("Commit Count")],
      value: createText(input.commit_count.toString()),
    });
  }

  // Large files details
  if (input.has_large_files) {
    listItems.push({
      type: "DataListItem",
      label: [createText("Large Files Count")],
      value: createText(
        (input.large_files_count ?? 0).toString()
      ),
    });
    listItems.push({
      type: "DataListItem",
      label: [createText("Large Files Size")],
      value: createText(`${input.large_files_size} bytes`),
    });
  }

  // Authors count
  if (typeof input.authors_count === "number") {
    listItems.push({
      type: "DataListItem",
      label: [createText("Authors")],
      value: createText(input.authors_count.toString()),
    });
  }

  // Status chip for the header
  const statusChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: input.status,
    color: statusColor,
    size: "small",
    variant: "filled",
  };

  // Compose a VerticalCard with header, content (DataList) and a footer button
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Import Status",
        description: input.status_text ?? "",
        startElement: {
          type: "Icon",
          id: "sync-alt",
          color: "blue",
          size: 20,
        },
        endElement: statusChip,
      },
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: listItems,
        },
      },
      {
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          label: "View Repository",
          variant: "contained",
          color: "primary",
          size: "medium",
          href: input.html_url,
        },
      },
    ],
  };
}
