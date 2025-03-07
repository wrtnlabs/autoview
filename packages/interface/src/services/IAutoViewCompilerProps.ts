import { IAutoViewCompilerMetadata } from "./IAutoViewCompilerMetadata";

export interface IAutoViewCompilerProps {
  metadata: IAutoViewCompilerMetadata;
  compilerOptions?: Partial<IAutoViewCompilerProps.ICompilerOptions>;
}
export namespace IAutoViewCompilerProps {
  export interface ICompilerOptions {
    module: "cjs" | "esm";
  }
}
