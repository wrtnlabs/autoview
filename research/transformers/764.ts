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
  // Map statuses to icons and colors for visual status indicator
  const statusIconMap: Record<string, string> = {
    complete: "check-circle",
    error: "times-circle",
    auth: "key",
    importing: "spinner",
    mapping: "cogs",
    pushing: "upload",
    detecting: "search",
  };
  const statusColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
    complete: "green",
    error: "red",
    auth_failed: "red",
    importing: "blue",
    mapping: "orange",
    pushing: "cyan",
    detecting: "gray",
  };
  const iconId = statusIconMap[input.status] || "info-circle";
  const iconColor = statusColorMap[input.status] || "gray";

  // Header: display repository URL as title, status as description, and an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.vcs_url,
    description: `Status: ${input.status.replace(/_/g, " ")}`,
    startElement: {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 24,
    },
  };

  // Build a list of key/value pairs to display in the content
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Helper to push a labelled data item
  const pushItem = (
    labelText: string,
    valueComp: IAutoView.IAutoViewPresentationComponentProps
  ): void => {
    items.push({
      type: "DataListItem",
      // Label styled as a subtitle
      label: [
        {
          type: "Text",
          content: labelText,
          variant: "subtitle2",
          color: "tertiary",
        },
      ],
      value: [valueComp],
    });
  };

  // Repository link (markdown for clickable link)
  pushItem(
    "Repository",
    {
      type: "Markdown",
      content: `[🔗 Open Repo](${input.html_url})`,
    }
  );

  // Version control system
  if (input.vcs !== null) {
    pushItem("VCS", {
      type: "Chip",
      label: input.vcs,
      variant: "outlined",
      color: "blue",
      size: "small",
    });
  }

  // Git LFS usage
  if (input.use_lfs !== undefined) {
    pushItem("Git LFS", {
      type: "Chip",
      label: input.use_lfs ? "Enabled" : "Disabled",
      variant: "outlined",
      color: input.use_lfs ? "green" : "gray",
      size: "small",
    });
  }

  // Commit count
  if (input.commit_count != null) {
    pushItem("Commits", {
      type: "Text",
      content: String(input.commit_count),
      variant: "body2",
    });
  }

  // Import progress percentage
  if (input.import_percent != null) {
    pushItem("Import Progress", {
      type: "Text",
      content: `${input.import_percent}%`,
      variant: "body2",
    });
  }

  // Push progress percentage
  if (input.push_percent != null) {
    pushItem("Push Progress", {
      type: "Text",
      content: `${input.push_percent}%`,
      variant: "body2",
    });
  }

  // Large files indicator
  if (input.has_large_files) {
    const size = input.large_files_size ?? 0;
    const count = input.large_files_count ?? 0;
    pushItem("Large Files", {
      type: "Chip",
      label: `Size: ${size} MB, Count: ${count}`,
      variant: "outlined",
      color: "warning",
      size: "small",
    });
  }

  // Error message, if any
  if (input.error_message) {
    pushItem("Error", {
      type: "Text",
      content: input.error_message,
      variant: "body2",
      color: "error",
    });
  }

  // Compose the data list component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Content section of the card
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Single child is the data list
    childrenProps: dataList,
  };

  // Footer with an action button to view more details
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Button",
        label: "View Details",
        href: input.html_url,
        variant: "outlined",
        size: "small",
      },
    ],
  };

  // Assemble the final vertical card
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
