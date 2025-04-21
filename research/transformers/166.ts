import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSection = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: Schema.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: Schema.IShoppingSection[];
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
    /**
     * Section information.
     *
     * `IShoppingSection` is a concept that refers to the spatial information of
     * the market.
     *
     * If we compare the section mentioned here to the offline market, it means a
     * spatially separated area within the store, such as the "fruit corner" or
     * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
     * not possible to classify multiple sections simultaneously, but only one section
     * can be classified.
     *
     * By the way, if your shopping mall system requires only one section, then just
     * use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingSection = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Representative name of the section.
         *
         * @title Representative name of the section
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingSection;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no sections in the input, show a friendly message via markdown
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No shopping sections available\n\nThere are no records to display.",
        };
    }

    // Build a List of sections with a sticky summary header
    const listChildren: IAutoView.IAutoViewListProps["childrenProps"] = [];

    // 1. Add a summary subheader showing pagination info
    listChildren.push({
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            // e.g. "Page 1 of 10 — 100 total sections"
            content: `Page ${input.pagination.current} of ${input.pagination.pages} — ${input.pagination.records} total sections`,
            variant: "subtitle2",
            color: "primary",
        },
    });

    // 2. Map each section to a ListItem
    for (const section of input.data) {
        // Format the creation timestamp to a friendly date
        let createdLabel: string;
        try {
            const dt = new Date(section.created_at);
            createdLabel = isNaN(dt.getTime())
                ? section.created_at
                : dt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
        } catch {
            createdLabel = section.created_at;
        }

        listChildren.push({
            type: "ListItem",
            title: section.name,
            description: section.code,
            // Use a store icon to visualize the section
            startElement: {
                type: "Icon",
                id: "store",
                color: "blue",
                size: 24,
            },
            // Show the creation date on the right
            endElement: {
                type: "Text",
                content: createdLabel,
                variant: "caption",
                color: "gray",
            },
        });
    }

    // Return the final List component
    return {
        type: "List",
        childrenProps: listChildren,
    };
}
