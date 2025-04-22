import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        campaignUser: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); const _ro1 = (_recursive = false, _depth = 0) => ({
        campaignId: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        userId: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        msgId: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        userChatId: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        sent: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number"
            }); }
        ])(),
        view: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number"
            }); }
        ])(),
        goal: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number"
            }); }
        ])(),
        click: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number"
            }); }
        ])(),
        version: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        id: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        campaignMessageView: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])()
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=227.js.map