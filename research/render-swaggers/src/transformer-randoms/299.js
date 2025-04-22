import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        result: true,
        code: 1000,
        requestToResponse: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        data: _ro1(_recursive, _recursive ? 1 + _depth : _depth)
    }); const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f; return ({
        question: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        answer: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _b !== void 0 ? _b : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        adopted: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _c !== void 0 ? _c : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        writing: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _d !== void 0 ? _d : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        likes: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _e !== void 0 ? _e : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        id: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _f !== void 0 ? _f : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        })
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=299.js.map