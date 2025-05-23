import ts from "typescript";
import { LiteralFactory } from "typia/lib/factories/LiteralFactory";

import { FilePrinter } from "../utils/FilePrinter";
import { MapUtil } from "../utils/MapUtil";

export class AutoViewImportProgrammer {
  private external_: Map<string, IClause> = new Map();
  private dtos_: Set<string> = new Set();

  public constructor() {}

  public empty(): boolean {
    return this.external_.size === 0 && this.dtos_.size === 0;
  }

  public external(props: AutoViewImportProgrammer.IProps): string {
    const clause: IClause = MapUtil.take(this.external_)(props.library)(() => ({
      default: null,
      isStarImport: props.type === "star-import",
      instances: new Set(),
    }));
    const name: string = props.name.split(".")[0]!;
    if (props.type === "default" || props.type === "star-import")
      clause.default = props.name;
    else clause.instances.add(name);
    return name;
  }

  /**
   * @deprecated
   */
  public dto(name: string, namespace?: string): ts.TypeReferenceNode {
    const file: string = name.split(".")[0]!;
    this.dtos_.add(file);
    return ts.factory.createTypeReferenceNode(
      namespace?.length
        ? ts.factory.createQualifiedName(
            ts.factory.createIdentifier(namespace),
            ts.factory.createIdentifier(file),
          )
        : name,
    );
  }

  public tag(type: string, arg?: any): ts.TypeReferenceNode {
    const instance: string = this.external({
      type: "instance",
      library: "typia",
      name: "tags",
    });
    return ts.factory.createTypeReferenceNode(
      `${instance}.${type}`,
      arg === undefined ? [] : [LiteralFactory.write(arg) as any],
    );
  }

  public toStatements(
    dtoPath: (name: string) => string,
    current?: string,
  ): ts.Statement[] {
    return [
      ...[...this.external_.entries()].map(([library, props]) =>
        ts.factory.createImportDeclaration(
          undefined,
          ts.factory.createImportClause(
            false,
            props.default !== null && !props.isStarImport
              ? ts.factory.createIdentifier(props.default)
              : undefined,
            props.isStarImport && props.default !== null
              ? ts.factory.createNamespaceImport(
                  ts.factory.createIdentifier(props.default),
                )
              : props.instances.size
                ? ts.factory.createNamedImports(
                    [...props.instances].map((i) =>
                      ts.factory.createImportSpecifier(
                        false,
                        undefined,
                        ts.factory.createIdentifier(i),
                      ),
                    ),
                  )
                : undefined,
          ),
          ts.factory.createStringLiteral(library),
        ),
      ),
      ...(this.external_.size && this.dtos_.size
        ? [FilePrinter.newLine()]
        : []),
      ...[...this.dtos_]
        .filter(
          current ? (name) => name !== current!.split(".")[0] : () => true,
        )
        .map((i) =>
          ts.factory.createImportDeclaration(
            undefined,
            ts.factory.createImportClause(
              false,
              undefined,
              ts.factory.createNamedImports([
                ts.factory.createImportSpecifier(
                  false,
                  undefined,
                  ts.factory.createIdentifier(i),
                ),
              ]),
            ),
            ts.factory.createStringLiteral(dtoPath(i)),
          ),
        ),
    ];
  }
}
export namespace AutoViewImportProgrammer {
  export interface IProps {
    type: "default" | "instance" | "star-import";
    library: string;
    name: string;
  }
}
interface IClause {
  default: string | null;
  isStarImport: boolean;
  instances: Set<string>;
}
