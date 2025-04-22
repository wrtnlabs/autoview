import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        state: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "configured",
            () => "not-configured"
        ])(),
        languages: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => __typia_transform__randomPick._randomPick([
                    () => "python",
                    () => "swift",
                    () => "actions",
                    () => "csharp",
                    () => "go",
                    () => "javascript",
                    () => "ruby",
                    () => "c-cpp",
                    () => "java-kotlin",
                    () => "javascript-typescript",
                    () => "typescript"
                ])()
            }); }
        ])(),
        runner_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => "standard",
            () => "labeled"
        ])(),
        runner_label: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        query_suite: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => "default",
            () => "extended"
        ])(),
        updated_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        schedule: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => "weekly"
        ])()
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=681.js.map