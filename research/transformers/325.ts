import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A GitHub Classroom classroom
     *
     * @title Simple Classroom
    */
    export type simple_classroom = {
        /**
         * Unique identifier of the classroom.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the classroom.
        */
        name: string;
        /**
         * Returns whether classroom is archived or not.
        */
        archived: boolean;
        /**
         * The url of the classroom on GitHub Classroom.
        */
        url: string;
    };
}
type IAutoViewTransformerInputType = Schema.simple_classroom[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there is no data, show a simple markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No classrooms available\n\nThere are currently no classrooms to display."
        };
    }

    // Map each classroom to a ListItem component
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((classroom) => {
        // Icon to represent GitHub
        const githubIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: "github",
            color: "gray",
            size: 24
        };

        // Chip to indicate archived or active status
        const statusChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: classroom.archived ? "Archived" : "Active",
            color: classroom.archived ? "gray" : "green",
            size: "small",
            variant: "filled"
        };

        // Button to navigate to the classroom URL
        const viewButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            label: "Open",
            startElement: {
                type: "Icon",
                id: "arrow-right",
                color: "blue",
                size: 16
            },
            href: classroom.url
        };

        return {
            type: "ListItem",
            // Classroom name as the title
            title: classroom.name,
            // Show the URL as a subtitle; on mobile this wraps gracefully
            description: classroom.url,
            // Leading GitHub icon for visual context
            startElement: githubIcon,
            // Trailing status chip and view button for actions
            endElement: [statusChip, viewButton],
            // Make the entire item clickable as well
            href: classroom.url
        };
    });

    // Return a responsive List component containing all items
    const list: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: listItems
    };

    return list;
}
