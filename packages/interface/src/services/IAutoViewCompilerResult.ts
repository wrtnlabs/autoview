export type IAutoViewCompilerResult =
  | IAutoViewCompilerResult.ISuccess
  | IAutoViewCompilerResult.IFailure
  | IAutoViewCompilerResult.IException;
export namespace IAutoViewCompilerResult {
  export interface ISuccess {
    type: "success";
    javascript: Record<string, string>;
  }
  export interface IFailure {
    type: "failure";
    diagnostics: IDiagnostic[];
    javascript: Record<string, string>;
  }
  export interface IException {
    type: "exception";
    error: unknown;
  }

  export interface IDiagnostic {
    category: DiagnosticCategory;
    code: number | string;
    start: number | undefined;
    length: number | undefined;
    messageText: string;
  }

  export type DiagnosticCategory =
    | "warning"
    | "error"
    | "suggestion"
    | "message";
}
