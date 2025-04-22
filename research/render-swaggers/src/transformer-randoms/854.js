import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(),
        html_url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUri._randomFormatUri)(),
        assets_url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _c !== void 0 ? _c : __typia_transform__randomFormatUri._randomFormatUri)(),
        upload_url: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        tarball_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        zipball_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        id: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _e !== void 0 ? _e : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _f !== void 0 ? _f : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        tag_name: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _g !== void 0 ? _g : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        target_commitish: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _h !== void 0 ? _h : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        body: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        draft: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _j !== void 0 ? _j : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        prerelease: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _k !== void 0 ? _k : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        created_at: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _l !== void 0 ? _l : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        published_at: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        author: _ro1(_recursive, _recursive ? 1 + _depth : _depth),
        assets: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _m !== void 0 ? _m : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        }),
        body_html: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        body_text: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        mentions_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        discussion_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        reactions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro4(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; return ({
        name: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        email: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        login: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _b !== void 0 ? _b : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        avatar_url: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _d !== void 0 ? _d : __typia_transform__randomFormatUri._randomFormatUri)(),
        gravatar_id: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        url: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatUri._randomFormatUri)(),
        html_url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUri._randomFormatUri)(),
        followers_url: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _g !== void 0 ? _g : __typia_transform__randomFormatUri._randomFormatUri)(),
        following_url: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _h !== void 0 ? _h : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        gists_url: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _j !== void 0 ? _j : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        starred_url: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _k !== void 0 ? _k : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        subscriptions_url: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _l !== void 0 ? _l : __typia_transform__randomFormatUri._randomFormatUri)(),
        organizations_url: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _m !== void 0 ? _m : __typia_transform__randomFormatUri._randomFormatUri)(),
        repos_url: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _o !== void 0 ? _o : __typia_transform__randomFormatUri._randomFormatUri)(),
        events_url: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _p !== void 0 ? _p : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        received_events_url: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _q !== void 0 ? _q : __typia_transform__randomFormatUri._randomFormatUri)(),
        type: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _r !== void 0 ? _r : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        site_admin: ((_s = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _s !== void 0 ? _s : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        starred_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        user_view_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(),
        browser_download_url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUri._randomFormatUri)(),
        id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _c !== void 0 ? _c : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _e !== void 0 ? _e : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        label: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        state: __typia_transform__randomPick._randomPick([
            () => "open",
            () => "uploaded"
        ])(),
        content_type: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _f !== void 0 ? _f : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        size: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _g !== void 0 ? _g : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        download_count: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _h !== void 0 ? _h : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        created_at: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _j !== void 0 ? _j : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        updated_at: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _k !== void 0 ? _k : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        uploader: __typia_transform__randomPick._randomPick([
            () => null,
            () => _ro3(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); }; const _ro3 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; return ({
        name: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        email: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        login: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _b !== void 0 ? _b : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        avatar_url: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _d !== void 0 ? _d : __typia_transform__randomFormatUri._randomFormatUri)(),
        gravatar_id: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        url: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _e !== void 0 ? _e : __typia_transform__randomFormatUri._randomFormatUri)(),
        html_url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUri._randomFormatUri)(),
        followers_url: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _g !== void 0 ? _g : __typia_transform__randomFormatUri._randomFormatUri)(),
        following_url: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _h !== void 0 ? _h : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        gists_url: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _j !== void 0 ? _j : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        starred_url: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _k !== void 0 ? _k : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        subscriptions_url: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _l !== void 0 ? _l : __typia_transform__randomFormatUri._randomFormatUri)(),
        organizations_url: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _m !== void 0 ? _m : __typia_transform__randomFormatUri._randomFormatUri)(),
        repos_url: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _o !== void 0 ? _o : __typia_transform__randomFormatUri._randomFormatUri)(),
        events_url: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _p !== void 0 ? _p : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        received_events_url: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _q !== void 0 ? _q : __typia_transform__randomFormatUri._randomFormatUri)(),
        type: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _r !== void 0 ? _r : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        site_admin: ((_s = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _s !== void 0 ? _s : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        starred_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        user_view_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); }; const _ro4 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(),
        total_count: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _b !== void 0 ? _b : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        "+1": ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _c !== void 0 ? _c : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        "-1": ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _d !== void 0 ? _d : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        laugh: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _e !== void 0 ? _e : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        confused: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _f !== void 0 ? _f : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        heart: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _g !== void 0 ? _g : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        hooray: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _h !== void 0 ? _h : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        eyes: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _j !== void 0 ? _j : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        rocket: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _k !== void 0 ? _k : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        })
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=854.js.map