import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * System Information.
    */
    export type ISystem = {
        /**
         * Random Unique ID.
         *
         * @title Random Unique ID
        */
        uid: number;
        /**
         * `process.argv`
        */
        arguments: string[];
        /**
         * Git commit info.
         *
         * @title Git commit info
        */
        commit: Schema.ISystem.ICommit;
        /**
         * `package.json`
        */
        "package": Schema.ISystem.IPackage;
        /**
         * Creation time of this server.
         *
         * @title Creation time of this server
        */
        created_at: string;
    };
    export namespace ISystem {
        /**
         * Git commit info.
        */
        export type ICommit = {
            shortHash: string;
            branch: string;
            hash: string;
            subject: string;
            sanitizedSubject: string;
            body: string;
            author: Schema.ISystem.ICommit.IUser;
            committer: Schema.ISystem.ICommit.IUser;
            authored_at: string;
            committed_at: string;
            notes?: string;
            tags: string[];
        };
        export namespace ICommit {
            /**
             * Git user account info.
            */
            export type IUser = {
                name: string;
                email: string;
            };
        }
        /**
         * NPM package info.
        */
        export type IPackage = {
            name: string;
            version: string;
            description: string;
            main?: string;
            typings?: string;
            scripts: Schema.Recordstringstring;
            repository: {
                type: "git";
                url: string;
            };
            author: string;
            license: string;
            bugs: {
                url: string;
            };
            homepage: string;
            devDependencies?: Schema.Recordstringstring;
            dependencies: Schema.Recordstringstring;
            publishConfig?: {
                registry: string;
            };
            files?: string[];
        };
    }
    /**
     * Construct a type with a set of properties K of type T
    */
    export type Recordstringstring = {
        [key: string]: string;
    };
}
type IAutoViewTransformerInputType = Schema.ISystem;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure the system info input for easy access
  const { uid, arguments: argsArray, commit, package: pkg, created_at } = input;

  // Convert arguments array to a human-readable string
  const argsString = argsArray.length ? argsArray.join(' ') : '(none)';

  // Prepare DataList items to display key pieces of system information
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "UID",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: uid.toString(),
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Created At",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: created_at,
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Arguments",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: argsString,
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Commit",
        variant: "body2",
      },
      value: [
        // Commit subject with markdown styling to highlight the message
        {
          type: "Markdown",
          content: `**${commit.subject}**`,
        },
        // Short hash in a code-like Chip
        {
          type: "Chip",
          label: commit.shortHash,
          size: "small",
          variant: "outlined",
          color: "secondary",
        },
      ],
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Author",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: `${commit.author.name} <${commit.author.email}>`,
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Committed At",
        variant: "body2",
      },
      value: {
        type: "Text",
        content: commit.committed_at,
        variant: "body2",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Package",
        variant: "body2",
      },
      value: [
        // Package name
        {
          type: "Text",
          content: pkg.name,
          variant: "body2",
        },
        // Version as a visual chip
        {
          type: "Chip",
          label: pkg.version,
          size: "small",
          variant: "outlined",
          color: "primary",
        },
      ],
    },
  ];

  // Compose the main card structure: a vertical card with a header and content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "System Information",
        description: `UID: ${uid}`,
        // Use an illustrative icon for system/server
        startElement: {
          type: "Icon",
          id: "server",
          size: 28,
          color: "blue",
        },
      },
      {
        type: "CardContent",
        // Embed our data list to display the detailed info
        childrenProps: {
          type: "DataList",
          childrenProps: listItems,
        },
      },
    ],
  };
}
