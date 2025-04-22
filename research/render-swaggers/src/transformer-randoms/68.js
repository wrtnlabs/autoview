import * as __typia_transform__randomFormatUuid from "typia/lib/internal/_randomFormatUuid.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uuid) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUuid._randomFormatUuid)(),
        citizen: _ro1(_recursive, _recursive ? 1 + _depth : _depth),
        deposit: _ro2(_recursive, _recursive ? 1 + _depth : _depth),
        source_id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uuid) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUuid._randomFormatUuid)(),
        value: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _c !== void 0 ? _c : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        balance: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _d !== void 0 ? _d : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        created_at: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatDatetime._randomFormatDatetime)()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        created_at: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        mobile: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        })
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uuid) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUuid._randomFormatUuid)(),
        created_at: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        code: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        source: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        direction: __typia_transform__randomPick._randomPick([
            () => -1,
            () => 1
        ])()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=68.js.map