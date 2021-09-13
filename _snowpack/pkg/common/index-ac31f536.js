import { f as findWrapping, l as liftTarget } from './index.es-e29f92e3.js';

var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var insertNodeOfType = function (nodeType) { return function (state, dispatch) {
    var node = nodeType.create();
    if (dispatch) {
        dispatch(state.tr.replaceSelectionWith(node).scrollIntoView());
    }
    return true;
}; };
var isMarkActive = function (markType) { return function (state) {
    var _a = state.selection, from = _a.from, $from = _a.$from, to = _a.to, empty = _a.empty;
    if (empty) {
        return Boolean(markType.isInSet(state.storedMarks || $from.marks()));
    }
    return state.doc.rangeHasMark(from, to, markType);
}; };
var isNodeSelection = function (selection) {
    return 'node' in selection;
};
var isBlockActive = function (type, attrs) {
    if (attrs === void 0) { attrs = {}; }
    return function (state) {
        if (isNodeSelection(state.selection)) {
            return state.selection.node.hasMarkup(type, attrs);
        }
        var _a = state.selection, $from = _a.$from, to = _a.to;
        return to <= $from.end() && $from.parent.hasMarkup(type, attrs);
    };
};
// export const removeFormatting: Command = (state, dispatch) => {
//   const { from, to } = state.selection
//
//   const tr = state.tr
//
//   tr.removeMark(from, to, undefined).setStoredMarks()
//
//   if (!tr.docChanged) {
//     return false
//   }
//
//   if (dispatch) {
//     dispatch(tr)
//   }
//
//   return true
// }
// export const canInsert = (type: NodeType) => (state: EditorState): boolean => {
//   const { $from } = state.selection
//
//   for (let d = $from.depth; d >= 0; d--) {
//     const index = $from.index(d)
//
//     if ($from.node(d).canReplaceWith(index, index, type)) {
//       return true
//     }
//   }
//
//   return false
// }
var parentWithNodeType = function ($pos, nodeType) {
    for (var depth = $pos.depth; depth >= 0; depth--) {
        var parent_1 = $pos.node(depth);
        if (parent_1.type === nodeType) {
            return parent_1;
        }
    }
};
var parentWithNodeTypePos = function ($pos, nodeType) {
    for (var depth = $pos.depth; depth >= 0; depth--) {
        var parent_2 = $pos.node(depth);
        if (parent_2.type === nodeType) {
            return $pos.before(depth);
        }
    }
};
var parentInGroupPos = function ($pos, nodeTypeGroup) {
    for (var depth = $pos.depth; depth >= 0; depth--) {
        var parent_3 = $pos.node(depth);
        var group = parent_3.type.spec.group;
        if (group && group.split(/\s+/).includes(nodeTypeGroup)) {
            return $pos.before(depth);
        }
    }
};
//
// export const changeBlockType = <S extends Schema>(
//   nodeType: NodeType<S>,
//   attrs?: Record<string, unknown>,
//   marks?: Array<Mark<S>>
// ) => (state: EditorState<S>, dispatch?: DispatchTransaction): boolean => {
//   const { $from } = state.selection
//
//   const parentPos = parentBlockPos($from)
//
//   if (!parentPos) {
//     return false
//   }
//
//   if (dispatch) {
//     dispatch(state.tr.setNodeMarkup(parentPos, nodeType, attrs, marks))
//   }
//
//   return true
// }
//
// export const canWrap = <S extends Schema>(
//   nodeType: NodeType<S>,
//   attrs?: Record<string, unknown>
// ) => (state: EditorState<S>): boolean => {
//   const { $from, $to } = state.selection
//
//   const range = $from.blockRange($to)
//
//   if (!range) {
//     return false
//   }
//
//   if (parentWithNodeType(range.$from, nodeType)) {
//     return false // already wrapped
//   }
//
//   return findWrapping(range, nodeType, attrs) !== null
// }
var isWrapped = function (nodeType) { return function (state) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var range = $from.blockRange($to);
    if (!range) {
        return false;
    }
    return parentWithNodeType(range.$from, nodeType) !== undefined;
}; };
var toggleWrap = function (nodeType, attrs) { return function (state, dispatch) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var range = $from.blockRange($to);
    if (!range) {
        return false;
    }
    var parentPos = parentWithNodeTypePos(range.$from, nodeType);
    if (typeof parentPos === 'number') {
        // unwrap
        var target = liftTarget(range);
        if (typeof target !== 'number') {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.lift(range, target).scrollIntoView());
        }
        return true;
    }
    else {
        // wrap
        var wrapping = findWrapping(range, nodeType, attrs);
        if (!wrapping) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
        }
        return true;
    }
}; };
var setListTypeOrWrapInList = function (listType, attrs) { return function (state, dispatch) {
    var _a = state.selection, $from = _a.$from, $to = _a.$to;
    var range = $from.blockRange($to);
    if (!range) {
        return false;
    }
    var parentPos = parentInGroupPos(range.$from, 'list');
    if (typeof parentPos === 'number') {
        // already in list
        var $pos = state.doc.resolve(parentPos);
        var node = $pos.nodeAfter;
        if (node && node.type === listType && node.attrs.type === attrs.type) {
            // return false if the list type already matches
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.setNodeMarkup(parentPos, listType, node ? __assign(__assign({}, node.attrs), attrs) : attrs));
        }
        return true;
    }
    else {
        var wrapping = findWrapping(range, listType, attrs);
        if (!wrapping) {
            return false;
        }
        if (dispatch) {
            dispatch(state.tr.wrap(range, wrapping).scrollIntoView());
        }
        return true;
    }
}; };
var promptForURL = function () {
    var url = window && window.prompt('Enter the URL', 'https://');
    if (url && !/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url;
};

export { isBlockActive as a, insertNodeOfType as b, isWrapped as c, isMarkActive as i, promptForURL as p, setListTypeOrWrapInList as s, toggleWrap as t };
