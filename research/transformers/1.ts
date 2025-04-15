import type * as IAutoView from "@autoview/interface";
/**
 * System Information.
*/
type ISystem = {
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
    commit: ISystem.ICommit;
    /**
     * `package.json`
    */
    "package": ISystem.IPackage;
    /**
     * Creation time of this server.
     *
     * @title Creation time of this server
    */
    created_at: string;
};
namespace ISystem {
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
        author: ISystem.ICommit.IUser;
        committer: ISystem.ICommit.IUser;
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
        scripts: Recordstringstring;
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
        devDependencies?: Recordstringstring;
        dependencies: Recordstringstring;
        publishConfig?: {
            registry: string;
        };
        files?: string[];
    };
}
/**
 * Construct a type with a set of properties K of type T
*/
type Recordstringstring = {
    [key: string]: string;
};
type IAutoViewTransformerInputType = ISystem;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Aggregate commit and package data to be displayed as markdown content.
  // Using markdown to present data in a visually engaging manner.
  const markdownContent = `## Commit Information
- **Branch**: ${input.commit.branch}
- **Commit Hash**: ${input.commit.shortHash}
- **Subject**: ${input.commit.subject}
- **Author**: ${input.commit.author.name} (<${input.commit.author.email}>)
- **Committed At**: ${input.commit.committed_at}

## Package Information
- **Name**: ${input.package.name}
- **Version**: ${input.package.version}
- **Description**: ${input.package.description}

## Runtime Information
- **UID**: ${input.uid}
- **Created At**: ${input.created_at}

## Process Arguments
${input.arguments.length > 0 ? input.arguments.map(arg => `- ${arg}`).join("\n") : "- No arguments provided."}
`;

  // Compose the UI using a Vertical Card component from AutoView.
  // The vertical card aggregates a header (with icons), content (markdown), and a footer (button linking to repository).
  return {
    type: "VerticalCard",
    childrenProps: [
      // Card Header: Provides a quick summary with icons.
      {
        type: "CardHeader",
        title: "System Information",
        description: `Server UID: ${input.uid} • Created: ${input.created_at}`,
        // Using an icon to visually indicate system info.
        startElement: {
          id: "info",         // icon id in kebab-case (example: "info")
          size: 24,           // icon size
          color: "blue",      // a representative blue color
          type: "Icon"
        },
        // Optionally, an end icon can be used to indicate time or status.
        endElement: {
          id: "clock",
          size: 24,
          color: "gray",
          type: "Icon"
        }
      },
      // Card Content: Using a Markdown component for rich text display.
      {
        type: "CardContent",
        // Markdown content is preferred to encode structured information.
        childrenProps: {
          type: "Markdown",
          content: markdownContent
        }
      },
      // Card Footer: Provides a call to action, for example, a button linking to the repository.
      {
        type: "CardFooter",
        childrenProps: {
          type: "Button",
          label: "View Repository",
          href: input.package.repository.url
        }
      }
    ]
  };
}
