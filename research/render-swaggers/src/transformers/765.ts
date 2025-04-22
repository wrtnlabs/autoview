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
    // Map import status to a display color
    const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        auth: "info",
        none: "gray",
        detecting: "secondary",
        choose: "secondary",
        auth_failed: "error",
        importing: "primary",
        mapping: "warning",
        waiting_to_push: "warning",
        pushing: "warning",
        complete: "success",
        setup: "info",
        error: "error",
        unknown: "gray",
        detection_found_multiple: "warning",
        detection_found_nothing: "warning",
        detection_needs_auth: "error",
    };
    const statusColor = statusColorMap[input.status] ?? "gray";

    // Build the card header with repository URL and status chip
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.vcs_url,
        description: input.status_text ?? input.status,
        startElement: {
            type: "Icon",
            id: "code-branch",       // FontAwesome branch icon
            color: "blue",
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: input.status,
            color: statusColor,
            variant: "filled",
            size: "small",
        },
    };

    // Helper to push one DataListItem
    const listItems: IAutoView.IAutoViewDataListItemProps[] = [];
    function addListItem(label: string, valueComponent: IAutoView.IAutoViewPresentationComponentProps) {
        listItems.push({
            type: "DataListItem",
            label: { type: "Text", content: label },
            value: valueComponent,
        });
    }

    // Primitive fields
    addListItem("VCS", { type: "Text", content: input.vcs ?? "N/A" });
    addListItem("Use LFS", {
        type: "Chip",
        label: input.use_lfs ? "Yes" : "No",
        color: input.use_lfs ? "success" : "gray",
    });
    addListItem("Commits", {
        type: "Text",
        content: input.commit_count?.toString() ?? "N/A",
    });
    addListItem("Import %", {
        type: "Text",
        content: input.import_percent?.toString() ?? "N/A",
    });
    addListItem("Push %", {
        type: "Text",
        content: input.push_percent?.toString() ?? "N/A",
    });
    addListItem("Has Large Files", {
        type: "Chip",
        label: input.has_large_files ? "Yes" : "No",
        color: input.has_large_files ? "warning" : "gray",
    });
    if (typeof input.large_files_count === "number") {
        addListItem("Large Files Count", {
            type: "Text",
            content: input.large_files_count.toString(),
        });
    }
    if (typeof input.large_files_size === "number") {
        addListItem("Large Files Size", {
            type: "Text",
            content: input.large_files_size.toString(),
        });
    }

    // List any project choices as Markdown bullet list
    if (Array.isArray(input.project_choices) && input.project_choices.length > 0) {
        const bullets = input.project_choices
            .map(choice => {
                const parts: string[] = [];
                if (choice.human_name) parts.push(choice.human_name);
                if (choice.vcs) parts.push(`[VCS: ${choice.vcs}]`);
                if (choice.tfvc_project) parts.push(`[TFVC: ${choice.tfvc_project}]`);
                return `- ${parts.join(" ")}`;
            })
            .join("\n");
        addListItem("Project Choices", {
            type: "Markdown",
            content: bullets,
        });
    }

    // Build the DataList component
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };

    // Footer with action buttons linking to URLs
    const footerButtons: IAutoView.IAutoViewButtonProps[] = [];
    if (input.html_url) {
        footerButtons.push({
            type: "Button",
            label: "View Pull Request",
            variant: "outlined",
            color: "primary",
            href: input.html_url,
        });
    }
    if (input.authors_url) {
        footerButtons.push({
            type: "Button",
            label: "View Authors",
            variant: "text",
            color: "secondary",
            href: input.authors_url,
        });
    }
    if (input.repository_url) {
        footerButtons.push({
            type: "Button",
            label: "Repository API",
            variant: "text",
            color: "gray",
            href: input.repository_url,
        });
    }
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };

    // Compose into a VerticalCard for a structured, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
