import OpenAI from "openai";
import { IValidation } from "typia";

import { IAutoViewComponentProps } from "./properties/IAutoViewComponentProps";

export type IAutoViewValueResult =
  | IAutoViewValueResult.ISuccess
  | IAutoViewValueResult.IInvalid
  | IAutoViewValueResult.INothing
  | IAutoViewValueResult.IError;
export namespace IAutoViewValueResult {
  export interface ISuccess {
    type: "success";
    props: IAutoViewComponentProps;
    completion: OpenAI.ChatCompletion;
  }
  export interface IInvalid {
    type: "invalid";
    id: string;
    validation: IValidation.IFailure;
    completion: OpenAI.ChatCompletion;
  }
  export interface INothing {
    type: "nothing";
    completion: OpenAI.ChatCompletion;
  }
  export interface IError {
    type: "error";
    error: Error;
  }
}
