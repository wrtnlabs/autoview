import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        total_count: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        incomplete_results: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _b !== void 0 ? _b : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        items: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _c !== void 0 ? _c : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
        })
    }); }; const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        full_name: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        owner: __typia_transform__randomPick._randomPick([
            () => null,
            () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        "private": ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _e !== void 0 ? _e : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        html_url: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _f !== void 0 ? _f : __typia_transform__randomFormatUri._randomFormatUri)(),
        description: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        fork: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _g !== void 0 ? _g : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        url: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _h !== void 0 ? _h : __typia_transform__randomFormatUri._randomFormatUri)(),
        created_at: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _j !== void 0 ? _j : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        updated_at: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _k !== void 0 ? _k : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        pushed_at: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _l !== void 0 ? _l : __typia_transform__randomFormatDatetime._randomFormatDatetime)(),
        homepage: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        size: ((_m = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _m !== void 0 ? _m : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        stargazers_count: ((_o = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _o !== void 0 ? _o : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        watchers_count: ((_p = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _p !== void 0 ? _p : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        language: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        forks_count: ((_q = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _q !== void 0 ? _q : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        open_issues_count: ((_r = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _r !== void 0 ? _r : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        master_branch: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        default_branch: ((_s = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _s !== void 0 ? _s : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        score: ((_t = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _t !== void 0 ? _t : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        forks_url: ((_u = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _u !== void 0 ? _u : __typia_transform__randomFormatUri._randomFormatUri)(),
        keys_url: ((_v = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _v !== void 0 ? _v : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        collaborators_url: ((_w = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _w !== void 0 ? _w : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        teams_url: ((_x = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _x !== void 0 ? _x : __typia_transform__randomFormatUri._randomFormatUri)(),
        hooks_url: ((_y = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _y !== void 0 ? _y : __typia_transform__randomFormatUri._randomFormatUri)(),
        issue_events_url: ((_z = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _z !== void 0 ? _z : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        events_url: ((_0 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _0 !== void 0 ? _0 : __typia_transform__randomFormatUri._randomFormatUri)(),
        assignees_url: ((_1 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _1 !== void 0 ? _1 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        branches_url: ((_2 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _2 !== void 0 ? _2 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        tags_url: ((_3 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _3 !== void 0 ? _3 : __typia_transform__randomFormatUri._randomFormatUri)(),
        blobs_url: ((_4 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _4 !== void 0 ? _4 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        git_tags_url: ((_5 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _5 !== void 0 ? _5 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        git_refs_url: ((_6 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _6 !== void 0 ? _6 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        trees_url: ((_7 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _7 !== void 0 ? _7 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        statuses_url: ((_8 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _8 !== void 0 ? _8 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        languages_url: ((_9 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _9 !== void 0 ? _9 : __typia_transform__randomFormatUri._randomFormatUri)(),
        stargazers_url: ((_10 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _10 !== void 0 ? _10 : __typia_transform__randomFormatUri._randomFormatUri)(),
        contributors_url: ((_11 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _11 !== void 0 ? _11 : __typia_transform__randomFormatUri._randomFormatUri)(),
        subscribers_url: ((_12 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _12 !== void 0 ? _12 : __typia_transform__randomFormatUri._randomFormatUri)(),
        subscription_url: ((_13 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _13 !== void 0 ? _13 : __typia_transform__randomFormatUri._randomFormatUri)(),
        commits_url: ((_14 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _14 !== void 0 ? _14 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        git_commits_url: ((_15 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _15 !== void 0 ? _15 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        comments_url: ((_16 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _16 !== void 0 ? _16 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        issue_comment_url: ((_17 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _17 !== void 0 ? _17 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        contents_url: ((_18 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _18 !== void 0 ? _18 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        compare_url: ((_19 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _19 !== void 0 ? _19 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        merges_url: ((_20 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _20 !== void 0 ? _20 : __typia_transform__randomFormatUri._randomFormatUri)(),
        archive_url: ((_21 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _21 !== void 0 ? _21 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        downloads_url: ((_22 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _22 !== void 0 ? _22 : __typia_transform__randomFormatUri._randomFormatUri)(),
        issues_url: ((_23 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _23 !== void 0 ? _23 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        pulls_url: ((_24 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _24 !== void 0 ? _24 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        milestones_url: ((_25 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _25 !== void 0 ? _25 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        notifications_url: ((_26 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _26 !== void 0 ? _26 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        labels_url: ((_27 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _27 !== void 0 ? _27 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        releases_url: ((_28 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _28 !== void 0 ? _28 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        deployments_url: ((_29 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _29 !== void 0 ? _29 : __typia_transform__randomFormatUri._randomFormatUri)(),
        git_url: ((_30 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _30 !== void 0 ? _30 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        ssh_url: ((_31 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _31 !== void 0 ? _31 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        clone_url: ((_32 = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _32 !== void 0 ? _32 : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        svn_url: ((_33 = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _33 !== void 0 ? _33 : __typia_transform__randomFormatUri._randomFormatUri)(),
        forks: ((_34 = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _34 !== void 0 ? _34 : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        open_issues: ((_35 = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _35 !== void 0 ? _35 : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        watchers: ((_36 = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _36 !== void 0 ? _36 : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        topics: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                    type: "string"
                }); }
            }); }
        ])(),
        mirror_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        has_issues: ((_37 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _37 !== void 0 ? _37 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        has_projects: ((_38 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _38 !== void 0 ? _38 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        has_pages: ((_39 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _39 !== void 0 ? _39 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        has_wiki: ((_40 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _40 !== void 0 ? _40 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        has_downloads: ((_41 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _41 !== void 0 ? _41 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        has_discussions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        archived: ((_42 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _42 !== void 0 ? _42 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        disabled: ((_43 = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _43 !== void 0 ? _43 : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        visibility: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        license: __typia_transform__randomPick._randomPick([
            () => null,
            () => _ro3(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        permissions: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro4(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        text_matches: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => _ro5(_recursive, _recursive ? 1 + _depth : _depth)
            }); }
        ])(),
        temp_clone_token: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        allow_merge_commit: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        allow_squash_merge: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        allow_rebase_merge: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        allow_auto_merge: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        delete_branch_on_merge: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        allow_forking: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        is_template: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        web_commit_signoff_required: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])()
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s; return ({
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
    }); }; const _ro3 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        key: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        spdx_id: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        node_id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        html_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])()
    }); }; const _ro4 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        admin: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        maintain: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        push: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _b !== void 0 ? _b : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        triage: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        pull: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _c !== void 0 ? _c : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        })
    }); }; const _ro5 = (_recursive = false, _depth = 0) => ({
        object_url: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        object_type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        property: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        fragment: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        matches: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => _ro6(_recursive, _recursive ? 1 + _depth : _depth)
            }); }
        ])()
    }); const _ro6 = (_recursive = false, _depth = 0) => ({
        text: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        indices: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                    type: "integer"
                }); }
            }); }
        ])()
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=903.js.map