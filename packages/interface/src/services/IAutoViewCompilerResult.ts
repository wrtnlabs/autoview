export type IAutoViewCompilerResult =
  | IAutoViewCompilerResult.ISuccess
  | IAutoViewCompilerResult.IError
  | IAutoViewCompilerResult.IFailure;
export namespace IAutoViewCompilerResult {
  export interface ISuccess {
    type: "success";
    typescript: string;
    javascript: string;
  }
  export interface IError {
    type: "error";
    error: unknown;
  }
  export interface IFailure {
    type: "failure";
    diagnostics: IDiagnostic[];
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
