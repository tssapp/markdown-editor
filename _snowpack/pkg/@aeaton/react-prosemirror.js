import { r as react, c as createCommonjsModule, g as getDefaultExportFromNamespaceIfNotNamed } from '../common/index-1850a8b2.js';
import { E as EditorState } from '../common/index.es-c9267851.js';
import { E as EditorView } from '../common/index.es-ec5d7262.js';
import { D as DOMParser, a as DOMSerializer, S as Schema, M as Mark } from '../common/index.es-e29f92e3.js';

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
var EditorStateContext = react.createContext(null);
var EditorViewContext = react.createContext(null);
var useEditorState = function () {
    var context = react.useContext(EditorStateContext);
    if (!context) {
        throw new Error("useEditorState is only available inside EditorProvider");
    }
    return context;
};
var useEditorView = function () {
    var context = react.useContext(EditorViewContext);
    if (!context) {
        throw new Error("useEditorView is only available inside EditorProvider");
    }
    return context;
};
var EditorProvider = function (_a) {
    var doc = _a.doc, schema = _a.schema, _b = _a.plugins, plugins = _b === void 0 ? [] : _b, editorProps = _a.editorProps, 
    // handleDocChange,
    children = _a.children;
    var _c = react.useState(function () {
        return EditorState.create({ doc: doc, schema: schema, plugins: plugins });
    }), state = _c[0], setState = _c[1];
    var view = react.useState(function () {
        return new EditorView(undefined, __assign(__assign({}, editorProps), { state: state, dispatchTransaction: function (tr) {
                // const doc = this.state.doc
                var state = this.state.apply(tr);
                view.updateState(state);
                setState(state);
                // if (handleDocChange && state.doc !== doc) {
                //   handleDocChange(state.doc)
                // }
            } }));
    })[0];
    // useEffect(() => {
    //   return () => view.destroy()
    // })
    return (react.createElement(EditorStateContext.Provider, { value: state },
        react.createElement(EditorViewContext.Provider, { value: view }, children)));
};

var useDebounce = function (value, delay) {
    if (delay === void 0) { delay = 100; }
    var _a = react.useState(value), state = _a[0], setState = _a[1];
    var timer = react.useRef(null);
    react.useEffect(function () {
        if (timer.current) {
            window.clearInterval(timer.current);
        }
        timer.current = window.setTimeout(function () {
            setState(value);
        }, delay);
    }, [delay, timer, value]);
    return state;
};

var ChangeHandler = function (_a) {
    var handleChange = _a.handleChange, transformer = _a.transformer, _b = _a.debounce, debounce = _b === void 0 ? 0 : _b;
    var state = useEditorState();
    var debouncedDoc = useDebounce(state.doc, debounce);
    react.useEffect(function () {
        handleChange(transformer.serialize(debouncedDoc));
    }, [handleChange, transformer, debouncedDoc]);
    return null;
};

/** SNOWPACK INJECT STYLE: prosemirror-view/style/prosemirror.css */
function __snowpack__injectStyle(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle(".ProseMirror {\n  position: relative;\n}\n\n.ProseMirror {\n  word-wrap: break-word;\n  white-space: pre-wrap;\n  white-space: break-spaces;\n  -webkit-font-variant-ligatures: none;\n  font-variant-ligatures: none;\n  font-feature-settings: \"liga\" 0; /* the above doesn't seem to work in Edge */\n}\n\n.ProseMirror pre {\n  white-space: pre-wrap;\n}\n\n.ProseMirror li {\n  position: relative;\n}\n\n.ProseMirror-hideselection *::selection { background: transparent; }\n.ProseMirror-hideselection *::-moz-selection { background: transparent; }\n.ProseMirror-hideselection { caret-color: transparent; }\n\n.ProseMirror-selectednode {\n  outline: 2px solid #8cf;\n}\n\n/* Make sure li selections wrap around markers */\n\nli.ProseMirror-selectednode {\n  outline: none;\n}\n\nli.ProseMirror-selectednode:after {\n  content: \"\";\n  position: absolute;\n  left: -32px;\n  right: -2px; top: -2px; bottom: -2px;\n  border: 2px solid #8cf;\n  pointer-events: none;\n}\n\n/* Protect against generic img rules */\n\nimg.ProseMirror-separator {\n  display: inline !important;\n  border: none !important;\n  margin: 0 !important;\n}\n");

/** SNOWPACK INJECT STYLE: @aeaton/react-prosemirror/style/prosemirror.css */
function __snowpack__injectStyle$1(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle$1(".ProseMirror {\n    font-family: sans-serif;\n}\n\n.ProseMirror:focus-within {\n    outline: none;\n}\n");

var Editor = react.memo(function (_a) {
    var _b = _a.autoFocus, autoFocus = _b === void 0 ? false : _b;
    var view = useEditorView();
    var editorRef = react.useCallback(function (element) {
        if (element) {
            element.appendChild(view.dom);
        }
    }, [view]);
    react.useEffect(function () {
        if (autoFocus) {
            view.focus();
        }
    }, [autoFocus, view]);
    return react.createElement("div", { ref: editorRef, className: "prosemirror-editor" });
});
Editor.displayName = 'Editor';

/** SNOWPACK INJECT STYLE: @aeaton/react-prosemirror/style/floater.css */
function __snowpack__injectStyle$2(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle$2(".prosemirror-container {\n  position: relative;\n}\n\n.prosemirror-floater {\n  position: fixed;\n  z-index: 10;\n  display: flex;\n  flex-wrap: nowrap;\n  background: white;\n  opacity: 0.8;\n}\n\n.prosemirror-floater .prosemirror-toolbar {\n  padding: 0;\n}\n\n.prosemirror-floater .prosemirror-toolbar-item {\n  padding: 4px 8px;\n}\n");

var createHTMLTransformer = function (schema) {
    var parser = DOMParser.fromSchema(schema);
    var serializer = DOMSerializer.fromSchema(schema);
    return {
        parse: function (html) {
            var _a;
            var template = document.createElement('template');
            template.innerHTML = html.trim();
            if (!((_a = template.content) === null || _a === void 0 ? void 0 : _a.firstChild)) {
                throw new Error('Error parsing HTML input');
            }
            return parser.parse(template.content);
        },
        serialize: function (doc) {
            var template = document.createElement('template');
            template.content.appendChild(serializer.serializeFragment(doc.content));
            return template.innerHTML;
        },
    };
};

const Aacute = "Á";
const aacute = "á";
const Abreve = "Ă";
const abreve = "ă";
const ac = "∾";
const acd = "∿";
const acE = "∾̳";
const Acirc = "Â";
const acirc = "â";
const acute = "´";
const Acy = "А";
const acy = "а";
const AElig = "Æ";
const aelig = "æ";
const af = "⁡";
const Afr = "𝔄";
const afr = "𝔞";
const Agrave = "À";
const agrave = "à";
const alefsym = "ℵ";
const aleph = "ℵ";
const Alpha = "Α";
const alpha = "α";
const Amacr = "Ā";
const amacr = "ā";
const amalg = "⨿";
const amp = "&";
const AMP = "&";
const andand = "⩕";
const And = "⩓";
const and = "∧";
const andd = "⩜";
const andslope = "⩘";
const andv = "⩚";
const ang = "∠";
const ange = "⦤";
const angle = "∠";
const angmsdaa = "⦨";
const angmsdab = "⦩";
const angmsdac = "⦪";
const angmsdad = "⦫";
const angmsdae = "⦬";
const angmsdaf = "⦭";
const angmsdag = "⦮";
const angmsdah = "⦯";
const angmsd = "∡";
const angrt = "∟";
const angrtvb = "⊾";
const angrtvbd = "⦝";
const angsph = "∢";
const angst = "Å";
const angzarr = "⍼";
const Aogon = "Ą";
const aogon = "ą";
const Aopf = "𝔸";
const aopf = "𝕒";
const apacir = "⩯";
const ap = "≈";
const apE = "⩰";
const ape = "≊";
const apid = "≋";
const apos = "'";
const ApplyFunction = "⁡";
const approx = "≈";
const approxeq = "≊";
const Aring = "Å";
const aring = "å";
const Ascr = "𝒜";
const ascr = "𝒶";
const Assign = "≔";
const ast = "*";
const asymp = "≈";
const asympeq = "≍";
const Atilde = "Ã";
const atilde = "ã";
const Auml = "Ä";
const auml = "ä";
const awconint = "∳";
const awint = "⨑";
const backcong = "≌";
const backepsilon = "϶";
const backprime = "‵";
const backsim = "∽";
const backsimeq = "⋍";
const Backslash = "∖";
const Barv = "⫧";
const barvee = "⊽";
const barwed = "⌅";
const Barwed = "⌆";
const barwedge = "⌅";
const bbrk = "⎵";
const bbrktbrk = "⎶";
const bcong = "≌";
const Bcy = "Б";
const bcy = "б";
const bdquo = "„";
const becaus = "∵";
const because = "∵";
const Because = "∵";
const bemptyv = "⦰";
const bepsi = "϶";
const bernou = "ℬ";
const Bernoullis = "ℬ";
const Beta = "Β";
const beta = "β";
const beth = "ℶ";
const between = "≬";
const Bfr = "𝔅";
const bfr = "𝔟";
const bigcap = "⋂";
const bigcirc = "◯";
const bigcup = "⋃";
const bigodot = "⨀";
const bigoplus = "⨁";
const bigotimes = "⨂";
const bigsqcup = "⨆";
const bigstar = "★";
const bigtriangledown = "▽";
const bigtriangleup = "△";
const biguplus = "⨄";
const bigvee = "⋁";
const bigwedge = "⋀";
const bkarow = "⤍";
const blacklozenge = "⧫";
const blacksquare = "▪";
const blacktriangle = "▴";
const blacktriangledown = "▾";
const blacktriangleleft = "◂";
const blacktriangleright = "▸";
const blank = "␣";
const blk12 = "▒";
const blk14 = "░";
const blk34 = "▓";
const block = "█";
const bne = "=⃥";
const bnequiv = "≡⃥";
const bNot = "⫭";
const bnot = "⌐";
const Bopf = "𝔹";
const bopf = "𝕓";
const bot = "⊥";
const bottom = "⊥";
const bowtie = "⋈";
const boxbox = "⧉";
const boxdl = "┐";
const boxdL = "╕";
const boxDl = "╖";
const boxDL = "╗";
const boxdr = "┌";
const boxdR = "╒";
const boxDr = "╓";
const boxDR = "╔";
const boxh = "─";
const boxH = "═";
const boxhd = "┬";
const boxHd = "╤";
const boxhD = "╥";
const boxHD = "╦";
const boxhu = "┴";
const boxHu = "╧";
const boxhU = "╨";
const boxHU = "╩";
const boxminus = "⊟";
const boxplus = "⊞";
const boxtimes = "⊠";
const boxul = "┘";
const boxuL = "╛";
const boxUl = "╜";
const boxUL = "╝";
const boxur = "└";
const boxuR = "╘";
const boxUr = "╙";
const boxUR = "╚";
const boxv = "│";
const boxV = "║";
const boxvh = "┼";
const boxvH = "╪";
const boxVh = "╫";
const boxVH = "╬";
const boxvl = "┤";
const boxvL = "╡";
const boxVl = "╢";
const boxVL = "╣";
const boxvr = "├";
const boxvR = "╞";
const boxVr = "╟";
const boxVR = "╠";
const bprime = "‵";
const breve = "˘";
const Breve = "˘";
const brvbar = "¦";
const bscr = "𝒷";
const Bscr = "ℬ";
const bsemi = "⁏";
const bsim = "∽";
const bsime = "⋍";
const bsolb = "⧅";
const bsol = "\\";
const bsolhsub = "⟈";
const bull = "•";
const bullet = "•";
const bump = "≎";
const bumpE = "⪮";
const bumpe = "≏";
const Bumpeq = "≎";
const bumpeq = "≏";
const Cacute = "Ć";
const cacute = "ć";
const capand = "⩄";
const capbrcup = "⩉";
const capcap = "⩋";
const cap = "∩";
const Cap = "⋒";
const capcup = "⩇";
const capdot = "⩀";
const CapitalDifferentialD = "ⅅ";
const caps = "∩︀";
const caret = "⁁";
const caron = "ˇ";
const Cayleys = "ℭ";
const ccaps = "⩍";
const Ccaron = "Č";
const ccaron = "č";
const Ccedil = "Ç";
const ccedil = "ç";
const Ccirc = "Ĉ";
const ccirc = "ĉ";
const Cconint = "∰";
const ccups = "⩌";
const ccupssm = "⩐";
const Cdot = "Ċ";
const cdot = "ċ";
const cedil = "¸";
const Cedilla = "¸";
const cemptyv = "⦲";
const cent = "¢";
const centerdot = "·";
const CenterDot = "·";
const cfr = "𝔠";
const Cfr = "ℭ";
const CHcy = "Ч";
const chcy = "ч";
const check = "✓";
const checkmark = "✓";
const Chi = "Χ";
const chi = "χ";
const circ = "ˆ";
const circeq = "≗";
const circlearrowleft = "↺";
const circlearrowright = "↻";
const circledast = "⊛";
const circledcirc = "⊚";
const circleddash = "⊝";
const CircleDot = "⊙";
const circledR = "®";
const circledS = "Ⓢ";
const CircleMinus = "⊖";
const CirclePlus = "⊕";
const CircleTimes = "⊗";
const cir = "○";
const cirE = "⧃";
const cire = "≗";
const cirfnint = "⨐";
const cirmid = "⫯";
const cirscir = "⧂";
const ClockwiseContourIntegral = "∲";
const CloseCurlyDoubleQuote = "”";
const CloseCurlyQuote = "’";
const clubs = "♣";
const clubsuit = "♣";
const colon = ":";
const Colon = "∷";
const Colone = "⩴";
const colone = "≔";
const coloneq = "≔";
const comma = ",";
const commat = "@";
const comp = "∁";
const compfn = "∘";
const complement = "∁";
const complexes = "ℂ";
const cong = "≅";
const congdot = "⩭";
const Congruent = "≡";
const conint = "∮";
const Conint = "∯";
const ContourIntegral = "∮";
const copf = "𝕔";
const Copf = "ℂ";
const coprod = "∐";
const Coproduct = "∐";
const copy = "©";
const COPY = "©";
const copysr = "℗";
const CounterClockwiseContourIntegral = "∳";
const crarr = "↵";
const cross = "✗";
const Cross = "⨯";
const Cscr = "𝒞";
const cscr = "𝒸";
const csub = "⫏";
const csube = "⫑";
const csup = "⫐";
const csupe = "⫒";
const ctdot = "⋯";
const cudarrl = "⤸";
const cudarrr = "⤵";
const cuepr = "⋞";
const cuesc = "⋟";
const cularr = "↶";
const cularrp = "⤽";
const cupbrcap = "⩈";
const cupcap = "⩆";
const CupCap = "≍";
const cup = "∪";
const Cup = "⋓";
const cupcup = "⩊";
const cupdot = "⊍";
const cupor = "⩅";
const cups = "∪︀";
const curarr = "↷";
const curarrm = "⤼";
const curlyeqprec = "⋞";
const curlyeqsucc = "⋟";
const curlyvee = "⋎";
const curlywedge = "⋏";
const curren = "¤";
const curvearrowleft = "↶";
const curvearrowright = "↷";
const cuvee = "⋎";
const cuwed = "⋏";
const cwconint = "∲";
const cwint = "∱";
const cylcty = "⌭";
const dagger = "†";
const Dagger = "‡";
const daleth = "ℸ";
const darr = "↓";
const Darr = "↡";
const dArr = "⇓";
const dash = "‐";
const Dashv = "⫤";
const dashv = "⊣";
const dbkarow = "⤏";
const dblac = "˝";
const Dcaron = "Ď";
const dcaron = "ď";
const Dcy = "Д";
const dcy = "д";
const ddagger = "‡";
const ddarr = "⇊";
const DD = "ⅅ";
const dd = "ⅆ";
const DDotrahd = "⤑";
const ddotseq = "⩷";
const deg = "°";
const Del = "∇";
const Delta = "Δ";
const delta = "δ";
const demptyv = "⦱";
const dfisht = "⥿";
const Dfr = "𝔇";
const dfr = "𝔡";
const dHar = "⥥";
const dharl = "⇃";
const dharr = "⇂";
const DiacriticalAcute = "´";
const DiacriticalDot = "˙";
const DiacriticalDoubleAcute = "˝";
const DiacriticalGrave = "`";
const DiacriticalTilde = "˜";
const diam = "⋄";
const diamond = "⋄";
const Diamond = "⋄";
const diamondsuit = "♦";
const diams = "♦";
const die = "¨";
const DifferentialD = "ⅆ";
const digamma = "ϝ";
const disin = "⋲";
const div = "÷";
const divide = "÷";
const divideontimes = "⋇";
const divonx = "⋇";
const DJcy = "Ђ";
const djcy = "ђ";
const dlcorn = "⌞";
const dlcrop = "⌍";
const dollar = "$";
const Dopf = "𝔻";
const dopf = "𝕕";
const Dot = "¨";
const dot = "˙";
const DotDot = "⃜";
const doteq = "≐";
const doteqdot = "≑";
const DotEqual = "≐";
const dotminus = "∸";
const dotplus = "∔";
const dotsquare = "⊡";
const doublebarwedge = "⌆";
const DoubleContourIntegral = "∯";
const DoubleDot = "¨";
const DoubleDownArrow = "⇓";
const DoubleLeftArrow = "⇐";
const DoubleLeftRightArrow = "⇔";
const DoubleLeftTee = "⫤";
const DoubleLongLeftArrow = "⟸";
const DoubleLongLeftRightArrow = "⟺";
const DoubleLongRightArrow = "⟹";
const DoubleRightArrow = "⇒";
const DoubleRightTee = "⊨";
const DoubleUpArrow = "⇑";
const DoubleUpDownArrow = "⇕";
const DoubleVerticalBar = "∥";
const DownArrowBar = "⤓";
const downarrow = "↓";
const DownArrow = "↓";
const Downarrow = "⇓";
const DownArrowUpArrow = "⇵";
const DownBreve = "̑";
const downdownarrows = "⇊";
const downharpoonleft = "⇃";
const downharpoonright = "⇂";
const DownLeftRightVector = "⥐";
const DownLeftTeeVector = "⥞";
const DownLeftVectorBar = "⥖";
const DownLeftVector = "↽";
const DownRightTeeVector = "⥟";
const DownRightVectorBar = "⥗";
const DownRightVector = "⇁";
const DownTeeArrow = "↧";
const DownTee = "⊤";
const drbkarow = "⤐";
const drcorn = "⌟";
const drcrop = "⌌";
const Dscr = "𝒟";
const dscr = "𝒹";
const DScy = "Ѕ";
const dscy = "ѕ";
const dsol = "⧶";
const Dstrok = "Đ";
const dstrok = "đ";
const dtdot = "⋱";
const dtri = "▿";
const dtrif = "▾";
const duarr = "⇵";
const duhar = "⥯";
const dwangle = "⦦";
const DZcy = "Џ";
const dzcy = "џ";
const dzigrarr = "⟿";
const Eacute = "É";
const eacute = "é";
const easter = "⩮";
const Ecaron = "Ě";
const ecaron = "ě";
const Ecirc = "Ê";
const ecirc = "ê";
const ecir = "≖";
const ecolon = "≕";
const Ecy = "Э";
const ecy = "э";
const eDDot = "⩷";
const Edot = "Ė";
const edot = "ė";
const eDot = "≑";
const ee = "ⅇ";
const efDot = "≒";
const Efr = "𝔈";
const efr = "𝔢";
const eg = "⪚";
const Egrave = "È";
const egrave = "è";
const egs = "⪖";
const egsdot = "⪘";
const el = "⪙";
const Element = "∈";
const elinters = "⏧";
const ell = "ℓ";
const els = "⪕";
const elsdot = "⪗";
const Emacr = "Ē";
const emacr = "ē";
const empty = "∅";
const emptyset = "∅";
const EmptySmallSquare = "◻";
const emptyv = "∅";
const EmptyVerySmallSquare = "▫";
const emsp13 = " ";
const emsp14 = " ";
const emsp = " ";
const ENG = "Ŋ";
const eng = "ŋ";
const ensp = " ";
const Eogon = "Ę";
const eogon = "ę";
const Eopf = "𝔼";
const eopf = "𝕖";
const epar = "⋕";
const eparsl = "⧣";
const eplus = "⩱";
const epsi = "ε";
const Epsilon = "Ε";
const epsilon = "ε";
const epsiv = "ϵ";
const eqcirc = "≖";
const eqcolon = "≕";
const eqsim = "≂";
const eqslantgtr = "⪖";
const eqslantless = "⪕";
const Equal = "⩵";
const equals = "=";
const EqualTilde = "≂";
const equest = "≟";
const Equilibrium = "⇌";
const equiv = "≡";
const equivDD = "⩸";
const eqvparsl = "⧥";
const erarr = "⥱";
const erDot = "≓";
const escr = "ℯ";
const Escr = "ℰ";
const esdot = "≐";
const Esim = "⩳";
const esim = "≂";
const Eta = "Η";
const eta = "η";
const ETH = "Ð";
const eth = "ð";
const Euml = "Ë";
const euml = "ë";
const euro = "€";
const excl = "!";
const exist = "∃";
const Exists = "∃";
const expectation = "ℰ";
const exponentiale = "ⅇ";
const ExponentialE = "ⅇ";
const fallingdotseq = "≒";
const Fcy = "Ф";
const fcy = "ф";
const female = "♀";
const ffilig = "ﬃ";
const fflig = "ﬀ";
const ffllig = "ﬄ";
const Ffr = "𝔉";
const ffr = "𝔣";
const filig = "ﬁ";
const FilledSmallSquare = "◼";
const FilledVerySmallSquare = "▪";
const fjlig = "fj";
const flat = "♭";
const fllig = "ﬂ";
const fltns = "▱";
const fnof = "ƒ";
const Fopf = "𝔽";
const fopf = "𝕗";
const forall = "∀";
const ForAll = "∀";
const fork = "⋔";
const forkv = "⫙";
const Fouriertrf = "ℱ";
const fpartint = "⨍";
const frac12 = "½";
const frac13 = "⅓";
const frac14 = "¼";
const frac15 = "⅕";
const frac16 = "⅙";
const frac18 = "⅛";
const frac23 = "⅔";
const frac25 = "⅖";
const frac34 = "¾";
const frac35 = "⅗";
const frac38 = "⅜";
const frac45 = "⅘";
const frac56 = "⅚";
const frac58 = "⅝";
const frac78 = "⅞";
const frasl = "⁄";
const frown = "⌢";
const fscr = "𝒻";
const Fscr = "ℱ";
const gacute = "ǵ";
const Gamma = "Γ";
const gamma = "γ";
const Gammad = "Ϝ";
const gammad = "ϝ";
const gap = "⪆";
const Gbreve = "Ğ";
const gbreve = "ğ";
const Gcedil = "Ģ";
const Gcirc = "Ĝ";
const gcirc = "ĝ";
const Gcy = "Г";
const gcy = "г";
const Gdot = "Ġ";
const gdot = "ġ";
const ge = "≥";
const gE = "≧";
const gEl = "⪌";
const gel = "⋛";
const geq = "≥";
const geqq = "≧";
const geqslant = "⩾";
const gescc = "⪩";
const ges = "⩾";
const gesdot = "⪀";
const gesdoto = "⪂";
const gesdotol = "⪄";
const gesl = "⋛︀";
const gesles = "⪔";
const Gfr = "𝔊";
const gfr = "𝔤";
const gg = "≫";
const Gg = "⋙";
const ggg = "⋙";
const gimel = "ℷ";
const GJcy = "Ѓ";
const gjcy = "ѓ";
const gla = "⪥";
const gl = "≷";
const glE = "⪒";
const glj = "⪤";
const gnap = "⪊";
const gnapprox = "⪊";
const gne = "⪈";
const gnE = "≩";
const gneq = "⪈";
const gneqq = "≩";
const gnsim = "⋧";
const Gopf = "𝔾";
const gopf = "𝕘";
const grave = "`";
const GreaterEqual = "≥";
const GreaterEqualLess = "⋛";
const GreaterFullEqual = "≧";
const GreaterGreater = "⪢";
const GreaterLess = "≷";
const GreaterSlantEqual = "⩾";
const GreaterTilde = "≳";
const Gscr = "𝒢";
const gscr = "ℊ";
const gsim = "≳";
const gsime = "⪎";
const gsiml = "⪐";
const gtcc = "⪧";
const gtcir = "⩺";
const gt = ">";
const GT = ">";
const Gt = "≫";
const gtdot = "⋗";
const gtlPar = "⦕";
const gtquest = "⩼";
const gtrapprox = "⪆";
const gtrarr = "⥸";
const gtrdot = "⋗";
const gtreqless = "⋛";
const gtreqqless = "⪌";
const gtrless = "≷";
const gtrsim = "≳";
const gvertneqq = "≩︀";
const gvnE = "≩︀";
const Hacek = "ˇ";
const hairsp = " ";
const half = "½";
const hamilt = "ℋ";
const HARDcy = "Ъ";
const hardcy = "ъ";
const harrcir = "⥈";
const harr = "↔";
const hArr = "⇔";
const harrw = "↭";
const Hat = "^";
const hbar = "ℏ";
const Hcirc = "Ĥ";
const hcirc = "ĥ";
const hearts = "♥";
const heartsuit = "♥";
const hellip = "…";
const hercon = "⊹";
const hfr = "𝔥";
const Hfr = "ℌ";
const HilbertSpace = "ℋ";
const hksearow = "⤥";
const hkswarow = "⤦";
const hoarr = "⇿";
const homtht = "∻";
const hookleftarrow = "↩";
const hookrightarrow = "↪";
const hopf = "𝕙";
const Hopf = "ℍ";
const horbar = "―";
const HorizontalLine = "─";
const hscr = "𝒽";
const Hscr = "ℋ";
const hslash = "ℏ";
const Hstrok = "Ħ";
const hstrok = "ħ";
const HumpDownHump = "≎";
const HumpEqual = "≏";
const hybull = "⁃";
const hyphen = "‐";
const Iacute = "Í";
const iacute = "í";
const ic = "⁣";
const Icirc = "Î";
const icirc = "î";
const Icy = "И";
const icy = "и";
const Idot = "İ";
const IEcy = "Е";
const iecy = "е";
const iexcl = "¡";
const iff = "⇔";
const ifr = "𝔦";
const Ifr = "ℑ";
const Igrave = "Ì";
const igrave = "ì";
const ii = "ⅈ";
const iiiint = "⨌";
const iiint = "∭";
const iinfin = "⧜";
const iiota = "℩";
const IJlig = "Ĳ";
const ijlig = "ĳ";
const Imacr = "Ī";
const imacr = "ī";
const image = "ℑ";
const ImaginaryI = "ⅈ";
const imagline = "ℐ";
const imagpart = "ℑ";
const imath = "ı";
const Im = "ℑ";
const imof = "⊷";
const imped = "Ƶ";
const Implies = "⇒";
const incare = "℅";
const infin = "∞";
const infintie = "⧝";
const inodot = "ı";
const intcal = "⊺";
const int = "∫";
const Int = "∬";
const integers = "ℤ";
const Integral = "∫";
const intercal = "⊺";
const Intersection = "⋂";
const intlarhk = "⨗";
const intprod = "⨼";
const InvisibleComma = "⁣";
const InvisibleTimes = "⁢";
const IOcy = "Ё";
const iocy = "ё";
const Iogon = "Į";
const iogon = "į";
const Iopf = "𝕀";
const iopf = "𝕚";
const Iota = "Ι";
const iota = "ι";
const iprod = "⨼";
const iquest = "¿";
const iscr = "𝒾";
const Iscr = "ℐ";
const isin = "∈";
const isindot = "⋵";
const isinE = "⋹";
const isins = "⋴";
const isinsv = "⋳";
const isinv = "∈";
const it = "⁢";
const Itilde = "Ĩ";
const itilde = "ĩ";
const Iukcy = "І";
const iukcy = "і";
const Iuml = "Ï";
const iuml = "ï";
const Jcirc = "Ĵ";
const jcirc = "ĵ";
const Jcy = "Й";
const jcy = "й";
const Jfr = "𝔍";
const jfr = "𝔧";
const jmath = "ȷ";
const Jopf = "𝕁";
const jopf = "𝕛";
const Jscr = "𝒥";
const jscr = "𝒿";
const Jsercy = "Ј";
const jsercy = "ј";
const Jukcy = "Є";
const jukcy = "є";
const Kappa = "Κ";
const kappa = "κ";
const kappav = "ϰ";
const Kcedil = "Ķ";
const kcedil = "ķ";
const Kcy = "К";
const kcy = "к";
const Kfr = "𝔎";
const kfr = "𝔨";
const kgreen = "ĸ";
const KHcy = "Х";
const khcy = "х";
const KJcy = "Ќ";
const kjcy = "ќ";
const Kopf = "𝕂";
const kopf = "𝕜";
const Kscr = "𝒦";
const kscr = "𝓀";
const lAarr = "⇚";
const Lacute = "Ĺ";
const lacute = "ĺ";
const laemptyv = "⦴";
const lagran = "ℒ";
const Lambda = "Λ";
const lambda = "λ";
const lang = "⟨";
const Lang = "⟪";
const langd = "⦑";
const langle = "⟨";
const lap = "⪅";
const Laplacetrf = "ℒ";
const laquo = "«";
const larrb = "⇤";
const larrbfs = "⤟";
const larr = "←";
const Larr = "↞";
const lArr = "⇐";
const larrfs = "⤝";
const larrhk = "↩";
const larrlp = "↫";
const larrpl = "⤹";
const larrsim = "⥳";
const larrtl = "↢";
const latail = "⤙";
const lAtail = "⤛";
const lat = "⪫";
const late = "⪭";
const lates = "⪭︀";
const lbarr = "⤌";
const lBarr = "⤎";
const lbbrk = "❲";
const lbrace = "{";
const lbrack = "[";
const lbrke = "⦋";
const lbrksld = "⦏";
const lbrkslu = "⦍";
const Lcaron = "Ľ";
const lcaron = "ľ";
const Lcedil = "Ļ";
const lcedil = "ļ";
const lceil = "⌈";
const lcub = "{";
const Lcy = "Л";
const lcy = "л";
const ldca = "⤶";
const ldquo = "“";
const ldquor = "„";
const ldrdhar = "⥧";
const ldrushar = "⥋";
const ldsh = "↲";
const le = "≤";
const lE = "≦";
const LeftAngleBracket = "⟨";
const LeftArrowBar = "⇤";
const leftarrow = "←";
const LeftArrow = "←";
const Leftarrow = "⇐";
const LeftArrowRightArrow = "⇆";
const leftarrowtail = "↢";
const LeftCeiling = "⌈";
const LeftDoubleBracket = "⟦";
const LeftDownTeeVector = "⥡";
const LeftDownVectorBar = "⥙";
const LeftDownVector = "⇃";
const LeftFloor = "⌊";
const leftharpoondown = "↽";
const leftharpoonup = "↼";
const leftleftarrows = "⇇";
const leftrightarrow = "↔";
const LeftRightArrow = "↔";
const Leftrightarrow = "⇔";
const leftrightarrows = "⇆";
const leftrightharpoons = "⇋";
const leftrightsquigarrow = "↭";
const LeftRightVector = "⥎";
const LeftTeeArrow = "↤";
const LeftTee = "⊣";
const LeftTeeVector = "⥚";
const leftthreetimes = "⋋";
const LeftTriangleBar = "⧏";
const LeftTriangle = "⊲";
const LeftTriangleEqual = "⊴";
const LeftUpDownVector = "⥑";
const LeftUpTeeVector = "⥠";
const LeftUpVectorBar = "⥘";
const LeftUpVector = "↿";
const LeftVectorBar = "⥒";
const LeftVector = "↼";
const lEg = "⪋";
const leg = "⋚";
const leq = "≤";
const leqq = "≦";
const leqslant = "⩽";
const lescc = "⪨";
const les = "⩽";
const lesdot = "⩿";
const lesdoto = "⪁";
const lesdotor = "⪃";
const lesg = "⋚︀";
const lesges = "⪓";
const lessapprox = "⪅";
const lessdot = "⋖";
const lesseqgtr = "⋚";
const lesseqqgtr = "⪋";
const LessEqualGreater = "⋚";
const LessFullEqual = "≦";
const LessGreater = "≶";
const lessgtr = "≶";
const LessLess = "⪡";
const lesssim = "≲";
const LessSlantEqual = "⩽";
const LessTilde = "≲";
const lfisht = "⥼";
const lfloor = "⌊";
const Lfr = "𝔏";
const lfr = "𝔩";
const lg = "≶";
const lgE = "⪑";
const lHar = "⥢";
const lhard = "↽";
const lharu = "↼";
const lharul = "⥪";
const lhblk = "▄";
const LJcy = "Љ";
const ljcy = "љ";
const llarr = "⇇";
const ll = "≪";
const Ll = "⋘";
const llcorner = "⌞";
const Lleftarrow = "⇚";
const llhard = "⥫";
const lltri = "◺";
const Lmidot = "Ŀ";
const lmidot = "ŀ";
const lmoustache = "⎰";
const lmoust = "⎰";
const lnap = "⪉";
const lnapprox = "⪉";
const lne = "⪇";
const lnE = "≨";
const lneq = "⪇";
const lneqq = "≨";
const lnsim = "⋦";
const loang = "⟬";
const loarr = "⇽";
const lobrk = "⟦";
const longleftarrow = "⟵";
const LongLeftArrow = "⟵";
const Longleftarrow = "⟸";
const longleftrightarrow = "⟷";
const LongLeftRightArrow = "⟷";
const Longleftrightarrow = "⟺";
const longmapsto = "⟼";
const longrightarrow = "⟶";
const LongRightArrow = "⟶";
const Longrightarrow = "⟹";
const looparrowleft = "↫";
const looparrowright = "↬";
const lopar = "⦅";
const Lopf = "𝕃";
const lopf = "𝕝";
const loplus = "⨭";
const lotimes = "⨴";
const lowast = "∗";
const lowbar = "_";
const LowerLeftArrow = "↙";
const LowerRightArrow = "↘";
const loz = "◊";
const lozenge = "◊";
const lozf = "⧫";
const lpar = "(";
const lparlt = "⦓";
const lrarr = "⇆";
const lrcorner = "⌟";
const lrhar = "⇋";
const lrhard = "⥭";
const lrm = "‎";
const lrtri = "⊿";
const lsaquo = "‹";
const lscr = "𝓁";
const Lscr = "ℒ";
const lsh = "↰";
const Lsh = "↰";
const lsim = "≲";
const lsime = "⪍";
const lsimg = "⪏";
const lsqb = "[";
const lsquo = "‘";
const lsquor = "‚";
const Lstrok = "Ł";
const lstrok = "ł";
const ltcc = "⪦";
const ltcir = "⩹";
const lt = "<";
const LT = "<";
const Lt = "≪";
const ltdot = "⋖";
const lthree = "⋋";
const ltimes = "⋉";
const ltlarr = "⥶";
const ltquest = "⩻";
const ltri = "◃";
const ltrie = "⊴";
const ltrif = "◂";
const ltrPar = "⦖";
const lurdshar = "⥊";
const luruhar = "⥦";
const lvertneqq = "≨︀";
const lvnE = "≨︀";
const macr = "¯";
const male = "♂";
const malt = "✠";
const maltese = "✠";
const map = "↦";
const mapsto = "↦";
const mapstodown = "↧";
const mapstoleft = "↤";
const mapstoup = "↥";
const marker = "▮";
const mcomma = "⨩";
const Mcy = "М";
const mcy = "м";
const mdash = "—";
const mDDot = "∺";
const measuredangle = "∡";
const MediumSpace = " ";
const Mellintrf = "ℳ";
const Mfr = "𝔐";
const mfr = "𝔪";
const mho = "℧";
const micro = "µ";
const midast = "*";
const midcir = "⫰";
const mid = "∣";
const middot = "·";
const minusb = "⊟";
const minus = "−";
const minusd = "∸";
const minusdu = "⨪";
const MinusPlus = "∓";
const mlcp = "⫛";
const mldr = "…";
const mnplus = "∓";
const models = "⊧";
const Mopf = "𝕄";
const mopf = "𝕞";
const mp = "∓";
const mscr = "𝓂";
const Mscr = "ℳ";
const mstpos = "∾";
const Mu = "Μ";
const mu = "μ";
const multimap = "⊸";
const mumap = "⊸";
const nabla = "∇";
const Nacute = "Ń";
const nacute = "ń";
const nang = "∠⃒";
const nap = "≉";
const napE = "⩰̸";
const napid = "≋̸";
const napos = "ŉ";
const napprox = "≉";
const natural = "♮";
const naturals = "ℕ";
const natur = "♮";
const nbsp = " ";
const nbump = "≎̸";
const nbumpe = "≏̸";
const ncap = "⩃";
const Ncaron = "Ň";
const ncaron = "ň";
const Ncedil = "Ņ";
const ncedil = "ņ";
const ncong = "≇";
const ncongdot = "⩭̸";
const ncup = "⩂";
const Ncy = "Н";
const ncy = "н";
const ndash = "–";
const nearhk = "⤤";
const nearr = "↗";
const neArr = "⇗";
const nearrow = "↗";
const ne = "≠";
const nedot = "≐̸";
const NegativeMediumSpace = "​";
const NegativeThickSpace = "​";
const NegativeThinSpace = "​";
const NegativeVeryThinSpace = "​";
const nequiv = "≢";
const nesear = "⤨";
const nesim = "≂̸";
const NestedGreaterGreater = "≫";
const NestedLessLess = "≪";
const NewLine = "\n";
const nexist = "∄";
const nexists = "∄";
const Nfr = "𝔑";
const nfr = "𝔫";
const ngE = "≧̸";
const nge = "≱";
const ngeq = "≱";
const ngeqq = "≧̸";
const ngeqslant = "⩾̸";
const nges = "⩾̸";
const nGg = "⋙̸";
const ngsim = "≵";
const nGt = "≫⃒";
const ngt = "≯";
const ngtr = "≯";
const nGtv = "≫̸";
const nharr = "↮";
const nhArr = "⇎";
const nhpar = "⫲";
const ni = "∋";
const nis = "⋼";
const nisd = "⋺";
const niv = "∋";
const NJcy = "Њ";
const njcy = "њ";
const nlarr = "↚";
const nlArr = "⇍";
const nldr = "‥";
const nlE = "≦̸";
const nle = "≰";
const nleftarrow = "↚";
const nLeftarrow = "⇍";
const nleftrightarrow = "↮";
const nLeftrightarrow = "⇎";
const nleq = "≰";
const nleqq = "≦̸";
const nleqslant = "⩽̸";
const nles = "⩽̸";
const nless = "≮";
const nLl = "⋘̸";
const nlsim = "≴";
const nLt = "≪⃒";
const nlt = "≮";
const nltri = "⋪";
const nltrie = "⋬";
const nLtv = "≪̸";
const nmid = "∤";
const NoBreak = "⁠";
const NonBreakingSpace = " ";
const nopf = "𝕟";
const Nopf = "ℕ";
const Not = "⫬";
const not = "¬";
const NotCongruent = "≢";
const NotCupCap = "≭";
const NotDoubleVerticalBar = "∦";
const NotElement = "∉";
const NotEqual = "≠";
const NotEqualTilde = "≂̸";
const NotExists = "∄";
const NotGreater = "≯";
const NotGreaterEqual = "≱";
const NotGreaterFullEqual = "≧̸";
const NotGreaterGreater = "≫̸";
const NotGreaterLess = "≹";
const NotGreaterSlantEqual = "⩾̸";
const NotGreaterTilde = "≵";
const NotHumpDownHump = "≎̸";
const NotHumpEqual = "≏̸";
const notin = "∉";
const notindot = "⋵̸";
const notinE = "⋹̸";
const notinva = "∉";
const notinvb = "⋷";
const notinvc = "⋶";
const NotLeftTriangleBar = "⧏̸";
const NotLeftTriangle = "⋪";
const NotLeftTriangleEqual = "⋬";
const NotLess = "≮";
const NotLessEqual = "≰";
const NotLessGreater = "≸";
const NotLessLess = "≪̸";
const NotLessSlantEqual = "⩽̸";
const NotLessTilde = "≴";
const NotNestedGreaterGreater = "⪢̸";
const NotNestedLessLess = "⪡̸";
const notni = "∌";
const notniva = "∌";
const notnivb = "⋾";
const notnivc = "⋽";
const NotPrecedes = "⊀";
const NotPrecedesEqual = "⪯̸";
const NotPrecedesSlantEqual = "⋠";
const NotReverseElement = "∌";
const NotRightTriangleBar = "⧐̸";
const NotRightTriangle = "⋫";
const NotRightTriangleEqual = "⋭";
const NotSquareSubset = "⊏̸";
const NotSquareSubsetEqual = "⋢";
const NotSquareSuperset = "⊐̸";
const NotSquareSupersetEqual = "⋣";
const NotSubset = "⊂⃒";
const NotSubsetEqual = "⊈";
const NotSucceeds = "⊁";
const NotSucceedsEqual = "⪰̸";
const NotSucceedsSlantEqual = "⋡";
const NotSucceedsTilde = "≿̸";
const NotSuperset = "⊃⃒";
const NotSupersetEqual = "⊉";
const NotTilde = "≁";
const NotTildeEqual = "≄";
const NotTildeFullEqual = "≇";
const NotTildeTilde = "≉";
const NotVerticalBar = "∤";
const nparallel = "∦";
const npar = "∦";
const nparsl = "⫽⃥";
const npart = "∂̸";
const npolint = "⨔";
const npr = "⊀";
const nprcue = "⋠";
const nprec = "⊀";
const npreceq = "⪯̸";
const npre = "⪯̸";
const nrarrc = "⤳̸";
const nrarr = "↛";
const nrArr = "⇏";
const nrarrw = "↝̸";
const nrightarrow = "↛";
const nRightarrow = "⇏";
const nrtri = "⋫";
const nrtrie = "⋭";
const nsc = "⊁";
const nsccue = "⋡";
const nsce = "⪰̸";
const Nscr = "𝒩";
const nscr = "𝓃";
const nshortmid = "∤";
const nshortparallel = "∦";
const nsim = "≁";
const nsime = "≄";
const nsimeq = "≄";
const nsmid = "∤";
const nspar = "∦";
const nsqsube = "⋢";
const nsqsupe = "⋣";
const nsub = "⊄";
const nsubE = "⫅̸";
const nsube = "⊈";
const nsubset = "⊂⃒";
const nsubseteq = "⊈";
const nsubseteqq = "⫅̸";
const nsucc = "⊁";
const nsucceq = "⪰̸";
const nsup = "⊅";
const nsupE = "⫆̸";
const nsupe = "⊉";
const nsupset = "⊃⃒";
const nsupseteq = "⊉";
const nsupseteqq = "⫆̸";
const ntgl = "≹";
const Ntilde = "Ñ";
const ntilde = "ñ";
const ntlg = "≸";
const ntriangleleft = "⋪";
const ntrianglelefteq = "⋬";
const ntriangleright = "⋫";
const ntrianglerighteq = "⋭";
const Nu = "Ν";
const nu = "ν";
const num = "#";
const numero = "№";
const numsp = " ";
const nvap = "≍⃒";
const nvdash = "⊬";
const nvDash = "⊭";
const nVdash = "⊮";
const nVDash = "⊯";
const nvge = "≥⃒";
const nvgt = ">⃒";
const nvHarr = "⤄";
const nvinfin = "⧞";
const nvlArr = "⤂";
const nvle = "≤⃒";
const nvlt = "<⃒";
const nvltrie = "⊴⃒";
const nvrArr = "⤃";
const nvrtrie = "⊵⃒";
const nvsim = "∼⃒";
const nwarhk = "⤣";
const nwarr = "↖";
const nwArr = "⇖";
const nwarrow = "↖";
const nwnear = "⤧";
const Oacute = "Ó";
const oacute = "ó";
const oast = "⊛";
const Ocirc = "Ô";
const ocirc = "ô";
const ocir = "⊚";
const Ocy = "О";
const ocy = "о";
const odash = "⊝";
const Odblac = "Ő";
const odblac = "ő";
const odiv = "⨸";
const odot = "⊙";
const odsold = "⦼";
const OElig = "Œ";
const oelig = "œ";
const ofcir = "⦿";
const Ofr = "𝔒";
const ofr = "𝔬";
const ogon = "˛";
const Ograve = "Ò";
const ograve = "ò";
const ogt = "⧁";
const ohbar = "⦵";
const ohm = "Ω";
const oint = "∮";
const olarr = "↺";
const olcir = "⦾";
const olcross = "⦻";
const oline = "‾";
const olt = "⧀";
const Omacr = "Ō";
const omacr = "ō";
const Omega = "Ω";
const omega = "ω";
const Omicron = "Ο";
const omicron = "ο";
const omid = "⦶";
const ominus = "⊖";
const Oopf = "𝕆";
const oopf = "𝕠";
const opar = "⦷";
const OpenCurlyDoubleQuote = "“";
const OpenCurlyQuote = "‘";
const operp = "⦹";
const oplus = "⊕";
const orarr = "↻";
const Or = "⩔";
const or = "∨";
const ord = "⩝";
const order = "ℴ";
const orderof = "ℴ";
const ordf = "ª";
const ordm = "º";
const origof = "⊶";
const oror = "⩖";
const orslope = "⩗";
const orv = "⩛";
const oS = "Ⓢ";
const Oscr = "𝒪";
const oscr = "ℴ";
const Oslash = "Ø";
const oslash = "ø";
const osol = "⊘";
const Otilde = "Õ";
const otilde = "õ";
const otimesas = "⨶";
const Otimes = "⨷";
const otimes = "⊗";
const Ouml = "Ö";
const ouml = "ö";
const ovbar = "⌽";
const OverBar = "‾";
const OverBrace = "⏞";
const OverBracket = "⎴";
const OverParenthesis = "⏜";
const para = "¶";
const parallel = "∥";
const par = "∥";
const parsim = "⫳";
const parsl = "⫽";
const part = "∂";
const PartialD = "∂";
const Pcy = "П";
const pcy = "п";
const percnt = "%";
const period = ".";
const permil = "‰";
const perp = "⊥";
const pertenk = "‱";
const Pfr = "𝔓";
const pfr = "𝔭";
const Phi = "Φ";
const phi = "φ";
const phiv = "ϕ";
const phmmat = "ℳ";
const phone = "☎";
const Pi = "Π";
const pi = "π";
const pitchfork = "⋔";
const piv = "ϖ";
const planck = "ℏ";
const planckh = "ℎ";
const plankv = "ℏ";
const plusacir = "⨣";
const plusb = "⊞";
const pluscir = "⨢";
const plus = "+";
const plusdo = "∔";
const plusdu = "⨥";
const pluse = "⩲";
const PlusMinus = "±";
const plusmn = "±";
const plussim = "⨦";
const plustwo = "⨧";
const pm = "±";
const Poincareplane = "ℌ";
const pointint = "⨕";
const popf = "𝕡";
const Popf = "ℙ";
const pound = "£";
const prap = "⪷";
const Pr = "⪻";
const pr = "≺";
const prcue = "≼";
const precapprox = "⪷";
const prec = "≺";
const preccurlyeq = "≼";
const Precedes = "≺";
const PrecedesEqual = "⪯";
const PrecedesSlantEqual = "≼";
const PrecedesTilde = "≾";
const preceq = "⪯";
const precnapprox = "⪹";
const precneqq = "⪵";
const precnsim = "⋨";
const pre = "⪯";
const prE = "⪳";
const precsim = "≾";
const prime = "′";
const Prime = "″";
const primes = "ℙ";
const prnap = "⪹";
const prnE = "⪵";
const prnsim = "⋨";
const prod = "∏";
const Product = "∏";
const profalar = "⌮";
const profline = "⌒";
const profsurf = "⌓";
const prop = "∝";
const Proportional = "∝";
const Proportion = "∷";
const propto = "∝";
const prsim = "≾";
const prurel = "⊰";
const Pscr = "𝒫";
const pscr = "𝓅";
const Psi = "Ψ";
const psi = "ψ";
const puncsp = " ";
const Qfr = "𝔔";
const qfr = "𝔮";
const qint = "⨌";
const qopf = "𝕢";
const Qopf = "ℚ";
const qprime = "⁗";
const Qscr = "𝒬";
const qscr = "𝓆";
const quaternions = "ℍ";
const quatint = "⨖";
const quest = "?";
const questeq = "≟";
const quot = "\"";
const QUOT = "\"";
const rAarr = "⇛";
const race = "∽̱";
const Racute = "Ŕ";
const racute = "ŕ";
const radic = "√";
const raemptyv = "⦳";
const rang = "⟩";
const Rang = "⟫";
const rangd = "⦒";
const range = "⦥";
const rangle = "⟩";
const raquo = "»";
const rarrap = "⥵";
const rarrb = "⇥";
const rarrbfs = "⤠";
const rarrc = "⤳";
const rarr = "→";
const Rarr = "↠";
const rArr = "⇒";
const rarrfs = "⤞";
const rarrhk = "↪";
const rarrlp = "↬";
const rarrpl = "⥅";
const rarrsim = "⥴";
const Rarrtl = "⤖";
const rarrtl = "↣";
const rarrw = "↝";
const ratail = "⤚";
const rAtail = "⤜";
const ratio = "∶";
const rationals = "ℚ";
const rbarr = "⤍";
const rBarr = "⤏";
const RBarr = "⤐";
const rbbrk = "❳";
const rbrace = "}";
const rbrack = "]";
const rbrke = "⦌";
const rbrksld = "⦎";
const rbrkslu = "⦐";
const Rcaron = "Ř";
const rcaron = "ř";
const Rcedil = "Ŗ";
const rcedil = "ŗ";
const rceil = "⌉";
const rcub = "}";
const Rcy = "Р";
const rcy = "р";
const rdca = "⤷";
const rdldhar = "⥩";
const rdquo = "”";
const rdquor = "”";
const rdsh = "↳";
const real = "ℜ";
const realine = "ℛ";
const realpart = "ℜ";
const reals = "ℝ";
const Re = "ℜ";
const rect = "▭";
const reg = "®";
const REG = "®";
const ReverseElement = "∋";
const ReverseEquilibrium = "⇋";
const ReverseUpEquilibrium = "⥯";
const rfisht = "⥽";
const rfloor = "⌋";
const rfr = "𝔯";
const Rfr = "ℜ";
const rHar = "⥤";
const rhard = "⇁";
const rharu = "⇀";
const rharul = "⥬";
const Rho = "Ρ";
const rho = "ρ";
const rhov = "ϱ";
const RightAngleBracket = "⟩";
const RightArrowBar = "⇥";
const rightarrow = "→";
const RightArrow = "→";
const Rightarrow = "⇒";
const RightArrowLeftArrow = "⇄";
const rightarrowtail = "↣";
const RightCeiling = "⌉";
const RightDoubleBracket = "⟧";
const RightDownTeeVector = "⥝";
const RightDownVectorBar = "⥕";
const RightDownVector = "⇂";
const RightFloor = "⌋";
const rightharpoondown = "⇁";
const rightharpoonup = "⇀";
const rightleftarrows = "⇄";
const rightleftharpoons = "⇌";
const rightrightarrows = "⇉";
const rightsquigarrow = "↝";
const RightTeeArrow = "↦";
const RightTee = "⊢";
const RightTeeVector = "⥛";
const rightthreetimes = "⋌";
const RightTriangleBar = "⧐";
const RightTriangle = "⊳";
const RightTriangleEqual = "⊵";
const RightUpDownVector = "⥏";
const RightUpTeeVector = "⥜";
const RightUpVectorBar = "⥔";
const RightUpVector = "↾";
const RightVectorBar = "⥓";
const RightVector = "⇀";
const ring = "˚";
const risingdotseq = "≓";
const rlarr = "⇄";
const rlhar = "⇌";
const rlm = "‏";
const rmoustache = "⎱";
const rmoust = "⎱";
const rnmid = "⫮";
const roang = "⟭";
const roarr = "⇾";
const robrk = "⟧";
const ropar = "⦆";
const ropf = "𝕣";
const Ropf = "ℝ";
const roplus = "⨮";
const rotimes = "⨵";
const RoundImplies = "⥰";
const rpar = ")";
const rpargt = "⦔";
const rppolint = "⨒";
const rrarr = "⇉";
const Rrightarrow = "⇛";
const rsaquo = "›";
const rscr = "𝓇";
const Rscr = "ℛ";
const rsh = "↱";
const Rsh = "↱";
const rsqb = "]";
const rsquo = "’";
const rsquor = "’";
const rthree = "⋌";
const rtimes = "⋊";
const rtri = "▹";
const rtrie = "⊵";
const rtrif = "▸";
const rtriltri = "⧎";
const RuleDelayed = "⧴";
const ruluhar = "⥨";
const rx = "℞";
const Sacute = "Ś";
const sacute = "ś";
const sbquo = "‚";
const scap = "⪸";
const Scaron = "Š";
const scaron = "š";
const Sc = "⪼";
const sc = "≻";
const sccue = "≽";
const sce = "⪰";
const scE = "⪴";
const Scedil = "Ş";
const scedil = "ş";
const Scirc = "Ŝ";
const scirc = "ŝ";
const scnap = "⪺";
const scnE = "⪶";
const scnsim = "⋩";
const scpolint = "⨓";
const scsim = "≿";
const Scy = "С";
const scy = "с";
const sdotb = "⊡";
const sdot = "⋅";
const sdote = "⩦";
const searhk = "⤥";
const searr = "↘";
const seArr = "⇘";
const searrow = "↘";
const sect = "§";
const semi = ";";
const seswar = "⤩";
const setminus = "∖";
const setmn = "∖";
const sext = "✶";
const Sfr = "𝔖";
const sfr = "𝔰";
const sfrown = "⌢";
const sharp = "♯";
const SHCHcy = "Щ";
const shchcy = "щ";
const SHcy = "Ш";
const shcy = "ш";
const ShortDownArrow = "↓";
const ShortLeftArrow = "←";
const shortmid = "∣";
const shortparallel = "∥";
const ShortRightArrow = "→";
const ShortUpArrow = "↑";
const shy = "­";
const Sigma = "Σ";
const sigma = "σ";
const sigmaf = "ς";
const sigmav = "ς";
const sim = "∼";
const simdot = "⩪";
const sime = "≃";
const simeq = "≃";
const simg = "⪞";
const simgE = "⪠";
const siml = "⪝";
const simlE = "⪟";
const simne = "≆";
const simplus = "⨤";
const simrarr = "⥲";
const slarr = "←";
const SmallCircle = "∘";
const smallsetminus = "∖";
const smashp = "⨳";
const smeparsl = "⧤";
const smid = "∣";
const smile = "⌣";
const smt = "⪪";
const smte = "⪬";
const smtes = "⪬︀";
const SOFTcy = "Ь";
const softcy = "ь";
const solbar = "⌿";
const solb = "⧄";
const sol = "/";
const Sopf = "𝕊";
const sopf = "𝕤";
const spades = "♠";
const spadesuit = "♠";
const spar = "∥";
const sqcap = "⊓";
const sqcaps = "⊓︀";
const sqcup = "⊔";
const sqcups = "⊔︀";
const Sqrt = "√";
const sqsub = "⊏";
const sqsube = "⊑";
const sqsubset = "⊏";
const sqsubseteq = "⊑";
const sqsup = "⊐";
const sqsupe = "⊒";
const sqsupset = "⊐";
const sqsupseteq = "⊒";
const square = "□";
const Square = "□";
const SquareIntersection = "⊓";
const SquareSubset = "⊏";
const SquareSubsetEqual = "⊑";
const SquareSuperset = "⊐";
const SquareSupersetEqual = "⊒";
const SquareUnion = "⊔";
const squarf = "▪";
const squ = "□";
const squf = "▪";
const srarr = "→";
const Sscr = "𝒮";
const sscr = "𝓈";
const ssetmn = "∖";
const ssmile = "⌣";
const sstarf = "⋆";
const Star = "⋆";
const star = "☆";
const starf = "★";
const straightepsilon = "ϵ";
const straightphi = "ϕ";
const strns = "¯";
const sub = "⊂";
const Sub = "⋐";
const subdot = "⪽";
const subE = "⫅";
const sube = "⊆";
const subedot = "⫃";
const submult = "⫁";
const subnE = "⫋";
const subne = "⊊";
const subplus = "⪿";
const subrarr = "⥹";
const subset = "⊂";
const Subset = "⋐";
const subseteq = "⊆";
const subseteqq = "⫅";
const SubsetEqual = "⊆";
const subsetneq = "⊊";
const subsetneqq = "⫋";
const subsim = "⫇";
const subsub = "⫕";
const subsup = "⫓";
const succapprox = "⪸";
const succ = "≻";
const succcurlyeq = "≽";
const Succeeds = "≻";
const SucceedsEqual = "⪰";
const SucceedsSlantEqual = "≽";
const SucceedsTilde = "≿";
const succeq = "⪰";
const succnapprox = "⪺";
const succneqq = "⪶";
const succnsim = "⋩";
const succsim = "≿";
const SuchThat = "∋";
const sum = "∑";
const Sum = "∑";
const sung = "♪";
const sup1 = "¹";
const sup2 = "²";
const sup3 = "³";
const sup = "⊃";
const Sup = "⋑";
const supdot = "⪾";
const supdsub = "⫘";
const supE = "⫆";
const supe = "⊇";
const supedot = "⫄";
const Superset = "⊃";
const SupersetEqual = "⊇";
const suphsol = "⟉";
const suphsub = "⫗";
const suplarr = "⥻";
const supmult = "⫂";
const supnE = "⫌";
const supne = "⊋";
const supplus = "⫀";
const supset = "⊃";
const Supset = "⋑";
const supseteq = "⊇";
const supseteqq = "⫆";
const supsetneq = "⊋";
const supsetneqq = "⫌";
const supsim = "⫈";
const supsub = "⫔";
const supsup = "⫖";
const swarhk = "⤦";
const swarr = "↙";
const swArr = "⇙";
const swarrow = "↙";
const swnwar = "⤪";
const szlig = "ß";
const Tab = "\t";
const target = "⌖";
const Tau = "Τ";
const tau = "τ";
const tbrk = "⎴";
const Tcaron = "Ť";
const tcaron = "ť";
const Tcedil = "Ţ";
const tcedil = "ţ";
const Tcy = "Т";
const tcy = "т";
const tdot = "⃛";
const telrec = "⌕";
const Tfr = "𝔗";
const tfr = "𝔱";
const there4 = "∴";
const therefore = "∴";
const Therefore = "∴";
const Theta = "Θ";
const theta = "θ";
const thetasym = "ϑ";
const thetav = "ϑ";
const thickapprox = "≈";
const thicksim = "∼";
const ThickSpace = "  ";
const ThinSpace = " ";
const thinsp = " ";
const thkap = "≈";
const thksim = "∼";
const THORN = "Þ";
const thorn = "þ";
const tilde = "˜";
const Tilde = "∼";
const TildeEqual = "≃";
const TildeFullEqual = "≅";
const TildeTilde = "≈";
const timesbar = "⨱";
const timesb = "⊠";
const times = "×";
const timesd = "⨰";
const tint = "∭";
const toea = "⤨";
const topbot = "⌶";
const topcir = "⫱";
const top = "⊤";
const Topf = "𝕋";
const topf = "𝕥";
const topfork = "⫚";
const tosa = "⤩";
const tprime = "‴";
const trade = "™";
const TRADE = "™";
const triangle = "▵";
const triangledown = "▿";
const triangleleft = "◃";
const trianglelefteq = "⊴";
const triangleq = "≜";
const triangleright = "▹";
const trianglerighteq = "⊵";
const tridot = "◬";
const trie = "≜";
const triminus = "⨺";
const TripleDot = "⃛";
const triplus = "⨹";
const trisb = "⧍";
const tritime = "⨻";
const trpezium = "⏢";
const Tscr = "𝒯";
const tscr = "𝓉";
const TScy = "Ц";
const tscy = "ц";
const TSHcy = "Ћ";
const tshcy = "ћ";
const Tstrok = "Ŧ";
const tstrok = "ŧ";
const twixt = "≬";
const twoheadleftarrow = "↞";
const twoheadrightarrow = "↠";
const Uacute = "Ú";
const uacute = "ú";
const uarr = "↑";
const Uarr = "↟";
const uArr = "⇑";
const Uarrocir = "⥉";
const Ubrcy = "Ў";
const ubrcy = "ў";
const Ubreve = "Ŭ";
const ubreve = "ŭ";
const Ucirc = "Û";
const ucirc = "û";
const Ucy = "У";
const ucy = "у";
const udarr = "⇅";
const Udblac = "Ű";
const udblac = "ű";
const udhar = "⥮";
const ufisht = "⥾";
const Ufr = "𝔘";
const ufr = "𝔲";
const Ugrave = "Ù";
const ugrave = "ù";
const uHar = "⥣";
const uharl = "↿";
const uharr = "↾";
const uhblk = "▀";
const ulcorn = "⌜";
const ulcorner = "⌜";
const ulcrop = "⌏";
const ultri = "◸";
const Umacr = "Ū";
const umacr = "ū";
const uml = "¨";
const UnderBar = "_";
const UnderBrace = "⏟";
const UnderBracket = "⎵";
const UnderParenthesis = "⏝";
const Union = "⋃";
const UnionPlus = "⊎";
const Uogon = "Ų";
const uogon = "ų";
const Uopf = "𝕌";
const uopf = "𝕦";
const UpArrowBar = "⤒";
const uparrow = "↑";
const UpArrow = "↑";
const Uparrow = "⇑";
const UpArrowDownArrow = "⇅";
const updownarrow = "↕";
const UpDownArrow = "↕";
const Updownarrow = "⇕";
const UpEquilibrium = "⥮";
const upharpoonleft = "↿";
const upharpoonright = "↾";
const uplus = "⊎";
const UpperLeftArrow = "↖";
const UpperRightArrow = "↗";
const upsi = "υ";
const Upsi = "ϒ";
const upsih = "ϒ";
const Upsilon = "Υ";
const upsilon = "υ";
const UpTeeArrow = "↥";
const UpTee = "⊥";
const upuparrows = "⇈";
const urcorn = "⌝";
const urcorner = "⌝";
const urcrop = "⌎";
const Uring = "Ů";
const uring = "ů";
const urtri = "◹";
const Uscr = "𝒰";
const uscr = "𝓊";
const utdot = "⋰";
const Utilde = "Ũ";
const utilde = "ũ";
const utri = "▵";
const utrif = "▴";
const uuarr = "⇈";
const Uuml = "Ü";
const uuml = "ü";
const uwangle = "⦧";
const vangrt = "⦜";
const varepsilon = "ϵ";
const varkappa = "ϰ";
const varnothing = "∅";
const varphi = "ϕ";
const varpi = "ϖ";
const varpropto = "∝";
const varr = "↕";
const vArr = "⇕";
const varrho = "ϱ";
const varsigma = "ς";
const varsubsetneq = "⊊︀";
const varsubsetneqq = "⫋︀";
const varsupsetneq = "⊋︀";
const varsupsetneqq = "⫌︀";
const vartheta = "ϑ";
const vartriangleleft = "⊲";
const vartriangleright = "⊳";
const vBar = "⫨";
const Vbar = "⫫";
const vBarv = "⫩";
const Vcy = "В";
const vcy = "в";
const vdash = "⊢";
const vDash = "⊨";
const Vdash = "⊩";
const VDash = "⊫";
const Vdashl = "⫦";
const veebar = "⊻";
const vee = "∨";
const Vee = "⋁";
const veeeq = "≚";
const vellip = "⋮";
const verbar = "|";
const Verbar = "‖";
const vert = "|";
const Vert = "‖";
const VerticalBar = "∣";
const VerticalLine = "|";
const VerticalSeparator = "❘";
const VerticalTilde = "≀";
const VeryThinSpace = " ";
const Vfr = "𝔙";
const vfr = "𝔳";
const vltri = "⊲";
const vnsub = "⊂⃒";
const vnsup = "⊃⃒";
const Vopf = "𝕍";
const vopf = "𝕧";
const vprop = "∝";
const vrtri = "⊳";
const Vscr = "𝒱";
const vscr = "𝓋";
const vsubnE = "⫋︀";
const vsubne = "⊊︀";
const vsupnE = "⫌︀";
const vsupne = "⊋︀";
const Vvdash = "⊪";
const vzigzag = "⦚";
const Wcirc = "Ŵ";
const wcirc = "ŵ";
const wedbar = "⩟";
const wedge = "∧";
const Wedge = "⋀";
const wedgeq = "≙";
const weierp = "℘";
const Wfr = "𝔚";
const wfr = "𝔴";
const Wopf = "𝕎";
const wopf = "𝕨";
const wp = "℘";
const wr = "≀";
const wreath = "≀";
const Wscr = "𝒲";
const wscr = "𝓌";
const xcap = "⋂";
const xcirc = "◯";
const xcup = "⋃";
const xdtri = "▽";
const Xfr = "𝔛";
const xfr = "𝔵";
const xharr = "⟷";
const xhArr = "⟺";
const Xi = "Ξ";
const xi = "ξ";
const xlarr = "⟵";
const xlArr = "⟸";
const xmap = "⟼";
const xnis = "⋻";
const xodot = "⨀";
const Xopf = "𝕏";
const xopf = "𝕩";
const xoplus = "⨁";
const xotime = "⨂";
const xrarr = "⟶";
const xrArr = "⟹";
const Xscr = "𝒳";
const xscr = "𝓍";
const xsqcup = "⨆";
const xuplus = "⨄";
const xutri = "△";
const xvee = "⋁";
const xwedge = "⋀";
const Yacute = "Ý";
const yacute = "ý";
const YAcy = "Я";
const yacy = "я";
const Ycirc = "Ŷ";
const ycirc = "ŷ";
const Ycy = "Ы";
const ycy = "ы";
const yen = "¥";
const Yfr = "𝔜";
const yfr = "𝔶";
const YIcy = "Ї";
const yicy = "ї";
const Yopf = "𝕐";
const yopf = "𝕪";
const Yscr = "𝒴";
const yscr = "𝓎";
const YUcy = "Ю";
const yucy = "ю";
const yuml = "ÿ";
const Yuml = "Ÿ";
const Zacute = "Ź";
const zacute = "ź";
const Zcaron = "Ž";
const zcaron = "ž";
const Zcy = "З";
const zcy = "з";
const Zdot = "Ż";
const zdot = "ż";
const zeetrf = "ℨ";
const ZeroWidthSpace = "​";
const Zeta = "Ζ";
const zeta = "ζ";
const zfr = "𝔷";
const Zfr = "ℨ";
const ZHcy = "Ж";
const zhcy = "ж";
const zigrarr = "⇝";
const zopf = "𝕫";
const Zopf = "ℤ";
const Zscr = "𝒵";
const zscr = "𝓏";
const zwj = "‍";
const zwnj = "‌";
var require$$0 = {
  Aacute: Aacute,
  aacute: aacute,
  Abreve: Abreve,
  abreve: abreve,
  ac: ac,
  acd: acd,
  acE: acE,
  Acirc: Acirc,
  acirc: acirc,
  acute: acute,
  Acy: Acy,
  acy: acy,
  AElig: AElig,
  aelig: aelig,
  af: af,
  Afr: Afr,
  afr: afr,
  Agrave: Agrave,
  agrave: agrave,
  alefsym: alefsym,
  aleph: aleph,
  Alpha: Alpha,
  alpha: alpha,
  Amacr: Amacr,
  amacr: amacr,
  amalg: amalg,
  amp: amp,
  AMP: AMP,
  andand: andand,
  And: And,
  and: and,
  andd: andd,
  andslope: andslope,
  andv: andv,
  ang: ang,
  ange: ange,
  angle: angle,
  angmsdaa: angmsdaa,
  angmsdab: angmsdab,
  angmsdac: angmsdac,
  angmsdad: angmsdad,
  angmsdae: angmsdae,
  angmsdaf: angmsdaf,
  angmsdag: angmsdag,
  angmsdah: angmsdah,
  angmsd: angmsd,
  angrt: angrt,
  angrtvb: angrtvb,
  angrtvbd: angrtvbd,
  angsph: angsph,
  angst: angst,
  angzarr: angzarr,
  Aogon: Aogon,
  aogon: aogon,
  Aopf: Aopf,
  aopf: aopf,
  apacir: apacir,
  ap: ap,
  apE: apE,
  ape: ape,
  apid: apid,
  apos: apos,
  ApplyFunction: ApplyFunction,
  approx: approx,
  approxeq: approxeq,
  Aring: Aring,
  aring: aring,
  Ascr: Ascr,
  ascr: ascr,
  Assign: Assign,
  ast: ast,
  asymp: asymp,
  asympeq: asympeq,
  Atilde: Atilde,
  atilde: atilde,
  Auml: Auml,
  auml: auml,
  awconint: awconint,
  awint: awint,
  backcong: backcong,
  backepsilon: backepsilon,
  backprime: backprime,
  backsim: backsim,
  backsimeq: backsimeq,
  Backslash: Backslash,
  Barv: Barv,
  barvee: barvee,
  barwed: barwed,
  Barwed: Barwed,
  barwedge: barwedge,
  bbrk: bbrk,
  bbrktbrk: bbrktbrk,
  bcong: bcong,
  Bcy: Bcy,
  bcy: bcy,
  bdquo: bdquo,
  becaus: becaus,
  because: because,
  Because: Because,
  bemptyv: bemptyv,
  bepsi: bepsi,
  bernou: bernou,
  Bernoullis: Bernoullis,
  Beta: Beta,
  beta: beta,
  beth: beth,
  between: between,
  Bfr: Bfr,
  bfr: bfr,
  bigcap: bigcap,
  bigcirc: bigcirc,
  bigcup: bigcup,
  bigodot: bigodot,
  bigoplus: bigoplus,
  bigotimes: bigotimes,
  bigsqcup: bigsqcup,
  bigstar: bigstar,
  bigtriangledown: bigtriangledown,
  bigtriangleup: bigtriangleup,
  biguplus: biguplus,
  bigvee: bigvee,
  bigwedge: bigwedge,
  bkarow: bkarow,
  blacklozenge: blacklozenge,
  blacksquare: blacksquare,
  blacktriangle: blacktriangle,
  blacktriangledown: blacktriangledown,
  blacktriangleleft: blacktriangleleft,
  blacktriangleright: blacktriangleright,
  blank: blank,
  blk12: blk12,
  blk14: blk14,
  blk34: blk34,
  block: block,
  bne: bne,
  bnequiv: bnequiv,
  bNot: bNot,
  bnot: bnot,
  Bopf: Bopf,
  bopf: bopf,
  bot: bot,
  bottom: bottom,
  bowtie: bowtie,
  boxbox: boxbox,
  boxdl: boxdl,
  boxdL: boxdL,
  boxDl: boxDl,
  boxDL: boxDL,
  boxdr: boxdr,
  boxdR: boxdR,
  boxDr: boxDr,
  boxDR: boxDR,
  boxh: boxh,
  boxH: boxH,
  boxhd: boxhd,
  boxHd: boxHd,
  boxhD: boxhD,
  boxHD: boxHD,
  boxhu: boxhu,
  boxHu: boxHu,
  boxhU: boxhU,
  boxHU: boxHU,
  boxminus: boxminus,
  boxplus: boxplus,
  boxtimes: boxtimes,
  boxul: boxul,
  boxuL: boxuL,
  boxUl: boxUl,
  boxUL: boxUL,
  boxur: boxur,
  boxuR: boxuR,
  boxUr: boxUr,
  boxUR: boxUR,
  boxv: boxv,
  boxV: boxV,
  boxvh: boxvh,
  boxvH: boxvH,
  boxVh: boxVh,
  boxVH: boxVH,
  boxvl: boxvl,
  boxvL: boxvL,
  boxVl: boxVl,
  boxVL: boxVL,
  boxvr: boxvr,
  boxvR: boxvR,
  boxVr: boxVr,
  boxVR: boxVR,
  bprime: bprime,
  breve: breve,
  Breve: Breve,
  brvbar: brvbar,
  bscr: bscr,
  Bscr: Bscr,
  bsemi: bsemi,
  bsim: bsim,
  bsime: bsime,
  bsolb: bsolb,
  bsol: bsol,
  bsolhsub: bsolhsub,
  bull: bull,
  bullet: bullet,
  bump: bump,
  bumpE: bumpE,
  bumpe: bumpe,
  Bumpeq: Bumpeq,
  bumpeq: bumpeq,
  Cacute: Cacute,
  cacute: cacute,
  capand: capand,
  capbrcup: capbrcup,
  capcap: capcap,
  cap: cap,
  Cap: Cap,
  capcup: capcup,
  capdot: capdot,
  CapitalDifferentialD: CapitalDifferentialD,
  caps: caps,
  caret: caret,
  caron: caron,
  Cayleys: Cayleys,
  ccaps: ccaps,
  Ccaron: Ccaron,
  ccaron: ccaron,
  Ccedil: Ccedil,
  ccedil: ccedil,
  Ccirc: Ccirc,
  ccirc: ccirc,
  Cconint: Cconint,
  ccups: ccups,
  ccupssm: ccupssm,
  Cdot: Cdot,
  cdot: cdot,
  cedil: cedil,
  Cedilla: Cedilla,
  cemptyv: cemptyv,
  cent: cent,
  centerdot: centerdot,
  CenterDot: CenterDot,
  cfr: cfr,
  Cfr: Cfr,
  CHcy: CHcy,
  chcy: chcy,
  check: check,
  checkmark: checkmark,
  Chi: Chi,
  chi: chi,
  circ: circ,
  circeq: circeq,
  circlearrowleft: circlearrowleft,
  circlearrowright: circlearrowright,
  circledast: circledast,
  circledcirc: circledcirc,
  circleddash: circleddash,
  CircleDot: CircleDot,
  circledR: circledR,
  circledS: circledS,
  CircleMinus: CircleMinus,
  CirclePlus: CirclePlus,
  CircleTimes: CircleTimes,
  cir: cir,
  cirE: cirE,
  cire: cire,
  cirfnint: cirfnint,
  cirmid: cirmid,
  cirscir: cirscir,
  ClockwiseContourIntegral: ClockwiseContourIntegral,
  CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
  CloseCurlyQuote: CloseCurlyQuote,
  clubs: clubs,
  clubsuit: clubsuit,
  colon: colon,
  Colon: Colon,
  Colone: Colone,
  colone: colone,
  coloneq: coloneq,
  comma: comma,
  commat: commat,
  comp: comp,
  compfn: compfn,
  complement: complement,
  complexes: complexes,
  cong: cong,
  congdot: congdot,
  Congruent: Congruent,
  conint: conint,
  Conint: Conint,
  ContourIntegral: ContourIntegral,
  copf: copf,
  Copf: Copf,
  coprod: coprod,
  Coproduct: Coproduct,
  copy: copy,
  COPY: COPY,
  copysr: copysr,
  CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
  crarr: crarr,
  cross: cross,
  Cross: Cross,
  Cscr: Cscr,
  cscr: cscr,
  csub: csub,
  csube: csube,
  csup: csup,
  csupe: csupe,
  ctdot: ctdot,
  cudarrl: cudarrl,
  cudarrr: cudarrr,
  cuepr: cuepr,
  cuesc: cuesc,
  cularr: cularr,
  cularrp: cularrp,
  cupbrcap: cupbrcap,
  cupcap: cupcap,
  CupCap: CupCap,
  cup: cup,
  Cup: Cup,
  cupcup: cupcup,
  cupdot: cupdot,
  cupor: cupor,
  cups: cups,
  curarr: curarr,
  curarrm: curarrm,
  curlyeqprec: curlyeqprec,
  curlyeqsucc: curlyeqsucc,
  curlyvee: curlyvee,
  curlywedge: curlywedge,
  curren: curren,
  curvearrowleft: curvearrowleft,
  curvearrowright: curvearrowright,
  cuvee: cuvee,
  cuwed: cuwed,
  cwconint: cwconint,
  cwint: cwint,
  cylcty: cylcty,
  dagger: dagger,
  Dagger: Dagger,
  daleth: daleth,
  darr: darr,
  Darr: Darr,
  dArr: dArr,
  dash: dash,
  Dashv: Dashv,
  dashv: dashv,
  dbkarow: dbkarow,
  dblac: dblac,
  Dcaron: Dcaron,
  dcaron: dcaron,
  Dcy: Dcy,
  dcy: dcy,
  ddagger: ddagger,
  ddarr: ddarr,
  DD: DD,
  dd: dd,
  DDotrahd: DDotrahd,
  ddotseq: ddotseq,
  deg: deg,
  Del: Del,
  Delta: Delta,
  delta: delta,
  demptyv: demptyv,
  dfisht: dfisht,
  Dfr: Dfr,
  dfr: dfr,
  dHar: dHar,
  dharl: dharl,
  dharr: dharr,
  DiacriticalAcute: DiacriticalAcute,
  DiacriticalDot: DiacriticalDot,
  DiacriticalDoubleAcute: DiacriticalDoubleAcute,
  DiacriticalGrave: DiacriticalGrave,
  DiacriticalTilde: DiacriticalTilde,
  diam: diam,
  diamond: diamond,
  Diamond: Diamond,
  diamondsuit: diamondsuit,
  diams: diams,
  die: die,
  DifferentialD: DifferentialD,
  digamma: digamma,
  disin: disin,
  div: div,
  divide: divide,
  divideontimes: divideontimes,
  divonx: divonx,
  DJcy: DJcy,
  djcy: djcy,
  dlcorn: dlcorn,
  dlcrop: dlcrop,
  dollar: dollar,
  Dopf: Dopf,
  dopf: dopf,
  Dot: Dot,
  dot: dot,
  DotDot: DotDot,
  doteq: doteq,
  doteqdot: doteqdot,
  DotEqual: DotEqual,
  dotminus: dotminus,
  dotplus: dotplus,
  dotsquare: dotsquare,
  doublebarwedge: doublebarwedge,
  DoubleContourIntegral: DoubleContourIntegral,
  DoubleDot: DoubleDot,
  DoubleDownArrow: DoubleDownArrow,
  DoubleLeftArrow: DoubleLeftArrow,
  DoubleLeftRightArrow: DoubleLeftRightArrow,
  DoubleLeftTee: DoubleLeftTee,
  DoubleLongLeftArrow: DoubleLongLeftArrow,
  DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
  DoubleLongRightArrow: DoubleLongRightArrow,
  DoubleRightArrow: DoubleRightArrow,
  DoubleRightTee: DoubleRightTee,
  DoubleUpArrow: DoubleUpArrow,
  DoubleUpDownArrow: DoubleUpDownArrow,
  DoubleVerticalBar: DoubleVerticalBar,
  DownArrowBar: DownArrowBar,
  downarrow: downarrow,
  DownArrow: DownArrow,
  Downarrow: Downarrow,
  DownArrowUpArrow: DownArrowUpArrow,
  DownBreve: DownBreve,
  downdownarrows: downdownarrows,
  downharpoonleft: downharpoonleft,
  downharpoonright: downharpoonright,
  DownLeftRightVector: DownLeftRightVector,
  DownLeftTeeVector: DownLeftTeeVector,
  DownLeftVectorBar: DownLeftVectorBar,
  DownLeftVector: DownLeftVector,
  DownRightTeeVector: DownRightTeeVector,
  DownRightVectorBar: DownRightVectorBar,
  DownRightVector: DownRightVector,
  DownTeeArrow: DownTeeArrow,
  DownTee: DownTee,
  drbkarow: drbkarow,
  drcorn: drcorn,
  drcrop: drcrop,
  Dscr: Dscr,
  dscr: dscr,
  DScy: DScy,
  dscy: dscy,
  dsol: dsol,
  Dstrok: Dstrok,
  dstrok: dstrok,
  dtdot: dtdot,
  dtri: dtri,
  dtrif: dtrif,
  duarr: duarr,
  duhar: duhar,
  dwangle: dwangle,
  DZcy: DZcy,
  dzcy: dzcy,
  dzigrarr: dzigrarr,
  Eacute: Eacute,
  eacute: eacute,
  easter: easter,
  Ecaron: Ecaron,
  ecaron: ecaron,
  Ecirc: Ecirc,
  ecirc: ecirc,
  ecir: ecir,
  ecolon: ecolon,
  Ecy: Ecy,
  ecy: ecy,
  eDDot: eDDot,
  Edot: Edot,
  edot: edot,
  eDot: eDot,
  ee: ee,
  efDot: efDot,
  Efr: Efr,
  efr: efr,
  eg: eg,
  Egrave: Egrave,
  egrave: egrave,
  egs: egs,
  egsdot: egsdot,
  el: el,
  Element: Element,
  elinters: elinters,
  ell: ell,
  els: els,
  elsdot: elsdot,
  Emacr: Emacr,
  emacr: emacr,
  empty: empty,
  emptyset: emptyset,
  EmptySmallSquare: EmptySmallSquare,
  emptyv: emptyv,
  EmptyVerySmallSquare: EmptyVerySmallSquare,
  emsp13: emsp13,
  emsp14: emsp14,
  emsp: emsp,
  ENG: ENG,
  eng: eng,
  ensp: ensp,
  Eogon: Eogon,
  eogon: eogon,
  Eopf: Eopf,
  eopf: eopf,
  epar: epar,
  eparsl: eparsl,
  eplus: eplus,
  epsi: epsi,
  Epsilon: Epsilon,
  epsilon: epsilon,
  epsiv: epsiv,
  eqcirc: eqcirc,
  eqcolon: eqcolon,
  eqsim: eqsim,
  eqslantgtr: eqslantgtr,
  eqslantless: eqslantless,
  Equal: Equal,
  equals: equals,
  EqualTilde: EqualTilde,
  equest: equest,
  Equilibrium: Equilibrium,
  equiv: equiv,
  equivDD: equivDD,
  eqvparsl: eqvparsl,
  erarr: erarr,
  erDot: erDot,
  escr: escr,
  Escr: Escr,
  esdot: esdot,
  Esim: Esim,
  esim: esim,
  Eta: Eta,
  eta: eta,
  ETH: ETH,
  eth: eth,
  Euml: Euml,
  euml: euml,
  euro: euro,
  excl: excl,
  exist: exist,
  Exists: Exists,
  expectation: expectation,
  exponentiale: exponentiale,
  ExponentialE: ExponentialE,
  fallingdotseq: fallingdotseq,
  Fcy: Fcy,
  fcy: fcy,
  female: female,
  ffilig: ffilig,
  fflig: fflig,
  ffllig: ffllig,
  Ffr: Ffr,
  ffr: ffr,
  filig: filig,
  FilledSmallSquare: FilledSmallSquare,
  FilledVerySmallSquare: FilledVerySmallSquare,
  fjlig: fjlig,
  flat: flat,
  fllig: fllig,
  fltns: fltns,
  fnof: fnof,
  Fopf: Fopf,
  fopf: fopf,
  forall: forall,
  ForAll: ForAll,
  fork: fork,
  forkv: forkv,
  Fouriertrf: Fouriertrf,
  fpartint: fpartint,
  frac12: frac12,
  frac13: frac13,
  frac14: frac14,
  frac15: frac15,
  frac16: frac16,
  frac18: frac18,
  frac23: frac23,
  frac25: frac25,
  frac34: frac34,
  frac35: frac35,
  frac38: frac38,
  frac45: frac45,
  frac56: frac56,
  frac58: frac58,
  frac78: frac78,
  frasl: frasl,
  frown: frown,
  fscr: fscr,
  Fscr: Fscr,
  gacute: gacute,
  Gamma: Gamma,
  gamma: gamma,
  Gammad: Gammad,
  gammad: gammad,
  gap: gap,
  Gbreve: Gbreve,
  gbreve: gbreve,
  Gcedil: Gcedil,
  Gcirc: Gcirc,
  gcirc: gcirc,
  Gcy: Gcy,
  gcy: gcy,
  Gdot: Gdot,
  gdot: gdot,
  ge: ge,
  gE: gE,
  gEl: gEl,
  gel: gel,
  geq: geq,
  geqq: geqq,
  geqslant: geqslant,
  gescc: gescc,
  ges: ges,
  gesdot: gesdot,
  gesdoto: gesdoto,
  gesdotol: gesdotol,
  gesl: gesl,
  gesles: gesles,
  Gfr: Gfr,
  gfr: gfr,
  gg: gg,
  Gg: Gg,
  ggg: ggg,
  gimel: gimel,
  GJcy: GJcy,
  gjcy: gjcy,
  gla: gla,
  gl: gl,
  glE: glE,
  glj: glj,
  gnap: gnap,
  gnapprox: gnapprox,
  gne: gne,
  gnE: gnE,
  gneq: gneq,
  gneqq: gneqq,
  gnsim: gnsim,
  Gopf: Gopf,
  gopf: gopf,
  grave: grave,
  GreaterEqual: GreaterEqual,
  GreaterEqualLess: GreaterEqualLess,
  GreaterFullEqual: GreaterFullEqual,
  GreaterGreater: GreaterGreater,
  GreaterLess: GreaterLess,
  GreaterSlantEqual: GreaterSlantEqual,
  GreaterTilde: GreaterTilde,
  Gscr: Gscr,
  gscr: gscr,
  gsim: gsim,
  gsime: gsime,
  gsiml: gsiml,
  gtcc: gtcc,
  gtcir: gtcir,
  gt: gt,
  GT: GT,
  Gt: Gt,
  gtdot: gtdot,
  gtlPar: gtlPar,
  gtquest: gtquest,
  gtrapprox: gtrapprox,
  gtrarr: gtrarr,
  gtrdot: gtrdot,
  gtreqless: gtreqless,
  gtreqqless: gtreqqless,
  gtrless: gtrless,
  gtrsim: gtrsim,
  gvertneqq: gvertneqq,
  gvnE: gvnE,
  Hacek: Hacek,
  hairsp: hairsp,
  half: half,
  hamilt: hamilt,
  HARDcy: HARDcy,
  hardcy: hardcy,
  harrcir: harrcir,
  harr: harr,
  hArr: hArr,
  harrw: harrw,
  Hat: Hat,
  hbar: hbar,
  Hcirc: Hcirc,
  hcirc: hcirc,
  hearts: hearts,
  heartsuit: heartsuit,
  hellip: hellip,
  hercon: hercon,
  hfr: hfr,
  Hfr: Hfr,
  HilbertSpace: HilbertSpace,
  hksearow: hksearow,
  hkswarow: hkswarow,
  hoarr: hoarr,
  homtht: homtht,
  hookleftarrow: hookleftarrow,
  hookrightarrow: hookrightarrow,
  hopf: hopf,
  Hopf: Hopf,
  horbar: horbar,
  HorizontalLine: HorizontalLine,
  hscr: hscr,
  Hscr: Hscr,
  hslash: hslash,
  Hstrok: Hstrok,
  hstrok: hstrok,
  HumpDownHump: HumpDownHump,
  HumpEqual: HumpEqual,
  hybull: hybull,
  hyphen: hyphen,
  Iacute: Iacute,
  iacute: iacute,
  ic: ic,
  Icirc: Icirc,
  icirc: icirc,
  Icy: Icy,
  icy: icy,
  Idot: Idot,
  IEcy: IEcy,
  iecy: iecy,
  iexcl: iexcl,
  iff: iff,
  ifr: ifr,
  Ifr: Ifr,
  Igrave: Igrave,
  igrave: igrave,
  ii: ii,
  iiiint: iiiint,
  iiint: iiint,
  iinfin: iinfin,
  iiota: iiota,
  IJlig: IJlig,
  ijlig: ijlig,
  Imacr: Imacr,
  imacr: imacr,
  image: image,
  ImaginaryI: ImaginaryI,
  imagline: imagline,
  imagpart: imagpart,
  imath: imath,
  Im: Im,
  imof: imof,
  imped: imped,
  Implies: Implies,
  incare: incare,
  "in": "∈",
  infin: infin,
  infintie: infintie,
  inodot: inodot,
  intcal: intcal,
  int: int,
  Int: Int,
  integers: integers,
  Integral: Integral,
  intercal: intercal,
  Intersection: Intersection,
  intlarhk: intlarhk,
  intprod: intprod,
  InvisibleComma: InvisibleComma,
  InvisibleTimes: InvisibleTimes,
  IOcy: IOcy,
  iocy: iocy,
  Iogon: Iogon,
  iogon: iogon,
  Iopf: Iopf,
  iopf: iopf,
  Iota: Iota,
  iota: iota,
  iprod: iprod,
  iquest: iquest,
  iscr: iscr,
  Iscr: Iscr,
  isin: isin,
  isindot: isindot,
  isinE: isinE,
  isins: isins,
  isinsv: isinsv,
  isinv: isinv,
  it: it,
  Itilde: Itilde,
  itilde: itilde,
  Iukcy: Iukcy,
  iukcy: iukcy,
  Iuml: Iuml,
  iuml: iuml,
  Jcirc: Jcirc,
  jcirc: jcirc,
  Jcy: Jcy,
  jcy: jcy,
  Jfr: Jfr,
  jfr: jfr,
  jmath: jmath,
  Jopf: Jopf,
  jopf: jopf,
  Jscr: Jscr,
  jscr: jscr,
  Jsercy: Jsercy,
  jsercy: jsercy,
  Jukcy: Jukcy,
  jukcy: jukcy,
  Kappa: Kappa,
  kappa: kappa,
  kappav: kappav,
  Kcedil: Kcedil,
  kcedil: kcedil,
  Kcy: Kcy,
  kcy: kcy,
  Kfr: Kfr,
  kfr: kfr,
  kgreen: kgreen,
  KHcy: KHcy,
  khcy: khcy,
  KJcy: KJcy,
  kjcy: kjcy,
  Kopf: Kopf,
  kopf: kopf,
  Kscr: Kscr,
  kscr: kscr,
  lAarr: lAarr,
  Lacute: Lacute,
  lacute: lacute,
  laemptyv: laemptyv,
  lagran: lagran,
  Lambda: Lambda,
  lambda: lambda,
  lang: lang,
  Lang: Lang,
  langd: langd,
  langle: langle,
  lap: lap,
  Laplacetrf: Laplacetrf,
  laquo: laquo,
  larrb: larrb,
  larrbfs: larrbfs,
  larr: larr,
  Larr: Larr,
  lArr: lArr,
  larrfs: larrfs,
  larrhk: larrhk,
  larrlp: larrlp,
  larrpl: larrpl,
  larrsim: larrsim,
  larrtl: larrtl,
  latail: latail,
  lAtail: lAtail,
  lat: lat,
  late: late,
  lates: lates,
  lbarr: lbarr,
  lBarr: lBarr,
  lbbrk: lbbrk,
  lbrace: lbrace,
  lbrack: lbrack,
  lbrke: lbrke,
  lbrksld: lbrksld,
  lbrkslu: lbrkslu,
  Lcaron: Lcaron,
  lcaron: lcaron,
  Lcedil: Lcedil,
  lcedil: lcedil,
  lceil: lceil,
  lcub: lcub,
  Lcy: Lcy,
  lcy: lcy,
  ldca: ldca,
  ldquo: ldquo,
  ldquor: ldquor,
  ldrdhar: ldrdhar,
  ldrushar: ldrushar,
  ldsh: ldsh,
  le: le,
  lE: lE,
  LeftAngleBracket: LeftAngleBracket,
  LeftArrowBar: LeftArrowBar,
  leftarrow: leftarrow,
  LeftArrow: LeftArrow,
  Leftarrow: Leftarrow,
  LeftArrowRightArrow: LeftArrowRightArrow,
  leftarrowtail: leftarrowtail,
  LeftCeiling: LeftCeiling,
  LeftDoubleBracket: LeftDoubleBracket,
  LeftDownTeeVector: LeftDownTeeVector,
  LeftDownVectorBar: LeftDownVectorBar,
  LeftDownVector: LeftDownVector,
  LeftFloor: LeftFloor,
  leftharpoondown: leftharpoondown,
  leftharpoonup: leftharpoonup,
  leftleftarrows: leftleftarrows,
  leftrightarrow: leftrightarrow,
  LeftRightArrow: LeftRightArrow,
  Leftrightarrow: Leftrightarrow,
  leftrightarrows: leftrightarrows,
  leftrightharpoons: leftrightharpoons,
  leftrightsquigarrow: leftrightsquigarrow,
  LeftRightVector: LeftRightVector,
  LeftTeeArrow: LeftTeeArrow,
  LeftTee: LeftTee,
  LeftTeeVector: LeftTeeVector,
  leftthreetimes: leftthreetimes,
  LeftTriangleBar: LeftTriangleBar,
  LeftTriangle: LeftTriangle,
  LeftTriangleEqual: LeftTriangleEqual,
  LeftUpDownVector: LeftUpDownVector,
  LeftUpTeeVector: LeftUpTeeVector,
  LeftUpVectorBar: LeftUpVectorBar,
  LeftUpVector: LeftUpVector,
  LeftVectorBar: LeftVectorBar,
  LeftVector: LeftVector,
  lEg: lEg,
  leg: leg,
  leq: leq,
  leqq: leqq,
  leqslant: leqslant,
  lescc: lescc,
  les: les,
  lesdot: lesdot,
  lesdoto: lesdoto,
  lesdotor: lesdotor,
  lesg: lesg,
  lesges: lesges,
  lessapprox: lessapprox,
  lessdot: lessdot,
  lesseqgtr: lesseqgtr,
  lesseqqgtr: lesseqqgtr,
  LessEqualGreater: LessEqualGreater,
  LessFullEqual: LessFullEqual,
  LessGreater: LessGreater,
  lessgtr: lessgtr,
  LessLess: LessLess,
  lesssim: lesssim,
  LessSlantEqual: LessSlantEqual,
  LessTilde: LessTilde,
  lfisht: lfisht,
  lfloor: lfloor,
  Lfr: Lfr,
  lfr: lfr,
  lg: lg,
  lgE: lgE,
  lHar: lHar,
  lhard: lhard,
  lharu: lharu,
  lharul: lharul,
  lhblk: lhblk,
  LJcy: LJcy,
  ljcy: ljcy,
  llarr: llarr,
  ll: ll,
  Ll: Ll,
  llcorner: llcorner,
  Lleftarrow: Lleftarrow,
  llhard: llhard,
  lltri: lltri,
  Lmidot: Lmidot,
  lmidot: lmidot,
  lmoustache: lmoustache,
  lmoust: lmoust,
  lnap: lnap,
  lnapprox: lnapprox,
  lne: lne,
  lnE: lnE,
  lneq: lneq,
  lneqq: lneqq,
  lnsim: lnsim,
  loang: loang,
  loarr: loarr,
  lobrk: lobrk,
  longleftarrow: longleftarrow,
  LongLeftArrow: LongLeftArrow,
  Longleftarrow: Longleftarrow,
  longleftrightarrow: longleftrightarrow,
  LongLeftRightArrow: LongLeftRightArrow,
  Longleftrightarrow: Longleftrightarrow,
  longmapsto: longmapsto,
  longrightarrow: longrightarrow,
  LongRightArrow: LongRightArrow,
  Longrightarrow: Longrightarrow,
  looparrowleft: looparrowleft,
  looparrowright: looparrowright,
  lopar: lopar,
  Lopf: Lopf,
  lopf: lopf,
  loplus: loplus,
  lotimes: lotimes,
  lowast: lowast,
  lowbar: lowbar,
  LowerLeftArrow: LowerLeftArrow,
  LowerRightArrow: LowerRightArrow,
  loz: loz,
  lozenge: lozenge,
  lozf: lozf,
  lpar: lpar,
  lparlt: lparlt,
  lrarr: lrarr,
  lrcorner: lrcorner,
  lrhar: lrhar,
  lrhard: lrhard,
  lrm: lrm,
  lrtri: lrtri,
  lsaquo: lsaquo,
  lscr: lscr,
  Lscr: Lscr,
  lsh: lsh,
  Lsh: Lsh,
  lsim: lsim,
  lsime: lsime,
  lsimg: lsimg,
  lsqb: lsqb,
  lsquo: lsquo,
  lsquor: lsquor,
  Lstrok: Lstrok,
  lstrok: lstrok,
  ltcc: ltcc,
  ltcir: ltcir,
  lt: lt,
  LT: LT,
  Lt: Lt,
  ltdot: ltdot,
  lthree: lthree,
  ltimes: ltimes,
  ltlarr: ltlarr,
  ltquest: ltquest,
  ltri: ltri,
  ltrie: ltrie,
  ltrif: ltrif,
  ltrPar: ltrPar,
  lurdshar: lurdshar,
  luruhar: luruhar,
  lvertneqq: lvertneqq,
  lvnE: lvnE,
  macr: macr,
  male: male,
  malt: malt,
  maltese: maltese,
  "Map": "⤅",
  map: map,
  mapsto: mapsto,
  mapstodown: mapstodown,
  mapstoleft: mapstoleft,
  mapstoup: mapstoup,
  marker: marker,
  mcomma: mcomma,
  Mcy: Mcy,
  mcy: mcy,
  mdash: mdash,
  mDDot: mDDot,
  measuredangle: measuredangle,
  MediumSpace: MediumSpace,
  Mellintrf: Mellintrf,
  Mfr: Mfr,
  mfr: mfr,
  mho: mho,
  micro: micro,
  midast: midast,
  midcir: midcir,
  mid: mid,
  middot: middot,
  minusb: minusb,
  minus: minus,
  minusd: minusd,
  minusdu: minusdu,
  MinusPlus: MinusPlus,
  mlcp: mlcp,
  mldr: mldr,
  mnplus: mnplus,
  models: models,
  Mopf: Mopf,
  mopf: mopf,
  mp: mp,
  mscr: mscr,
  Mscr: Mscr,
  mstpos: mstpos,
  Mu: Mu,
  mu: mu,
  multimap: multimap,
  mumap: mumap,
  nabla: nabla,
  Nacute: Nacute,
  nacute: nacute,
  nang: nang,
  nap: nap,
  napE: napE,
  napid: napid,
  napos: napos,
  napprox: napprox,
  natural: natural,
  naturals: naturals,
  natur: natur,
  nbsp: nbsp,
  nbump: nbump,
  nbumpe: nbumpe,
  ncap: ncap,
  Ncaron: Ncaron,
  ncaron: ncaron,
  Ncedil: Ncedil,
  ncedil: ncedil,
  ncong: ncong,
  ncongdot: ncongdot,
  ncup: ncup,
  Ncy: Ncy,
  ncy: ncy,
  ndash: ndash,
  nearhk: nearhk,
  nearr: nearr,
  neArr: neArr,
  nearrow: nearrow,
  ne: ne,
  nedot: nedot,
  NegativeMediumSpace: NegativeMediumSpace,
  NegativeThickSpace: NegativeThickSpace,
  NegativeThinSpace: NegativeThinSpace,
  NegativeVeryThinSpace: NegativeVeryThinSpace,
  nequiv: nequiv,
  nesear: nesear,
  nesim: nesim,
  NestedGreaterGreater: NestedGreaterGreater,
  NestedLessLess: NestedLessLess,
  NewLine: NewLine,
  nexist: nexist,
  nexists: nexists,
  Nfr: Nfr,
  nfr: nfr,
  ngE: ngE,
  nge: nge,
  ngeq: ngeq,
  ngeqq: ngeqq,
  ngeqslant: ngeqslant,
  nges: nges,
  nGg: nGg,
  ngsim: ngsim,
  nGt: nGt,
  ngt: ngt,
  ngtr: ngtr,
  nGtv: nGtv,
  nharr: nharr,
  nhArr: nhArr,
  nhpar: nhpar,
  ni: ni,
  nis: nis,
  nisd: nisd,
  niv: niv,
  NJcy: NJcy,
  njcy: njcy,
  nlarr: nlarr,
  nlArr: nlArr,
  nldr: nldr,
  nlE: nlE,
  nle: nle,
  nleftarrow: nleftarrow,
  nLeftarrow: nLeftarrow,
  nleftrightarrow: nleftrightarrow,
  nLeftrightarrow: nLeftrightarrow,
  nleq: nleq,
  nleqq: nleqq,
  nleqslant: nleqslant,
  nles: nles,
  nless: nless,
  nLl: nLl,
  nlsim: nlsim,
  nLt: nLt,
  nlt: nlt,
  nltri: nltri,
  nltrie: nltrie,
  nLtv: nLtv,
  nmid: nmid,
  NoBreak: NoBreak,
  NonBreakingSpace: NonBreakingSpace,
  nopf: nopf,
  Nopf: Nopf,
  Not: Not,
  not: not,
  NotCongruent: NotCongruent,
  NotCupCap: NotCupCap,
  NotDoubleVerticalBar: NotDoubleVerticalBar,
  NotElement: NotElement,
  NotEqual: NotEqual,
  NotEqualTilde: NotEqualTilde,
  NotExists: NotExists,
  NotGreater: NotGreater,
  NotGreaterEqual: NotGreaterEqual,
  NotGreaterFullEqual: NotGreaterFullEqual,
  NotGreaterGreater: NotGreaterGreater,
  NotGreaterLess: NotGreaterLess,
  NotGreaterSlantEqual: NotGreaterSlantEqual,
  NotGreaterTilde: NotGreaterTilde,
  NotHumpDownHump: NotHumpDownHump,
  NotHumpEqual: NotHumpEqual,
  notin: notin,
  notindot: notindot,
  notinE: notinE,
  notinva: notinva,
  notinvb: notinvb,
  notinvc: notinvc,
  NotLeftTriangleBar: NotLeftTriangleBar,
  NotLeftTriangle: NotLeftTriangle,
  NotLeftTriangleEqual: NotLeftTriangleEqual,
  NotLess: NotLess,
  NotLessEqual: NotLessEqual,
  NotLessGreater: NotLessGreater,
  NotLessLess: NotLessLess,
  NotLessSlantEqual: NotLessSlantEqual,
  NotLessTilde: NotLessTilde,
  NotNestedGreaterGreater: NotNestedGreaterGreater,
  NotNestedLessLess: NotNestedLessLess,
  notni: notni,
  notniva: notniva,
  notnivb: notnivb,
  notnivc: notnivc,
  NotPrecedes: NotPrecedes,
  NotPrecedesEqual: NotPrecedesEqual,
  NotPrecedesSlantEqual: NotPrecedesSlantEqual,
  NotReverseElement: NotReverseElement,
  NotRightTriangleBar: NotRightTriangleBar,
  NotRightTriangle: NotRightTriangle,
  NotRightTriangleEqual: NotRightTriangleEqual,
  NotSquareSubset: NotSquareSubset,
  NotSquareSubsetEqual: NotSquareSubsetEqual,
  NotSquareSuperset: NotSquareSuperset,
  NotSquareSupersetEqual: NotSquareSupersetEqual,
  NotSubset: NotSubset,
  NotSubsetEqual: NotSubsetEqual,
  NotSucceeds: NotSucceeds,
  NotSucceedsEqual: NotSucceedsEqual,
  NotSucceedsSlantEqual: NotSucceedsSlantEqual,
  NotSucceedsTilde: NotSucceedsTilde,
  NotSuperset: NotSuperset,
  NotSupersetEqual: NotSupersetEqual,
  NotTilde: NotTilde,
  NotTildeEqual: NotTildeEqual,
  NotTildeFullEqual: NotTildeFullEqual,
  NotTildeTilde: NotTildeTilde,
  NotVerticalBar: NotVerticalBar,
  nparallel: nparallel,
  npar: npar,
  nparsl: nparsl,
  npart: npart,
  npolint: npolint,
  npr: npr,
  nprcue: nprcue,
  nprec: nprec,
  npreceq: npreceq,
  npre: npre,
  nrarrc: nrarrc,
  nrarr: nrarr,
  nrArr: nrArr,
  nrarrw: nrarrw,
  nrightarrow: nrightarrow,
  nRightarrow: nRightarrow,
  nrtri: nrtri,
  nrtrie: nrtrie,
  nsc: nsc,
  nsccue: nsccue,
  nsce: nsce,
  Nscr: Nscr,
  nscr: nscr,
  nshortmid: nshortmid,
  nshortparallel: nshortparallel,
  nsim: nsim,
  nsime: nsime,
  nsimeq: nsimeq,
  nsmid: nsmid,
  nspar: nspar,
  nsqsube: nsqsube,
  nsqsupe: nsqsupe,
  nsub: nsub,
  nsubE: nsubE,
  nsube: nsube,
  nsubset: nsubset,
  nsubseteq: nsubseteq,
  nsubseteqq: nsubseteqq,
  nsucc: nsucc,
  nsucceq: nsucceq,
  nsup: nsup,
  nsupE: nsupE,
  nsupe: nsupe,
  nsupset: nsupset,
  nsupseteq: nsupseteq,
  nsupseteqq: nsupseteqq,
  ntgl: ntgl,
  Ntilde: Ntilde,
  ntilde: ntilde,
  ntlg: ntlg,
  ntriangleleft: ntriangleleft,
  ntrianglelefteq: ntrianglelefteq,
  ntriangleright: ntriangleright,
  ntrianglerighteq: ntrianglerighteq,
  Nu: Nu,
  nu: nu,
  num: num,
  numero: numero,
  numsp: numsp,
  nvap: nvap,
  nvdash: nvdash,
  nvDash: nvDash,
  nVdash: nVdash,
  nVDash: nVDash,
  nvge: nvge,
  nvgt: nvgt,
  nvHarr: nvHarr,
  nvinfin: nvinfin,
  nvlArr: nvlArr,
  nvle: nvle,
  nvlt: nvlt,
  nvltrie: nvltrie,
  nvrArr: nvrArr,
  nvrtrie: nvrtrie,
  nvsim: nvsim,
  nwarhk: nwarhk,
  nwarr: nwarr,
  nwArr: nwArr,
  nwarrow: nwarrow,
  nwnear: nwnear,
  Oacute: Oacute,
  oacute: oacute,
  oast: oast,
  Ocirc: Ocirc,
  ocirc: ocirc,
  ocir: ocir,
  Ocy: Ocy,
  ocy: ocy,
  odash: odash,
  Odblac: Odblac,
  odblac: odblac,
  odiv: odiv,
  odot: odot,
  odsold: odsold,
  OElig: OElig,
  oelig: oelig,
  ofcir: ofcir,
  Ofr: Ofr,
  ofr: ofr,
  ogon: ogon,
  Ograve: Ograve,
  ograve: ograve,
  ogt: ogt,
  ohbar: ohbar,
  ohm: ohm,
  oint: oint,
  olarr: olarr,
  olcir: olcir,
  olcross: olcross,
  oline: oline,
  olt: olt,
  Omacr: Omacr,
  omacr: omacr,
  Omega: Omega,
  omega: omega,
  Omicron: Omicron,
  omicron: omicron,
  omid: omid,
  ominus: ominus,
  Oopf: Oopf,
  oopf: oopf,
  opar: opar,
  OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
  OpenCurlyQuote: OpenCurlyQuote,
  operp: operp,
  oplus: oplus,
  orarr: orarr,
  Or: Or,
  or: or,
  ord: ord,
  order: order,
  orderof: orderof,
  ordf: ordf,
  ordm: ordm,
  origof: origof,
  oror: oror,
  orslope: orslope,
  orv: orv,
  oS: oS,
  Oscr: Oscr,
  oscr: oscr,
  Oslash: Oslash,
  oslash: oslash,
  osol: osol,
  Otilde: Otilde,
  otilde: otilde,
  otimesas: otimesas,
  Otimes: Otimes,
  otimes: otimes,
  Ouml: Ouml,
  ouml: ouml,
  ovbar: ovbar,
  OverBar: OverBar,
  OverBrace: OverBrace,
  OverBracket: OverBracket,
  OverParenthesis: OverParenthesis,
  para: para,
  parallel: parallel,
  par: par,
  parsim: parsim,
  parsl: parsl,
  part: part,
  PartialD: PartialD,
  Pcy: Pcy,
  pcy: pcy,
  percnt: percnt,
  period: period,
  permil: permil,
  perp: perp,
  pertenk: pertenk,
  Pfr: Pfr,
  pfr: pfr,
  Phi: Phi,
  phi: phi,
  phiv: phiv,
  phmmat: phmmat,
  phone: phone,
  Pi: Pi,
  pi: pi,
  pitchfork: pitchfork,
  piv: piv,
  planck: planck,
  planckh: planckh,
  plankv: plankv,
  plusacir: plusacir,
  plusb: plusb,
  pluscir: pluscir,
  plus: plus,
  plusdo: plusdo,
  plusdu: plusdu,
  pluse: pluse,
  PlusMinus: PlusMinus,
  plusmn: plusmn,
  plussim: plussim,
  plustwo: plustwo,
  pm: pm,
  Poincareplane: Poincareplane,
  pointint: pointint,
  popf: popf,
  Popf: Popf,
  pound: pound,
  prap: prap,
  Pr: Pr,
  pr: pr,
  prcue: prcue,
  precapprox: precapprox,
  prec: prec,
  preccurlyeq: preccurlyeq,
  Precedes: Precedes,
  PrecedesEqual: PrecedesEqual,
  PrecedesSlantEqual: PrecedesSlantEqual,
  PrecedesTilde: PrecedesTilde,
  preceq: preceq,
  precnapprox: precnapprox,
  precneqq: precneqq,
  precnsim: precnsim,
  pre: pre,
  prE: prE,
  precsim: precsim,
  prime: prime,
  Prime: Prime,
  primes: primes,
  prnap: prnap,
  prnE: prnE,
  prnsim: prnsim,
  prod: prod,
  Product: Product,
  profalar: profalar,
  profline: profline,
  profsurf: profsurf,
  prop: prop,
  Proportional: Proportional,
  Proportion: Proportion,
  propto: propto,
  prsim: prsim,
  prurel: prurel,
  Pscr: Pscr,
  pscr: pscr,
  Psi: Psi,
  psi: psi,
  puncsp: puncsp,
  Qfr: Qfr,
  qfr: qfr,
  qint: qint,
  qopf: qopf,
  Qopf: Qopf,
  qprime: qprime,
  Qscr: Qscr,
  qscr: qscr,
  quaternions: quaternions,
  quatint: quatint,
  quest: quest,
  questeq: questeq,
  quot: quot,
  QUOT: QUOT,
  rAarr: rAarr,
  race: race,
  Racute: Racute,
  racute: racute,
  radic: radic,
  raemptyv: raemptyv,
  rang: rang,
  Rang: Rang,
  rangd: rangd,
  range: range,
  rangle: rangle,
  raquo: raquo,
  rarrap: rarrap,
  rarrb: rarrb,
  rarrbfs: rarrbfs,
  rarrc: rarrc,
  rarr: rarr,
  Rarr: Rarr,
  rArr: rArr,
  rarrfs: rarrfs,
  rarrhk: rarrhk,
  rarrlp: rarrlp,
  rarrpl: rarrpl,
  rarrsim: rarrsim,
  Rarrtl: Rarrtl,
  rarrtl: rarrtl,
  rarrw: rarrw,
  ratail: ratail,
  rAtail: rAtail,
  ratio: ratio,
  rationals: rationals,
  rbarr: rbarr,
  rBarr: rBarr,
  RBarr: RBarr,
  rbbrk: rbbrk,
  rbrace: rbrace,
  rbrack: rbrack,
  rbrke: rbrke,
  rbrksld: rbrksld,
  rbrkslu: rbrkslu,
  Rcaron: Rcaron,
  rcaron: rcaron,
  Rcedil: Rcedil,
  rcedil: rcedil,
  rceil: rceil,
  rcub: rcub,
  Rcy: Rcy,
  rcy: rcy,
  rdca: rdca,
  rdldhar: rdldhar,
  rdquo: rdquo,
  rdquor: rdquor,
  rdsh: rdsh,
  real: real,
  realine: realine,
  realpart: realpart,
  reals: reals,
  Re: Re,
  rect: rect,
  reg: reg,
  REG: REG,
  ReverseElement: ReverseElement,
  ReverseEquilibrium: ReverseEquilibrium,
  ReverseUpEquilibrium: ReverseUpEquilibrium,
  rfisht: rfisht,
  rfloor: rfloor,
  rfr: rfr,
  Rfr: Rfr,
  rHar: rHar,
  rhard: rhard,
  rharu: rharu,
  rharul: rharul,
  Rho: Rho,
  rho: rho,
  rhov: rhov,
  RightAngleBracket: RightAngleBracket,
  RightArrowBar: RightArrowBar,
  rightarrow: rightarrow,
  RightArrow: RightArrow,
  Rightarrow: Rightarrow,
  RightArrowLeftArrow: RightArrowLeftArrow,
  rightarrowtail: rightarrowtail,
  RightCeiling: RightCeiling,
  RightDoubleBracket: RightDoubleBracket,
  RightDownTeeVector: RightDownTeeVector,
  RightDownVectorBar: RightDownVectorBar,
  RightDownVector: RightDownVector,
  RightFloor: RightFloor,
  rightharpoondown: rightharpoondown,
  rightharpoonup: rightharpoonup,
  rightleftarrows: rightleftarrows,
  rightleftharpoons: rightleftharpoons,
  rightrightarrows: rightrightarrows,
  rightsquigarrow: rightsquigarrow,
  RightTeeArrow: RightTeeArrow,
  RightTee: RightTee,
  RightTeeVector: RightTeeVector,
  rightthreetimes: rightthreetimes,
  RightTriangleBar: RightTriangleBar,
  RightTriangle: RightTriangle,
  RightTriangleEqual: RightTriangleEqual,
  RightUpDownVector: RightUpDownVector,
  RightUpTeeVector: RightUpTeeVector,
  RightUpVectorBar: RightUpVectorBar,
  RightUpVector: RightUpVector,
  RightVectorBar: RightVectorBar,
  RightVector: RightVector,
  ring: ring,
  risingdotseq: risingdotseq,
  rlarr: rlarr,
  rlhar: rlhar,
  rlm: rlm,
  rmoustache: rmoustache,
  rmoust: rmoust,
  rnmid: rnmid,
  roang: roang,
  roarr: roarr,
  robrk: robrk,
  ropar: ropar,
  ropf: ropf,
  Ropf: Ropf,
  roplus: roplus,
  rotimes: rotimes,
  RoundImplies: RoundImplies,
  rpar: rpar,
  rpargt: rpargt,
  rppolint: rppolint,
  rrarr: rrarr,
  Rrightarrow: Rrightarrow,
  rsaquo: rsaquo,
  rscr: rscr,
  Rscr: Rscr,
  rsh: rsh,
  Rsh: Rsh,
  rsqb: rsqb,
  rsquo: rsquo,
  rsquor: rsquor,
  rthree: rthree,
  rtimes: rtimes,
  rtri: rtri,
  rtrie: rtrie,
  rtrif: rtrif,
  rtriltri: rtriltri,
  RuleDelayed: RuleDelayed,
  ruluhar: ruluhar,
  rx: rx,
  Sacute: Sacute,
  sacute: sacute,
  sbquo: sbquo,
  scap: scap,
  Scaron: Scaron,
  scaron: scaron,
  Sc: Sc,
  sc: sc,
  sccue: sccue,
  sce: sce,
  scE: scE,
  Scedil: Scedil,
  scedil: scedil,
  Scirc: Scirc,
  scirc: scirc,
  scnap: scnap,
  scnE: scnE,
  scnsim: scnsim,
  scpolint: scpolint,
  scsim: scsim,
  Scy: Scy,
  scy: scy,
  sdotb: sdotb,
  sdot: sdot,
  sdote: sdote,
  searhk: searhk,
  searr: searr,
  seArr: seArr,
  searrow: searrow,
  sect: sect,
  semi: semi,
  seswar: seswar,
  setminus: setminus,
  setmn: setmn,
  sext: sext,
  Sfr: Sfr,
  sfr: sfr,
  sfrown: sfrown,
  sharp: sharp,
  SHCHcy: SHCHcy,
  shchcy: shchcy,
  SHcy: SHcy,
  shcy: shcy,
  ShortDownArrow: ShortDownArrow,
  ShortLeftArrow: ShortLeftArrow,
  shortmid: shortmid,
  shortparallel: shortparallel,
  ShortRightArrow: ShortRightArrow,
  ShortUpArrow: ShortUpArrow,
  shy: shy,
  Sigma: Sigma,
  sigma: sigma,
  sigmaf: sigmaf,
  sigmav: sigmav,
  sim: sim,
  simdot: simdot,
  sime: sime,
  simeq: simeq,
  simg: simg,
  simgE: simgE,
  siml: siml,
  simlE: simlE,
  simne: simne,
  simplus: simplus,
  simrarr: simrarr,
  slarr: slarr,
  SmallCircle: SmallCircle,
  smallsetminus: smallsetminus,
  smashp: smashp,
  smeparsl: smeparsl,
  smid: smid,
  smile: smile,
  smt: smt,
  smte: smte,
  smtes: smtes,
  SOFTcy: SOFTcy,
  softcy: softcy,
  solbar: solbar,
  solb: solb,
  sol: sol,
  Sopf: Sopf,
  sopf: sopf,
  spades: spades,
  spadesuit: spadesuit,
  spar: spar,
  sqcap: sqcap,
  sqcaps: sqcaps,
  sqcup: sqcup,
  sqcups: sqcups,
  Sqrt: Sqrt,
  sqsub: sqsub,
  sqsube: sqsube,
  sqsubset: sqsubset,
  sqsubseteq: sqsubseteq,
  sqsup: sqsup,
  sqsupe: sqsupe,
  sqsupset: sqsupset,
  sqsupseteq: sqsupseteq,
  square: square,
  Square: Square,
  SquareIntersection: SquareIntersection,
  SquareSubset: SquareSubset,
  SquareSubsetEqual: SquareSubsetEqual,
  SquareSuperset: SquareSuperset,
  SquareSupersetEqual: SquareSupersetEqual,
  SquareUnion: SquareUnion,
  squarf: squarf,
  squ: squ,
  squf: squf,
  srarr: srarr,
  Sscr: Sscr,
  sscr: sscr,
  ssetmn: ssetmn,
  ssmile: ssmile,
  sstarf: sstarf,
  Star: Star,
  star: star,
  starf: starf,
  straightepsilon: straightepsilon,
  straightphi: straightphi,
  strns: strns,
  sub: sub,
  Sub: Sub,
  subdot: subdot,
  subE: subE,
  sube: sube,
  subedot: subedot,
  submult: submult,
  subnE: subnE,
  subne: subne,
  subplus: subplus,
  subrarr: subrarr,
  subset: subset,
  Subset: Subset,
  subseteq: subseteq,
  subseteqq: subseteqq,
  SubsetEqual: SubsetEqual,
  subsetneq: subsetneq,
  subsetneqq: subsetneqq,
  subsim: subsim,
  subsub: subsub,
  subsup: subsup,
  succapprox: succapprox,
  succ: succ,
  succcurlyeq: succcurlyeq,
  Succeeds: Succeeds,
  SucceedsEqual: SucceedsEqual,
  SucceedsSlantEqual: SucceedsSlantEqual,
  SucceedsTilde: SucceedsTilde,
  succeq: succeq,
  succnapprox: succnapprox,
  succneqq: succneqq,
  succnsim: succnsim,
  succsim: succsim,
  SuchThat: SuchThat,
  sum: sum,
  Sum: Sum,
  sung: sung,
  sup1: sup1,
  sup2: sup2,
  sup3: sup3,
  sup: sup,
  Sup: Sup,
  supdot: supdot,
  supdsub: supdsub,
  supE: supE,
  supe: supe,
  supedot: supedot,
  Superset: Superset,
  SupersetEqual: SupersetEqual,
  suphsol: suphsol,
  suphsub: suphsub,
  suplarr: suplarr,
  supmult: supmult,
  supnE: supnE,
  supne: supne,
  supplus: supplus,
  supset: supset,
  Supset: Supset,
  supseteq: supseteq,
  supseteqq: supseteqq,
  supsetneq: supsetneq,
  supsetneqq: supsetneqq,
  supsim: supsim,
  supsub: supsub,
  supsup: supsup,
  swarhk: swarhk,
  swarr: swarr,
  swArr: swArr,
  swarrow: swarrow,
  swnwar: swnwar,
  szlig: szlig,
  Tab: Tab,
  target: target,
  Tau: Tau,
  tau: tau,
  tbrk: tbrk,
  Tcaron: Tcaron,
  tcaron: tcaron,
  Tcedil: Tcedil,
  tcedil: tcedil,
  Tcy: Tcy,
  tcy: tcy,
  tdot: tdot,
  telrec: telrec,
  Tfr: Tfr,
  tfr: tfr,
  there4: there4,
  therefore: therefore,
  Therefore: Therefore,
  Theta: Theta,
  theta: theta,
  thetasym: thetasym,
  thetav: thetav,
  thickapprox: thickapprox,
  thicksim: thicksim,
  ThickSpace: ThickSpace,
  ThinSpace: ThinSpace,
  thinsp: thinsp,
  thkap: thkap,
  thksim: thksim,
  THORN: THORN,
  thorn: thorn,
  tilde: tilde,
  Tilde: Tilde,
  TildeEqual: TildeEqual,
  TildeFullEqual: TildeFullEqual,
  TildeTilde: TildeTilde,
  timesbar: timesbar,
  timesb: timesb,
  times: times,
  timesd: timesd,
  tint: tint,
  toea: toea,
  topbot: topbot,
  topcir: topcir,
  top: top,
  Topf: Topf,
  topf: topf,
  topfork: topfork,
  tosa: tosa,
  tprime: tprime,
  trade: trade,
  TRADE: TRADE,
  triangle: triangle,
  triangledown: triangledown,
  triangleleft: triangleleft,
  trianglelefteq: trianglelefteq,
  triangleq: triangleq,
  triangleright: triangleright,
  trianglerighteq: trianglerighteq,
  tridot: tridot,
  trie: trie,
  triminus: triminus,
  TripleDot: TripleDot,
  triplus: triplus,
  trisb: trisb,
  tritime: tritime,
  trpezium: trpezium,
  Tscr: Tscr,
  tscr: tscr,
  TScy: TScy,
  tscy: tscy,
  TSHcy: TSHcy,
  tshcy: tshcy,
  Tstrok: Tstrok,
  tstrok: tstrok,
  twixt: twixt,
  twoheadleftarrow: twoheadleftarrow,
  twoheadrightarrow: twoheadrightarrow,
  Uacute: Uacute,
  uacute: uacute,
  uarr: uarr,
  Uarr: Uarr,
  uArr: uArr,
  Uarrocir: Uarrocir,
  Ubrcy: Ubrcy,
  ubrcy: ubrcy,
  Ubreve: Ubreve,
  ubreve: ubreve,
  Ucirc: Ucirc,
  ucirc: ucirc,
  Ucy: Ucy,
  ucy: ucy,
  udarr: udarr,
  Udblac: Udblac,
  udblac: udblac,
  udhar: udhar,
  ufisht: ufisht,
  Ufr: Ufr,
  ufr: ufr,
  Ugrave: Ugrave,
  ugrave: ugrave,
  uHar: uHar,
  uharl: uharl,
  uharr: uharr,
  uhblk: uhblk,
  ulcorn: ulcorn,
  ulcorner: ulcorner,
  ulcrop: ulcrop,
  ultri: ultri,
  Umacr: Umacr,
  umacr: umacr,
  uml: uml,
  UnderBar: UnderBar,
  UnderBrace: UnderBrace,
  UnderBracket: UnderBracket,
  UnderParenthesis: UnderParenthesis,
  Union: Union,
  UnionPlus: UnionPlus,
  Uogon: Uogon,
  uogon: uogon,
  Uopf: Uopf,
  uopf: uopf,
  UpArrowBar: UpArrowBar,
  uparrow: uparrow,
  UpArrow: UpArrow,
  Uparrow: Uparrow,
  UpArrowDownArrow: UpArrowDownArrow,
  updownarrow: updownarrow,
  UpDownArrow: UpDownArrow,
  Updownarrow: Updownarrow,
  UpEquilibrium: UpEquilibrium,
  upharpoonleft: upharpoonleft,
  upharpoonright: upharpoonright,
  uplus: uplus,
  UpperLeftArrow: UpperLeftArrow,
  UpperRightArrow: UpperRightArrow,
  upsi: upsi,
  Upsi: Upsi,
  upsih: upsih,
  Upsilon: Upsilon,
  upsilon: upsilon,
  UpTeeArrow: UpTeeArrow,
  UpTee: UpTee,
  upuparrows: upuparrows,
  urcorn: urcorn,
  urcorner: urcorner,
  urcrop: urcrop,
  Uring: Uring,
  uring: uring,
  urtri: urtri,
  Uscr: Uscr,
  uscr: uscr,
  utdot: utdot,
  Utilde: Utilde,
  utilde: utilde,
  utri: utri,
  utrif: utrif,
  uuarr: uuarr,
  Uuml: Uuml,
  uuml: uuml,
  uwangle: uwangle,
  vangrt: vangrt,
  varepsilon: varepsilon,
  varkappa: varkappa,
  varnothing: varnothing,
  varphi: varphi,
  varpi: varpi,
  varpropto: varpropto,
  varr: varr,
  vArr: vArr,
  varrho: varrho,
  varsigma: varsigma,
  varsubsetneq: varsubsetneq,
  varsubsetneqq: varsubsetneqq,
  varsupsetneq: varsupsetneq,
  varsupsetneqq: varsupsetneqq,
  vartheta: vartheta,
  vartriangleleft: vartriangleleft,
  vartriangleright: vartriangleright,
  vBar: vBar,
  Vbar: Vbar,
  vBarv: vBarv,
  Vcy: Vcy,
  vcy: vcy,
  vdash: vdash,
  vDash: vDash,
  Vdash: Vdash,
  VDash: VDash,
  Vdashl: Vdashl,
  veebar: veebar,
  vee: vee,
  Vee: Vee,
  veeeq: veeeq,
  vellip: vellip,
  verbar: verbar,
  Verbar: Verbar,
  vert: vert,
  Vert: Vert,
  VerticalBar: VerticalBar,
  VerticalLine: VerticalLine,
  VerticalSeparator: VerticalSeparator,
  VerticalTilde: VerticalTilde,
  VeryThinSpace: VeryThinSpace,
  Vfr: Vfr,
  vfr: vfr,
  vltri: vltri,
  vnsub: vnsub,
  vnsup: vnsup,
  Vopf: Vopf,
  vopf: vopf,
  vprop: vprop,
  vrtri: vrtri,
  Vscr: Vscr,
  vscr: vscr,
  vsubnE: vsubnE,
  vsubne: vsubne,
  vsupnE: vsupnE,
  vsupne: vsupne,
  Vvdash: Vvdash,
  vzigzag: vzigzag,
  Wcirc: Wcirc,
  wcirc: wcirc,
  wedbar: wedbar,
  wedge: wedge,
  Wedge: Wedge,
  wedgeq: wedgeq,
  weierp: weierp,
  Wfr: Wfr,
  wfr: wfr,
  Wopf: Wopf,
  wopf: wopf,
  wp: wp,
  wr: wr,
  wreath: wreath,
  Wscr: Wscr,
  wscr: wscr,
  xcap: xcap,
  xcirc: xcirc,
  xcup: xcup,
  xdtri: xdtri,
  Xfr: Xfr,
  xfr: xfr,
  xharr: xharr,
  xhArr: xhArr,
  Xi: Xi,
  xi: xi,
  xlarr: xlarr,
  xlArr: xlArr,
  xmap: xmap,
  xnis: xnis,
  xodot: xodot,
  Xopf: Xopf,
  xopf: xopf,
  xoplus: xoplus,
  xotime: xotime,
  xrarr: xrarr,
  xrArr: xrArr,
  Xscr: Xscr,
  xscr: xscr,
  xsqcup: xsqcup,
  xuplus: xuplus,
  xutri: xutri,
  xvee: xvee,
  xwedge: xwedge,
  Yacute: Yacute,
  yacute: yacute,
  YAcy: YAcy,
  yacy: yacy,
  Ycirc: Ycirc,
  ycirc: ycirc,
  Ycy: Ycy,
  ycy: ycy,
  yen: yen,
  Yfr: Yfr,
  yfr: yfr,
  YIcy: YIcy,
  yicy: yicy,
  Yopf: Yopf,
  yopf: yopf,
  Yscr: Yscr,
  yscr: yscr,
  YUcy: YUcy,
  yucy: yucy,
  yuml: yuml,
  Yuml: Yuml,
  Zacute: Zacute,
  zacute: zacute,
  Zcaron: Zcaron,
  zcaron: zcaron,
  Zcy: Zcy,
  zcy: zcy,
  Zdot: Zdot,
  zdot: zdot,
  zeetrf: zeetrf,
  ZeroWidthSpace: ZeroWidthSpace,
  Zeta: Zeta,
  zeta: zeta,
  zfr: zfr,
  Zfr: Zfr,
  ZHcy: ZHcy,
  zhcy: zhcy,
  zigrarr: zigrarr,
  zopf: zopf,
  Zopf: Zopf,
  Zscr: Zscr,
  zscr: zscr,
  zwj: zwj,
  zwnj: zwnj
};

/*eslint quotes:0*/
var entities = require$$0;

var regex=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;

var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


var encode_1 = encode;

/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode.defaultChars   = ';/?:@&=+$,#';
decode.componentChars = '';


var decode_1 = decode;

var format = function format(url) {
  var result = '';

  result += url.protocol || '';
  result += url.slashes ? '//' : '';
  result += url.auth ? url.auth + '@' : '';

  if (url.hostname && url.hostname.indexOf(':') !== -1) {
    // ipv6 address
    result += '[' + url.hostname + ']';
  } else {
    result += url.hostname || '';
  }

  result += url.port ? ':' + url.port : '';
  result += url.pathname || '';
  result += url.search || '';
  result += url.hash || '';

  return result;
};

// Copyright Joyent, Inc. and other Node contributors.

//
// Changes from joyent/node:
//
// 1. No leading slash in paths,
//    e.g. in `url.parse('http://foo?bar')` pathname is ``, not `/`
//
// 2. Backslashes are not replaced with slashes,
//    so `http:\\example.org\` is treated like a relative path
//
// 3. Trailing colon is treated like a part of the path,
//    i.e. in `http://example.org:foo` pathname is `:foo`
//
// 4. Nothing is URL-encoded in the resulting object,
//    (in joyent/node some chars in auth and paths are encoded)
//
// 5. `url.parse()` does not have `parseQueryString` argument
//
// 6. Removed extraneous result properties: `host`, `path`, `query`, etc.,
//    which can be constructed using other parts of the url.
//


function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.pathname = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = [ '<', '>', '"', '`', ' ', '\r', '\n', '\t' ],

    // RFC 2396: characters not allowed for various reasons.
    unwise = [ '{', '}', '|', '\\', '^', '`' ].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = [ '\'' ].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = [ '%', '/', '?', ';', '#' ].concat(autoEscape),
    hostEndingChars = [ '/', '?', '#' ],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    /* eslint-disable no-script-url */
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    };
    /* eslint-enable no-script-url */

function urlParse(url, slashesDenoteHost) {
  if (url && url instanceof Url) { return url; }

  var u = new Url();
  u.parse(url, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, slashesDenoteHost) {
  var i, l, lowerProto, hec, slashes,
      rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    lowerProto = proto.toLowerCase();
    this.protocol = proto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (i = 0; i < hostEndingChars.length; i++) {
      hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = auth;
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (i = 0; i < nonHostChars.length; i++) {
      hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) {
        hostEnd = hec;
      }
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1) {
      hostEnd = rest.length;
    }

    if (rest[hostEnd - 1] === ':') { hostEnd--; }
    var host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost(host);

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) { continue; }
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    }

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
    }
  }

  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    rest = rest.slice(0, qm);
  }
  if (rest) { this.pathname = rest; }
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '';
  }

  return this;
};

Url.prototype.parseHost = function(host) {
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) { this.hostname = host; }
};

var parse = urlParse;

var encode$1 = encode_1;
var decode$1 = decode_1;
var format$1 = format;
var parse$1  = parse;

var mdurl = {
	encode: encode$1,
	decode: decode$1,
	format: format$1,
	parse: parse$1
};

var regex$1=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;

var regex$2=/[\0-\x1F\x7F-\x9F]/;

var regex$3=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;

var regex$4=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;

var Any = regex$1;
var Cc  = regex$2;
var Cf  = regex$3;
var P   = regex;
var Z   = regex$4;

var uc_micro = {
	Any: Any,
	Cc: Cc,
	Cf: Cf,
	P: P,
	Z: Z
};

var utils = createCommonjsModule(function (module, exports) {


function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj) { return _class(obj) === '[object String]'; }

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function has(object, key) {
  return _hasOwnProperty.call(object, key);
}

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false; }
  if (c === 0x0B) { return false; }
  if (c >= 0x0E && c <= 0x1F) { return false; }
  if (c >= 0x7F && c <= 0x9F) { return false; }
  // out of range
  if (c > 0x10FFFF) { return false; }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}


var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;



function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  }

  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ?
      parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }

  return match;
}

/*function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
}*/

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) { return str; }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

function unescapeAll(str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped; }
    return replaceEntityPattern(match, entity);
  });
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
}

////////////////////////////////////////////////////////////////////////////////

function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace(code) {
  if (code >= 0x2000 && code <= 0x200A) { return true; }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////

/*eslint-disable max-len*/


// Currently without astral characters support.
function isPunctChar(ch) {
  return regex.test(ch);
}


// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference(str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
exports.lib                 = {};
exports.lib.mdurl           = mdurl;
exports.lib.ucmicro         = uc_micro;

exports.assign              = assign;
exports.isString            = isString;
exports.has                 = has;
exports.unescapeMd          = unescapeMd;
exports.unescapeAll         = unescapeAll;
exports.isValidEntityCode   = isValidEntityCode;
exports.fromCodePoint       = fromCodePoint;
// exports.replaceEntities     = replaceEntities;
exports.escapeHtml          = escapeHtml;
exports.arrayReplaceAt      = arrayReplaceAt;
exports.isSpace             = isSpace;
exports.isWhiteSpace        = isWhiteSpace;
exports.isMdAsciiPunct      = isMdAsciiPunct;
exports.isPunctChar         = isPunctChar;
exports.escapeRE            = escapeRE;
exports.normalizeReference  = normalizeReference;
});

var unescapeAll = utils.unescapeAll;

var unescapeAll$1 = utils.unescapeAll;

var assign          = utils.assign;
var unescapeAll$2     = utils.unescapeAll;
var escapeHtml      = utils.escapeHtml;

var arrayReplaceAt = utils.arrayReplaceAt;

var isWhiteSpace   = utils.isWhiteSpace;
var isPunctChar    = utils.isPunctChar;
var isMdAsciiPunct = utils.isMdAsciiPunct;

// Token class


/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * Additional information:
   *
   * - Info string for "fence" tokens
   * - The value "auto" for autolink "link_open" and "link_close" tokens
   * - The string value of the item marker for ordered-list "list_item_open" tokens
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}


/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};


/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};


/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [ name, value ];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};


/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name), value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};


/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([ name, value ]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};


var token = Token;

function StateCore(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore.prototype.Token = token;

var isSpace = utils.isSpace;

var isSpace$1 = utils.isSpace;

var isSpace$2 = utils.isSpace;

var isSpace$3 = utils.isSpace;

var normalizeReference   = utils.normalizeReference;
var isSpace$4              = utils.isSpace;

var isSpace$5 = utils.isSpace;

var isSpace$6 = utils.isSpace;


function StateBlock(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables
  this.blkIndent  = 0; // required block content indent (for example, if we are
                       // inside a list, it would be positioned after list marker)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace$6(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock.prototype.push = function (type, tag, nesting) {
  var token$1 = new token(type, tag, nesting);
  token$1.block = true;

  if (nesting < 0) this.level--; // closing tag
  token$1.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token$1);
  return token$1;
};

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);
    if (!isSpace$6(ch)) { break; }
  }
  return pos;
};

// Skip spaces from given position in reverse.
StateBlock.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (!isSpace$6(this.src.charCodeAt(--pos))) { return pos + 1; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, lineIndent, ch, first, last, queue, lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace$6(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock.prototype.Token = token;

var isSpace$7 = utils.isSpace;

var isSpace$8 = utils.isSpace;

var ESCAPED = [];

for (var i = 0; i < 256; i++) { ESCAPED.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED[ch.charCodeAt(0)] = 1; });

var normalizeReference$1   = utils.normalizeReference;
var isSpace$9              = utils.isSpace;

var normalizeReference$2   = utils.normalizeReference;
var isSpace$a              = utils.isSpace;

var has               = utils.has;
var isValidEntityCode = utils.isValidEntityCode;
var fromCodePoint     = utils.fromCodePoint;

var isWhiteSpace$1   = utils.isWhiteSpace;
var isPunctChar$1    = utils.isPunctChar;
var isMdAsciiPunct$1 = utils.isMdAsciiPunct;


function StateInline(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).
  this.cache = {};

  // List of emphasis-like delimiters for current tag
  this.delimiters = [];

  // Stack of delimiter lists for upper level tags
  this._prev_delimiters = [];

  // backtick length => last seen position
  this.backticks = {};
  this.backticksScanned = false;
}


// Flush pending text
//
StateInline.prototype.pushPending = function () {
  var token$1 = new token('text', '', 0);
  token$1.content = this.pending;
  token$1.level = this.pendingLevel;
  this.tokens.push(token$1);
  this.pending = '';
  return token$1;
};


// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token$1 = new token(type, tag, nesting);
  var token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token$1.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token$1);
  this.tokens_meta.push(token_meta);
  return token$1;
};


// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline.prototype.scanDelims = function (start, canSplitWord) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = this.posMax,
      marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct$1(lastChar) || isPunctChar$1(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct$1(nextChar) || isPunctChar$1(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace$1(lastChar);
  isNextWhiteSpace = isWhiteSpace$1(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (!canSplitWord) {
    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
  } else {
    can_open  = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open:  can_open,
    can_close: can_close,
    length:    count
  };
};


// re-export Token class to use in block rules
StateInline.prototype.Token = token;

/*! https://mths.be/punycode v1.4.1 by @mathias */


/** Highest positive signed 32-bit float value */
var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

/** Bootstring parameters */
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'

/** Regular expressions */
var regexPunycode = /^xn--/;
var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

/** Error messages */
var errors = {
  'overflow': 'Overflow: input needs wider integers to process',
  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
  'invalid-input': 'Invalid input'
};

/** Convenience shortcuts */
var baseMinusTMin = base - tMin;
var floor = Math.floor;
var stringFromCharCode = String.fromCharCode;

/*--------------------------------------------------------------------------*/

/**
 * A generic error utility function.
 * @private
 * @param {String} type The error type.
 * @returns {Error} Throws a `RangeError` with the applicable error message.
 */
function error(type) {
  throw new RangeError(errors[type]);
}

/**
 * A generic `Array#map` utility function.
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} callback The function that gets called for every array
 * item.
 * @returns {Array} A new array of values returned by the callback function.
 */
function map$1(array, fn) {
  var length = array.length;
  var result = [];
  while (length--) {
    result[length] = fn(array[length]);
  }
  return result;
}

/**
 * A simple `Array#map`-like wrapper to work with domain name strings or email
 * addresses.
 * @private
 * @param {String} domain The domain name or email address.
 * @param {Function} callback The function that gets called for every
 * character.
 * @returns {Array} A new string of characters returned by the callback
 * function.
 */
function mapDomain(string, fn) {
  var parts = string.split('@');
  var result = '';
  if (parts.length > 1) {
    // In email addresses, only the domain name should be punycoded. Leave
    // the local part (i.e. everything up to `@`) intact.
    result = parts[0] + '@';
    string = parts[1];
  }
  // Avoid `split(regex)` for IE8 compatibility. See #17.
  string = string.replace(regexSeparators, '\x2E');
  var labels = string.split('.');
  var encoded = map$1(labels, fn).join('.');
  return result + encoded;
}

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string) {
  var output = [],
    counter = 0,
    length = string.length,
    value,
    extra;
  while (counter < length) {
    value = string.charCodeAt(counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // high surrogate, and there is a next character
      extra = string.charCodeAt(counter++);
      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // unmatched surrogate; only append this code unit, in case the next
        // code unit is the high surrogate of a surrogate pair
        output.push(value);
        counter--;
      }
    } else {
      output.push(value);
    }
  }
  return output;
}

/**
 * Creates a string based on an array of numeric code points.
 * @see `punycode.ucs2.decode`
 * @memberOf punycode.ucs2
 * @name encode
 * @param {Array} codePoints The array of numeric code points.
 * @returns {String} The new Unicode string (UCS-2).
 */
function ucs2encode(array) {
  return map$1(array, function(value) {
    var output = '';
    if (value > 0xFFFF) {
      value -= 0x10000;
      output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
      value = 0xDC00 | value & 0x3FF;
    }
    output += stringFromCharCode(value);
    return output;
  }).join('');
}

/**
 * Converts a basic code point into a digit/integer.
 * @see `digitToBasic()`
 * @private
 * @param {Number} codePoint The basic numeric code point value.
 * @returns {Number} The numeric value of a basic code point (for use in
 * representing integers) in the range `0` to `base - 1`, or `base` if
 * the code point does not represent a value.
 */
function basicToDigit(codePoint) {
  if (codePoint - 48 < 10) {
    return codePoint - 22;
  }
  if (codePoint - 65 < 26) {
    return codePoint - 65;
  }
  if (codePoint - 97 < 26) {
    return codePoint - 97;
  }
  return base;
}

/**
 * Converts a digit/integer into a basic code point.
 * @see `basicToDigit()`
 * @private
 * @param {Number} digit The numeric value of a basic code point.
 * @returns {Number} The basic code point whose value (when used for
 * representing integers) is `digit`, which needs to be in the range
 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
 * used; else, the lowercase form is used. The behavior is undefined
 * if `flag` is non-zero and `digit` has no uppercase form.
 */
function digitToBasic(digit, flag) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
}

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 * @private
 */
function adapt(delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
    delta = floor(delta / baseMinusTMin);
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
}

/**
 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
 * symbols.
 * @memberOf punycode
 * @param {String} input The Punycode string of ASCII-only symbols.
 * @returns {String} The resulting string of Unicode symbols.
 */
function decode$2(input) {
  // Don't use UCS-2
  var output = [],
    inputLength = input.length,
    out,
    i = 0,
    n = initialN,
    bias = initialBias,
    basic,
    j,
    index,
    oldi,
    w,
    k,
    digit,
    t,
    /** Cached calculation results */
    baseMinusT;

  // Handle the basic code points: let `basic` be the number of input code
  // points before the last delimiter, or `0` if there is none, then copy
  // the first basic code points to the output.

  basic = input.lastIndexOf(delimiter);
  if (basic < 0) {
    basic = 0;
  }

  for (j = 0; j < basic; ++j) {
    // if it's not a basic code point
    if (input.charCodeAt(j) >= 0x80) {
      error('not-basic');
    }
    output.push(input.charCodeAt(j));
  }

  // Main decoding loop: start just after the last delimiter if any basic code
  // points were copied; start at the beginning otherwise.

  for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */ ) {

    // `index` is the index of the next character to be consumed.
    // Decode a generalized variable-length integer into `delta`,
    // which gets added to `i`. The overflow checking is easier
    // if we increase `i` as we go, then subtract off its starting
    // value at the end to obtain `delta`.
    for (oldi = i, w = 1, k = base; /* no condition */ ; k += base) {

      if (index >= inputLength) {
        error('invalid-input');
      }

      digit = basicToDigit(input.charCodeAt(index++));

      if (digit >= base || digit > floor((maxInt - i) / w)) {
        error('overflow');
      }

      i += digit * w;
      t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

      if (digit < t) {
        break;
      }

      baseMinusT = base - t;
      if (w > floor(maxInt / baseMinusT)) {
        error('overflow');
      }

      w *= baseMinusT;

    }

    out = output.length + 1;
    bias = adapt(i - oldi, out, oldi == 0);

    // `i` was supposed to wrap around from `out` to `0`,
    // incrementing `n` each time, so we'll fix that now:
    if (floor(i / out) > maxInt - n) {
      error('overflow');
    }

    n += floor(i / out);
    i %= out;

    // Insert `n` at position `i` of the output
    output.splice(i++, 0, n);

  }

  return ucs2encode(output);
}

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 * @memberOf punycode
 * @param {String} input The string of Unicode symbols.
 * @returns {String} The resulting Punycode string of ASCII-only symbols.
 */
function encode$2(input) {
  var n,
    delta,
    handledCPCount,
    basicLength,
    bias,
    j,
    m,
    q,
    k,
    t,
    currentValue,
    output = [],
    /** `inputLength` will hold the number of code points in `input`. */
    inputLength,
    /** Cached calculation results */
    handledCPCountPlusOne,
    baseMinusT,
    qMinusT;

  // Convert the input in UCS-2 to Unicode
  input = ucs2decode(input);

  // Cache the length
  inputLength = input.length;

  // Initialize the state
  n = initialN;
  delta = 0;
  bias = initialBias;

  // Handle the basic code points
  for (j = 0; j < inputLength; ++j) {
    currentValue = input[j];
    if (currentValue < 0x80) {
      output.push(stringFromCharCode(currentValue));
    }
  }

  handledCPCount = basicLength = output.length;

  // `handledCPCount` is the number of code points that have been handled;
  // `basicLength` is the number of basic code points.

  // Finish the basic string - if it is not empty - with a delimiter
  if (basicLength) {
    output.push(delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {

    // All non-basic code points < n have been handled already. Find the next
    // larger one:
    for (m = maxInt, j = 0; j < inputLength; ++j) {
      currentValue = input[j];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
    // but guard against overflow
    handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      error('overflow');
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (j = 0; j < inputLength; ++j) {
      currentValue = input[j];

      if (currentValue < n && ++delta > maxInt) {
        error('overflow');
      }

      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer
        for (q = delta, k = base; /* no condition */ ; k += base) {
          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) {
            break;
          }
          qMinusT = q - t;
          baseMinusT = base - t;
          output.push(
            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
          );
          q = floor(qMinusT / baseMinusT);
        }

        output.push(stringFromCharCode(digitToBasic(q, 0)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        ++handledCPCount;
      }
    }

    ++delta;
    ++n;

  }
  return output.join('');
}

/**
 * Converts a Punycode string representing a domain name or an email address
 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
 * it doesn't matter if you call it on a string that has already been
 * converted to Unicode.
 * @memberOf punycode
 * @param {String} input The Punycoded domain name or email address to
 * convert to Unicode.
 * @returns {String} The Unicode representation of the given Punycode
 * string.
 */
function toUnicode(input) {
  return mapDomain(input, function(string) {
    return regexPunycode.test(string) ?
      decode$2(string.slice(4).toLowerCase()) :
      string;
  });
}

/**
 * Converts a Unicode string representing a domain name or an email address to
 * Punycode. Only the non-ASCII parts of the domain name will be converted,
 * i.e. it doesn't matter if you call it with a domain that's already in
 * ASCII.
 * @memberOf punycode
 * @param {String} input The domain name or email address to convert, as a
 * Unicode string.
 * @returns {String} The Punycode representation of the given domain name or
 * email address.
 */
function toASCII(input) {
  return mapDomain(input, function(string) {
    return regexNonASCII.test(string) ?
      'xn--' + encode$2(string) :
      string;
  });
}
var version = '1.4.1';
/**
 * An object of methods to convert from JavaScript's internal character
 * representation (UCS-2) to Unicode code points, and back.
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode
 * @type Object
 */

var ucs2 = {
  decode: ucs2decode,
  encode: ucs2encode
};
var _polyfillNode_punycode = {
  version: version,
  ucs2: ucs2,
  toASCII: toASCII,
  toUnicode: toUnicode,
  encode: encode$2,
  decode: decode$2
};

var _polyfillNode_punycode$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$2,
    encode: encode$2,
    toUnicode: toUnicode,
    toASCII: toASCII,
    version: version,
    ucs2: ucs2,
    'default': _polyfillNode_punycode
});

var punycode = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(_polyfillNode_punycode$1);

const Aacute$1 = "Á";
const aacute$1 = "á";
const Abreve$1 = "Ă";
const abreve$1 = "ă";
const ac$1 = "∾";
const acd$1 = "∿";
const acE$1 = "∾̳";
const Acirc$1 = "Â";
const acirc$1 = "â";
const acute$1 = "´";
const Acy$1 = "А";
const acy$1 = "а";
const AElig$1 = "Æ";
const aelig$1 = "æ";
const af$1 = "⁡";
const Afr$1 = "𝔄";
const afr$1 = "𝔞";
const Agrave$1 = "À";
const agrave$1 = "à";
const alefsym$1 = "ℵ";
const aleph$1 = "ℵ";
const Alpha$1 = "Α";
const alpha$1 = "α";
const Amacr$1 = "Ā";
const amacr$1 = "ā";
const amalg$1 = "⨿";
const amp$1 = "&";
const AMP$1 = "&";
const andand$1 = "⩕";
const And$1 = "⩓";
const and$1 = "∧";
const andd$1 = "⩜";
const andslope$1 = "⩘";
const andv$1 = "⩚";
const ang$1 = "∠";
const ange$1 = "⦤";
const angle$1 = "∠";
const angmsdaa$1 = "⦨";
const angmsdab$1 = "⦩";
const angmsdac$1 = "⦪";
const angmsdad$1 = "⦫";
const angmsdae$1 = "⦬";
const angmsdaf$1 = "⦭";
const angmsdag$1 = "⦮";
const angmsdah$1 = "⦯";
const angmsd$1 = "∡";
const angrt$1 = "∟";
const angrtvb$1 = "⊾";
const angrtvbd$1 = "⦝";
const angsph$1 = "∢";
const angst$1 = "Å";
const angzarr$1 = "⍼";
const Aogon$1 = "Ą";
const aogon$1 = "ą";
const Aopf$1 = "𝔸";
const aopf$1 = "𝕒";
const apacir$1 = "⩯";
const ap$1 = "≈";
const apE$1 = "⩰";
const ape$1 = "≊";
const apid$1 = "≋";
const apos$1 = "'";
const ApplyFunction$1 = "⁡";
const approx$1 = "≈";
const approxeq$1 = "≊";
const Aring$1 = "Å";
const aring$1 = "å";
const Ascr$1 = "𝒜";
const ascr$1 = "𝒶";
const Assign$1 = "≔";
const ast$1 = "*";
const asymp$1 = "≈";
const asympeq$1 = "≍";
const Atilde$1 = "Ã";
const atilde$1 = "ã";
const Auml$1 = "Ä";
const auml$1 = "ä";
const awconint$1 = "∳";
const awint$1 = "⨑";
const backcong$1 = "≌";
const backepsilon$1 = "϶";
const backprime$1 = "‵";
const backsim$1 = "∽";
const backsimeq$1 = "⋍";
const Backslash$1 = "∖";
const Barv$1 = "⫧";
const barvee$1 = "⊽";
const barwed$1 = "⌅";
const Barwed$1 = "⌆";
const barwedge$1 = "⌅";
const bbrk$1 = "⎵";
const bbrktbrk$1 = "⎶";
const bcong$1 = "≌";
const Bcy$1 = "Б";
const bcy$1 = "б";
const bdquo$1 = "„";
const becaus$1 = "∵";
const because$1 = "∵";
const Because$1 = "∵";
const bemptyv$1 = "⦰";
const bepsi$1 = "϶";
const bernou$1 = "ℬ";
const Bernoullis$1 = "ℬ";
const Beta$1 = "Β";
const beta$1 = "β";
const beth$1 = "ℶ";
const between$1 = "≬";
const Bfr$1 = "𝔅";
const bfr$1 = "𝔟";
const bigcap$1 = "⋂";
const bigcirc$1 = "◯";
const bigcup$1 = "⋃";
const bigodot$1 = "⨀";
const bigoplus$1 = "⨁";
const bigotimes$1 = "⨂";
const bigsqcup$1 = "⨆";
const bigstar$1 = "★";
const bigtriangledown$1 = "▽";
const bigtriangleup$1 = "△";
const biguplus$1 = "⨄";
const bigvee$1 = "⋁";
const bigwedge$1 = "⋀";
const bkarow$1 = "⤍";
const blacklozenge$1 = "⧫";
const blacksquare$1 = "▪";
const blacktriangle$1 = "▴";
const blacktriangledown$1 = "▾";
const blacktriangleleft$1 = "◂";
const blacktriangleright$1 = "▸";
const blank$1 = "␣";
const blk12$1 = "▒";
const blk14$1 = "░";
const blk34$1 = "▓";
const block$1 = "█";
const bne$1 = "=⃥";
const bnequiv$1 = "≡⃥";
const bNot$1 = "⫭";
const bnot$1 = "⌐";
const Bopf$1 = "𝔹";
const bopf$1 = "𝕓";
const bot$1 = "⊥";
const bottom$1 = "⊥";
const bowtie$1 = "⋈";
const boxbox$1 = "⧉";
const boxdl$1 = "┐";
const boxdL$1 = "╕";
const boxDl$1 = "╖";
const boxDL$1 = "╗";
const boxdr$1 = "┌";
const boxdR$1 = "╒";
const boxDr$1 = "╓";
const boxDR$1 = "╔";
const boxh$1 = "─";
const boxH$1 = "═";
const boxhd$1 = "┬";
const boxHd$1 = "╤";
const boxhD$1 = "╥";
const boxHD$1 = "╦";
const boxhu$1 = "┴";
const boxHu$1 = "╧";
const boxhU$1 = "╨";
const boxHU$1 = "╩";
const boxminus$1 = "⊟";
const boxplus$1 = "⊞";
const boxtimes$1 = "⊠";
const boxul$1 = "┘";
const boxuL$1 = "╛";
const boxUl$1 = "╜";
const boxUL$1 = "╝";
const boxur$1 = "└";
const boxuR$1 = "╘";
const boxUr$1 = "╙";
const boxUR$1 = "╚";
const boxv$1 = "│";
const boxV$1 = "║";
const boxvh$1 = "┼";
const boxvH$1 = "╪";
const boxVh$1 = "╫";
const boxVH$1 = "╬";
const boxvl$1 = "┤";
const boxvL$1 = "╡";
const boxVl$1 = "╢";
const boxVL$1 = "╣";
const boxvr$1 = "├";
const boxvR$1 = "╞";
const boxVr$1 = "╟";
const boxVR$1 = "╠";
const bprime$1 = "‵";
const breve$1 = "˘";
const Breve$1 = "˘";
const brvbar$1 = "¦";
const bscr$1 = "𝒷";
const Bscr$1 = "ℬ";
const bsemi$1 = "⁏";
const bsim$1 = "∽";
const bsime$1 = "⋍";
const bsolb$1 = "⧅";
const bsol$1 = "\\";
const bsolhsub$1 = "⟈";
const bull$1 = "•";
const bullet$1 = "•";
const bump$1 = "≎";
const bumpE$1 = "⪮";
const bumpe$1 = "≏";
const Bumpeq$1 = "≎";
const bumpeq$1 = "≏";
const Cacute$1 = "Ć";
const cacute$1 = "ć";
const capand$1 = "⩄";
const capbrcup$1 = "⩉";
const capcap$1 = "⩋";
const cap$1 = "∩";
const Cap$1 = "⋒";
const capcup$1 = "⩇";
const capdot$1 = "⩀";
const CapitalDifferentialD$1 = "ⅅ";
const caps$1 = "∩︀";
const caret$1 = "⁁";
const caron$1 = "ˇ";
const Cayleys$1 = "ℭ";
const ccaps$1 = "⩍";
const Ccaron$1 = "Č";
const ccaron$1 = "č";
const Ccedil$1 = "Ç";
const ccedil$1 = "ç";
const Ccirc$1 = "Ĉ";
const ccirc$1 = "ĉ";
const Cconint$1 = "∰";
const ccups$1 = "⩌";
const ccupssm$1 = "⩐";
const Cdot$1 = "Ċ";
const cdot$1 = "ċ";
const cedil$1 = "¸";
const Cedilla$1 = "¸";
const cemptyv$1 = "⦲";
const cent$1 = "¢";
const centerdot$1 = "·";
const CenterDot$1 = "·";
const cfr$1 = "𝔠";
const Cfr$1 = "ℭ";
const CHcy$1 = "Ч";
const chcy$1 = "ч";
const check$1 = "✓";
const checkmark$1 = "✓";
const Chi$1 = "Χ";
const chi$1 = "χ";
const circ$1 = "ˆ";
const circeq$1 = "≗";
const circlearrowleft$1 = "↺";
const circlearrowright$1 = "↻";
const circledast$1 = "⊛";
const circledcirc$1 = "⊚";
const circleddash$1 = "⊝";
const CircleDot$1 = "⊙";
const circledR$1 = "®";
const circledS$1 = "Ⓢ";
const CircleMinus$1 = "⊖";
const CirclePlus$1 = "⊕";
const CircleTimes$1 = "⊗";
const cir$1 = "○";
const cirE$1 = "⧃";
const cire$1 = "≗";
const cirfnint$1 = "⨐";
const cirmid$1 = "⫯";
const cirscir$1 = "⧂";
const ClockwiseContourIntegral$1 = "∲";
const CloseCurlyDoubleQuote$1 = "”";
const CloseCurlyQuote$1 = "’";
const clubs$1 = "♣";
const clubsuit$1 = "♣";
const colon$1 = ":";
const Colon$1 = "∷";
const Colone$1 = "⩴";
const colone$1 = "≔";
const coloneq$1 = "≔";
const comma$1 = ",";
const commat$1 = "@";
const comp$1 = "∁";
const compfn$1 = "∘";
const complement$1 = "∁";
const complexes$1 = "ℂ";
const cong$1 = "≅";
const congdot$1 = "⩭";
const Congruent$1 = "≡";
const conint$1 = "∮";
const Conint$1 = "∯";
const ContourIntegral$1 = "∮";
const copf$1 = "𝕔";
const Copf$1 = "ℂ";
const coprod$1 = "∐";
const Coproduct$1 = "∐";
const copy$1 = "©";
const COPY$1 = "©";
const copysr$1 = "℗";
const CounterClockwiseContourIntegral$1 = "∳";
const crarr$1 = "↵";
const cross$1 = "✗";
const Cross$1 = "⨯";
const Cscr$1 = "𝒞";
const cscr$1 = "𝒸";
const csub$1 = "⫏";
const csube$1 = "⫑";
const csup$1 = "⫐";
const csupe$1 = "⫒";
const ctdot$1 = "⋯";
const cudarrl$1 = "⤸";
const cudarrr$1 = "⤵";
const cuepr$1 = "⋞";
const cuesc$1 = "⋟";
const cularr$1 = "↶";
const cularrp$1 = "⤽";
const cupbrcap$1 = "⩈";
const cupcap$1 = "⩆";
const CupCap$1 = "≍";
const cup$1 = "∪";
const Cup$1 = "⋓";
const cupcup$1 = "⩊";
const cupdot$1 = "⊍";
const cupor$1 = "⩅";
const cups$1 = "∪︀";
const curarr$1 = "↷";
const curarrm$1 = "⤼";
const curlyeqprec$1 = "⋞";
const curlyeqsucc$1 = "⋟";
const curlyvee$1 = "⋎";
const curlywedge$1 = "⋏";
const curren$1 = "¤";
const curvearrowleft$1 = "↶";
const curvearrowright$1 = "↷";
const cuvee$1 = "⋎";
const cuwed$1 = "⋏";
const cwconint$1 = "∲";
const cwint$1 = "∱";
const cylcty$1 = "⌭";
const dagger$1 = "†";
const Dagger$1 = "‡";
const daleth$1 = "ℸ";
const darr$1 = "↓";
const Darr$1 = "↡";
const dArr$1 = "⇓";
const dash$1 = "‐";
const Dashv$1 = "⫤";
const dashv$1 = "⊣";
const dbkarow$1 = "⤏";
const dblac$1 = "˝";
const Dcaron$1 = "Ď";
const dcaron$1 = "ď";
const Dcy$1 = "Д";
const dcy$1 = "д";
const ddagger$1 = "‡";
const ddarr$1 = "⇊";
const DD$1 = "ⅅ";
const dd$1 = "ⅆ";
const DDotrahd$1 = "⤑";
const ddotseq$1 = "⩷";
const deg$1 = "°";
const Del$1 = "∇";
const Delta$1 = "Δ";
const delta$1 = "δ";
const demptyv$1 = "⦱";
const dfisht$1 = "⥿";
const Dfr$1 = "𝔇";
const dfr$1 = "𝔡";
const dHar$1 = "⥥";
const dharl$1 = "⇃";
const dharr$1 = "⇂";
const DiacriticalAcute$1 = "´";
const DiacriticalDot$1 = "˙";
const DiacriticalDoubleAcute$1 = "˝";
const DiacriticalGrave$1 = "`";
const DiacriticalTilde$1 = "˜";
const diam$1 = "⋄";
const diamond$1 = "⋄";
const Diamond$1 = "⋄";
const diamondsuit$1 = "♦";
const diams$1 = "♦";
const die$1 = "¨";
const DifferentialD$1 = "ⅆ";
const digamma$1 = "ϝ";
const disin$1 = "⋲";
const div$1 = "÷";
const divide$1 = "÷";
const divideontimes$1 = "⋇";
const divonx$1 = "⋇";
const DJcy$1 = "Ђ";
const djcy$1 = "ђ";
const dlcorn$1 = "⌞";
const dlcrop$1 = "⌍";
const dollar$1 = "$";
const Dopf$1 = "𝔻";
const dopf$1 = "𝕕";
const Dot$1 = "¨";
const dot$1 = "˙";
const DotDot$1 = "⃜";
const doteq$1 = "≐";
const doteqdot$1 = "≑";
const DotEqual$1 = "≐";
const dotminus$1 = "∸";
const dotplus$1 = "∔";
const dotsquare$1 = "⊡";
const doublebarwedge$1 = "⌆";
const DoubleContourIntegral$1 = "∯";
const DoubleDot$1 = "¨";
const DoubleDownArrow$1 = "⇓";
const DoubleLeftArrow$1 = "⇐";
const DoubleLeftRightArrow$1 = "⇔";
const DoubleLeftTee$1 = "⫤";
const DoubleLongLeftArrow$1 = "⟸";
const DoubleLongLeftRightArrow$1 = "⟺";
const DoubleLongRightArrow$1 = "⟹";
const DoubleRightArrow$1 = "⇒";
const DoubleRightTee$1 = "⊨";
const DoubleUpArrow$1 = "⇑";
const DoubleUpDownArrow$1 = "⇕";
const DoubleVerticalBar$1 = "∥";
const DownArrowBar$1 = "⤓";
const downarrow$1 = "↓";
const DownArrow$1 = "↓";
const Downarrow$1 = "⇓";
const DownArrowUpArrow$1 = "⇵";
const DownBreve$1 = "̑";
const downdownarrows$1 = "⇊";
const downharpoonleft$1 = "⇃";
const downharpoonright$1 = "⇂";
const DownLeftRightVector$1 = "⥐";
const DownLeftTeeVector$1 = "⥞";
const DownLeftVectorBar$1 = "⥖";
const DownLeftVector$1 = "↽";
const DownRightTeeVector$1 = "⥟";
const DownRightVectorBar$1 = "⥗";
const DownRightVector$1 = "⇁";
const DownTeeArrow$1 = "↧";
const DownTee$1 = "⊤";
const drbkarow$1 = "⤐";
const drcorn$1 = "⌟";
const drcrop$1 = "⌌";
const Dscr$1 = "𝒟";
const dscr$1 = "𝒹";
const DScy$1 = "Ѕ";
const dscy$1 = "ѕ";
const dsol$1 = "⧶";
const Dstrok$1 = "Đ";
const dstrok$1 = "đ";
const dtdot$1 = "⋱";
const dtri$1 = "▿";
const dtrif$1 = "▾";
const duarr$1 = "⇵";
const duhar$1 = "⥯";
const dwangle$1 = "⦦";
const DZcy$1 = "Џ";
const dzcy$1 = "џ";
const dzigrarr$1 = "⟿";
const Eacute$1 = "É";
const eacute$1 = "é";
const easter$1 = "⩮";
const Ecaron$1 = "Ě";
const ecaron$1 = "ě";
const Ecirc$1 = "Ê";
const ecirc$1 = "ê";
const ecir$1 = "≖";
const ecolon$1 = "≕";
const Ecy$1 = "Э";
const ecy$1 = "э";
const eDDot$1 = "⩷";
const Edot$1 = "Ė";
const edot$1 = "ė";
const eDot$1 = "≑";
const ee$1 = "ⅇ";
const efDot$1 = "≒";
const Efr$1 = "𝔈";
const efr$1 = "𝔢";
const eg$1 = "⪚";
const Egrave$1 = "È";
const egrave$1 = "è";
const egs$1 = "⪖";
const egsdot$1 = "⪘";
const el$1 = "⪙";
const Element$1 = "∈";
const elinters$1 = "⏧";
const ell$1 = "ℓ";
const els$1 = "⪕";
const elsdot$1 = "⪗";
const Emacr$1 = "Ē";
const emacr$1 = "ē";
const empty$1 = "∅";
const emptyset$1 = "∅";
const EmptySmallSquare$1 = "◻";
const emptyv$1 = "∅";
const EmptyVerySmallSquare$1 = "▫";
const emsp13$1 = " ";
const emsp14$1 = " ";
const emsp$1 = " ";
const ENG$1 = "Ŋ";
const eng$1 = "ŋ";
const ensp$1 = " ";
const Eogon$1 = "Ę";
const eogon$1 = "ę";
const Eopf$1 = "𝔼";
const eopf$1 = "𝕖";
const epar$1 = "⋕";
const eparsl$1 = "⧣";
const eplus$1 = "⩱";
const epsi$1 = "ε";
const Epsilon$1 = "Ε";
const epsilon$1 = "ε";
const epsiv$1 = "ϵ";
const eqcirc$1 = "≖";
const eqcolon$1 = "≕";
const eqsim$1 = "≂";
const eqslantgtr$1 = "⪖";
const eqslantless$1 = "⪕";
const Equal$1 = "⩵";
const equals$1 = "=";
const EqualTilde$1 = "≂";
const equest$1 = "≟";
const Equilibrium$1 = "⇌";
const equiv$1 = "≡";
const equivDD$1 = "⩸";
const eqvparsl$1 = "⧥";
const erarr$1 = "⥱";
const erDot$1 = "≓";
const escr$1 = "ℯ";
const Escr$1 = "ℰ";
const esdot$1 = "≐";
const Esim$1 = "⩳";
const esim$1 = "≂";
const Eta$1 = "Η";
const eta$1 = "η";
const ETH$1 = "Ð";
const eth$1 = "ð";
const Euml$1 = "Ë";
const euml$1 = "ë";
const euro$1 = "€";
const excl$1 = "!";
const exist$1 = "∃";
const Exists$1 = "∃";
const expectation$1 = "ℰ";
const exponentiale$1 = "ⅇ";
const ExponentialE$1 = "ⅇ";
const fallingdotseq$1 = "≒";
const Fcy$1 = "Ф";
const fcy$1 = "ф";
const female$1 = "♀";
const ffilig$1 = "ﬃ";
const fflig$1 = "ﬀ";
const ffllig$1 = "ﬄ";
const Ffr$1 = "𝔉";
const ffr$1 = "𝔣";
const filig$1 = "ﬁ";
const FilledSmallSquare$1 = "◼";
const FilledVerySmallSquare$1 = "▪";
const fjlig$1 = "fj";
const flat$1 = "♭";
const fllig$1 = "ﬂ";
const fltns$1 = "▱";
const fnof$1 = "ƒ";
const Fopf$1 = "𝔽";
const fopf$1 = "𝕗";
const forall$1 = "∀";
const ForAll$1 = "∀";
const fork$1 = "⋔";
const forkv$1 = "⫙";
const Fouriertrf$1 = "ℱ";
const fpartint$1 = "⨍";
const frac12$1 = "½";
const frac13$1 = "⅓";
const frac14$1 = "¼";
const frac15$1 = "⅕";
const frac16$1 = "⅙";
const frac18$1 = "⅛";
const frac23$1 = "⅔";
const frac25$1 = "⅖";
const frac34$1 = "¾";
const frac35$1 = "⅗";
const frac38$1 = "⅜";
const frac45$1 = "⅘";
const frac56$1 = "⅚";
const frac58$1 = "⅝";
const frac78$1 = "⅞";
const frasl$1 = "⁄";
const frown$1 = "⌢";
const fscr$1 = "𝒻";
const Fscr$1 = "ℱ";
const gacute$1 = "ǵ";
const Gamma$1 = "Γ";
const gamma$1 = "γ";
const Gammad$1 = "Ϝ";
const gammad$1 = "ϝ";
const gap$1 = "⪆";
const Gbreve$1 = "Ğ";
const gbreve$1 = "ğ";
const Gcedil$1 = "Ģ";
const Gcirc$1 = "Ĝ";
const gcirc$1 = "ĝ";
const Gcy$1 = "Г";
const gcy$1 = "г";
const Gdot$1 = "Ġ";
const gdot$1 = "ġ";
const ge$1 = "≥";
const gE$1 = "≧";
const gEl$1 = "⪌";
const gel$1 = "⋛";
const geq$1 = "≥";
const geqq$1 = "≧";
const geqslant$1 = "⩾";
const gescc$1 = "⪩";
const ges$1 = "⩾";
const gesdot$1 = "⪀";
const gesdoto$1 = "⪂";
const gesdotol$1 = "⪄";
const gesl$1 = "⋛︀";
const gesles$1 = "⪔";
const Gfr$1 = "𝔊";
const gfr$1 = "𝔤";
const gg$1 = "≫";
const Gg$1 = "⋙";
const ggg$1 = "⋙";
const gimel$1 = "ℷ";
const GJcy$1 = "Ѓ";
const gjcy$1 = "ѓ";
const gla$1 = "⪥";
const gl$1 = "≷";
const glE$1 = "⪒";
const glj$1 = "⪤";
const gnap$1 = "⪊";
const gnapprox$1 = "⪊";
const gne$1 = "⪈";
const gnE$1 = "≩";
const gneq$1 = "⪈";
const gneqq$1 = "≩";
const gnsim$1 = "⋧";
const Gopf$1 = "𝔾";
const gopf$1 = "𝕘";
const grave$1 = "`";
const GreaterEqual$1 = "≥";
const GreaterEqualLess$1 = "⋛";
const GreaterFullEqual$1 = "≧";
const GreaterGreater$1 = "⪢";
const GreaterLess$1 = "≷";
const GreaterSlantEqual$1 = "⩾";
const GreaterTilde$1 = "≳";
const Gscr$1 = "𝒢";
const gscr$1 = "ℊ";
const gsim$1 = "≳";
const gsime$1 = "⪎";
const gsiml$1 = "⪐";
const gtcc$1 = "⪧";
const gtcir$1 = "⩺";
const gt$1 = ">";
const GT$1 = ">";
const Gt$1 = "≫";
const gtdot$1 = "⋗";
const gtlPar$1 = "⦕";
const gtquest$1 = "⩼";
const gtrapprox$1 = "⪆";
const gtrarr$1 = "⥸";
const gtrdot$1 = "⋗";
const gtreqless$1 = "⋛";
const gtreqqless$1 = "⪌";
const gtrless$1 = "≷";
const gtrsim$1 = "≳";
const gvertneqq$1 = "≩︀";
const gvnE$1 = "≩︀";
const Hacek$1 = "ˇ";
const hairsp$1 = " ";
const half$1 = "½";
const hamilt$1 = "ℋ";
const HARDcy$1 = "Ъ";
const hardcy$1 = "ъ";
const harrcir$1 = "⥈";
const harr$1 = "↔";
const hArr$1 = "⇔";
const harrw$1 = "↭";
const Hat$1 = "^";
const hbar$1 = "ℏ";
const Hcirc$1 = "Ĥ";
const hcirc$1 = "ĥ";
const hearts$1 = "♥";
const heartsuit$1 = "♥";
const hellip$1 = "…";
const hercon$1 = "⊹";
const hfr$1 = "𝔥";
const Hfr$1 = "ℌ";
const HilbertSpace$1 = "ℋ";
const hksearow$1 = "⤥";
const hkswarow$1 = "⤦";
const hoarr$1 = "⇿";
const homtht$1 = "∻";
const hookleftarrow$1 = "↩";
const hookrightarrow$1 = "↪";
const hopf$1 = "𝕙";
const Hopf$1 = "ℍ";
const horbar$1 = "―";
const HorizontalLine$1 = "─";
const hscr$1 = "𝒽";
const Hscr$1 = "ℋ";
const hslash$1 = "ℏ";
const Hstrok$1 = "Ħ";
const hstrok$1 = "ħ";
const HumpDownHump$1 = "≎";
const HumpEqual$1 = "≏";
const hybull$1 = "⁃";
const hyphen$1 = "‐";
const Iacute$1 = "Í";
const iacute$1 = "í";
const ic$1 = "⁣";
const Icirc$1 = "Î";
const icirc$1 = "î";
const Icy$1 = "И";
const icy$1 = "и";
const Idot$1 = "İ";
const IEcy$1 = "Е";
const iecy$1 = "е";
const iexcl$1 = "¡";
const iff$1 = "⇔";
const ifr$1 = "𝔦";
const Ifr$1 = "ℑ";
const Igrave$1 = "Ì";
const igrave$1 = "ì";
const ii$1 = "ⅈ";
const iiiint$1 = "⨌";
const iiint$1 = "∭";
const iinfin$1 = "⧜";
const iiota$1 = "℩";
const IJlig$1 = "Ĳ";
const ijlig$1 = "ĳ";
const Imacr$1 = "Ī";
const imacr$1 = "ī";
const image$1 = "ℑ";
const ImaginaryI$1 = "ⅈ";
const imagline$1 = "ℐ";
const imagpart$1 = "ℑ";
const imath$1 = "ı";
const Im$1 = "ℑ";
const imof$1 = "⊷";
const imped$1 = "Ƶ";
const Implies$1 = "⇒";
const incare$1 = "℅";
const infin$1 = "∞";
const infintie$1 = "⧝";
const inodot$1 = "ı";
const intcal$1 = "⊺";
const int$1 = "∫";
const Int$1 = "∬";
const integers$1 = "ℤ";
const Integral$1 = "∫";
const intercal$1 = "⊺";
const Intersection$1 = "⋂";
const intlarhk$1 = "⨗";
const intprod$1 = "⨼";
const InvisibleComma$1 = "⁣";
const InvisibleTimes$1 = "⁢";
const IOcy$1 = "Ё";
const iocy$1 = "ё";
const Iogon$1 = "Į";
const iogon$1 = "į";
const Iopf$1 = "𝕀";
const iopf$1 = "𝕚";
const Iota$1 = "Ι";
const iota$1 = "ι";
const iprod$1 = "⨼";
const iquest$1 = "¿";
const iscr$1 = "𝒾";
const Iscr$1 = "ℐ";
const isin$1 = "∈";
const isindot$1 = "⋵";
const isinE$1 = "⋹";
const isins$1 = "⋴";
const isinsv$1 = "⋳";
const isinv$1 = "∈";
const it$1 = "⁢";
const Itilde$1 = "Ĩ";
const itilde$1 = "ĩ";
const Iukcy$1 = "І";
const iukcy$1 = "і";
const Iuml$1 = "Ï";
const iuml$1 = "ï";
const Jcirc$1 = "Ĵ";
const jcirc$1 = "ĵ";
const Jcy$1 = "Й";
const jcy$1 = "й";
const Jfr$1 = "𝔍";
const jfr$1 = "𝔧";
const jmath$1 = "ȷ";
const Jopf$1 = "𝕁";
const jopf$1 = "𝕛";
const Jscr$1 = "𝒥";
const jscr$1 = "𝒿";
const Jsercy$1 = "Ј";
const jsercy$1 = "ј";
const Jukcy$1 = "Є";
const jukcy$1 = "є";
const Kappa$1 = "Κ";
const kappa$1 = "κ";
const kappav$1 = "ϰ";
const Kcedil$1 = "Ķ";
const kcedil$1 = "ķ";
const Kcy$1 = "К";
const kcy$1 = "к";
const Kfr$1 = "𝔎";
const kfr$1 = "𝔨";
const kgreen$1 = "ĸ";
const KHcy$1 = "Х";
const khcy$1 = "х";
const KJcy$1 = "Ќ";
const kjcy$1 = "ќ";
const Kopf$1 = "𝕂";
const kopf$1 = "𝕜";
const Kscr$1 = "𝒦";
const kscr$1 = "𝓀";
const lAarr$1 = "⇚";
const Lacute$1 = "Ĺ";
const lacute$1 = "ĺ";
const laemptyv$1 = "⦴";
const lagran$1 = "ℒ";
const Lambda$1 = "Λ";
const lambda$1 = "λ";
const lang$1 = "⟨";
const Lang$1 = "⟪";
const langd$1 = "⦑";
const langle$1 = "⟨";
const lap$1 = "⪅";
const Laplacetrf$1 = "ℒ";
const laquo$1 = "«";
const larrb$1 = "⇤";
const larrbfs$1 = "⤟";
const larr$1 = "←";
const Larr$1 = "↞";
const lArr$1 = "⇐";
const larrfs$1 = "⤝";
const larrhk$1 = "↩";
const larrlp$1 = "↫";
const larrpl$1 = "⤹";
const larrsim$1 = "⥳";
const larrtl$1 = "↢";
const latail$1 = "⤙";
const lAtail$1 = "⤛";
const lat$1 = "⪫";
const late$1 = "⪭";
const lates$1 = "⪭︀";
const lbarr$1 = "⤌";
const lBarr$1 = "⤎";
const lbbrk$1 = "❲";
const lbrace$1 = "{";
const lbrack$1 = "[";
const lbrke$1 = "⦋";
const lbrksld$1 = "⦏";
const lbrkslu$1 = "⦍";
const Lcaron$1 = "Ľ";
const lcaron$1 = "ľ";
const Lcedil$1 = "Ļ";
const lcedil$1 = "ļ";
const lceil$1 = "⌈";
const lcub$1 = "{";
const Lcy$1 = "Л";
const lcy$1 = "л";
const ldca$1 = "⤶";
const ldquo$1 = "“";
const ldquor$1 = "„";
const ldrdhar$1 = "⥧";
const ldrushar$1 = "⥋";
const ldsh$1 = "↲";
const le$1 = "≤";
const lE$1 = "≦";
const LeftAngleBracket$1 = "⟨";
const LeftArrowBar$1 = "⇤";
const leftarrow$1 = "←";
const LeftArrow$1 = "←";
const Leftarrow$1 = "⇐";
const LeftArrowRightArrow$1 = "⇆";
const leftarrowtail$1 = "↢";
const LeftCeiling$1 = "⌈";
const LeftDoubleBracket$1 = "⟦";
const LeftDownTeeVector$1 = "⥡";
const LeftDownVectorBar$1 = "⥙";
const LeftDownVector$1 = "⇃";
const LeftFloor$1 = "⌊";
const leftharpoondown$1 = "↽";
const leftharpoonup$1 = "↼";
const leftleftarrows$1 = "⇇";
const leftrightarrow$1 = "↔";
const LeftRightArrow$1 = "↔";
const Leftrightarrow$1 = "⇔";
const leftrightarrows$1 = "⇆";
const leftrightharpoons$1 = "⇋";
const leftrightsquigarrow$1 = "↭";
const LeftRightVector$1 = "⥎";
const LeftTeeArrow$1 = "↤";
const LeftTee$1 = "⊣";
const LeftTeeVector$1 = "⥚";
const leftthreetimes$1 = "⋋";
const LeftTriangleBar$1 = "⧏";
const LeftTriangle$1 = "⊲";
const LeftTriangleEqual$1 = "⊴";
const LeftUpDownVector$1 = "⥑";
const LeftUpTeeVector$1 = "⥠";
const LeftUpVectorBar$1 = "⥘";
const LeftUpVector$1 = "↿";
const LeftVectorBar$1 = "⥒";
const LeftVector$1 = "↼";
const lEg$1 = "⪋";
const leg$1 = "⋚";
const leq$1 = "≤";
const leqq$1 = "≦";
const leqslant$1 = "⩽";
const lescc$1 = "⪨";
const les$1 = "⩽";
const lesdot$1 = "⩿";
const lesdoto$1 = "⪁";
const lesdotor$1 = "⪃";
const lesg$1 = "⋚︀";
const lesges$1 = "⪓";
const lessapprox$1 = "⪅";
const lessdot$1 = "⋖";
const lesseqgtr$1 = "⋚";
const lesseqqgtr$1 = "⪋";
const LessEqualGreater$1 = "⋚";
const LessFullEqual$1 = "≦";
const LessGreater$1 = "≶";
const lessgtr$1 = "≶";
const LessLess$1 = "⪡";
const lesssim$1 = "≲";
const LessSlantEqual$1 = "⩽";
const LessTilde$1 = "≲";
const lfisht$1 = "⥼";
const lfloor$1 = "⌊";
const Lfr$1 = "𝔏";
const lfr$1 = "𝔩";
const lg$1 = "≶";
const lgE$1 = "⪑";
const lHar$1 = "⥢";
const lhard$1 = "↽";
const lharu$1 = "↼";
const lharul$1 = "⥪";
const lhblk$1 = "▄";
const LJcy$1 = "Љ";
const ljcy$1 = "љ";
const llarr$1 = "⇇";
const ll$1 = "≪";
const Ll$1 = "⋘";
const llcorner$1 = "⌞";
const Lleftarrow$1 = "⇚";
const llhard$1 = "⥫";
const lltri$1 = "◺";
const Lmidot$1 = "Ŀ";
const lmidot$1 = "ŀ";
const lmoustache$1 = "⎰";
const lmoust$1 = "⎰";
const lnap$1 = "⪉";
const lnapprox$1 = "⪉";
const lne$1 = "⪇";
const lnE$1 = "≨";
const lneq$1 = "⪇";
const lneqq$1 = "≨";
const lnsim$1 = "⋦";
const loang$1 = "⟬";
const loarr$1 = "⇽";
const lobrk$1 = "⟦";
const longleftarrow$1 = "⟵";
const LongLeftArrow$1 = "⟵";
const Longleftarrow$1 = "⟸";
const longleftrightarrow$1 = "⟷";
const LongLeftRightArrow$1 = "⟷";
const Longleftrightarrow$1 = "⟺";
const longmapsto$1 = "⟼";
const longrightarrow$1 = "⟶";
const LongRightArrow$1 = "⟶";
const Longrightarrow$1 = "⟹";
const looparrowleft$1 = "↫";
const looparrowright$1 = "↬";
const lopar$1 = "⦅";
const Lopf$1 = "𝕃";
const lopf$1 = "𝕝";
const loplus$1 = "⨭";
const lotimes$1 = "⨴";
const lowast$1 = "∗";
const lowbar$1 = "_";
const LowerLeftArrow$1 = "↙";
const LowerRightArrow$1 = "↘";
const loz$1 = "◊";
const lozenge$1 = "◊";
const lozf$1 = "⧫";
const lpar$1 = "(";
const lparlt$1 = "⦓";
const lrarr$1 = "⇆";
const lrcorner$1 = "⌟";
const lrhar$1 = "⇋";
const lrhard$1 = "⥭";
const lrm$1 = "‎";
const lrtri$1 = "⊿";
const lsaquo$1 = "‹";
const lscr$1 = "𝓁";
const Lscr$1 = "ℒ";
const lsh$1 = "↰";
const Lsh$1 = "↰";
const lsim$1 = "≲";
const lsime$1 = "⪍";
const lsimg$1 = "⪏";
const lsqb$1 = "[";
const lsquo$1 = "‘";
const lsquor$1 = "‚";
const Lstrok$1 = "Ł";
const lstrok$1 = "ł";
const ltcc$1 = "⪦";
const ltcir$1 = "⩹";
const lt$1 = "<";
const LT$1 = "<";
const Lt$1 = "≪";
const ltdot$1 = "⋖";
const lthree$1 = "⋋";
const ltimes$1 = "⋉";
const ltlarr$1 = "⥶";
const ltquest$1 = "⩻";
const ltri$1 = "◃";
const ltrie$1 = "⊴";
const ltrif$1 = "◂";
const ltrPar$1 = "⦖";
const lurdshar$1 = "⥊";
const luruhar$1 = "⥦";
const lvertneqq$1 = "≨︀";
const lvnE$1 = "≨︀";
const macr$1 = "¯";
const male$1 = "♂";
const malt$1 = "✠";
const maltese$1 = "✠";
const map$2 = "↦";
const mapsto$1 = "↦";
const mapstodown$1 = "↧";
const mapstoleft$1 = "↤";
const mapstoup$1 = "↥";
const marker$1 = "▮";
const mcomma$1 = "⨩";
const Mcy$1 = "М";
const mcy$1 = "м";
const mdash$1 = "—";
const mDDot$1 = "∺";
const measuredangle$1 = "∡";
const MediumSpace$1 = " ";
const Mellintrf$1 = "ℳ";
const Mfr$1 = "𝔐";
const mfr$1 = "𝔪";
const mho$1 = "℧";
const micro$1 = "µ";
const midast$1 = "*";
const midcir$1 = "⫰";
const mid$1 = "∣";
const middot$1 = "·";
const minusb$1 = "⊟";
const minus$1 = "−";
const minusd$1 = "∸";
const minusdu$1 = "⨪";
const MinusPlus$1 = "∓";
const mlcp$1 = "⫛";
const mldr$1 = "…";
const mnplus$1 = "∓";
const models$1 = "⊧";
const Mopf$1 = "𝕄";
const mopf$1 = "𝕞";
const mp$1 = "∓";
const mscr$1 = "𝓂";
const Mscr$1 = "ℳ";
const mstpos$1 = "∾";
const Mu$1 = "Μ";
const mu$1 = "μ";
const multimap$1 = "⊸";
const mumap$1 = "⊸";
const nabla$1 = "∇";
const Nacute$1 = "Ń";
const nacute$1 = "ń";
const nang$1 = "∠⃒";
const nap$1 = "≉";
const napE$1 = "⩰̸";
const napid$1 = "≋̸";
const napos$1 = "ŉ";
const napprox$1 = "≉";
const natural$1 = "♮";
const naturals$1 = "ℕ";
const natur$1 = "♮";
const nbsp$1 = " ";
const nbump$1 = "≎̸";
const nbumpe$1 = "≏̸";
const ncap$1 = "⩃";
const Ncaron$1 = "Ň";
const ncaron$1 = "ň";
const Ncedil$1 = "Ņ";
const ncedil$1 = "ņ";
const ncong$1 = "≇";
const ncongdot$1 = "⩭̸";
const ncup$1 = "⩂";
const Ncy$1 = "Н";
const ncy$1 = "н";
const ndash$1 = "–";
const nearhk$1 = "⤤";
const nearr$1 = "↗";
const neArr$1 = "⇗";
const nearrow$1 = "↗";
const ne$1 = "≠";
const nedot$1 = "≐̸";
const NegativeMediumSpace$1 = "​";
const NegativeThickSpace$1 = "​";
const NegativeThinSpace$1 = "​";
const NegativeVeryThinSpace$1 = "​";
const nequiv$1 = "≢";
const nesear$1 = "⤨";
const nesim$1 = "≂̸";
const NestedGreaterGreater$1 = "≫";
const NestedLessLess$1 = "≪";
const NewLine$1 = "\n";
const nexist$1 = "∄";
const nexists$1 = "∄";
const Nfr$1 = "𝔑";
const nfr$1 = "𝔫";
const ngE$1 = "≧̸";
const nge$1 = "≱";
const ngeq$1 = "≱";
const ngeqq$1 = "≧̸";
const ngeqslant$1 = "⩾̸";
const nges$1 = "⩾̸";
const nGg$1 = "⋙̸";
const ngsim$1 = "≵";
const nGt$1 = "≫⃒";
const ngt$1 = "≯";
const ngtr$1 = "≯";
const nGtv$1 = "≫̸";
const nharr$1 = "↮";
const nhArr$1 = "⇎";
const nhpar$1 = "⫲";
const ni$1 = "∋";
const nis$1 = "⋼";
const nisd$1 = "⋺";
const niv$1 = "∋";
const NJcy$1 = "Њ";
const njcy$1 = "њ";
const nlarr$1 = "↚";
const nlArr$1 = "⇍";
const nldr$1 = "‥";
const nlE$1 = "≦̸";
const nle$1 = "≰";
const nleftarrow$1 = "↚";
const nLeftarrow$1 = "⇍";
const nleftrightarrow$1 = "↮";
const nLeftrightarrow$1 = "⇎";
const nleq$1 = "≰";
const nleqq$1 = "≦̸";
const nleqslant$1 = "⩽̸";
const nles$1 = "⩽̸";
const nless$1 = "≮";
const nLl$1 = "⋘̸";
const nlsim$1 = "≴";
const nLt$1 = "≪⃒";
const nlt$1 = "≮";
const nltri$1 = "⋪";
const nltrie$1 = "⋬";
const nLtv$1 = "≪̸";
const nmid$1 = "∤";
const NoBreak$1 = "⁠";
const NonBreakingSpace$1 = " ";
const nopf$1 = "𝕟";
const Nopf$1 = "ℕ";
const Not$1 = "⫬";
const not$1 = "¬";
const NotCongruent$1 = "≢";
const NotCupCap$1 = "≭";
const NotDoubleVerticalBar$1 = "∦";
const NotElement$1 = "∉";
const NotEqual$1 = "≠";
const NotEqualTilde$1 = "≂̸";
const NotExists$1 = "∄";
const NotGreater$1 = "≯";
const NotGreaterEqual$1 = "≱";
const NotGreaterFullEqual$1 = "≧̸";
const NotGreaterGreater$1 = "≫̸";
const NotGreaterLess$1 = "≹";
const NotGreaterSlantEqual$1 = "⩾̸";
const NotGreaterTilde$1 = "≵";
const NotHumpDownHump$1 = "≎̸";
const NotHumpEqual$1 = "≏̸";
const notin$1 = "∉";
const notindot$1 = "⋵̸";
const notinE$1 = "⋹̸";
const notinva$1 = "∉";
const notinvb$1 = "⋷";
const notinvc$1 = "⋶";
const NotLeftTriangleBar$1 = "⧏̸";
const NotLeftTriangle$1 = "⋪";
const NotLeftTriangleEqual$1 = "⋬";
const NotLess$1 = "≮";
const NotLessEqual$1 = "≰";
const NotLessGreater$1 = "≸";
const NotLessLess$1 = "≪̸";
const NotLessSlantEqual$1 = "⩽̸";
const NotLessTilde$1 = "≴";
const NotNestedGreaterGreater$1 = "⪢̸";
const NotNestedLessLess$1 = "⪡̸";
const notni$1 = "∌";
const notniva$1 = "∌";
const notnivb$1 = "⋾";
const notnivc$1 = "⋽";
const NotPrecedes$1 = "⊀";
const NotPrecedesEqual$1 = "⪯̸";
const NotPrecedesSlantEqual$1 = "⋠";
const NotReverseElement$1 = "∌";
const NotRightTriangleBar$1 = "⧐̸";
const NotRightTriangle$1 = "⋫";
const NotRightTriangleEqual$1 = "⋭";
const NotSquareSubset$1 = "⊏̸";
const NotSquareSubsetEqual$1 = "⋢";
const NotSquareSuperset$1 = "⊐̸";
const NotSquareSupersetEqual$1 = "⋣";
const NotSubset$1 = "⊂⃒";
const NotSubsetEqual$1 = "⊈";
const NotSucceeds$1 = "⊁";
const NotSucceedsEqual$1 = "⪰̸";
const NotSucceedsSlantEqual$1 = "⋡";
const NotSucceedsTilde$1 = "≿̸";
const NotSuperset$1 = "⊃⃒";
const NotSupersetEqual$1 = "⊉";
const NotTilde$1 = "≁";
const NotTildeEqual$1 = "≄";
const NotTildeFullEqual$1 = "≇";
const NotTildeTilde$1 = "≉";
const NotVerticalBar$1 = "∤";
const nparallel$1 = "∦";
const npar$1 = "∦";
const nparsl$1 = "⫽⃥";
const npart$1 = "∂̸";
const npolint$1 = "⨔";
const npr$1 = "⊀";
const nprcue$1 = "⋠";
const nprec$1 = "⊀";
const npreceq$1 = "⪯̸";
const npre$1 = "⪯̸";
const nrarrc$1 = "⤳̸";
const nrarr$1 = "↛";
const nrArr$1 = "⇏";
const nrarrw$1 = "↝̸";
const nrightarrow$1 = "↛";
const nRightarrow$1 = "⇏";
const nrtri$1 = "⋫";
const nrtrie$1 = "⋭";
const nsc$1 = "⊁";
const nsccue$1 = "⋡";
const nsce$1 = "⪰̸";
const Nscr$1 = "𝒩";
const nscr$1 = "𝓃";
const nshortmid$1 = "∤";
const nshortparallel$1 = "∦";
const nsim$1 = "≁";
const nsime$1 = "≄";
const nsimeq$1 = "≄";
const nsmid$1 = "∤";
const nspar$1 = "∦";
const nsqsube$1 = "⋢";
const nsqsupe$1 = "⋣";
const nsub$1 = "⊄";
const nsubE$1 = "⫅̸";
const nsube$1 = "⊈";
const nsubset$1 = "⊂⃒";
const nsubseteq$1 = "⊈";
const nsubseteqq$1 = "⫅̸";
const nsucc$1 = "⊁";
const nsucceq$1 = "⪰̸";
const nsup$1 = "⊅";
const nsupE$1 = "⫆̸";
const nsupe$1 = "⊉";
const nsupset$1 = "⊃⃒";
const nsupseteq$1 = "⊉";
const nsupseteqq$1 = "⫆̸";
const ntgl$1 = "≹";
const Ntilde$1 = "Ñ";
const ntilde$1 = "ñ";
const ntlg$1 = "≸";
const ntriangleleft$1 = "⋪";
const ntrianglelefteq$1 = "⋬";
const ntriangleright$1 = "⋫";
const ntrianglerighteq$1 = "⋭";
const Nu$1 = "Ν";
const nu$1 = "ν";
const num$1 = "#";
const numero$1 = "№";
const numsp$1 = " ";
const nvap$1 = "≍⃒";
const nvdash$1 = "⊬";
const nvDash$1 = "⊭";
const nVdash$1 = "⊮";
const nVDash$1 = "⊯";
const nvge$1 = "≥⃒";
const nvgt$1 = ">⃒";
const nvHarr$1 = "⤄";
const nvinfin$1 = "⧞";
const nvlArr$1 = "⤂";
const nvle$1 = "≤⃒";
const nvlt$1 = "<⃒";
const nvltrie$1 = "⊴⃒";
const nvrArr$1 = "⤃";
const nvrtrie$1 = "⊵⃒";
const nvsim$1 = "∼⃒";
const nwarhk$1 = "⤣";
const nwarr$1 = "↖";
const nwArr$1 = "⇖";
const nwarrow$1 = "↖";
const nwnear$1 = "⤧";
const Oacute$1 = "Ó";
const oacute$1 = "ó";
const oast$1 = "⊛";
const Ocirc$1 = "Ô";
const ocirc$1 = "ô";
const ocir$1 = "⊚";
const Ocy$1 = "О";
const ocy$1 = "о";
const odash$1 = "⊝";
const Odblac$1 = "Ő";
const odblac$1 = "ő";
const odiv$1 = "⨸";
const odot$1 = "⊙";
const odsold$1 = "⦼";
const OElig$1 = "Œ";
const oelig$1 = "œ";
const ofcir$1 = "⦿";
const Ofr$1 = "𝔒";
const ofr$1 = "𝔬";
const ogon$1 = "˛";
const Ograve$1 = "Ò";
const ograve$1 = "ò";
const ogt$1 = "⧁";
const ohbar$1 = "⦵";
const ohm$1 = "Ω";
const oint$1 = "∮";
const olarr$1 = "↺";
const olcir$1 = "⦾";
const olcross$1 = "⦻";
const oline$1 = "‾";
const olt$1 = "⧀";
const Omacr$1 = "Ō";
const omacr$1 = "ō";
const Omega$1 = "Ω";
const omega$1 = "ω";
const Omicron$1 = "Ο";
const omicron$1 = "ο";
const omid$1 = "⦶";
const ominus$1 = "⊖";
const Oopf$1 = "𝕆";
const oopf$1 = "𝕠";
const opar$1 = "⦷";
const OpenCurlyDoubleQuote$1 = "“";
const OpenCurlyQuote$1 = "‘";
const operp$1 = "⦹";
const oplus$1 = "⊕";
const orarr$1 = "↻";
const Or$1 = "⩔";
const or$1 = "∨";
const ord$1 = "⩝";
const order$1 = "ℴ";
const orderof$1 = "ℴ";
const ordf$1 = "ª";
const ordm$1 = "º";
const origof$1 = "⊶";
const oror$1 = "⩖";
const orslope$1 = "⩗";
const orv$1 = "⩛";
const oS$1 = "Ⓢ";
const Oscr$1 = "𝒪";
const oscr$1 = "ℴ";
const Oslash$1 = "Ø";
const oslash$1 = "ø";
const osol$1 = "⊘";
const Otilde$1 = "Õ";
const otilde$1 = "õ";
const otimesas$1 = "⨶";
const Otimes$1 = "⨷";
const otimes$1 = "⊗";
const Ouml$1 = "Ö";
const ouml$1 = "ö";
const ovbar$1 = "⌽";
const OverBar$1 = "‾";
const OverBrace$1 = "⏞";
const OverBracket$1 = "⎴";
const OverParenthesis$1 = "⏜";
const para$1 = "¶";
const parallel$1 = "∥";
const par$1 = "∥";
const parsim$1 = "⫳";
const parsl$1 = "⫽";
const part$1 = "∂";
const PartialD$1 = "∂";
const Pcy$1 = "П";
const pcy$1 = "п";
const percnt$1 = "%";
const period$1 = ".";
const permil$1 = "‰";
const perp$1 = "⊥";
const pertenk$1 = "‱";
const Pfr$1 = "𝔓";
const pfr$1 = "𝔭";
const Phi$1 = "Φ";
const phi$1 = "φ";
const phiv$1 = "ϕ";
const phmmat$1 = "ℳ";
const phone$1 = "☎";
const Pi$1 = "Π";
const pi$1 = "π";
const pitchfork$1 = "⋔";
const piv$1 = "ϖ";
const planck$1 = "ℏ";
const planckh$1 = "ℎ";
const plankv$1 = "ℏ";
const plusacir$1 = "⨣";
const plusb$1 = "⊞";
const pluscir$1 = "⨢";
const plus$1 = "+";
const plusdo$1 = "∔";
const plusdu$1 = "⨥";
const pluse$1 = "⩲";
const PlusMinus$1 = "±";
const plusmn$1 = "±";
const plussim$1 = "⨦";
const plustwo$1 = "⨧";
const pm$1 = "±";
const Poincareplane$1 = "ℌ";
const pointint$1 = "⨕";
const popf$1 = "𝕡";
const Popf$1 = "ℙ";
const pound$1 = "£";
const prap$1 = "⪷";
const Pr$1 = "⪻";
const pr$1 = "≺";
const prcue$1 = "≼";
const precapprox$1 = "⪷";
const prec$1 = "≺";
const preccurlyeq$1 = "≼";
const Precedes$1 = "≺";
const PrecedesEqual$1 = "⪯";
const PrecedesSlantEqual$1 = "≼";
const PrecedesTilde$1 = "≾";
const preceq$1 = "⪯";
const precnapprox$1 = "⪹";
const precneqq$1 = "⪵";
const precnsim$1 = "⋨";
const pre$1 = "⪯";
const prE$1 = "⪳";
const precsim$1 = "≾";
const prime$1 = "′";
const Prime$1 = "″";
const primes$1 = "ℙ";
const prnap$1 = "⪹";
const prnE$1 = "⪵";
const prnsim$1 = "⋨";
const prod$1 = "∏";
const Product$1 = "∏";
const profalar$1 = "⌮";
const profline$1 = "⌒";
const profsurf$1 = "⌓";
const prop$1 = "∝";
const Proportional$1 = "∝";
const Proportion$1 = "∷";
const propto$1 = "∝";
const prsim$1 = "≾";
const prurel$1 = "⊰";
const Pscr$1 = "𝒫";
const pscr$1 = "𝓅";
const Psi$1 = "Ψ";
const psi$1 = "ψ";
const puncsp$1 = " ";
const Qfr$1 = "𝔔";
const qfr$1 = "𝔮";
const qint$1 = "⨌";
const qopf$1 = "𝕢";
const Qopf$1 = "ℚ";
const qprime$1 = "⁗";
const Qscr$1 = "𝒬";
const qscr$1 = "𝓆";
const quaternions$1 = "ℍ";
const quatint$1 = "⨖";
const quest$1 = "?";
const questeq$1 = "≟";
const quot$1 = "\"";
const QUOT$1 = "\"";
const rAarr$1 = "⇛";
const race$1 = "∽̱";
const Racute$1 = "Ŕ";
const racute$1 = "ŕ";
const radic$1 = "√";
const raemptyv$1 = "⦳";
const rang$1 = "⟩";
const Rang$1 = "⟫";
const rangd$1 = "⦒";
const range$1 = "⦥";
const rangle$1 = "⟩";
const raquo$1 = "»";
const rarrap$1 = "⥵";
const rarrb$1 = "⇥";
const rarrbfs$1 = "⤠";
const rarrc$1 = "⤳";
const rarr$1 = "→";
const Rarr$1 = "↠";
const rArr$1 = "⇒";
const rarrfs$1 = "⤞";
const rarrhk$1 = "↪";
const rarrlp$1 = "↬";
const rarrpl$1 = "⥅";
const rarrsim$1 = "⥴";
const Rarrtl$1 = "⤖";
const rarrtl$1 = "↣";
const rarrw$1 = "↝";
const ratail$1 = "⤚";
const rAtail$1 = "⤜";
const ratio$1 = "∶";
const rationals$1 = "ℚ";
const rbarr$1 = "⤍";
const rBarr$1 = "⤏";
const RBarr$1 = "⤐";
const rbbrk$1 = "❳";
const rbrace$1 = "}";
const rbrack$1 = "]";
const rbrke$1 = "⦌";
const rbrksld$1 = "⦎";
const rbrkslu$1 = "⦐";
const Rcaron$1 = "Ř";
const rcaron$1 = "ř";
const Rcedil$1 = "Ŗ";
const rcedil$1 = "ŗ";
const rceil$1 = "⌉";
const rcub$1 = "}";
const Rcy$1 = "Р";
const rcy$1 = "р";
const rdca$1 = "⤷";
const rdldhar$1 = "⥩";
const rdquo$1 = "”";
const rdquor$1 = "”";
const rdsh$1 = "↳";
const real$1 = "ℜ";
const realine$1 = "ℛ";
const realpart$1 = "ℜ";
const reals$1 = "ℝ";
const Re$1 = "ℜ";
const rect$1 = "▭";
const reg$1 = "®";
const REG$1 = "®";
const ReverseElement$1 = "∋";
const ReverseEquilibrium$1 = "⇋";
const ReverseUpEquilibrium$1 = "⥯";
const rfisht$1 = "⥽";
const rfloor$1 = "⌋";
const rfr$1 = "𝔯";
const Rfr$1 = "ℜ";
const rHar$1 = "⥤";
const rhard$1 = "⇁";
const rharu$1 = "⇀";
const rharul$1 = "⥬";
const Rho$1 = "Ρ";
const rho$1 = "ρ";
const rhov$1 = "ϱ";
const RightAngleBracket$1 = "⟩";
const RightArrowBar$1 = "⇥";
const rightarrow$1 = "→";
const RightArrow$1 = "→";
const Rightarrow$1 = "⇒";
const RightArrowLeftArrow$1 = "⇄";
const rightarrowtail$1 = "↣";
const RightCeiling$1 = "⌉";
const RightDoubleBracket$1 = "⟧";
const RightDownTeeVector$1 = "⥝";
const RightDownVectorBar$1 = "⥕";
const RightDownVector$1 = "⇂";
const RightFloor$1 = "⌋";
const rightharpoondown$1 = "⇁";
const rightharpoonup$1 = "⇀";
const rightleftarrows$1 = "⇄";
const rightleftharpoons$1 = "⇌";
const rightrightarrows$1 = "⇉";
const rightsquigarrow$1 = "↝";
const RightTeeArrow$1 = "↦";
const RightTee$1 = "⊢";
const RightTeeVector$1 = "⥛";
const rightthreetimes$1 = "⋌";
const RightTriangleBar$1 = "⧐";
const RightTriangle$1 = "⊳";
const RightTriangleEqual$1 = "⊵";
const RightUpDownVector$1 = "⥏";
const RightUpTeeVector$1 = "⥜";
const RightUpVectorBar$1 = "⥔";
const RightUpVector$1 = "↾";
const RightVectorBar$1 = "⥓";
const RightVector$1 = "⇀";
const ring$1 = "˚";
const risingdotseq$1 = "≓";
const rlarr$1 = "⇄";
const rlhar$1 = "⇌";
const rlm$1 = "‏";
const rmoustache$1 = "⎱";
const rmoust$1 = "⎱";
const rnmid$1 = "⫮";
const roang$1 = "⟭";
const roarr$1 = "⇾";
const robrk$1 = "⟧";
const ropar$1 = "⦆";
const ropf$1 = "𝕣";
const Ropf$1 = "ℝ";
const roplus$1 = "⨮";
const rotimes$1 = "⨵";
const RoundImplies$1 = "⥰";
const rpar$1 = ")";
const rpargt$1 = "⦔";
const rppolint$1 = "⨒";
const rrarr$1 = "⇉";
const Rrightarrow$1 = "⇛";
const rsaquo$1 = "›";
const rscr$1 = "𝓇";
const Rscr$1 = "ℛ";
const rsh$1 = "↱";
const Rsh$1 = "↱";
const rsqb$1 = "]";
const rsquo$1 = "’";
const rsquor$1 = "’";
const rthree$1 = "⋌";
const rtimes$1 = "⋊";
const rtri$1 = "▹";
const rtrie$1 = "⊵";
const rtrif$1 = "▸";
const rtriltri$1 = "⧎";
const RuleDelayed$1 = "⧴";
const ruluhar$1 = "⥨";
const rx$1 = "℞";
const Sacute$1 = "Ś";
const sacute$1 = "ś";
const sbquo$1 = "‚";
const scap$1 = "⪸";
const Scaron$1 = "Š";
const scaron$1 = "š";
const Sc$1 = "⪼";
const sc$1 = "≻";
const sccue$1 = "≽";
const sce$1 = "⪰";
const scE$1 = "⪴";
const Scedil$1 = "Ş";
const scedil$1 = "ş";
const Scirc$1 = "Ŝ";
const scirc$1 = "ŝ";
const scnap$1 = "⪺";
const scnE$1 = "⪶";
const scnsim$1 = "⋩";
const scpolint$1 = "⨓";
const scsim$1 = "≿";
const Scy$1 = "С";
const scy$1 = "с";
const sdotb$1 = "⊡";
const sdot$1 = "⋅";
const sdote$1 = "⩦";
const searhk$1 = "⤥";
const searr$1 = "↘";
const seArr$1 = "⇘";
const searrow$1 = "↘";
const sect$1 = "§";
const semi$1 = ";";
const seswar$1 = "⤩";
const setminus$1 = "∖";
const setmn$1 = "∖";
const sext$1 = "✶";
const Sfr$1 = "𝔖";
const sfr$1 = "𝔰";
const sfrown$1 = "⌢";
const sharp$1 = "♯";
const SHCHcy$1 = "Щ";
const shchcy$1 = "щ";
const SHcy$1 = "Ш";
const shcy$1 = "ш";
const ShortDownArrow$1 = "↓";
const ShortLeftArrow$1 = "←";
const shortmid$1 = "∣";
const shortparallel$1 = "∥";
const ShortRightArrow$1 = "→";
const ShortUpArrow$1 = "↑";
const shy$1 = "­";
const Sigma$1 = "Σ";
const sigma$1 = "σ";
const sigmaf$1 = "ς";
const sigmav$1 = "ς";
const sim$1 = "∼";
const simdot$1 = "⩪";
const sime$1 = "≃";
const simeq$1 = "≃";
const simg$1 = "⪞";
const simgE$1 = "⪠";
const siml$1 = "⪝";
const simlE$1 = "⪟";
const simne$1 = "≆";
const simplus$1 = "⨤";
const simrarr$1 = "⥲";
const slarr$1 = "←";
const SmallCircle$1 = "∘";
const smallsetminus$1 = "∖";
const smashp$1 = "⨳";
const smeparsl$1 = "⧤";
const smid$1 = "∣";
const smile$1 = "⌣";
const smt$1 = "⪪";
const smte$1 = "⪬";
const smtes$1 = "⪬︀";
const SOFTcy$1 = "Ь";
const softcy$1 = "ь";
const solbar$1 = "⌿";
const solb$1 = "⧄";
const sol$1 = "/";
const Sopf$1 = "𝕊";
const sopf$1 = "𝕤";
const spades$1 = "♠";
const spadesuit$1 = "♠";
const spar$1 = "∥";
const sqcap$1 = "⊓";
const sqcaps$1 = "⊓︀";
const sqcup$1 = "⊔";
const sqcups$1 = "⊔︀";
const Sqrt$1 = "√";
const sqsub$1 = "⊏";
const sqsube$1 = "⊑";
const sqsubset$1 = "⊏";
const sqsubseteq$1 = "⊑";
const sqsup$1 = "⊐";
const sqsupe$1 = "⊒";
const sqsupset$1 = "⊐";
const sqsupseteq$1 = "⊒";
const square$1 = "□";
const Square$1 = "□";
const SquareIntersection$1 = "⊓";
const SquareSubset$1 = "⊏";
const SquareSubsetEqual$1 = "⊑";
const SquareSuperset$1 = "⊐";
const SquareSupersetEqual$1 = "⊒";
const SquareUnion$1 = "⊔";
const squarf$1 = "▪";
const squ$1 = "□";
const squf$1 = "▪";
const srarr$1 = "→";
const Sscr$1 = "𝒮";
const sscr$1 = "𝓈";
const ssetmn$1 = "∖";
const ssmile$1 = "⌣";
const sstarf$1 = "⋆";
const Star$1 = "⋆";
const star$1 = "☆";
const starf$1 = "★";
const straightepsilon$1 = "ϵ";
const straightphi$1 = "ϕ";
const strns$1 = "¯";
const sub$1 = "⊂";
const Sub$1 = "⋐";
const subdot$1 = "⪽";
const subE$1 = "⫅";
const sube$1 = "⊆";
const subedot$1 = "⫃";
const submult$1 = "⫁";
const subnE$1 = "⫋";
const subne$1 = "⊊";
const subplus$1 = "⪿";
const subrarr$1 = "⥹";
const subset$1 = "⊂";
const Subset$1 = "⋐";
const subseteq$1 = "⊆";
const subseteqq$1 = "⫅";
const SubsetEqual$1 = "⊆";
const subsetneq$1 = "⊊";
const subsetneqq$1 = "⫋";
const subsim$1 = "⫇";
const subsub$1 = "⫕";
const subsup$1 = "⫓";
const succapprox$1 = "⪸";
const succ$1 = "≻";
const succcurlyeq$1 = "≽";
const Succeeds$1 = "≻";
const SucceedsEqual$1 = "⪰";
const SucceedsSlantEqual$1 = "≽";
const SucceedsTilde$1 = "≿";
const succeq$1 = "⪰";
const succnapprox$1 = "⪺";
const succneqq$1 = "⪶";
const succnsim$1 = "⋩";
const succsim$1 = "≿";
const SuchThat$1 = "∋";
const sum$1 = "∑";
const Sum$1 = "∑";
const sung$1 = "♪";
const sup1$1 = "¹";
const sup2$1 = "²";
const sup3$1 = "³";
const sup$1 = "⊃";
const Sup$1 = "⋑";
const supdot$1 = "⪾";
const supdsub$1 = "⫘";
const supE$1 = "⫆";
const supe$1 = "⊇";
const supedot$1 = "⫄";
const Superset$1 = "⊃";
const SupersetEqual$1 = "⊇";
const suphsol$1 = "⟉";
const suphsub$1 = "⫗";
const suplarr$1 = "⥻";
const supmult$1 = "⫂";
const supnE$1 = "⫌";
const supne$1 = "⊋";
const supplus$1 = "⫀";
const supset$1 = "⊃";
const Supset$1 = "⋑";
const supseteq$1 = "⊇";
const supseteqq$1 = "⫆";
const supsetneq$1 = "⊋";
const supsetneqq$1 = "⫌";
const supsim$1 = "⫈";
const supsub$1 = "⫔";
const supsup$1 = "⫖";
const swarhk$1 = "⤦";
const swarr$1 = "↙";
const swArr$1 = "⇙";
const swarrow$1 = "↙";
const swnwar$1 = "⤪";
const szlig$1 = "ß";
const Tab$1 = "\t";
const target$1 = "⌖";
const Tau$1 = "Τ";
const tau$1 = "τ";
const tbrk$1 = "⎴";
const Tcaron$1 = "Ť";
const tcaron$1 = "ť";
const Tcedil$1 = "Ţ";
const tcedil$1 = "ţ";
const Tcy$1 = "Т";
const tcy$1 = "т";
const tdot$1 = "⃛";
const telrec$1 = "⌕";
const Tfr$1 = "𝔗";
const tfr$1 = "𝔱";
const there4$1 = "∴";
const therefore$1 = "∴";
const Therefore$1 = "∴";
const Theta$1 = "Θ";
const theta$1 = "θ";
const thetasym$1 = "ϑ";
const thetav$1 = "ϑ";
const thickapprox$1 = "≈";
const thicksim$1 = "∼";
const ThickSpace$1 = "  ";
const ThinSpace$1 = " ";
const thinsp$1 = " ";
const thkap$1 = "≈";
const thksim$1 = "∼";
const THORN$1 = "Þ";
const thorn$1 = "þ";
const tilde$1 = "˜";
const Tilde$1 = "∼";
const TildeEqual$1 = "≃";
const TildeFullEqual$1 = "≅";
const TildeTilde$1 = "≈";
const timesbar$1 = "⨱";
const timesb$1 = "⊠";
const times$1 = "×";
const timesd$1 = "⨰";
const tint$1 = "∭";
const toea$1 = "⤨";
const topbot$1 = "⌶";
const topcir$1 = "⫱";
const top$1 = "⊤";
const Topf$1 = "𝕋";
const topf$1 = "𝕥";
const topfork$1 = "⫚";
const tosa$1 = "⤩";
const tprime$1 = "‴";
const trade$1 = "™";
const TRADE$1 = "™";
const triangle$1 = "▵";
const triangledown$1 = "▿";
const triangleleft$1 = "◃";
const trianglelefteq$1 = "⊴";
const triangleq$1 = "≜";
const triangleright$1 = "▹";
const trianglerighteq$1 = "⊵";
const tridot$1 = "◬";
const trie$1 = "≜";
const triminus$1 = "⨺";
const TripleDot$1 = "⃛";
const triplus$1 = "⨹";
const trisb$1 = "⧍";
const tritime$1 = "⨻";
const trpezium$1 = "⏢";
const Tscr$1 = "𝒯";
const tscr$1 = "𝓉";
const TScy$1 = "Ц";
const tscy$1 = "ц";
const TSHcy$1 = "Ћ";
const tshcy$1 = "ћ";
const Tstrok$1 = "Ŧ";
const tstrok$1 = "ŧ";
const twixt$1 = "≬";
const twoheadleftarrow$1 = "↞";
const twoheadrightarrow$1 = "↠";
const Uacute$1 = "Ú";
const uacute$1 = "ú";
const uarr$1 = "↑";
const Uarr$1 = "↟";
const uArr$1 = "⇑";
const Uarrocir$1 = "⥉";
const Ubrcy$1 = "Ў";
const ubrcy$1 = "ў";
const Ubreve$1 = "Ŭ";
const ubreve$1 = "ŭ";
const Ucirc$1 = "Û";
const ucirc$1 = "û";
const Ucy$1 = "У";
const ucy$1 = "у";
const udarr$1 = "⇅";
const Udblac$1 = "Ű";
const udblac$1 = "ű";
const udhar$1 = "⥮";
const ufisht$1 = "⥾";
const Ufr$1 = "𝔘";
const ufr$1 = "𝔲";
const Ugrave$1 = "Ù";
const ugrave$1 = "ù";
const uHar$1 = "⥣";
const uharl$1 = "↿";
const uharr$1 = "↾";
const uhblk$1 = "▀";
const ulcorn$1 = "⌜";
const ulcorner$1 = "⌜";
const ulcrop$1 = "⌏";
const ultri$1 = "◸";
const Umacr$1 = "Ū";
const umacr$1 = "ū";
const uml$1 = "¨";
const UnderBar$1 = "_";
const UnderBrace$1 = "⏟";
const UnderBracket$1 = "⎵";
const UnderParenthesis$1 = "⏝";
const Union$1 = "⋃";
const UnionPlus$1 = "⊎";
const Uogon$1 = "Ų";
const uogon$1 = "ų";
const Uopf$1 = "𝕌";
const uopf$1 = "𝕦";
const UpArrowBar$1 = "⤒";
const uparrow$1 = "↑";
const UpArrow$1 = "↑";
const Uparrow$1 = "⇑";
const UpArrowDownArrow$1 = "⇅";
const updownarrow$1 = "↕";
const UpDownArrow$1 = "↕";
const Updownarrow$1 = "⇕";
const UpEquilibrium$1 = "⥮";
const upharpoonleft$1 = "↿";
const upharpoonright$1 = "↾";
const uplus$1 = "⊎";
const UpperLeftArrow$1 = "↖";
const UpperRightArrow$1 = "↗";
const upsi$1 = "υ";
const Upsi$1 = "ϒ";
const upsih$1 = "ϒ";
const Upsilon$1 = "Υ";
const upsilon$1 = "υ";
const UpTeeArrow$1 = "↥";
const UpTee$1 = "⊥";
const upuparrows$1 = "⇈";
const urcorn$1 = "⌝";
const urcorner$1 = "⌝";
const urcrop$1 = "⌎";
const Uring$1 = "Ů";
const uring$1 = "ů";
const urtri$1 = "◹";
const Uscr$1 = "𝒰";
const uscr$1 = "𝓊";
const utdot$1 = "⋰";
const Utilde$1 = "Ũ";
const utilde$1 = "ũ";
const utri$1 = "▵";
const utrif$1 = "▴";
const uuarr$1 = "⇈";
const Uuml$1 = "Ü";
const uuml$1 = "ü";
const uwangle$1 = "⦧";
const vangrt$1 = "⦜";
const varepsilon$1 = "ϵ";
const varkappa$1 = "ϰ";
const varnothing$1 = "∅";
const varphi$1 = "ϕ";
const varpi$1 = "ϖ";
const varpropto$1 = "∝";
const varr$1 = "↕";
const vArr$1 = "⇕";
const varrho$1 = "ϱ";
const varsigma$1 = "ς";
const varsubsetneq$1 = "⊊︀";
const varsubsetneqq$1 = "⫋︀";
const varsupsetneq$1 = "⊋︀";
const varsupsetneqq$1 = "⫌︀";
const vartheta$1 = "ϑ";
const vartriangleleft$1 = "⊲";
const vartriangleright$1 = "⊳";
const vBar$1 = "⫨";
const Vbar$1 = "⫫";
const vBarv$1 = "⫩";
const Vcy$1 = "В";
const vcy$1 = "в";
const vdash$1 = "⊢";
const vDash$1 = "⊨";
const Vdash$1 = "⊩";
const VDash$1 = "⊫";
const Vdashl$1 = "⫦";
const veebar$1 = "⊻";
const vee$1 = "∨";
const Vee$1 = "⋁";
const veeeq$1 = "≚";
const vellip$1 = "⋮";
const verbar$1 = "|";
const Verbar$1 = "‖";
const vert$1 = "|";
const Vert$1 = "‖";
const VerticalBar$1 = "∣";
const VerticalLine$1 = "|";
const VerticalSeparator$1 = "❘";
const VerticalTilde$1 = "≀";
const VeryThinSpace$1 = " ";
const Vfr$1 = "𝔙";
const vfr$1 = "𝔳";
const vltri$1 = "⊲";
const vnsub$1 = "⊂⃒";
const vnsup$1 = "⊃⃒";
const Vopf$1 = "𝕍";
const vopf$1 = "𝕧";
const vprop$1 = "∝";
const vrtri$1 = "⊳";
const Vscr$1 = "𝒱";
const vscr$1 = "𝓋";
const vsubnE$1 = "⫋︀";
const vsubne$1 = "⊊︀";
const vsupnE$1 = "⫌︀";
const vsupne$1 = "⊋︀";
const Vvdash$1 = "⊪";
const vzigzag$1 = "⦚";
const Wcirc$1 = "Ŵ";
const wcirc$1 = "ŵ";
const wedbar$1 = "⩟";
const wedge$1 = "∧";
const Wedge$1 = "⋀";
const wedgeq$1 = "≙";
const weierp$1 = "℘";
const Wfr$1 = "𝔚";
const wfr$1 = "𝔴";
const Wopf$1 = "𝕎";
const wopf$1 = "𝕨";
const wp$1 = "℘";
const wr$1 = "≀";
const wreath$1 = "≀";
const Wscr$1 = "𝒲";
const wscr$1 = "𝓌";
const xcap$1 = "⋂";
const xcirc$1 = "◯";
const xcup$1 = "⋃";
const xdtri$1 = "▽";
const Xfr$1 = "𝔛";
const xfr$1 = "𝔵";
const xharr$1 = "⟷";
const xhArr$1 = "⟺";
const Xi$1 = "Ξ";
const xi$1 = "ξ";
const xlarr$1 = "⟵";
const xlArr$1 = "⟸";
const xmap$1 = "⟼";
const xnis$1 = "⋻";
const xodot$1 = "⨀";
const Xopf$1 = "𝕏";
const xopf$1 = "𝕩";
const xoplus$1 = "⨁";
const xotime$1 = "⨂";
const xrarr$1 = "⟶";
const xrArr$1 = "⟹";
const Xscr$1 = "𝒳";
const xscr$1 = "𝓍";
const xsqcup$1 = "⨆";
const xuplus$1 = "⨄";
const xutri$1 = "△";
const xvee$1 = "⋁";
const xwedge$1 = "⋀";
const Yacute$1 = "Ý";
const yacute$1 = "ý";
const YAcy$1 = "Я";
const yacy$1 = "я";
const Ycirc$1 = "Ŷ";
const ycirc$1 = "ŷ";
const Ycy$1 = "Ы";
const ycy$1 = "ы";
const yen$1 = "¥";
const Yfr$1 = "𝔜";
const yfr$1 = "𝔶";
const YIcy$1 = "Ї";
const yicy$1 = "ї";
const Yopf$1 = "𝕐";
const yopf$1 = "𝕪";
const Yscr$1 = "𝒴";
const yscr$1 = "𝓎";
const YUcy$1 = "Ю";
const yucy$1 = "ю";
const yuml$1 = "ÿ";
const Yuml$1 = "Ÿ";
const Zacute$1 = "Ź";
const zacute$1 = "ź";
const Zcaron$1 = "Ž";
const zcaron$1 = "ž";
const Zcy$1 = "З";
const zcy$1 = "з";
const Zdot$1 = "Ż";
const zdot$1 = "ż";
const zeetrf$1 = "ℨ";
const ZeroWidthSpace$1 = "​";
const Zeta$1 = "Ζ";
const zeta$1 = "ζ";
const zfr$1 = "𝔷";
const Zfr$1 = "ℨ";
const ZHcy$1 = "Ж";
const zhcy$1 = "ж";
const zigrarr$1 = "⇝";
const zopf$1 = "𝕫";
const Zopf$1 = "ℤ";
const Zscr$1 = "𝒵";
const zscr$1 = "𝓏";
const zwj$1 = "‍";
const zwnj$1 = "‌";
var require$$0$1 = {
  Aacute: Aacute$1,
  aacute: aacute$1,
  Abreve: Abreve$1,
  abreve: abreve$1,
  ac: ac$1,
  acd: acd$1,
  acE: acE$1,
  Acirc: Acirc$1,
  acirc: acirc$1,
  acute: acute$1,
  Acy: Acy$1,
  acy: acy$1,
  AElig: AElig$1,
  aelig: aelig$1,
  af: af$1,
  Afr: Afr$1,
  afr: afr$1,
  Agrave: Agrave$1,
  agrave: agrave$1,
  alefsym: alefsym$1,
  aleph: aleph$1,
  Alpha: Alpha$1,
  alpha: alpha$1,
  Amacr: Amacr$1,
  amacr: amacr$1,
  amalg: amalg$1,
  amp: amp$1,
  AMP: AMP$1,
  andand: andand$1,
  And: And$1,
  and: and$1,
  andd: andd$1,
  andslope: andslope$1,
  andv: andv$1,
  ang: ang$1,
  ange: ange$1,
  angle: angle$1,
  angmsdaa: angmsdaa$1,
  angmsdab: angmsdab$1,
  angmsdac: angmsdac$1,
  angmsdad: angmsdad$1,
  angmsdae: angmsdae$1,
  angmsdaf: angmsdaf$1,
  angmsdag: angmsdag$1,
  angmsdah: angmsdah$1,
  angmsd: angmsd$1,
  angrt: angrt$1,
  angrtvb: angrtvb$1,
  angrtvbd: angrtvbd$1,
  angsph: angsph$1,
  angst: angst$1,
  angzarr: angzarr$1,
  Aogon: Aogon$1,
  aogon: aogon$1,
  Aopf: Aopf$1,
  aopf: aopf$1,
  apacir: apacir$1,
  ap: ap$1,
  apE: apE$1,
  ape: ape$1,
  apid: apid$1,
  apos: apos$1,
  ApplyFunction: ApplyFunction$1,
  approx: approx$1,
  approxeq: approxeq$1,
  Aring: Aring$1,
  aring: aring$1,
  Ascr: Ascr$1,
  ascr: ascr$1,
  Assign: Assign$1,
  ast: ast$1,
  asymp: asymp$1,
  asympeq: asympeq$1,
  Atilde: Atilde$1,
  atilde: atilde$1,
  Auml: Auml$1,
  auml: auml$1,
  awconint: awconint$1,
  awint: awint$1,
  backcong: backcong$1,
  backepsilon: backepsilon$1,
  backprime: backprime$1,
  backsim: backsim$1,
  backsimeq: backsimeq$1,
  Backslash: Backslash$1,
  Barv: Barv$1,
  barvee: barvee$1,
  barwed: barwed$1,
  Barwed: Barwed$1,
  barwedge: barwedge$1,
  bbrk: bbrk$1,
  bbrktbrk: bbrktbrk$1,
  bcong: bcong$1,
  Bcy: Bcy$1,
  bcy: bcy$1,
  bdquo: bdquo$1,
  becaus: becaus$1,
  because: because$1,
  Because: Because$1,
  bemptyv: bemptyv$1,
  bepsi: bepsi$1,
  bernou: bernou$1,
  Bernoullis: Bernoullis$1,
  Beta: Beta$1,
  beta: beta$1,
  beth: beth$1,
  between: between$1,
  Bfr: Bfr$1,
  bfr: bfr$1,
  bigcap: bigcap$1,
  bigcirc: bigcirc$1,
  bigcup: bigcup$1,
  bigodot: bigodot$1,
  bigoplus: bigoplus$1,
  bigotimes: bigotimes$1,
  bigsqcup: bigsqcup$1,
  bigstar: bigstar$1,
  bigtriangledown: bigtriangledown$1,
  bigtriangleup: bigtriangleup$1,
  biguplus: biguplus$1,
  bigvee: bigvee$1,
  bigwedge: bigwedge$1,
  bkarow: bkarow$1,
  blacklozenge: blacklozenge$1,
  blacksquare: blacksquare$1,
  blacktriangle: blacktriangle$1,
  blacktriangledown: blacktriangledown$1,
  blacktriangleleft: blacktriangleleft$1,
  blacktriangleright: blacktriangleright$1,
  blank: blank$1,
  blk12: blk12$1,
  blk14: blk14$1,
  blk34: blk34$1,
  block: block$1,
  bne: bne$1,
  bnequiv: bnequiv$1,
  bNot: bNot$1,
  bnot: bnot$1,
  Bopf: Bopf$1,
  bopf: bopf$1,
  bot: bot$1,
  bottom: bottom$1,
  bowtie: bowtie$1,
  boxbox: boxbox$1,
  boxdl: boxdl$1,
  boxdL: boxdL$1,
  boxDl: boxDl$1,
  boxDL: boxDL$1,
  boxdr: boxdr$1,
  boxdR: boxdR$1,
  boxDr: boxDr$1,
  boxDR: boxDR$1,
  boxh: boxh$1,
  boxH: boxH$1,
  boxhd: boxhd$1,
  boxHd: boxHd$1,
  boxhD: boxhD$1,
  boxHD: boxHD$1,
  boxhu: boxhu$1,
  boxHu: boxHu$1,
  boxhU: boxhU$1,
  boxHU: boxHU$1,
  boxminus: boxminus$1,
  boxplus: boxplus$1,
  boxtimes: boxtimes$1,
  boxul: boxul$1,
  boxuL: boxuL$1,
  boxUl: boxUl$1,
  boxUL: boxUL$1,
  boxur: boxur$1,
  boxuR: boxuR$1,
  boxUr: boxUr$1,
  boxUR: boxUR$1,
  boxv: boxv$1,
  boxV: boxV$1,
  boxvh: boxvh$1,
  boxvH: boxvH$1,
  boxVh: boxVh$1,
  boxVH: boxVH$1,
  boxvl: boxvl$1,
  boxvL: boxvL$1,
  boxVl: boxVl$1,
  boxVL: boxVL$1,
  boxvr: boxvr$1,
  boxvR: boxvR$1,
  boxVr: boxVr$1,
  boxVR: boxVR$1,
  bprime: bprime$1,
  breve: breve$1,
  Breve: Breve$1,
  brvbar: brvbar$1,
  bscr: bscr$1,
  Bscr: Bscr$1,
  bsemi: bsemi$1,
  bsim: bsim$1,
  bsime: bsime$1,
  bsolb: bsolb$1,
  bsol: bsol$1,
  bsolhsub: bsolhsub$1,
  bull: bull$1,
  bullet: bullet$1,
  bump: bump$1,
  bumpE: bumpE$1,
  bumpe: bumpe$1,
  Bumpeq: Bumpeq$1,
  bumpeq: bumpeq$1,
  Cacute: Cacute$1,
  cacute: cacute$1,
  capand: capand$1,
  capbrcup: capbrcup$1,
  capcap: capcap$1,
  cap: cap$1,
  Cap: Cap$1,
  capcup: capcup$1,
  capdot: capdot$1,
  CapitalDifferentialD: CapitalDifferentialD$1,
  caps: caps$1,
  caret: caret$1,
  caron: caron$1,
  Cayleys: Cayleys$1,
  ccaps: ccaps$1,
  Ccaron: Ccaron$1,
  ccaron: ccaron$1,
  Ccedil: Ccedil$1,
  ccedil: ccedil$1,
  Ccirc: Ccirc$1,
  ccirc: ccirc$1,
  Cconint: Cconint$1,
  ccups: ccups$1,
  ccupssm: ccupssm$1,
  Cdot: Cdot$1,
  cdot: cdot$1,
  cedil: cedil$1,
  Cedilla: Cedilla$1,
  cemptyv: cemptyv$1,
  cent: cent$1,
  centerdot: centerdot$1,
  CenterDot: CenterDot$1,
  cfr: cfr$1,
  Cfr: Cfr$1,
  CHcy: CHcy$1,
  chcy: chcy$1,
  check: check$1,
  checkmark: checkmark$1,
  Chi: Chi$1,
  chi: chi$1,
  circ: circ$1,
  circeq: circeq$1,
  circlearrowleft: circlearrowleft$1,
  circlearrowright: circlearrowright$1,
  circledast: circledast$1,
  circledcirc: circledcirc$1,
  circleddash: circleddash$1,
  CircleDot: CircleDot$1,
  circledR: circledR$1,
  circledS: circledS$1,
  CircleMinus: CircleMinus$1,
  CirclePlus: CirclePlus$1,
  CircleTimes: CircleTimes$1,
  cir: cir$1,
  cirE: cirE$1,
  cire: cire$1,
  cirfnint: cirfnint$1,
  cirmid: cirmid$1,
  cirscir: cirscir$1,
  ClockwiseContourIntegral: ClockwiseContourIntegral$1,
  CloseCurlyDoubleQuote: CloseCurlyDoubleQuote$1,
  CloseCurlyQuote: CloseCurlyQuote$1,
  clubs: clubs$1,
  clubsuit: clubsuit$1,
  colon: colon$1,
  Colon: Colon$1,
  Colone: Colone$1,
  colone: colone$1,
  coloneq: coloneq$1,
  comma: comma$1,
  commat: commat$1,
  comp: comp$1,
  compfn: compfn$1,
  complement: complement$1,
  complexes: complexes$1,
  cong: cong$1,
  congdot: congdot$1,
  Congruent: Congruent$1,
  conint: conint$1,
  Conint: Conint$1,
  ContourIntegral: ContourIntegral$1,
  copf: copf$1,
  Copf: Copf$1,
  coprod: coprod$1,
  Coproduct: Coproduct$1,
  copy: copy$1,
  COPY: COPY$1,
  copysr: copysr$1,
  CounterClockwiseContourIntegral: CounterClockwiseContourIntegral$1,
  crarr: crarr$1,
  cross: cross$1,
  Cross: Cross$1,
  Cscr: Cscr$1,
  cscr: cscr$1,
  csub: csub$1,
  csube: csube$1,
  csup: csup$1,
  csupe: csupe$1,
  ctdot: ctdot$1,
  cudarrl: cudarrl$1,
  cudarrr: cudarrr$1,
  cuepr: cuepr$1,
  cuesc: cuesc$1,
  cularr: cularr$1,
  cularrp: cularrp$1,
  cupbrcap: cupbrcap$1,
  cupcap: cupcap$1,
  CupCap: CupCap$1,
  cup: cup$1,
  Cup: Cup$1,
  cupcup: cupcup$1,
  cupdot: cupdot$1,
  cupor: cupor$1,
  cups: cups$1,
  curarr: curarr$1,
  curarrm: curarrm$1,
  curlyeqprec: curlyeqprec$1,
  curlyeqsucc: curlyeqsucc$1,
  curlyvee: curlyvee$1,
  curlywedge: curlywedge$1,
  curren: curren$1,
  curvearrowleft: curvearrowleft$1,
  curvearrowright: curvearrowright$1,
  cuvee: cuvee$1,
  cuwed: cuwed$1,
  cwconint: cwconint$1,
  cwint: cwint$1,
  cylcty: cylcty$1,
  dagger: dagger$1,
  Dagger: Dagger$1,
  daleth: daleth$1,
  darr: darr$1,
  Darr: Darr$1,
  dArr: dArr$1,
  dash: dash$1,
  Dashv: Dashv$1,
  dashv: dashv$1,
  dbkarow: dbkarow$1,
  dblac: dblac$1,
  Dcaron: Dcaron$1,
  dcaron: dcaron$1,
  Dcy: Dcy$1,
  dcy: dcy$1,
  ddagger: ddagger$1,
  ddarr: ddarr$1,
  DD: DD$1,
  dd: dd$1,
  DDotrahd: DDotrahd$1,
  ddotseq: ddotseq$1,
  deg: deg$1,
  Del: Del$1,
  Delta: Delta$1,
  delta: delta$1,
  demptyv: demptyv$1,
  dfisht: dfisht$1,
  Dfr: Dfr$1,
  dfr: dfr$1,
  dHar: dHar$1,
  dharl: dharl$1,
  dharr: dharr$1,
  DiacriticalAcute: DiacriticalAcute$1,
  DiacriticalDot: DiacriticalDot$1,
  DiacriticalDoubleAcute: DiacriticalDoubleAcute$1,
  DiacriticalGrave: DiacriticalGrave$1,
  DiacriticalTilde: DiacriticalTilde$1,
  diam: diam$1,
  diamond: diamond$1,
  Diamond: Diamond$1,
  diamondsuit: diamondsuit$1,
  diams: diams$1,
  die: die$1,
  DifferentialD: DifferentialD$1,
  digamma: digamma$1,
  disin: disin$1,
  div: div$1,
  divide: divide$1,
  divideontimes: divideontimes$1,
  divonx: divonx$1,
  DJcy: DJcy$1,
  djcy: djcy$1,
  dlcorn: dlcorn$1,
  dlcrop: dlcrop$1,
  dollar: dollar$1,
  Dopf: Dopf$1,
  dopf: dopf$1,
  Dot: Dot$1,
  dot: dot$1,
  DotDot: DotDot$1,
  doteq: doteq$1,
  doteqdot: doteqdot$1,
  DotEqual: DotEqual$1,
  dotminus: dotminus$1,
  dotplus: dotplus$1,
  dotsquare: dotsquare$1,
  doublebarwedge: doublebarwedge$1,
  DoubleContourIntegral: DoubleContourIntegral$1,
  DoubleDot: DoubleDot$1,
  DoubleDownArrow: DoubleDownArrow$1,
  DoubleLeftArrow: DoubleLeftArrow$1,
  DoubleLeftRightArrow: DoubleLeftRightArrow$1,
  DoubleLeftTee: DoubleLeftTee$1,
  DoubleLongLeftArrow: DoubleLongLeftArrow$1,
  DoubleLongLeftRightArrow: DoubleLongLeftRightArrow$1,
  DoubleLongRightArrow: DoubleLongRightArrow$1,
  DoubleRightArrow: DoubleRightArrow$1,
  DoubleRightTee: DoubleRightTee$1,
  DoubleUpArrow: DoubleUpArrow$1,
  DoubleUpDownArrow: DoubleUpDownArrow$1,
  DoubleVerticalBar: DoubleVerticalBar$1,
  DownArrowBar: DownArrowBar$1,
  downarrow: downarrow$1,
  DownArrow: DownArrow$1,
  Downarrow: Downarrow$1,
  DownArrowUpArrow: DownArrowUpArrow$1,
  DownBreve: DownBreve$1,
  downdownarrows: downdownarrows$1,
  downharpoonleft: downharpoonleft$1,
  downharpoonright: downharpoonright$1,
  DownLeftRightVector: DownLeftRightVector$1,
  DownLeftTeeVector: DownLeftTeeVector$1,
  DownLeftVectorBar: DownLeftVectorBar$1,
  DownLeftVector: DownLeftVector$1,
  DownRightTeeVector: DownRightTeeVector$1,
  DownRightVectorBar: DownRightVectorBar$1,
  DownRightVector: DownRightVector$1,
  DownTeeArrow: DownTeeArrow$1,
  DownTee: DownTee$1,
  drbkarow: drbkarow$1,
  drcorn: drcorn$1,
  drcrop: drcrop$1,
  Dscr: Dscr$1,
  dscr: dscr$1,
  DScy: DScy$1,
  dscy: dscy$1,
  dsol: dsol$1,
  Dstrok: Dstrok$1,
  dstrok: dstrok$1,
  dtdot: dtdot$1,
  dtri: dtri$1,
  dtrif: dtrif$1,
  duarr: duarr$1,
  duhar: duhar$1,
  dwangle: dwangle$1,
  DZcy: DZcy$1,
  dzcy: dzcy$1,
  dzigrarr: dzigrarr$1,
  Eacute: Eacute$1,
  eacute: eacute$1,
  easter: easter$1,
  Ecaron: Ecaron$1,
  ecaron: ecaron$1,
  Ecirc: Ecirc$1,
  ecirc: ecirc$1,
  ecir: ecir$1,
  ecolon: ecolon$1,
  Ecy: Ecy$1,
  ecy: ecy$1,
  eDDot: eDDot$1,
  Edot: Edot$1,
  edot: edot$1,
  eDot: eDot$1,
  ee: ee$1,
  efDot: efDot$1,
  Efr: Efr$1,
  efr: efr$1,
  eg: eg$1,
  Egrave: Egrave$1,
  egrave: egrave$1,
  egs: egs$1,
  egsdot: egsdot$1,
  el: el$1,
  Element: Element$1,
  elinters: elinters$1,
  ell: ell$1,
  els: els$1,
  elsdot: elsdot$1,
  Emacr: Emacr$1,
  emacr: emacr$1,
  empty: empty$1,
  emptyset: emptyset$1,
  EmptySmallSquare: EmptySmallSquare$1,
  emptyv: emptyv$1,
  EmptyVerySmallSquare: EmptyVerySmallSquare$1,
  emsp13: emsp13$1,
  emsp14: emsp14$1,
  emsp: emsp$1,
  ENG: ENG$1,
  eng: eng$1,
  ensp: ensp$1,
  Eogon: Eogon$1,
  eogon: eogon$1,
  Eopf: Eopf$1,
  eopf: eopf$1,
  epar: epar$1,
  eparsl: eparsl$1,
  eplus: eplus$1,
  epsi: epsi$1,
  Epsilon: Epsilon$1,
  epsilon: epsilon$1,
  epsiv: epsiv$1,
  eqcirc: eqcirc$1,
  eqcolon: eqcolon$1,
  eqsim: eqsim$1,
  eqslantgtr: eqslantgtr$1,
  eqslantless: eqslantless$1,
  Equal: Equal$1,
  equals: equals$1,
  EqualTilde: EqualTilde$1,
  equest: equest$1,
  Equilibrium: Equilibrium$1,
  equiv: equiv$1,
  equivDD: equivDD$1,
  eqvparsl: eqvparsl$1,
  erarr: erarr$1,
  erDot: erDot$1,
  escr: escr$1,
  Escr: Escr$1,
  esdot: esdot$1,
  Esim: Esim$1,
  esim: esim$1,
  Eta: Eta$1,
  eta: eta$1,
  ETH: ETH$1,
  eth: eth$1,
  Euml: Euml$1,
  euml: euml$1,
  euro: euro$1,
  excl: excl$1,
  exist: exist$1,
  Exists: Exists$1,
  expectation: expectation$1,
  exponentiale: exponentiale$1,
  ExponentialE: ExponentialE$1,
  fallingdotseq: fallingdotseq$1,
  Fcy: Fcy$1,
  fcy: fcy$1,
  female: female$1,
  ffilig: ffilig$1,
  fflig: fflig$1,
  ffllig: ffllig$1,
  Ffr: Ffr$1,
  ffr: ffr$1,
  filig: filig$1,
  FilledSmallSquare: FilledSmallSquare$1,
  FilledVerySmallSquare: FilledVerySmallSquare$1,
  fjlig: fjlig$1,
  flat: flat$1,
  fllig: fllig$1,
  fltns: fltns$1,
  fnof: fnof$1,
  Fopf: Fopf$1,
  fopf: fopf$1,
  forall: forall$1,
  ForAll: ForAll$1,
  fork: fork$1,
  forkv: forkv$1,
  Fouriertrf: Fouriertrf$1,
  fpartint: fpartint$1,
  frac12: frac12$1,
  frac13: frac13$1,
  frac14: frac14$1,
  frac15: frac15$1,
  frac16: frac16$1,
  frac18: frac18$1,
  frac23: frac23$1,
  frac25: frac25$1,
  frac34: frac34$1,
  frac35: frac35$1,
  frac38: frac38$1,
  frac45: frac45$1,
  frac56: frac56$1,
  frac58: frac58$1,
  frac78: frac78$1,
  frasl: frasl$1,
  frown: frown$1,
  fscr: fscr$1,
  Fscr: Fscr$1,
  gacute: gacute$1,
  Gamma: Gamma$1,
  gamma: gamma$1,
  Gammad: Gammad$1,
  gammad: gammad$1,
  gap: gap$1,
  Gbreve: Gbreve$1,
  gbreve: gbreve$1,
  Gcedil: Gcedil$1,
  Gcirc: Gcirc$1,
  gcirc: gcirc$1,
  Gcy: Gcy$1,
  gcy: gcy$1,
  Gdot: Gdot$1,
  gdot: gdot$1,
  ge: ge$1,
  gE: gE$1,
  gEl: gEl$1,
  gel: gel$1,
  geq: geq$1,
  geqq: geqq$1,
  geqslant: geqslant$1,
  gescc: gescc$1,
  ges: ges$1,
  gesdot: gesdot$1,
  gesdoto: gesdoto$1,
  gesdotol: gesdotol$1,
  gesl: gesl$1,
  gesles: gesles$1,
  Gfr: Gfr$1,
  gfr: gfr$1,
  gg: gg$1,
  Gg: Gg$1,
  ggg: ggg$1,
  gimel: gimel$1,
  GJcy: GJcy$1,
  gjcy: gjcy$1,
  gla: gla$1,
  gl: gl$1,
  glE: glE$1,
  glj: glj$1,
  gnap: gnap$1,
  gnapprox: gnapprox$1,
  gne: gne$1,
  gnE: gnE$1,
  gneq: gneq$1,
  gneqq: gneqq$1,
  gnsim: gnsim$1,
  Gopf: Gopf$1,
  gopf: gopf$1,
  grave: grave$1,
  GreaterEqual: GreaterEqual$1,
  GreaterEqualLess: GreaterEqualLess$1,
  GreaterFullEqual: GreaterFullEqual$1,
  GreaterGreater: GreaterGreater$1,
  GreaterLess: GreaterLess$1,
  GreaterSlantEqual: GreaterSlantEqual$1,
  GreaterTilde: GreaterTilde$1,
  Gscr: Gscr$1,
  gscr: gscr$1,
  gsim: gsim$1,
  gsime: gsime$1,
  gsiml: gsiml$1,
  gtcc: gtcc$1,
  gtcir: gtcir$1,
  gt: gt$1,
  GT: GT$1,
  Gt: Gt$1,
  gtdot: gtdot$1,
  gtlPar: gtlPar$1,
  gtquest: gtquest$1,
  gtrapprox: gtrapprox$1,
  gtrarr: gtrarr$1,
  gtrdot: gtrdot$1,
  gtreqless: gtreqless$1,
  gtreqqless: gtreqqless$1,
  gtrless: gtrless$1,
  gtrsim: gtrsim$1,
  gvertneqq: gvertneqq$1,
  gvnE: gvnE$1,
  Hacek: Hacek$1,
  hairsp: hairsp$1,
  half: half$1,
  hamilt: hamilt$1,
  HARDcy: HARDcy$1,
  hardcy: hardcy$1,
  harrcir: harrcir$1,
  harr: harr$1,
  hArr: hArr$1,
  harrw: harrw$1,
  Hat: Hat$1,
  hbar: hbar$1,
  Hcirc: Hcirc$1,
  hcirc: hcirc$1,
  hearts: hearts$1,
  heartsuit: heartsuit$1,
  hellip: hellip$1,
  hercon: hercon$1,
  hfr: hfr$1,
  Hfr: Hfr$1,
  HilbertSpace: HilbertSpace$1,
  hksearow: hksearow$1,
  hkswarow: hkswarow$1,
  hoarr: hoarr$1,
  homtht: homtht$1,
  hookleftarrow: hookleftarrow$1,
  hookrightarrow: hookrightarrow$1,
  hopf: hopf$1,
  Hopf: Hopf$1,
  horbar: horbar$1,
  HorizontalLine: HorizontalLine$1,
  hscr: hscr$1,
  Hscr: Hscr$1,
  hslash: hslash$1,
  Hstrok: Hstrok$1,
  hstrok: hstrok$1,
  HumpDownHump: HumpDownHump$1,
  HumpEqual: HumpEqual$1,
  hybull: hybull$1,
  hyphen: hyphen$1,
  Iacute: Iacute$1,
  iacute: iacute$1,
  ic: ic$1,
  Icirc: Icirc$1,
  icirc: icirc$1,
  Icy: Icy$1,
  icy: icy$1,
  Idot: Idot$1,
  IEcy: IEcy$1,
  iecy: iecy$1,
  iexcl: iexcl$1,
  iff: iff$1,
  ifr: ifr$1,
  Ifr: Ifr$1,
  Igrave: Igrave$1,
  igrave: igrave$1,
  ii: ii$1,
  iiiint: iiiint$1,
  iiint: iiint$1,
  iinfin: iinfin$1,
  iiota: iiota$1,
  IJlig: IJlig$1,
  ijlig: ijlig$1,
  Imacr: Imacr$1,
  imacr: imacr$1,
  image: image$1,
  ImaginaryI: ImaginaryI$1,
  imagline: imagline$1,
  imagpart: imagpart$1,
  imath: imath$1,
  Im: Im$1,
  imof: imof$1,
  imped: imped$1,
  Implies: Implies$1,
  incare: incare$1,
  "in": "∈",
  infin: infin$1,
  infintie: infintie$1,
  inodot: inodot$1,
  intcal: intcal$1,
  int: int$1,
  Int: Int$1,
  integers: integers$1,
  Integral: Integral$1,
  intercal: intercal$1,
  Intersection: Intersection$1,
  intlarhk: intlarhk$1,
  intprod: intprod$1,
  InvisibleComma: InvisibleComma$1,
  InvisibleTimes: InvisibleTimes$1,
  IOcy: IOcy$1,
  iocy: iocy$1,
  Iogon: Iogon$1,
  iogon: iogon$1,
  Iopf: Iopf$1,
  iopf: iopf$1,
  Iota: Iota$1,
  iota: iota$1,
  iprod: iprod$1,
  iquest: iquest$1,
  iscr: iscr$1,
  Iscr: Iscr$1,
  isin: isin$1,
  isindot: isindot$1,
  isinE: isinE$1,
  isins: isins$1,
  isinsv: isinsv$1,
  isinv: isinv$1,
  it: it$1,
  Itilde: Itilde$1,
  itilde: itilde$1,
  Iukcy: Iukcy$1,
  iukcy: iukcy$1,
  Iuml: Iuml$1,
  iuml: iuml$1,
  Jcirc: Jcirc$1,
  jcirc: jcirc$1,
  Jcy: Jcy$1,
  jcy: jcy$1,
  Jfr: Jfr$1,
  jfr: jfr$1,
  jmath: jmath$1,
  Jopf: Jopf$1,
  jopf: jopf$1,
  Jscr: Jscr$1,
  jscr: jscr$1,
  Jsercy: Jsercy$1,
  jsercy: jsercy$1,
  Jukcy: Jukcy$1,
  jukcy: jukcy$1,
  Kappa: Kappa$1,
  kappa: kappa$1,
  kappav: kappav$1,
  Kcedil: Kcedil$1,
  kcedil: kcedil$1,
  Kcy: Kcy$1,
  kcy: kcy$1,
  Kfr: Kfr$1,
  kfr: kfr$1,
  kgreen: kgreen$1,
  KHcy: KHcy$1,
  khcy: khcy$1,
  KJcy: KJcy$1,
  kjcy: kjcy$1,
  Kopf: Kopf$1,
  kopf: kopf$1,
  Kscr: Kscr$1,
  kscr: kscr$1,
  lAarr: lAarr$1,
  Lacute: Lacute$1,
  lacute: lacute$1,
  laemptyv: laemptyv$1,
  lagran: lagran$1,
  Lambda: Lambda$1,
  lambda: lambda$1,
  lang: lang$1,
  Lang: Lang$1,
  langd: langd$1,
  langle: langle$1,
  lap: lap$1,
  Laplacetrf: Laplacetrf$1,
  laquo: laquo$1,
  larrb: larrb$1,
  larrbfs: larrbfs$1,
  larr: larr$1,
  Larr: Larr$1,
  lArr: lArr$1,
  larrfs: larrfs$1,
  larrhk: larrhk$1,
  larrlp: larrlp$1,
  larrpl: larrpl$1,
  larrsim: larrsim$1,
  larrtl: larrtl$1,
  latail: latail$1,
  lAtail: lAtail$1,
  lat: lat$1,
  late: late$1,
  lates: lates$1,
  lbarr: lbarr$1,
  lBarr: lBarr$1,
  lbbrk: lbbrk$1,
  lbrace: lbrace$1,
  lbrack: lbrack$1,
  lbrke: lbrke$1,
  lbrksld: lbrksld$1,
  lbrkslu: lbrkslu$1,
  Lcaron: Lcaron$1,
  lcaron: lcaron$1,
  Lcedil: Lcedil$1,
  lcedil: lcedil$1,
  lceil: lceil$1,
  lcub: lcub$1,
  Lcy: Lcy$1,
  lcy: lcy$1,
  ldca: ldca$1,
  ldquo: ldquo$1,
  ldquor: ldquor$1,
  ldrdhar: ldrdhar$1,
  ldrushar: ldrushar$1,
  ldsh: ldsh$1,
  le: le$1,
  lE: lE$1,
  LeftAngleBracket: LeftAngleBracket$1,
  LeftArrowBar: LeftArrowBar$1,
  leftarrow: leftarrow$1,
  LeftArrow: LeftArrow$1,
  Leftarrow: Leftarrow$1,
  LeftArrowRightArrow: LeftArrowRightArrow$1,
  leftarrowtail: leftarrowtail$1,
  LeftCeiling: LeftCeiling$1,
  LeftDoubleBracket: LeftDoubleBracket$1,
  LeftDownTeeVector: LeftDownTeeVector$1,
  LeftDownVectorBar: LeftDownVectorBar$1,
  LeftDownVector: LeftDownVector$1,
  LeftFloor: LeftFloor$1,
  leftharpoondown: leftharpoondown$1,
  leftharpoonup: leftharpoonup$1,
  leftleftarrows: leftleftarrows$1,
  leftrightarrow: leftrightarrow$1,
  LeftRightArrow: LeftRightArrow$1,
  Leftrightarrow: Leftrightarrow$1,
  leftrightarrows: leftrightarrows$1,
  leftrightharpoons: leftrightharpoons$1,
  leftrightsquigarrow: leftrightsquigarrow$1,
  LeftRightVector: LeftRightVector$1,
  LeftTeeArrow: LeftTeeArrow$1,
  LeftTee: LeftTee$1,
  LeftTeeVector: LeftTeeVector$1,
  leftthreetimes: leftthreetimes$1,
  LeftTriangleBar: LeftTriangleBar$1,
  LeftTriangle: LeftTriangle$1,
  LeftTriangleEqual: LeftTriangleEqual$1,
  LeftUpDownVector: LeftUpDownVector$1,
  LeftUpTeeVector: LeftUpTeeVector$1,
  LeftUpVectorBar: LeftUpVectorBar$1,
  LeftUpVector: LeftUpVector$1,
  LeftVectorBar: LeftVectorBar$1,
  LeftVector: LeftVector$1,
  lEg: lEg$1,
  leg: leg$1,
  leq: leq$1,
  leqq: leqq$1,
  leqslant: leqslant$1,
  lescc: lescc$1,
  les: les$1,
  lesdot: lesdot$1,
  lesdoto: lesdoto$1,
  lesdotor: lesdotor$1,
  lesg: lesg$1,
  lesges: lesges$1,
  lessapprox: lessapprox$1,
  lessdot: lessdot$1,
  lesseqgtr: lesseqgtr$1,
  lesseqqgtr: lesseqqgtr$1,
  LessEqualGreater: LessEqualGreater$1,
  LessFullEqual: LessFullEqual$1,
  LessGreater: LessGreater$1,
  lessgtr: lessgtr$1,
  LessLess: LessLess$1,
  lesssim: lesssim$1,
  LessSlantEqual: LessSlantEqual$1,
  LessTilde: LessTilde$1,
  lfisht: lfisht$1,
  lfloor: lfloor$1,
  Lfr: Lfr$1,
  lfr: lfr$1,
  lg: lg$1,
  lgE: lgE$1,
  lHar: lHar$1,
  lhard: lhard$1,
  lharu: lharu$1,
  lharul: lharul$1,
  lhblk: lhblk$1,
  LJcy: LJcy$1,
  ljcy: ljcy$1,
  llarr: llarr$1,
  ll: ll$1,
  Ll: Ll$1,
  llcorner: llcorner$1,
  Lleftarrow: Lleftarrow$1,
  llhard: llhard$1,
  lltri: lltri$1,
  Lmidot: Lmidot$1,
  lmidot: lmidot$1,
  lmoustache: lmoustache$1,
  lmoust: lmoust$1,
  lnap: lnap$1,
  lnapprox: lnapprox$1,
  lne: lne$1,
  lnE: lnE$1,
  lneq: lneq$1,
  lneqq: lneqq$1,
  lnsim: lnsim$1,
  loang: loang$1,
  loarr: loarr$1,
  lobrk: lobrk$1,
  longleftarrow: longleftarrow$1,
  LongLeftArrow: LongLeftArrow$1,
  Longleftarrow: Longleftarrow$1,
  longleftrightarrow: longleftrightarrow$1,
  LongLeftRightArrow: LongLeftRightArrow$1,
  Longleftrightarrow: Longleftrightarrow$1,
  longmapsto: longmapsto$1,
  longrightarrow: longrightarrow$1,
  LongRightArrow: LongRightArrow$1,
  Longrightarrow: Longrightarrow$1,
  looparrowleft: looparrowleft$1,
  looparrowright: looparrowright$1,
  lopar: lopar$1,
  Lopf: Lopf$1,
  lopf: lopf$1,
  loplus: loplus$1,
  lotimes: lotimes$1,
  lowast: lowast$1,
  lowbar: lowbar$1,
  LowerLeftArrow: LowerLeftArrow$1,
  LowerRightArrow: LowerRightArrow$1,
  loz: loz$1,
  lozenge: lozenge$1,
  lozf: lozf$1,
  lpar: lpar$1,
  lparlt: lparlt$1,
  lrarr: lrarr$1,
  lrcorner: lrcorner$1,
  lrhar: lrhar$1,
  lrhard: lrhard$1,
  lrm: lrm$1,
  lrtri: lrtri$1,
  lsaquo: lsaquo$1,
  lscr: lscr$1,
  Lscr: Lscr$1,
  lsh: lsh$1,
  Lsh: Lsh$1,
  lsim: lsim$1,
  lsime: lsime$1,
  lsimg: lsimg$1,
  lsqb: lsqb$1,
  lsquo: lsquo$1,
  lsquor: lsquor$1,
  Lstrok: Lstrok$1,
  lstrok: lstrok$1,
  ltcc: ltcc$1,
  ltcir: ltcir$1,
  lt: lt$1,
  LT: LT$1,
  Lt: Lt$1,
  ltdot: ltdot$1,
  lthree: lthree$1,
  ltimes: ltimes$1,
  ltlarr: ltlarr$1,
  ltquest: ltquest$1,
  ltri: ltri$1,
  ltrie: ltrie$1,
  ltrif: ltrif$1,
  ltrPar: ltrPar$1,
  lurdshar: lurdshar$1,
  luruhar: luruhar$1,
  lvertneqq: lvertneqq$1,
  lvnE: lvnE$1,
  macr: macr$1,
  male: male$1,
  malt: malt$1,
  maltese: maltese$1,
  "Map": "⤅",
  map: map$2,
  mapsto: mapsto$1,
  mapstodown: mapstodown$1,
  mapstoleft: mapstoleft$1,
  mapstoup: mapstoup$1,
  marker: marker$1,
  mcomma: mcomma$1,
  Mcy: Mcy$1,
  mcy: mcy$1,
  mdash: mdash$1,
  mDDot: mDDot$1,
  measuredangle: measuredangle$1,
  MediumSpace: MediumSpace$1,
  Mellintrf: Mellintrf$1,
  Mfr: Mfr$1,
  mfr: mfr$1,
  mho: mho$1,
  micro: micro$1,
  midast: midast$1,
  midcir: midcir$1,
  mid: mid$1,
  middot: middot$1,
  minusb: minusb$1,
  minus: minus$1,
  minusd: minusd$1,
  minusdu: minusdu$1,
  MinusPlus: MinusPlus$1,
  mlcp: mlcp$1,
  mldr: mldr$1,
  mnplus: mnplus$1,
  models: models$1,
  Mopf: Mopf$1,
  mopf: mopf$1,
  mp: mp$1,
  mscr: mscr$1,
  Mscr: Mscr$1,
  mstpos: mstpos$1,
  Mu: Mu$1,
  mu: mu$1,
  multimap: multimap$1,
  mumap: mumap$1,
  nabla: nabla$1,
  Nacute: Nacute$1,
  nacute: nacute$1,
  nang: nang$1,
  nap: nap$1,
  napE: napE$1,
  napid: napid$1,
  napos: napos$1,
  napprox: napprox$1,
  natural: natural$1,
  naturals: naturals$1,
  natur: natur$1,
  nbsp: nbsp$1,
  nbump: nbump$1,
  nbumpe: nbumpe$1,
  ncap: ncap$1,
  Ncaron: Ncaron$1,
  ncaron: ncaron$1,
  Ncedil: Ncedil$1,
  ncedil: ncedil$1,
  ncong: ncong$1,
  ncongdot: ncongdot$1,
  ncup: ncup$1,
  Ncy: Ncy$1,
  ncy: ncy$1,
  ndash: ndash$1,
  nearhk: nearhk$1,
  nearr: nearr$1,
  neArr: neArr$1,
  nearrow: nearrow$1,
  ne: ne$1,
  nedot: nedot$1,
  NegativeMediumSpace: NegativeMediumSpace$1,
  NegativeThickSpace: NegativeThickSpace$1,
  NegativeThinSpace: NegativeThinSpace$1,
  NegativeVeryThinSpace: NegativeVeryThinSpace$1,
  nequiv: nequiv$1,
  nesear: nesear$1,
  nesim: nesim$1,
  NestedGreaterGreater: NestedGreaterGreater$1,
  NestedLessLess: NestedLessLess$1,
  NewLine: NewLine$1,
  nexist: nexist$1,
  nexists: nexists$1,
  Nfr: Nfr$1,
  nfr: nfr$1,
  ngE: ngE$1,
  nge: nge$1,
  ngeq: ngeq$1,
  ngeqq: ngeqq$1,
  ngeqslant: ngeqslant$1,
  nges: nges$1,
  nGg: nGg$1,
  ngsim: ngsim$1,
  nGt: nGt$1,
  ngt: ngt$1,
  ngtr: ngtr$1,
  nGtv: nGtv$1,
  nharr: nharr$1,
  nhArr: nhArr$1,
  nhpar: nhpar$1,
  ni: ni$1,
  nis: nis$1,
  nisd: nisd$1,
  niv: niv$1,
  NJcy: NJcy$1,
  njcy: njcy$1,
  nlarr: nlarr$1,
  nlArr: nlArr$1,
  nldr: nldr$1,
  nlE: nlE$1,
  nle: nle$1,
  nleftarrow: nleftarrow$1,
  nLeftarrow: nLeftarrow$1,
  nleftrightarrow: nleftrightarrow$1,
  nLeftrightarrow: nLeftrightarrow$1,
  nleq: nleq$1,
  nleqq: nleqq$1,
  nleqslant: nleqslant$1,
  nles: nles$1,
  nless: nless$1,
  nLl: nLl$1,
  nlsim: nlsim$1,
  nLt: nLt$1,
  nlt: nlt$1,
  nltri: nltri$1,
  nltrie: nltrie$1,
  nLtv: nLtv$1,
  nmid: nmid$1,
  NoBreak: NoBreak$1,
  NonBreakingSpace: NonBreakingSpace$1,
  nopf: nopf$1,
  Nopf: Nopf$1,
  Not: Not$1,
  not: not$1,
  NotCongruent: NotCongruent$1,
  NotCupCap: NotCupCap$1,
  NotDoubleVerticalBar: NotDoubleVerticalBar$1,
  NotElement: NotElement$1,
  NotEqual: NotEqual$1,
  NotEqualTilde: NotEqualTilde$1,
  NotExists: NotExists$1,
  NotGreater: NotGreater$1,
  NotGreaterEqual: NotGreaterEqual$1,
  NotGreaterFullEqual: NotGreaterFullEqual$1,
  NotGreaterGreater: NotGreaterGreater$1,
  NotGreaterLess: NotGreaterLess$1,
  NotGreaterSlantEqual: NotGreaterSlantEqual$1,
  NotGreaterTilde: NotGreaterTilde$1,
  NotHumpDownHump: NotHumpDownHump$1,
  NotHumpEqual: NotHumpEqual$1,
  notin: notin$1,
  notindot: notindot$1,
  notinE: notinE$1,
  notinva: notinva$1,
  notinvb: notinvb$1,
  notinvc: notinvc$1,
  NotLeftTriangleBar: NotLeftTriangleBar$1,
  NotLeftTriangle: NotLeftTriangle$1,
  NotLeftTriangleEqual: NotLeftTriangleEqual$1,
  NotLess: NotLess$1,
  NotLessEqual: NotLessEqual$1,
  NotLessGreater: NotLessGreater$1,
  NotLessLess: NotLessLess$1,
  NotLessSlantEqual: NotLessSlantEqual$1,
  NotLessTilde: NotLessTilde$1,
  NotNestedGreaterGreater: NotNestedGreaterGreater$1,
  NotNestedLessLess: NotNestedLessLess$1,
  notni: notni$1,
  notniva: notniva$1,
  notnivb: notnivb$1,
  notnivc: notnivc$1,
  NotPrecedes: NotPrecedes$1,
  NotPrecedesEqual: NotPrecedesEqual$1,
  NotPrecedesSlantEqual: NotPrecedesSlantEqual$1,
  NotReverseElement: NotReverseElement$1,
  NotRightTriangleBar: NotRightTriangleBar$1,
  NotRightTriangle: NotRightTriangle$1,
  NotRightTriangleEqual: NotRightTriangleEqual$1,
  NotSquareSubset: NotSquareSubset$1,
  NotSquareSubsetEqual: NotSquareSubsetEqual$1,
  NotSquareSuperset: NotSquareSuperset$1,
  NotSquareSupersetEqual: NotSquareSupersetEqual$1,
  NotSubset: NotSubset$1,
  NotSubsetEqual: NotSubsetEqual$1,
  NotSucceeds: NotSucceeds$1,
  NotSucceedsEqual: NotSucceedsEqual$1,
  NotSucceedsSlantEqual: NotSucceedsSlantEqual$1,
  NotSucceedsTilde: NotSucceedsTilde$1,
  NotSuperset: NotSuperset$1,
  NotSupersetEqual: NotSupersetEqual$1,
  NotTilde: NotTilde$1,
  NotTildeEqual: NotTildeEqual$1,
  NotTildeFullEqual: NotTildeFullEqual$1,
  NotTildeTilde: NotTildeTilde$1,
  NotVerticalBar: NotVerticalBar$1,
  nparallel: nparallel$1,
  npar: npar$1,
  nparsl: nparsl$1,
  npart: npart$1,
  npolint: npolint$1,
  npr: npr$1,
  nprcue: nprcue$1,
  nprec: nprec$1,
  npreceq: npreceq$1,
  npre: npre$1,
  nrarrc: nrarrc$1,
  nrarr: nrarr$1,
  nrArr: nrArr$1,
  nrarrw: nrarrw$1,
  nrightarrow: nrightarrow$1,
  nRightarrow: nRightarrow$1,
  nrtri: nrtri$1,
  nrtrie: nrtrie$1,
  nsc: nsc$1,
  nsccue: nsccue$1,
  nsce: nsce$1,
  Nscr: Nscr$1,
  nscr: nscr$1,
  nshortmid: nshortmid$1,
  nshortparallel: nshortparallel$1,
  nsim: nsim$1,
  nsime: nsime$1,
  nsimeq: nsimeq$1,
  nsmid: nsmid$1,
  nspar: nspar$1,
  nsqsube: nsqsube$1,
  nsqsupe: nsqsupe$1,
  nsub: nsub$1,
  nsubE: nsubE$1,
  nsube: nsube$1,
  nsubset: nsubset$1,
  nsubseteq: nsubseteq$1,
  nsubseteqq: nsubseteqq$1,
  nsucc: nsucc$1,
  nsucceq: nsucceq$1,
  nsup: nsup$1,
  nsupE: nsupE$1,
  nsupe: nsupe$1,
  nsupset: nsupset$1,
  nsupseteq: nsupseteq$1,
  nsupseteqq: nsupseteqq$1,
  ntgl: ntgl$1,
  Ntilde: Ntilde$1,
  ntilde: ntilde$1,
  ntlg: ntlg$1,
  ntriangleleft: ntriangleleft$1,
  ntrianglelefteq: ntrianglelefteq$1,
  ntriangleright: ntriangleright$1,
  ntrianglerighteq: ntrianglerighteq$1,
  Nu: Nu$1,
  nu: nu$1,
  num: num$1,
  numero: numero$1,
  numsp: numsp$1,
  nvap: nvap$1,
  nvdash: nvdash$1,
  nvDash: nvDash$1,
  nVdash: nVdash$1,
  nVDash: nVDash$1,
  nvge: nvge$1,
  nvgt: nvgt$1,
  nvHarr: nvHarr$1,
  nvinfin: nvinfin$1,
  nvlArr: nvlArr$1,
  nvle: nvle$1,
  nvlt: nvlt$1,
  nvltrie: nvltrie$1,
  nvrArr: nvrArr$1,
  nvrtrie: nvrtrie$1,
  nvsim: nvsim$1,
  nwarhk: nwarhk$1,
  nwarr: nwarr$1,
  nwArr: nwArr$1,
  nwarrow: nwarrow$1,
  nwnear: nwnear$1,
  Oacute: Oacute$1,
  oacute: oacute$1,
  oast: oast$1,
  Ocirc: Ocirc$1,
  ocirc: ocirc$1,
  ocir: ocir$1,
  Ocy: Ocy$1,
  ocy: ocy$1,
  odash: odash$1,
  Odblac: Odblac$1,
  odblac: odblac$1,
  odiv: odiv$1,
  odot: odot$1,
  odsold: odsold$1,
  OElig: OElig$1,
  oelig: oelig$1,
  ofcir: ofcir$1,
  Ofr: Ofr$1,
  ofr: ofr$1,
  ogon: ogon$1,
  Ograve: Ograve$1,
  ograve: ograve$1,
  ogt: ogt$1,
  ohbar: ohbar$1,
  ohm: ohm$1,
  oint: oint$1,
  olarr: olarr$1,
  olcir: olcir$1,
  olcross: olcross$1,
  oline: oline$1,
  olt: olt$1,
  Omacr: Omacr$1,
  omacr: omacr$1,
  Omega: Omega$1,
  omega: omega$1,
  Omicron: Omicron$1,
  omicron: omicron$1,
  omid: omid$1,
  ominus: ominus$1,
  Oopf: Oopf$1,
  oopf: oopf$1,
  opar: opar$1,
  OpenCurlyDoubleQuote: OpenCurlyDoubleQuote$1,
  OpenCurlyQuote: OpenCurlyQuote$1,
  operp: operp$1,
  oplus: oplus$1,
  orarr: orarr$1,
  Or: Or$1,
  or: or$1,
  ord: ord$1,
  order: order$1,
  orderof: orderof$1,
  ordf: ordf$1,
  ordm: ordm$1,
  origof: origof$1,
  oror: oror$1,
  orslope: orslope$1,
  orv: orv$1,
  oS: oS$1,
  Oscr: Oscr$1,
  oscr: oscr$1,
  Oslash: Oslash$1,
  oslash: oslash$1,
  osol: osol$1,
  Otilde: Otilde$1,
  otilde: otilde$1,
  otimesas: otimesas$1,
  Otimes: Otimes$1,
  otimes: otimes$1,
  Ouml: Ouml$1,
  ouml: ouml$1,
  ovbar: ovbar$1,
  OverBar: OverBar$1,
  OverBrace: OverBrace$1,
  OverBracket: OverBracket$1,
  OverParenthesis: OverParenthesis$1,
  para: para$1,
  parallel: parallel$1,
  par: par$1,
  parsim: parsim$1,
  parsl: parsl$1,
  part: part$1,
  PartialD: PartialD$1,
  Pcy: Pcy$1,
  pcy: pcy$1,
  percnt: percnt$1,
  period: period$1,
  permil: permil$1,
  perp: perp$1,
  pertenk: pertenk$1,
  Pfr: Pfr$1,
  pfr: pfr$1,
  Phi: Phi$1,
  phi: phi$1,
  phiv: phiv$1,
  phmmat: phmmat$1,
  phone: phone$1,
  Pi: Pi$1,
  pi: pi$1,
  pitchfork: pitchfork$1,
  piv: piv$1,
  planck: planck$1,
  planckh: planckh$1,
  plankv: plankv$1,
  plusacir: plusacir$1,
  plusb: plusb$1,
  pluscir: pluscir$1,
  plus: plus$1,
  plusdo: plusdo$1,
  plusdu: plusdu$1,
  pluse: pluse$1,
  PlusMinus: PlusMinus$1,
  plusmn: plusmn$1,
  plussim: plussim$1,
  plustwo: plustwo$1,
  pm: pm$1,
  Poincareplane: Poincareplane$1,
  pointint: pointint$1,
  popf: popf$1,
  Popf: Popf$1,
  pound: pound$1,
  prap: prap$1,
  Pr: Pr$1,
  pr: pr$1,
  prcue: prcue$1,
  precapprox: precapprox$1,
  prec: prec$1,
  preccurlyeq: preccurlyeq$1,
  Precedes: Precedes$1,
  PrecedesEqual: PrecedesEqual$1,
  PrecedesSlantEqual: PrecedesSlantEqual$1,
  PrecedesTilde: PrecedesTilde$1,
  preceq: preceq$1,
  precnapprox: precnapprox$1,
  precneqq: precneqq$1,
  precnsim: precnsim$1,
  pre: pre$1,
  prE: prE$1,
  precsim: precsim$1,
  prime: prime$1,
  Prime: Prime$1,
  primes: primes$1,
  prnap: prnap$1,
  prnE: prnE$1,
  prnsim: prnsim$1,
  prod: prod$1,
  Product: Product$1,
  profalar: profalar$1,
  profline: profline$1,
  profsurf: profsurf$1,
  prop: prop$1,
  Proportional: Proportional$1,
  Proportion: Proportion$1,
  propto: propto$1,
  prsim: prsim$1,
  prurel: prurel$1,
  Pscr: Pscr$1,
  pscr: pscr$1,
  Psi: Psi$1,
  psi: psi$1,
  puncsp: puncsp$1,
  Qfr: Qfr$1,
  qfr: qfr$1,
  qint: qint$1,
  qopf: qopf$1,
  Qopf: Qopf$1,
  qprime: qprime$1,
  Qscr: Qscr$1,
  qscr: qscr$1,
  quaternions: quaternions$1,
  quatint: quatint$1,
  quest: quest$1,
  questeq: questeq$1,
  quot: quot$1,
  QUOT: QUOT$1,
  rAarr: rAarr$1,
  race: race$1,
  Racute: Racute$1,
  racute: racute$1,
  radic: radic$1,
  raemptyv: raemptyv$1,
  rang: rang$1,
  Rang: Rang$1,
  rangd: rangd$1,
  range: range$1,
  rangle: rangle$1,
  raquo: raquo$1,
  rarrap: rarrap$1,
  rarrb: rarrb$1,
  rarrbfs: rarrbfs$1,
  rarrc: rarrc$1,
  rarr: rarr$1,
  Rarr: Rarr$1,
  rArr: rArr$1,
  rarrfs: rarrfs$1,
  rarrhk: rarrhk$1,
  rarrlp: rarrlp$1,
  rarrpl: rarrpl$1,
  rarrsim: rarrsim$1,
  Rarrtl: Rarrtl$1,
  rarrtl: rarrtl$1,
  rarrw: rarrw$1,
  ratail: ratail$1,
  rAtail: rAtail$1,
  ratio: ratio$1,
  rationals: rationals$1,
  rbarr: rbarr$1,
  rBarr: rBarr$1,
  RBarr: RBarr$1,
  rbbrk: rbbrk$1,
  rbrace: rbrace$1,
  rbrack: rbrack$1,
  rbrke: rbrke$1,
  rbrksld: rbrksld$1,
  rbrkslu: rbrkslu$1,
  Rcaron: Rcaron$1,
  rcaron: rcaron$1,
  Rcedil: Rcedil$1,
  rcedil: rcedil$1,
  rceil: rceil$1,
  rcub: rcub$1,
  Rcy: Rcy$1,
  rcy: rcy$1,
  rdca: rdca$1,
  rdldhar: rdldhar$1,
  rdquo: rdquo$1,
  rdquor: rdquor$1,
  rdsh: rdsh$1,
  real: real$1,
  realine: realine$1,
  realpart: realpart$1,
  reals: reals$1,
  Re: Re$1,
  rect: rect$1,
  reg: reg$1,
  REG: REG$1,
  ReverseElement: ReverseElement$1,
  ReverseEquilibrium: ReverseEquilibrium$1,
  ReverseUpEquilibrium: ReverseUpEquilibrium$1,
  rfisht: rfisht$1,
  rfloor: rfloor$1,
  rfr: rfr$1,
  Rfr: Rfr$1,
  rHar: rHar$1,
  rhard: rhard$1,
  rharu: rharu$1,
  rharul: rharul$1,
  Rho: Rho$1,
  rho: rho$1,
  rhov: rhov$1,
  RightAngleBracket: RightAngleBracket$1,
  RightArrowBar: RightArrowBar$1,
  rightarrow: rightarrow$1,
  RightArrow: RightArrow$1,
  Rightarrow: Rightarrow$1,
  RightArrowLeftArrow: RightArrowLeftArrow$1,
  rightarrowtail: rightarrowtail$1,
  RightCeiling: RightCeiling$1,
  RightDoubleBracket: RightDoubleBracket$1,
  RightDownTeeVector: RightDownTeeVector$1,
  RightDownVectorBar: RightDownVectorBar$1,
  RightDownVector: RightDownVector$1,
  RightFloor: RightFloor$1,
  rightharpoondown: rightharpoondown$1,
  rightharpoonup: rightharpoonup$1,
  rightleftarrows: rightleftarrows$1,
  rightleftharpoons: rightleftharpoons$1,
  rightrightarrows: rightrightarrows$1,
  rightsquigarrow: rightsquigarrow$1,
  RightTeeArrow: RightTeeArrow$1,
  RightTee: RightTee$1,
  RightTeeVector: RightTeeVector$1,
  rightthreetimes: rightthreetimes$1,
  RightTriangleBar: RightTriangleBar$1,
  RightTriangle: RightTriangle$1,
  RightTriangleEqual: RightTriangleEqual$1,
  RightUpDownVector: RightUpDownVector$1,
  RightUpTeeVector: RightUpTeeVector$1,
  RightUpVectorBar: RightUpVectorBar$1,
  RightUpVector: RightUpVector$1,
  RightVectorBar: RightVectorBar$1,
  RightVector: RightVector$1,
  ring: ring$1,
  risingdotseq: risingdotseq$1,
  rlarr: rlarr$1,
  rlhar: rlhar$1,
  rlm: rlm$1,
  rmoustache: rmoustache$1,
  rmoust: rmoust$1,
  rnmid: rnmid$1,
  roang: roang$1,
  roarr: roarr$1,
  robrk: robrk$1,
  ropar: ropar$1,
  ropf: ropf$1,
  Ropf: Ropf$1,
  roplus: roplus$1,
  rotimes: rotimes$1,
  RoundImplies: RoundImplies$1,
  rpar: rpar$1,
  rpargt: rpargt$1,
  rppolint: rppolint$1,
  rrarr: rrarr$1,
  Rrightarrow: Rrightarrow$1,
  rsaquo: rsaquo$1,
  rscr: rscr$1,
  Rscr: Rscr$1,
  rsh: rsh$1,
  Rsh: Rsh$1,
  rsqb: rsqb$1,
  rsquo: rsquo$1,
  rsquor: rsquor$1,
  rthree: rthree$1,
  rtimes: rtimes$1,
  rtri: rtri$1,
  rtrie: rtrie$1,
  rtrif: rtrif$1,
  rtriltri: rtriltri$1,
  RuleDelayed: RuleDelayed$1,
  ruluhar: ruluhar$1,
  rx: rx$1,
  Sacute: Sacute$1,
  sacute: sacute$1,
  sbquo: sbquo$1,
  scap: scap$1,
  Scaron: Scaron$1,
  scaron: scaron$1,
  Sc: Sc$1,
  sc: sc$1,
  sccue: sccue$1,
  sce: sce$1,
  scE: scE$1,
  Scedil: Scedil$1,
  scedil: scedil$1,
  Scirc: Scirc$1,
  scirc: scirc$1,
  scnap: scnap$1,
  scnE: scnE$1,
  scnsim: scnsim$1,
  scpolint: scpolint$1,
  scsim: scsim$1,
  Scy: Scy$1,
  scy: scy$1,
  sdotb: sdotb$1,
  sdot: sdot$1,
  sdote: sdote$1,
  searhk: searhk$1,
  searr: searr$1,
  seArr: seArr$1,
  searrow: searrow$1,
  sect: sect$1,
  semi: semi$1,
  seswar: seswar$1,
  setminus: setminus$1,
  setmn: setmn$1,
  sext: sext$1,
  Sfr: Sfr$1,
  sfr: sfr$1,
  sfrown: sfrown$1,
  sharp: sharp$1,
  SHCHcy: SHCHcy$1,
  shchcy: shchcy$1,
  SHcy: SHcy$1,
  shcy: shcy$1,
  ShortDownArrow: ShortDownArrow$1,
  ShortLeftArrow: ShortLeftArrow$1,
  shortmid: shortmid$1,
  shortparallel: shortparallel$1,
  ShortRightArrow: ShortRightArrow$1,
  ShortUpArrow: ShortUpArrow$1,
  shy: shy$1,
  Sigma: Sigma$1,
  sigma: sigma$1,
  sigmaf: sigmaf$1,
  sigmav: sigmav$1,
  sim: sim$1,
  simdot: simdot$1,
  sime: sime$1,
  simeq: simeq$1,
  simg: simg$1,
  simgE: simgE$1,
  siml: siml$1,
  simlE: simlE$1,
  simne: simne$1,
  simplus: simplus$1,
  simrarr: simrarr$1,
  slarr: slarr$1,
  SmallCircle: SmallCircle$1,
  smallsetminus: smallsetminus$1,
  smashp: smashp$1,
  smeparsl: smeparsl$1,
  smid: smid$1,
  smile: smile$1,
  smt: smt$1,
  smte: smte$1,
  smtes: smtes$1,
  SOFTcy: SOFTcy$1,
  softcy: softcy$1,
  solbar: solbar$1,
  solb: solb$1,
  sol: sol$1,
  Sopf: Sopf$1,
  sopf: sopf$1,
  spades: spades$1,
  spadesuit: spadesuit$1,
  spar: spar$1,
  sqcap: sqcap$1,
  sqcaps: sqcaps$1,
  sqcup: sqcup$1,
  sqcups: sqcups$1,
  Sqrt: Sqrt$1,
  sqsub: sqsub$1,
  sqsube: sqsube$1,
  sqsubset: sqsubset$1,
  sqsubseteq: sqsubseteq$1,
  sqsup: sqsup$1,
  sqsupe: sqsupe$1,
  sqsupset: sqsupset$1,
  sqsupseteq: sqsupseteq$1,
  square: square$1,
  Square: Square$1,
  SquareIntersection: SquareIntersection$1,
  SquareSubset: SquareSubset$1,
  SquareSubsetEqual: SquareSubsetEqual$1,
  SquareSuperset: SquareSuperset$1,
  SquareSupersetEqual: SquareSupersetEqual$1,
  SquareUnion: SquareUnion$1,
  squarf: squarf$1,
  squ: squ$1,
  squf: squf$1,
  srarr: srarr$1,
  Sscr: Sscr$1,
  sscr: sscr$1,
  ssetmn: ssetmn$1,
  ssmile: ssmile$1,
  sstarf: sstarf$1,
  Star: Star$1,
  star: star$1,
  starf: starf$1,
  straightepsilon: straightepsilon$1,
  straightphi: straightphi$1,
  strns: strns$1,
  sub: sub$1,
  Sub: Sub$1,
  subdot: subdot$1,
  subE: subE$1,
  sube: sube$1,
  subedot: subedot$1,
  submult: submult$1,
  subnE: subnE$1,
  subne: subne$1,
  subplus: subplus$1,
  subrarr: subrarr$1,
  subset: subset$1,
  Subset: Subset$1,
  subseteq: subseteq$1,
  subseteqq: subseteqq$1,
  SubsetEqual: SubsetEqual$1,
  subsetneq: subsetneq$1,
  subsetneqq: subsetneqq$1,
  subsim: subsim$1,
  subsub: subsub$1,
  subsup: subsup$1,
  succapprox: succapprox$1,
  succ: succ$1,
  succcurlyeq: succcurlyeq$1,
  Succeeds: Succeeds$1,
  SucceedsEqual: SucceedsEqual$1,
  SucceedsSlantEqual: SucceedsSlantEqual$1,
  SucceedsTilde: SucceedsTilde$1,
  succeq: succeq$1,
  succnapprox: succnapprox$1,
  succneqq: succneqq$1,
  succnsim: succnsim$1,
  succsim: succsim$1,
  SuchThat: SuchThat$1,
  sum: sum$1,
  Sum: Sum$1,
  sung: sung$1,
  sup1: sup1$1,
  sup2: sup2$1,
  sup3: sup3$1,
  sup: sup$1,
  Sup: Sup$1,
  supdot: supdot$1,
  supdsub: supdsub$1,
  supE: supE$1,
  supe: supe$1,
  supedot: supedot$1,
  Superset: Superset$1,
  SupersetEqual: SupersetEqual$1,
  suphsol: suphsol$1,
  suphsub: suphsub$1,
  suplarr: suplarr$1,
  supmult: supmult$1,
  supnE: supnE$1,
  supne: supne$1,
  supplus: supplus$1,
  supset: supset$1,
  Supset: Supset$1,
  supseteq: supseteq$1,
  supseteqq: supseteqq$1,
  supsetneq: supsetneq$1,
  supsetneqq: supsetneqq$1,
  supsim: supsim$1,
  supsub: supsub$1,
  supsup: supsup$1,
  swarhk: swarhk$1,
  swarr: swarr$1,
  swArr: swArr$1,
  swarrow: swarrow$1,
  swnwar: swnwar$1,
  szlig: szlig$1,
  Tab: Tab$1,
  target: target$1,
  Tau: Tau$1,
  tau: tau$1,
  tbrk: tbrk$1,
  Tcaron: Tcaron$1,
  tcaron: tcaron$1,
  Tcedil: Tcedil$1,
  tcedil: tcedil$1,
  Tcy: Tcy$1,
  tcy: tcy$1,
  tdot: tdot$1,
  telrec: telrec$1,
  Tfr: Tfr$1,
  tfr: tfr$1,
  there4: there4$1,
  therefore: therefore$1,
  Therefore: Therefore$1,
  Theta: Theta$1,
  theta: theta$1,
  thetasym: thetasym$1,
  thetav: thetav$1,
  thickapprox: thickapprox$1,
  thicksim: thicksim$1,
  ThickSpace: ThickSpace$1,
  ThinSpace: ThinSpace$1,
  thinsp: thinsp$1,
  thkap: thkap$1,
  thksim: thksim$1,
  THORN: THORN$1,
  thorn: thorn$1,
  tilde: tilde$1,
  Tilde: Tilde$1,
  TildeEqual: TildeEqual$1,
  TildeFullEqual: TildeFullEqual$1,
  TildeTilde: TildeTilde$1,
  timesbar: timesbar$1,
  timesb: timesb$1,
  times: times$1,
  timesd: timesd$1,
  tint: tint$1,
  toea: toea$1,
  topbot: topbot$1,
  topcir: topcir$1,
  top: top$1,
  Topf: Topf$1,
  topf: topf$1,
  topfork: topfork$1,
  tosa: tosa$1,
  tprime: tprime$1,
  trade: trade$1,
  TRADE: TRADE$1,
  triangle: triangle$1,
  triangledown: triangledown$1,
  triangleleft: triangleleft$1,
  trianglelefteq: trianglelefteq$1,
  triangleq: triangleq$1,
  triangleright: triangleright$1,
  trianglerighteq: trianglerighteq$1,
  tridot: tridot$1,
  trie: trie$1,
  triminus: triminus$1,
  TripleDot: TripleDot$1,
  triplus: triplus$1,
  trisb: trisb$1,
  tritime: tritime$1,
  trpezium: trpezium$1,
  Tscr: Tscr$1,
  tscr: tscr$1,
  TScy: TScy$1,
  tscy: tscy$1,
  TSHcy: TSHcy$1,
  tshcy: tshcy$1,
  Tstrok: Tstrok$1,
  tstrok: tstrok$1,
  twixt: twixt$1,
  twoheadleftarrow: twoheadleftarrow$1,
  twoheadrightarrow: twoheadrightarrow$1,
  Uacute: Uacute$1,
  uacute: uacute$1,
  uarr: uarr$1,
  Uarr: Uarr$1,
  uArr: uArr$1,
  Uarrocir: Uarrocir$1,
  Ubrcy: Ubrcy$1,
  ubrcy: ubrcy$1,
  Ubreve: Ubreve$1,
  ubreve: ubreve$1,
  Ucirc: Ucirc$1,
  ucirc: ucirc$1,
  Ucy: Ucy$1,
  ucy: ucy$1,
  udarr: udarr$1,
  Udblac: Udblac$1,
  udblac: udblac$1,
  udhar: udhar$1,
  ufisht: ufisht$1,
  Ufr: Ufr$1,
  ufr: ufr$1,
  Ugrave: Ugrave$1,
  ugrave: ugrave$1,
  uHar: uHar$1,
  uharl: uharl$1,
  uharr: uharr$1,
  uhblk: uhblk$1,
  ulcorn: ulcorn$1,
  ulcorner: ulcorner$1,
  ulcrop: ulcrop$1,
  ultri: ultri$1,
  Umacr: Umacr$1,
  umacr: umacr$1,
  uml: uml$1,
  UnderBar: UnderBar$1,
  UnderBrace: UnderBrace$1,
  UnderBracket: UnderBracket$1,
  UnderParenthesis: UnderParenthesis$1,
  Union: Union$1,
  UnionPlus: UnionPlus$1,
  Uogon: Uogon$1,
  uogon: uogon$1,
  Uopf: Uopf$1,
  uopf: uopf$1,
  UpArrowBar: UpArrowBar$1,
  uparrow: uparrow$1,
  UpArrow: UpArrow$1,
  Uparrow: Uparrow$1,
  UpArrowDownArrow: UpArrowDownArrow$1,
  updownarrow: updownarrow$1,
  UpDownArrow: UpDownArrow$1,
  Updownarrow: Updownarrow$1,
  UpEquilibrium: UpEquilibrium$1,
  upharpoonleft: upharpoonleft$1,
  upharpoonright: upharpoonright$1,
  uplus: uplus$1,
  UpperLeftArrow: UpperLeftArrow$1,
  UpperRightArrow: UpperRightArrow$1,
  upsi: upsi$1,
  Upsi: Upsi$1,
  upsih: upsih$1,
  Upsilon: Upsilon$1,
  upsilon: upsilon$1,
  UpTeeArrow: UpTeeArrow$1,
  UpTee: UpTee$1,
  upuparrows: upuparrows$1,
  urcorn: urcorn$1,
  urcorner: urcorner$1,
  urcrop: urcrop$1,
  Uring: Uring$1,
  uring: uring$1,
  urtri: urtri$1,
  Uscr: Uscr$1,
  uscr: uscr$1,
  utdot: utdot$1,
  Utilde: Utilde$1,
  utilde: utilde$1,
  utri: utri$1,
  utrif: utrif$1,
  uuarr: uuarr$1,
  Uuml: Uuml$1,
  uuml: uuml$1,
  uwangle: uwangle$1,
  vangrt: vangrt$1,
  varepsilon: varepsilon$1,
  varkappa: varkappa$1,
  varnothing: varnothing$1,
  varphi: varphi$1,
  varpi: varpi$1,
  varpropto: varpropto$1,
  varr: varr$1,
  vArr: vArr$1,
  varrho: varrho$1,
  varsigma: varsigma$1,
  varsubsetneq: varsubsetneq$1,
  varsubsetneqq: varsubsetneqq$1,
  varsupsetneq: varsupsetneq$1,
  varsupsetneqq: varsupsetneqq$1,
  vartheta: vartheta$1,
  vartriangleleft: vartriangleleft$1,
  vartriangleright: vartriangleright$1,
  vBar: vBar$1,
  Vbar: Vbar$1,
  vBarv: vBarv$1,
  Vcy: Vcy$1,
  vcy: vcy$1,
  vdash: vdash$1,
  vDash: vDash$1,
  Vdash: Vdash$1,
  VDash: VDash$1,
  Vdashl: Vdashl$1,
  veebar: veebar$1,
  vee: vee$1,
  Vee: Vee$1,
  veeeq: veeeq$1,
  vellip: vellip$1,
  verbar: verbar$1,
  Verbar: Verbar$1,
  vert: vert$1,
  Vert: Vert$1,
  VerticalBar: VerticalBar$1,
  VerticalLine: VerticalLine$1,
  VerticalSeparator: VerticalSeparator$1,
  VerticalTilde: VerticalTilde$1,
  VeryThinSpace: VeryThinSpace$1,
  Vfr: Vfr$1,
  vfr: vfr$1,
  vltri: vltri$1,
  vnsub: vnsub$1,
  vnsup: vnsup$1,
  Vopf: Vopf$1,
  vopf: vopf$1,
  vprop: vprop$1,
  vrtri: vrtri$1,
  Vscr: Vscr$1,
  vscr: vscr$1,
  vsubnE: vsubnE$1,
  vsubne: vsubne$1,
  vsupnE: vsupnE$1,
  vsupne: vsupne$1,
  Vvdash: Vvdash$1,
  vzigzag: vzigzag$1,
  Wcirc: Wcirc$1,
  wcirc: wcirc$1,
  wedbar: wedbar$1,
  wedge: wedge$1,
  Wedge: Wedge$1,
  wedgeq: wedgeq$1,
  weierp: weierp$1,
  Wfr: Wfr$1,
  wfr: wfr$1,
  Wopf: Wopf$1,
  wopf: wopf$1,
  wp: wp$1,
  wr: wr$1,
  wreath: wreath$1,
  Wscr: Wscr$1,
  wscr: wscr$1,
  xcap: xcap$1,
  xcirc: xcirc$1,
  xcup: xcup$1,
  xdtri: xdtri$1,
  Xfr: Xfr$1,
  xfr: xfr$1,
  xharr: xharr$1,
  xhArr: xhArr$1,
  Xi: Xi$1,
  xi: xi$1,
  xlarr: xlarr$1,
  xlArr: xlArr$1,
  xmap: xmap$1,
  xnis: xnis$1,
  xodot: xodot$1,
  Xopf: Xopf$1,
  xopf: xopf$1,
  xoplus: xoplus$1,
  xotime: xotime$1,
  xrarr: xrarr$1,
  xrArr: xrArr$1,
  Xscr: Xscr$1,
  xscr: xscr$1,
  xsqcup: xsqcup$1,
  xuplus: xuplus$1,
  xutri: xutri$1,
  xvee: xvee$1,
  xwedge: xwedge$1,
  Yacute: Yacute$1,
  yacute: yacute$1,
  YAcy: YAcy$1,
  yacy: yacy$1,
  Ycirc: Ycirc$1,
  ycirc: ycirc$1,
  Ycy: Ycy$1,
  ycy: ycy$1,
  yen: yen$1,
  Yfr: Yfr$1,
  yfr: yfr$1,
  YIcy: YIcy$1,
  yicy: yicy$1,
  Yopf: Yopf$1,
  yopf: yopf$1,
  Yscr: Yscr$1,
  yscr: yscr$1,
  YUcy: YUcy$1,
  yucy: yucy$1,
  yuml: yuml$1,
  Yuml: Yuml$1,
  Zacute: Zacute$1,
  zacute: zacute$1,
  Zcaron: Zcaron$1,
  zcaron: zcaron$1,
  Zcy: Zcy$1,
  zcy: zcy$1,
  Zdot: Zdot$1,
  zdot: zdot$1,
  zeetrf: zeetrf$1,
  ZeroWidthSpace: ZeroWidthSpace$1,
  Zeta: Zeta$1,
  zeta: zeta$1,
  zfr: zfr$1,
  Zfr: Zfr$1,
  ZHcy: ZHcy$1,
  zhcy: zhcy$1,
  zigrarr: zigrarr$1,
  zopf: zopf$1,
  Zopf: Zopf$1,
  Zscr: Zscr$1,
  zscr: zscr$1,
  zwj: zwj$1,
  zwnj: zwnj$1
};

/*eslint quotes:0*/
var entities$1 = require$$0$1;

var utils$1 = createCommonjsModule(function (module, exports) {


function _class(obj) { return Object.prototype.toString.call(obj); }

function isString(obj) { return _class(obj) === '[object String]'; }

var _hasOwnProperty = Object.prototype.hasOwnProperty;

function has(object, key) {
  return _hasOwnProperty.call(object, key);
}

// Merge objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

// Remove element from array and put another array at those position.
// Useful for some operations with tokens
function arrayReplaceAt(src, pos, newElements) {
  return [].concat(src.slice(0, pos), newElements, src.slice(pos + 1));
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) { return false; }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) { return false; }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) { return false; }
  // control codes
  if (c >= 0x00 && c <= 0x08) { return false; }
  if (c === 0x0B) { return false; }
  if (c >= 0x0E && c <= 0x1F) { return false; }
  if (c >= 0x7F && c <= 0x9F) { return false; }
  // out of range
  if (c > 0x10FFFF) { return false; }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}


var UNESCAPE_MD_RE  = /\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g;
var ENTITY_RE       = /&([a-z#][a-z0-9]{1,31});/gi;
var UNESCAPE_ALL_RE = new RegExp(UNESCAPE_MD_RE.source + '|' + ENTITY_RE.source, 'gi');

var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;



function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities$1, name)) {
    return entities$1[name];
  }

  if (name.charCodeAt(0) === 0x23/* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ?
      parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);

    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }

  return match;
}

/*function replaceEntities(str) {
  if (str.indexOf('&') < 0) { return str; }

  return str.replace(ENTITY_RE, replaceEntityPattern);
}*/

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) { return str; }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

function unescapeAll(str) {
  if (str.indexOf('\\') < 0 && str.indexOf('&') < 0) { return str; }

  return str.replace(UNESCAPE_ALL_RE, function (match, escaped, entity) {
    if (escaped) { return escaped; }
    return replaceEntityPattern(match, entity);
  });
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

var REGEXP_ESCAPE_RE = /[.?*+^$[\]\\(){}|-]/g;

function escapeRE(str) {
  return str.replace(REGEXP_ESCAPE_RE, '\\$&');
}

////////////////////////////////////////////////////////////////////////////////

function isSpace(code) {
  switch (code) {
    case 0x09:
    case 0x20:
      return true;
  }
  return false;
}

// Zs (unicode class) || [\t\f\v\r\n]
function isWhiteSpace(code) {
  if (code >= 0x2000 && code <= 0x200A) { return true; }
  switch (code) {
    case 0x09: // \t
    case 0x0A: // \n
    case 0x0B: // \v
    case 0x0C: // \f
    case 0x0D: // \r
    case 0x20:
    case 0xA0:
    case 0x1680:
    case 0x202F:
    case 0x205F:
    case 0x3000:
      return true;
  }
  return false;
}

////////////////////////////////////////////////////////////////////////////////

/*eslint-disable max-len*/


// Currently without astral characters support.
function isPunctChar(ch) {
  return regex.test(ch);
}


// Markdown ASCII punctuation characters.
//
// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
//
// Don't confuse with unicode punctuation !!! It lacks some chars in ascii range.
//
function isMdAsciiPunct(ch) {
  switch (ch) {
    case 0x21/* ! */:
    case 0x22/* " */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x27/* ' */:
    case 0x28/* ( */:
    case 0x29/* ) */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2C/* , */:
    case 0x2D/* - */:
    case 0x2E/* . */:
    case 0x2F/* / */:
    case 0x3A/* : */:
    case 0x3B/* ; */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x3F/* ? */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7C/* | */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

// Hepler to unify [reference labels].
//
function normalizeReference(str) {
  // Trim and collapse whitespace
  //
  str = str.trim().replace(/\s+/g, ' ');

  // In node v10 'ẞ'.toLowerCase() === 'Ṿ', which is presumed to be a bug
  // fixed in v12 (couldn't find any details).
  //
  // So treat this one as a special case
  // (remove this when node v10 is no longer supported).
  //
  if ('ẞ'.toLowerCase() === 'Ṿ') {
    str = str.replace(/ẞ/g, 'ß');
  }

  // .toLowerCase().toUpperCase() should get rid of all differences
  // between letter variants.
  //
  // Simple .toLowerCase() doesn't normalize 125 code points correctly,
  // and .toUpperCase doesn't normalize 6 of them (list of exceptions:
  // İ, ϴ, ẞ, Ω, K, Å - those are already uppercased, but have differently
  // uppercased versions).
  //
  // Here's an example showing how it happens. Lets take greek letter omega:
  // uppercase U+0398 (Θ), U+03f4 (ϴ) and lowercase U+03b8 (θ), U+03d1 (ϑ)
  //
  // Unicode entries:
  // 0398;GREEK CAPITAL LETTER THETA;Lu;0;L;;;;;N;;;;03B8;
  // 03B8;GREEK SMALL LETTER THETA;Ll;0;L;;;;;N;;;0398;;0398
  // 03D1;GREEK THETA SYMBOL;Ll;0;L;<compat> 03B8;;;;N;GREEK SMALL LETTER SCRIPT THETA;;0398;;0398
  // 03F4;GREEK CAPITAL THETA SYMBOL;Lu;0;L;<compat> 0398;;;;N;;;;03B8;
  //
  // Case-insensitive comparison should treat all of them as equivalent.
  //
  // But .toLowerCase() doesn't change ϑ (it's already lowercase),
  // and .toUpperCase() doesn't change ϴ (already uppercase).
  //
  // Applying first lower then upper case normalizes any character:
  // '\u0398\u03f4\u03b8\u03d1'.toLowerCase().toUpperCase() === '\u0398\u0398\u0398\u0398'
  //
  // Note: this is equivalent to unicode case folding; unicode normalization
  // is a different step that is not required here.
  //
  // Final result should be uppercased, because it's later stored in an object
  // (this avoid a conflict with Object.prototype members,
  // most notably, `__proto__`)
  //
  return str.toLowerCase().toUpperCase();
}

////////////////////////////////////////////////////////////////////////////////

// Re-export libraries commonly used in both markdown-it and its plugins,
// so plugins won't have to depend on them explicitly, which reduces their
// bundled size (e.g. a browser build).
//
exports.lib                 = {};
exports.lib.mdurl           = mdurl;
exports.lib.ucmicro         = uc_micro;

exports.assign              = assign;
exports.isString            = isString;
exports.has                 = has;
exports.unescapeMd          = unescapeMd;
exports.unescapeAll         = unescapeAll;
exports.isValidEntityCode   = isValidEntityCode;
exports.fromCodePoint       = fromCodePoint;
// exports.replaceEntities     = replaceEntities;
exports.escapeHtml          = escapeHtml;
exports.arrayReplaceAt      = arrayReplaceAt;
exports.isSpace             = isSpace;
exports.isWhiteSpace        = isWhiteSpace;
exports.isMdAsciiPunct      = isMdAsciiPunct;
exports.isPunctChar         = isPunctChar;
exports.escapeRE            = escapeRE;
exports.normalizeReference  = normalizeReference;
});

// Parse link label

var parse_link_label = function parseLinkLabel(state, start, disableNested) {
  var level, found, marker, prevPos,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos;

  state.pos = start + 1;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5D /* ] */) {
      level--;
      if (level === 0) {
        found = true;
        break;
      }
    }

    prevPos = state.pos;
    state.md.inline.skipToken(state);
    if (marker === 0x5B /* [ */) {
      if (prevPos === state.pos - 1) {
        // increase level if we find text `[`, which is not a part of any token
        level++;
      } else if (disableNested) {
        state.pos = oldPos;
        return -1;
      }
    }
  }

  if (found) {
    labelEnd = state.pos;
  }

  // restore old state
  state.pos = oldPos;

  return labelEnd;
};

var unescapeAll$3 = utils$1.unescapeAll;


var parse_link_destination = function parseLinkDestination(str, pos, max) {
  var code, level,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (str.charCodeAt(pos) === 0x3C /* < */) {
    pos++;
    while (pos < max) {
      code = str.charCodeAt(pos);
      if (code === 0x0A /* \n */) { return result; }
      if (code === 0x3E /* > */) {
        result.pos = pos + 1;
        result.str = unescapeAll$3(str.slice(start + 1, pos));
        result.ok = true;
        return result;
      }
      if (code === 0x5C /* \ */ && pos + 1 < max) {
        pos += 2;
        continue;
      }

      pos++;
    }

    // no closing '>'
    return result;
  }

  // this should be ... } else { ... branch

  level = 0;
  while (pos < max) {
    code = str.charCodeAt(pos);

    if (code === 0x20) { break; }

    // ascii control characters
    if (code < 0x20 || code === 0x7F) { break; }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos += 2;
      continue;
    }

    if (code === 0x28 /* ( */) {
      level++;
    }

    if (code === 0x29 /* ) */) {
      if (level === 0) { break; }
      level--;
    }

    pos++;
  }

  if (start === pos) { return result; }
  if (level !== 0) { return result; }

  result.str = unescapeAll$3(str.slice(start, pos));
  result.lines = lines;
  result.pos = pos;
  result.ok = true;
  return result;
};

var unescapeAll$4 = utils$1.unescapeAll;


var parse_link_title = function parseLinkTitle(str, pos, max) {
  var code,
      marker,
      lines = 0,
      start = pos,
      result = {
        ok: false,
        pos: 0,
        lines: 0,
        str: ''
      };

  if (pos >= max) { return result; }

  marker = str.charCodeAt(pos);

  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) { return result; }

  pos++;

  // if opening marker is "(", switch it to closing marker ")"
  if (marker === 0x28) { marker = 0x29; }

  while (pos < max) {
    code = str.charCodeAt(pos);
    if (code === marker) {
      result.pos = pos + 1;
      result.lines = lines;
      result.str = unescapeAll$4(str.slice(start + 1, pos));
      result.ok = true;
      return result;
    } else if (code === 0x0A) {
      lines++;
    } else if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos++;
      if (str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }

    pos++;
  }

  return result;
};

var parseLinkLabel       = parse_link_label;
var parseLinkDestination = parse_link_destination;
var parseLinkTitle       = parse_link_title;

var helpers = {
	parseLinkLabel: parseLinkLabel,
	parseLinkDestination: parseLinkDestination,
	parseLinkTitle: parseLinkTitle
};

var assign$1          = utils$1.assign;
var unescapeAll$5     = utils$1.unescapeAll;
var escapeHtml$1      = utils$1.escapeHtml;


////////////////////////////////////////////////////////////////////////////////

var default_rules = {};


default_rules.code_inline = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<code' + slf.renderAttrs(token) + '>' +
          escapeHtml$1(tokens[idx].content) +
          '</code>';
};


default_rules.code_block = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  return  '<pre' + slf.renderAttrs(token) + '><code>' +
          escapeHtml$1(tokens[idx].content) +
          '</code></pre>\n';
};


default_rules.fence = function (tokens, idx, options, env, slf) {
  var token = tokens[idx],
      info = token.info ? unescapeAll$5(token.info).trim() : '',
      langName = '',
      highlighted, i, tmpAttrs, tmpToken;

  if (info) {
    langName = info.split(/\s+/g)[0];
  }

  if (options.highlight) {
    highlighted = options.highlight(token.content, langName) || escapeHtml$1(token.content);
  } else {
    highlighted = escapeHtml$1(token.content);
  }

  if (highlighted.indexOf('<pre') === 0) {
    return highlighted + '\n';
  }

  // If language exists, inject class gently, without modifying original token.
  // May be, one day we will add .clone() for token and simplify this part, but
  // now we prefer to keep things local.
  if (info) {
    i        = token.attrIndex('class');
    tmpAttrs = token.attrs ? token.attrs.slice() : [];

    if (i < 0) {
      tmpAttrs.push([ 'class', options.langPrefix + langName ]);
    } else {
      tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
    }

    // Fake token just to render attributes
    tmpToken = {
      attrs: tmpAttrs
    };

    return  '<pre><code' + slf.renderAttrs(tmpToken) + '>'
          + highlighted
          + '</code></pre>\n';
  }


  return  '<pre><code' + slf.renderAttrs(token) + '>'
        + highlighted
        + '</code></pre>\n';
};


default_rules.image = function (tokens, idx, options, env, slf) {
  var token = tokens[idx];

  // "alt" attr MUST be set, even if empty. Because it's mandatory and
  // should be placed on proper position for tests.
  //
  // Replace content with actual value

  token.attrs[token.attrIndex('alt')][1] =
    slf.renderInlineAsText(token.children, options, env);

  return slf.renderToken(tokens, idx, options);
};


default_rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
default_rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? (options.xhtmlOut ? '<br />\n' : '<br>\n') : '\n';
};


default_rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml$1(tokens[idx].content);
};


default_rules.html_block = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};
default_rules.html_inline = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};


/**
 * new Renderer()
 *
 * Creates new [[Renderer]] instance and fill [[Renderer#rules]] with defaults.
 **/
function Renderer() {

  /**
   * Renderer#rules -> Object
   *
   * Contains render rules for tokens. Can be updated and extended.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * md.renderer.rules.strong_open  = function () { return '<b>'; };
   * md.renderer.rules.strong_close = function () { return '</b>'; };
   *
   * var result = md.renderInline(...);
   * ```
   *
   * Each rule is called as independent static function with fixed signature:
   *
   * ```javascript
   * function my_token_render(tokens, idx, options, env, renderer) {
   *   // ...
   *   return renderedHTML;
   * }
   * ```
   *
   * See [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js)
   * for more details and examples.
   **/
  this.rules = assign$1({}, default_rules);
}


/**
 * Renderer.renderAttrs(token) -> String
 *
 * Render token attributes to string.
 **/
Renderer.prototype.renderAttrs = function renderAttrs(token) {
  var i, l, result;

  if (!token.attrs) { return ''; }

  result = '';

  for (i = 0, l = token.attrs.length; i < l; i++) {
    result += ' ' + escapeHtml$1(token.attrs[i][0]) + '="' + escapeHtml$1(token.attrs[i][1]) + '"';
  }

  return result;
};


/**
 * Renderer.renderToken(tokens, idx, options) -> String
 * - tokens (Array): list of tokens
 * - idx (Numbed): token index to render
 * - options (Object): params of parser instance
 *
 * Default token renderer. Can be overriden by custom function
 * in [[Renderer#rules]].
 **/
Renderer.prototype.renderToken = function renderToken(tokens, idx, options) {
  var nextToken,
      result = '',
      needLf = false,
      token = tokens[idx];

  // Tight list paragraphs
  if (token.hidden) {
    return '';
  }

  // Insert a newline between hidden paragraph and subsequent opening
  // block-level tag.
  //
  // For example, here we should insert a newline before blockquote:
  //  - a
  //    >
  //
  if (token.block && token.nesting !== -1 && idx && tokens[idx - 1].hidden) {
    result += '\n';
  }

  // Add token name, e.g. `<img`
  result += (token.nesting === -1 ? '</' : '<') + token.tag;

  // Encode attributes, e.g. `<img src="foo"`
  result += this.renderAttrs(token);

  // Add a slash for self-closing tags, e.g. `<img src="foo" /`
  if (token.nesting === 0 && options.xhtmlOut) {
    result += ' /';
  }

  // Check if we need to add a newline after this tag
  if (token.block) {
    needLf = true;

    if (token.nesting === 1) {
      if (idx + 1 < tokens.length) {
        nextToken = tokens[idx + 1];

        if (nextToken.type === 'inline' || nextToken.hidden) {
          // Block-level tag containing an inline tag.
          //
          needLf = false;

        } else if (nextToken.nesting === -1 && nextToken.tag === token.tag) {
          // Opening tag + closing tag of the same type. E.g. `<li></li>`.
          //
          needLf = false;
        }
      }
    }
  }

  result += needLf ? '>\n' : '>';

  return result;
};


/**
 * Renderer.renderInline(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * The same as [[Renderer.render]], but for single token of `inline` type.
 **/
Renderer.prototype.renderInline = function (tokens, options, env) {
  var type,
      result = '',
      rules = this.rules;

  for (var i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (typeof rules[type] !== 'undefined') {
      result += rules[type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options);
    }
  }

  return result;
};


/** internal
 * Renderer.renderInlineAsText(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Special kludge for image `alt` attributes to conform CommonMark spec.
 * Don't try to use it! Spec requires to show `alt` content with stripped markup,
 * instead of simple escaping.
 **/
Renderer.prototype.renderInlineAsText = function (tokens, options, env) {
  var result = '';

  for (var i = 0, len = tokens.length; i < len; i++) {
    if (tokens[i].type === 'text') {
      result += tokens[i].content;
    } else if (tokens[i].type === 'image') {
      result += this.renderInlineAsText(tokens[i].children, options, env);
    }
  }

  return result;
};


/**
 * Renderer.render(tokens, options, env) -> String
 * - tokens (Array): list on block tokens to renter
 * - options (Object): params of parser instance
 * - env (Object): additional data from parsed input (references, for example)
 *
 * Takes token stream and generates HTML. Probably, you will never need to call
 * this method directly.
 **/
Renderer.prototype.render = function (tokens, options, env) {
  var i, len, type,
      result = '',
      rules = this.rules;

  for (i = 0, len = tokens.length; i < len; i++) {
    type = tokens[i].type;

    if (type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else if (typeof rules[type] !== 'undefined') {
      result += rules[tokens[i].type](tokens, i, options, env, this);
    } else {
      result += this.renderToken(tokens, i, options, env);
    }
  }

  return result;
};

var renderer = Renderer;

/**
 * class Ruler
 *
 * Helper class, used by [[MarkdownIt#core]], [[MarkdownIt#block]] and
 * [[MarkdownIt#inline]] to manage sequences of functions (rules):
 *
 * - keep rules in defined order
 * - assign the name to each rule
 * - enable/disable rules
 * - add/replace rules
 * - allow assign rules to additional named chains (in the same)
 * - cacheing lists of active rules
 *
 * You will not need use this class directly until write plugins. For simple
 * rules control use [[MarkdownIt.disable]], [[MarkdownIt.enable]] and
 * [[MarkdownIt.use]].
 **/


/**
 * new Ruler()
 **/
function Ruler() {
  // List of added rules. Each element is:
  //
  // {
  //   name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ]
  // }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - diginal anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

////////////////////////////////////////////////////////////////////////////////
// Helper methods, should not be used directly


// Find rule index by name
//
Ruler.prototype.__find__ = function (name) {
  for (var i = 0; i < this.__rules__.length; i++) {
    if (this.__rules__[i].name === name) {
      return i;
    }
  }
  return -1;
};


// Build rules lookup cache
//
Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [ '' ];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) { return; }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) { return; }

      if (chain && rule.alt.indexOf(chain) < 0) { return; }

      self.__cache__[chain].push(rule.fn);
    });
  });
};


/**
 * Ruler.at(name, fn [, options])
 * - name (String): rule name to replace.
 * - fn (Function): new rule function.
 * - options (Object): new rule options (not mandatory).
 *
 * Replace rule by name with new function & options. Throws error if name not
 * found.
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * Replace existing typographer replacement rule with new one:
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.at('replacements', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.at = function (name, fn, options) {
  var index = this.__find__(name);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + name); }

  this.__rules__[index].fn = fn;
  this.__rules__[index].alt = opt.alt || [];
  this.__cache__ = null;
};


/**
 * Ruler.before(beforeName, ruleName, fn [, options])
 * - beforeName (String): new rule will be added before this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain before one with given name. See also
 * [[Ruler.after]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.block.ruler.before('paragraph', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var index = this.__find__(beforeName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + beforeName); }

  this.__rules__.splice(index, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.after(afterName, ruleName, fn [, options])
 * - afterName (String): new rule will be added after this one.
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Add new rule to chain after one with given name. See also
 * [[Ruler.before]], [[Ruler.push]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.inline.ruler.after('text', 'my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var index = this.__find__(afterName);
  var opt = options || {};

  if (index === -1) { throw new Error('Parser rule not found: ' + afterName); }

  this.__rules__.splice(index + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Ruler.push(ruleName, fn [, options])
 * - ruleName (String): name of added rule.
 * - fn (Function): rule function.
 * - options (Object): rule options (not mandatory).
 *
 * Push new rule to the end of chain. See also
 * [[Ruler.before]], [[Ruler.after]].
 *
 * ##### Options:
 *
 * - __alt__ - array with names of "alternate" chains.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')();
 *
 * md.core.ruler.push('my_rule', function replace(state) {
 *   //...
 * });
 * ```
 **/
Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};


/**
 * Ruler.enable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to enable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.disable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.enable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.enableOnly(list [, ignoreInvalid])
 * - list (String|Array): list of rule names to enable (whitelist).
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable rules with given names, and disable everything else. If any rule name
 * not found - throw Error. Errors can be disabled by second param.
 *
 * See also [[Ruler.disable]], [[Ruler.enable]].
 **/
Ruler.prototype.enableOnly = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  this.__rules__.forEach(function (rule) { rule.enabled = false; });

  this.enable(list, ignoreInvalid);
};


/**
 * Ruler.disable(list [, ignoreInvalid]) -> Array
 * - list (String|Array): list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Disable rules with given names. If any rule name not found - throw Error.
 * Errors can be disabled by second param.
 *
 * Returns list of found rule names (if no exception happened).
 *
 * See also [[Ruler.enable]], [[Ruler.enableOnly]].
 **/
Ruler.prototype.disable = function (list, ignoreInvalid) {
  if (!Array.isArray(list)) { list = [ list ]; }

  var result = [];

  // Search by name and disable
  list.forEach(function (name) {
    var idx = this.__find__(name);

    if (idx < 0) {
      if (ignoreInvalid) { return; }
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = false;
    result.push(name);
  }, this);

  this.__cache__ = null;
  return result;
};


/**
 * Ruler.getRules(chainName) -> Array
 *
 * Return array of active functions (rules) for given chain name. It analyzes
 * rules configuration, compiles caches if not exists and returns result.
 *
 * Default chain name is `''` (empty string). It can't be skipped. That's
 * done intentionally, to keep signature monomorphic for high speed.
 **/
Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }

  // Chain can be empty, if rules disabled. But we still have to return Array.
  return this.__cache__[chainName] || [];
};

var ruler = Ruler;

// Normalize input string


// https://spec.commonmark.org/0.29/#line-ending
var NEWLINES_RE  = /\r\n?|\n/g;
var NULL_RE      = /\0/g;


var normalize = function normalize(state) {
  var str;

  // Normalize newlines
  str = state.src.replace(NEWLINES_RE, '\n');

  // Replace NULL characters
  str = str.replace(NULL_RE, '\uFFFD');

  state.src = str;
};

var block$2 = function block(state) {
  var token;

  if (state.inlineMode) {
    token          = new state.Token('inline', '', 0);
    token.content  = state.src;
    token.map      = [ 0, 1 ];
    token.children = [];
    state.tokens.push(token);
  } else {
    state.md.block.parse(state.src, state.md, state.env, state.tokens);
  }
};

var inline = function inline(state) {
  var tokens = state.tokens, tok, i, l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.md.inline.parse(tok.content, state.md, state.env, tok.children);
    }
  }
};

var arrayReplaceAt$1 = utils$1.arrayReplaceAt;


function isLinkOpen(str) {
  return /^<a[>\s]/i.test(str);
}
function isLinkClose(str) {
  return /^<\/a\s*>/i.test(str);
}


var linkify = function linkify(state) {
  var i, j, l, tokens, token, currentToken, nodes, ln, text, pos, lastPos,
      level, htmlLinkLevel, url, fullUrl, urlText,
      blockTokens = state.tokens,
      links;

  if (!state.md.options.linkify) { return; }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline' ||
        !state.md.linkify.pretest(blockTokens[j].content)) {
      continue;
    }

    tokens = blockTokens[j].children;

    htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      currentToken = tokens[i];

      // Skip content of markdown links
      if (currentToken.type === 'link_close') {
        i--;
        while (tokens[i].level !== currentToken.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (currentToken.type === 'html_inline') {
        if (isLinkOpen(currentToken.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(currentToken.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) { continue; }

      if (currentToken.type === 'text' && state.md.linkify.test(currentToken.content)) {

        text = currentToken.content;
        links = state.md.linkify.match(text);

        // Now split string to nodes
        nodes = [];
        level = currentToken.level;
        lastPos = 0;

        for (ln = 0; ln < links.length; ln++) {

          url = links[ln].url;
          fullUrl = state.md.normalizeLink(url);
          if (!state.md.validateLink(fullUrl)) { continue; }

          urlText = links[ln].text;

          // Linkifier might send raw hostnames like "example.com", where url
          // starts with domain name. So we prepend http:// in those cases,
          // and remove it afterwards.
          //
          if (!links[ln].schema) {
            urlText = state.md.normalizeLinkText('http://' + urlText).replace(/^http:\/\//, '');
          } else if (links[ln].schema === 'mailto:' && !/^mailto:/i.test(urlText)) {
            urlText = state.md.normalizeLinkText('mailto:' + urlText).replace(/^mailto:/, '');
          } else {
            urlText = state.md.normalizeLinkText(urlText);
          }

          pos = links[ln].index;

          if (pos > lastPos) {
            token         = new state.Token('text', '', 0);
            token.content = text.slice(lastPos, pos);
            token.level   = level;
            nodes.push(token);
          }

          token         = new state.Token('link_open', 'a', 1);
          token.attrs   = [ [ 'href', fullUrl ] ];
          token.level   = level++;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          token         = new state.Token('text', '', 0);
          token.content = urlText;
          token.level   = level;
          nodes.push(token);

          token         = new state.Token('link_close', 'a', -1);
          token.level   = --level;
          token.markup  = 'linkify';
          token.info    = 'auto';
          nodes.push(token);

          lastPos = links[ln].lastIndex;
        }
        if (lastPos < text.length) {
          token         = new state.Token('text', '', 0);
          token.content = text.slice(lastPos);
          token.level   = level;
          nodes.push(token);
        }

        // replace current node
        blockTokens[j].children = tokens = arrayReplaceAt$1(tokens, i, nodes);
      }
    }
  }
};

// Simple typographic replacements

// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4

var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

// Workaround for phantomjs - need regex without /g flag,
// or root check will fail every second time
var SCOPED_ABBR_TEST_RE = /\((c|tm|r|p)\)/i;

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  c: '©',
  r: '®',
  p: '§',
  tm: '™'
};

function replaceFn(match, name) {
  return SCOPED_ABBR[name.toLowerCase()];
}

function replace_scoped(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      token.content = token.content.replace(SCOPED_ABBR_RE, replaceFn);
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}

function replace_rare(inlineTokens) {
  var i, token, inside_autolink = 0;

  for (i = inlineTokens.length - 1; i >= 0; i--) {
    token = inlineTokens[i];

    if (token.type === 'text' && !inside_autolink) {
      if (RARE_RE.test(token.content)) {
        token.content = token.content
          .replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..')
          .replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
          // en-dash
          .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2')
          .replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
      }
    }

    if (token.type === 'link_open' && token.info === 'auto') {
      inside_autolink--;
    }

    if (token.type === 'link_close' && token.info === 'auto') {
      inside_autolink++;
    }
  }
}


var replacements = function replace(state) {
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') { continue; }

    if (SCOPED_ABBR_TEST_RE.test(state.tokens[blkIdx].content)) {
      replace_scoped(state.tokens[blkIdx].children);
    }

    if (RARE_RE.test(state.tokens[blkIdx].content)) {
      replace_rare(state.tokens[blkIdx].children);
    }

  }
};

var isWhiteSpace$2   = utils$1.isWhiteSpace;
var isPunctChar$2    = utils$1.isPunctChar;
var isMdAsciiPunct$2 = utils$1.isMdAsciiPunct;

var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var APOSTROPHE = '\u2019'; /* ’ */


function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

function process_inlines(tokens, state) {
  var i, token, text, t, pos, max, thisLevel, item, lastChar, nextChar,
      isLastPunctChar, isNextPunctChar, isLastWhiteSpace, isNextWhiteSpace,
      canOpen, canClose, j, isSingle, stack, openQuote, closeQuote;

  stack = [];

  for (i = 0; i < tokens.length; i++) {
    token = tokens[i];

    thisLevel = tokens[i].level;

    for (j = stack.length - 1; j >= 0; j--) {
      if (stack[j].level <= thisLevel) { break; }
    }
    stack.length = j + 1;

    if (token.type !== 'text') { continue; }

    text = token.content;
    pos = 0;
    max = text.length;

    /*eslint no-labels:0,block-scoped-var:0*/
    OUTER:
    while (pos < max) {
      QUOTE_RE.lastIndex = pos;
      t = QUOTE_RE.exec(text);
      if (!t) { break; }

      canOpen = canClose = true;
      pos = t.index + 1;
      isSingle = (t[0] === "'");

      // Find previous character,
      // default to space if it's the beginning of the line
      //
      lastChar = 0x20;

      if (t.index - 1 >= 0) {
        lastChar = text.charCodeAt(t.index - 1);
      } else {
        for (j = i - 1; j >= 0; j--) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // lastChar defaults to 0x20
          if (tokens[j].type !== 'text') continue;

          lastChar = tokens[j].content.charCodeAt(tokens[j].content.length - 1);
          break;
        }
      }

      // Find next character,
      // default to space if it's the end of the line
      //
      nextChar = 0x20;

      if (pos < max) {
        nextChar = text.charCodeAt(pos);
      } else {
        for (j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === 'softbreak' || tokens[j].type === 'hardbreak') break; // nextChar defaults to 0x20
          if (tokens[j].type !== 'text') continue;

          nextChar = tokens[j].content.charCodeAt(0);
          break;
        }
      }

      isLastPunctChar = isMdAsciiPunct$2(lastChar) || isPunctChar$2(String.fromCharCode(lastChar));
      isNextPunctChar = isMdAsciiPunct$2(nextChar) || isPunctChar$2(String.fromCharCode(nextChar));

      isLastWhiteSpace = isWhiteSpace$2(lastChar);
      isNextWhiteSpace = isWhiteSpace$2(nextChar);

      if (isNextWhiteSpace) {
        canOpen = false;
      } else if (isNextPunctChar) {
        if (!(isLastWhiteSpace || isLastPunctChar)) {
          canOpen = false;
        }
      }

      if (isLastWhiteSpace) {
        canClose = false;
      } else if (isLastPunctChar) {
        if (!(isNextWhiteSpace || isNextPunctChar)) {
          canClose = false;
        }
      }

      if (nextChar === 0x22 /* " */ && t[0] === '"') {
        if (lastChar >= 0x30 /* 0 */ && lastChar <= 0x39 /* 9 */) {
          // special case: 1"" - count first quote as an inch
          canClose = canOpen = false;
        }
      }

      if (canOpen && canClose) {
        // treat this as the middle of the word
        canOpen = false;
        canClose = isNextPunctChar;
      }

      if (!canOpen && !canClose) {
        // middle of word
        if (isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
        continue;
      }

      if (canClose) {
        // this could be a closing quote, rewind the stack to get a match
        for (j = stack.length - 1; j >= 0; j--) {
          item = stack[j];
          if (stack[j].level < thisLevel) { break; }
          if (item.single === isSingle && stack[j].level === thisLevel) {
            item = stack[j];

            if (isSingle) {
              openQuote = state.md.options.quotes[2];
              closeQuote = state.md.options.quotes[3];
            } else {
              openQuote = state.md.options.quotes[0];
              closeQuote = state.md.options.quotes[1];
            }

            // replace token.content *before* tokens[item.token].content,
            // because, if they are pointing at the same token, replaceAt
            // could mess up indices when quote length != 1
            token.content = replaceAt(token.content, t.index, closeQuote);
            tokens[item.token].content = replaceAt(
              tokens[item.token].content, item.pos, openQuote);

            pos += closeQuote.length - 1;
            if (item.token === i) { pos += openQuote.length - 1; }

            text = token.content;
            max = text.length;

            stack.length = j;
            continue OUTER;
          }
        }
      }

      if (canOpen) {
        stack.push({
          token: i,
          pos: t.index,
          single: isSingle,
          level: thisLevel
        });
      } else if (canClose && isSingle) {
        token.content = replaceAt(token.content, t.index, APOSTROPHE);
      }
    }
  }
}


var smartquotes = function smartquotes(state) {
  /*eslint max-depth:0*/
  var blkIdx;

  if (!state.md.options.typographer) { return; }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline' ||
        !QUOTE_TEST_RE.test(state.tokens[blkIdx].content)) {
      continue;
    }

    process_inlines(state.tokens[blkIdx].children, state);
  }
};

// Token class


/**
 * class Token
 **/

/**
 * new Token(type, tag, nesting)
 *
 * Create new token and fill passed properties.
 **/
function Token$1(type, tag, nesting) {
  /**
   * Token#type -> String
   *
   * Type of the token (string, e.g. "paragraph_open")
   **/
  this.type     = type;

  /**
   * Token#tag -> String
   *
   * html tag name, e.g. "p"
   **/
  this.tag      = tag;

  /**
   * Token#attrs -> Array
   *
   * Html attributes. Format: `[ [ name1, value1 ], [ name2, value2 ] ]`
   **/
  this.attrs    = null;

  /**
   * Token#map -> Array
   *
   * Source map info. Format: `[ line_begin, line_end ]`
   **/
  this.map      = null;

  /**
   * Token#nesting -> Number
   *
   * Level change (number in {-1, 0, 1} set), where:
   *
   * -  `1` means the tag is opening
   * -  `0` means the tag is self-closing
   * - `-1` means the tag is closing
   **/
  this.nesting  = nesting;

  /**
   * Token#level -> Number
   *
   * nesting level, the same as `state.level`
   **/
  this.level    = 0;

  /**
   * Token#children -> Array
   *
   * An array of child nodes (inline and img tokens)
   **/
  this.children = null;

  /**
   * Token#content -> String
   *
   * In a case of self-closing tag (code, html, fence, etc.),
   * it has contents of this tag.
   **/
  this.content  = '';

  /**
   * Token#markup -> String
   *
   * '*' or '_' for emphasis, fence string for fence, etc.
   **/
  this.markup   = '';

  /**
   * Token#info -> String
   *
   * fence infostring
   **/
  this.info     = '';

  /**
   * Token#meta -> Object
   *
   * A place for plugins to store an arbitrary data
   **/
  this.meta     = null;

  /**
   * Token#block -> Boolean
   *
   * True for block-level tokens, false for inline tokens.
   * Used in renderer to calculate line breaks
   **/
  this.block    = false;

  /**
   * Token#hidden -> Boolean
   *
   * If it's true, ignore this element when rendering. Used for tight lists
   * to hide paragraphs.
   **/
  this.hidden   = false;
}


/**
 * Token.attrIndex(name) -> Number
 *
 * Search attribute index by name.
 **/
Token$1.prototype.attrIndex = function attrIndex(name) {
  var attrs, i, len;

  if (!this.attrs) { return -1; }

  attrs = this.attrs;

  for (i = 0, len = attrs.length; i < len; i++) {
    if (attrs[i][0] === name) { return i; }
  }
  return -1;
};


/**
 * Token.attrPush(attrData)
 *
 * Add `[ name, value ]` attribute to list. Init attrs if necessary
 **/
Token$1.prototype.attrPush = function attrPush(attrData) {
  if (this.attrs) {
    this.attrs.push(attrData);
  } else {
    this.attrs = [ attrData ];
  }
};


/**
 * Token.attrSet(name, value)
 *
 * Set `name` attribute to `value`. Override old value if exists.
 **/
Token$1.prototype.attrSet = function attrSet(name, value) {
  var idx = this.attrIndex(name),
      attrData = [ name, value ];

  if (idx < 0) {
    this.attrPush(attrData);
  } else {
    this.attrs[idx] = attrData;
  }
};


/**
 * Token.attrGet(name)
 *
 * Get the value of attribute `name`, or null if it does not exist.
 **/
Token$1.prototype.attrGet = function attrGet(name) {
  var idx = this.attrIndex(name), value = null;
  if (idx >= 0) {
    value = this.attrs[idx][1];
  }
  return value;
};


/**
 * Token.attrJoin(name, value)
 *
 * Join value to existing attribute via space. Or create new attribute if not
 * exists. Useful to operate with token classes.
 **/
Token$1.prototype.attrJoin = function attrJoin(name, value) {
  var idx = this.attrIndex(name);

  if (idx < 0) {
    this.attrPush([ name, value ]);
  } else {
    this.attrs[idx][1] = this.attrs[idx][1] + ' ' + value;
  }
};


var token$1 = Token$1;

function StateCore$1(src, md, env) {
  this.src = src;
  this.env = env;
  this.tokens = [];
  this.inlineMode = false;
  this.md = md; // link to parser instance
}

// re-export Token class to use in core rules
StateCore$1.prototype.Token = token$1;


var state_core = StateCore$1;

var _rules = [
  [ 'normalize',      normalize      ],
  [ 'block',          block$2          ],
  [ 'inline',         inline         ],
  [ 'linkify',        linkify        ],
  [ 'replacements',   replacements   ],
  [ 'smartquotes',    smartquotes    ]
];


/**
 * new Core()
 **/
function Core() {
  /**
   * Core#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of core rules.
   **/
  this.ruler = new ruler();

  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}


/**
 * Core.process(state)
 *
 * Executes core chain rules.
 **/
Core.prototype.process = function (state) {
  var i, l, rules;

  rules = this.ruler.getRules('');

  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

Core.prototype.State = state_core;


var parser_core = Core;

var isSpace$b = utils$1.isSpace;


function getLine(state, line) {
  var pos = state.bMarks[line] + state.blkIndent,
      max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

function escapedSplit(str) {
  var result = [],
      pos = 0,
      max = str.length,
      ch,
      escapes = 0,
      lastPos = 0,
      backTicked = false,
      lastBackTick = 0;

  ch  = str.charCodeAt(pos);

  while (pos < max) {
    if (ch === 0x60/* ` */) {
      if (backTicked) {
        // make \` close code sequence, but not open it;
        // the reason is: `\` is correct code block
        backTicked = false;
        lastBackTick = pos;
      } else if (escapes % 2 === 0) {
        backTicked = true;
        lastBackTick = pos;
      }
    } else if (ch === 0x7c/* | */ && (escapes % 2 === 0) && !backTicked) {
      result.push(str.substring(lastPos, pos));
      lastPos = pos + 1;
    }

    if (ch === 0x5c/* \ */) {
      escapes++;
    } else {
      escapes = 0;
    }

    pos++;

    // If there was an un-closed backtick, go back to just after
    // the last backtick, but as if it was a normal character
    if (pos === max && backTicked) {
      backTicked = false;
      pos = lastBackTick + 1;
    }

    ch = str.charCodeAt(pos);
  }

  result.push(str.substring(lastPos));

  return result;
}


var table = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, nextLine, columns, columnCount, token,
      aligns, t, tableLines, tbodyLines;

  // should have at least two lines
  if (startLine + 2 > endLine) { return false; }

  nextLine = startLine + 1;

  if (state.sCount[nextLine] < state.blkIndent) { return false; }

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[nextLine] - state.blkIndent >= 4) { return false; }

  // first character of the second line should be '|', '-', ':',
  // and no other characters are allowed but spaces;
  // basically, this is the equivalent of /^[-:|][-:|\s]*$/ regexp

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) { return false; }

  ch = state.src.charCodeAt(pos++);
  if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */) { return false; }

  while (pos < state.eMarks[nextLine]) {
    ch = state.src.charCodeAt(pos);

    if (ch !== 0x7C/* | */ && ch !== 0x2D/* - */ && ch !== 0x3A/* : */ && !isSpace$b(ch)) { return false; }

    pos++;
  }

  lineText = getLine(state, startLine + 1);

  columns = lineText.split('|');
  aligns = [];
  for (i = 0; i < columns.length; i++) {
    t = columns[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === columns.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) { return false; }
    if (t.charCodeAt(t.length - 1) === 0x3A/* : */) {
      aligns.push(t.charCodeAt(0) === 0x3A/* : */ ? 'center' : 'right');
    } else if (t.charCodeAt(0) === 0x3A/* : */) {
      aligns.push('left');
    } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) { return false; }
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }
  columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

  // header row will define an amount of columns in the entire table,
  // and align row shouldn't be smaller than that (the rest of the rows can)
  columnCount = columns.length;
  if (columnCount > aligns.length) { return false; }

  if (silent) { return true; }

  token     = state.push('table_open', 'table', 1);
  token.map = tableLines = [ startLine, 0 ];

  token     = state.push('thead_open', 'thead', 1);
  token.map = [ startLine, startLine + 1 ];

  token     = state.push('tr_open', 'tr', 1);
  token.map = [ startLine, startLine + 1 ];

  for (i = 0; i < columns.length; i++) {
    token          = state.push('th_open', 'th', 1);
    token.map      = [ startLine, startLine + 1 ];
    if (aligns[i]) {
      token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
    }

    token          = state.push('inline', '', 0);
    token.content  = columns[i].trim();
    token.map      = [ startLine, startLine + 1 ];
    token.children = [];

    token          = state.push('th_close', 'th', -1);
  }

  token     = state.push('tr_close', 'tr', -1);
  token     = state.push('thead_close', 'thead', -1);

  token     = state.push('tbody_open', 'tbody', 1);
  token.map = tbodyLines = [ startLine + 2, 0 ];

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    lineText = getLine(state, nextLine).trim();
    if (lineText.indexOf('|') === -1) { break; }
    if (state.sCount[nextLine] - state.blkIndent >= 4) { break; }
    columns = escapedSplit(lineText.replace(/^\||\|$/g, ''));

    token = state.push('tr_open', 'tr', 1);
    for (i = 0; i < columnCount; i++) {
      token          = state.push('td_open', 'td', 1);
      if (aligns[i]) {
        token.attrs  = [ [ 'style', 'text-align:' + aligns[i] ] ];
      }

      token          = state.push('inline', '', 0);
      token.content  = columns[i] ? columns[i].trim() : '';
      token.children = [];

      token          = state.push('td_close', 'td', -1);
    }
    token = state.push('tr_close', 'tr', -1);
  }
  token = state.push('tbody_close', 'tbody', -1);
  token = state.push('table_close', 'table', -1);

  tableLines[1] = tbodyLines[1] = nextLine;
  state.line = nextLine;
  return true;
};

// Code block (4 spaces padded)


var code = function code(state, startLine, endLine/*, silent*/) {
  var nextLine, last, token;

  if (state.sCount[startLine] - state.blkIndent < 4) { return false; }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = last;

  token         = state.push('code_block', 'code', 0);
  token.content = state.getLines(startLine, last, 4 + state.blkIndent, true);
  token.map     = [ startLine, state.line ];

  return true;
};

// fences (``` lang, ~~~ lang)


var fence = function fence(state, startLine, endLine, silent) {
  var marker, len, params, nextLine, mem, token, markup,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (pos + 3 > max) { return false; }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E/* ~ */ && marker !== 0x60 /* ` */) {
    return false;
  }

  // scan marker length
  mem = pos;
  pos = state.skipChars(pos, marker);

  len = pos - mem;

  if (len < 3) { return false; }

  markup = state.src.slice(mem, pos);
  params = state.src.slice(pos, max);

  if (marker === 0x60 /* ` */) {
    if (params.indexOf(String.fromCharCode(marker)) >= 0) {
      return false;
    }
  }

  // Since start is found, we can report success here in validation mode
  if (silent) { return true; }

  // search end of block
  nextLine = startLine;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.sCount[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) { continue; }

    if (state.sCount[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) { continue; }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) { continue; }

    haveEndMarker = true;
    // found!
    break;
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.sCount[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);

  token         = state.push('fence', 'code', 0);
  token.info    = params;
  token.content = state.getLines(startLine + 1, nextLine, len, true);
  token.markup  = markup;
  token.map     = [ startLine, state.line ];

  return true;
};

var isSpace$c = utils$1.isSpace;


var blockquote = function blockquote(state, startLine, endLine, silent) {
  var adjustTab,
      ch,
      i,
      initial,
      l,
      lastLineEmpty,
      lines,
      nextLine,
      offset,
      oldBMarks,
      oldBSCount,
      oldIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      spaceAfterMarker,
      terminate,
      terminatorRules,
      token,
      wasOutdented,
      oldLineMax = state.lineMax,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // check the block quote marker
  if (state.src.charCodeAt(pos++) !== 0x3E/* > */) { return false; }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) { return true; }

  // skip spaces after ">" and re-calculate offset
  initial = offset = state.sCount[startLine] + pos - (state.bMarks[startLine] + state.tShift[startLine]);

  // skip one optional space after '>'
  if (state.src.charCodeAt(pos) === 0x20 /* space */) {
    // ' >   test '
    //     ^ -- position start of line here:
    pos++;
    initial++;
    offset++;
    adjustTab = false;
    spaceAfterMarker = true;
  } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
    spaceAfterMarker = true;

    if ((state.bsCount[startLine] + offset) % 4 === 3) {
      // '  >\t  test '
      //       ^ -- position start of line here (tab has width===1)
      pos++;
      initial++;
      offset++;
      adjustTab = false;
    } else {
      // ' >\t  test '
      //    ^ -- position start of line here + shift bsCount slightly
      //         to make extra space appear
      adjustTab = true;
    }
  } else {
    spaceAfterMarker = false;
  }

  oldBMarks = [ state.bMarks[startLine] ];
  state.bMarks[startLine] = pos;

  while (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (isSpace$c(ch)) {
      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[startLine] + (adjustTab ? 1 : 0)) % 4;
      } else {
        offset++;
      }
    } else {
      break;
    }

    pos++;
  }

  oldBSCount = [ state.bsCount[startLine] ];
  state.bsCount[startLine] = state.sCount[startLine] + 1 + (spaceAfterMarker ? 1 : 0);

  lastLineEmpty = pos >= max;

  oldSCount = [ state.sCount[startLine] ];
  state.sCount[startLine] = offset - initial;

  oldTShift = [ state.tShift[startLine] ];
  state.tShift[startLine] = pos - state.bMarks[startLine];

  terminatorRules = state.md.block.ruler.getRules('blockquote');

  oldParentType = state.parentType;
  state.parentType = 'blockquote';
  wasOutdented = false;

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag:
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    // check if it's outdented, i.e. it's inside list item and indented
    // less than said list item:
    //
    // ```
    // 1. anything
    //    > current blockquote
    // 2. checking this line
    // ```
    if (state.sCount[nextLine] < state.blkIndent) wasOutdented = true;

    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E/* > */ && !wasOutdented) {
      // This line is inside the blockquote.

      // skip spaces after ">" and re-calculate offset
      initial = offset = state.sCount[nextLine] + pos - (state.bMarks[nextLine] + state.tShift[nextLine]);

      // skip one optional space after '>'
      if (state.src.charCodeAt(pos) === 0x20 /* space */) {
        // ' >   test '
        //     ^ -- position start of line here:
        pos++;
        initial++;
        offset++;
        adjustTab = false;
        spaceAfterMarker = true;
      } else if (state.src.charCodeAt(pos) === 0x09 /* tab */) {
        spaceAfterMarker = true;

        if ((state.bsCount[nextLine] + offset) % 4 === 3) {
          // '  >\t  test '
          //       ^ -- position start of line here (tab has width===1)
          pos++;
          initial++;
          offset++;
          adjustTab = false;
        } else {
          // ' >\t  test '
          //    ^ -- position start of line here + shift bsCount slightly
          //         to make extra space appear
          adjustTab = true;
        }
      } else {
        spaceAfterMarker = false;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      state.bMarks[nextLine] = pos;

      while (pos < max) {
        ch = state.src.charCodeAt(pos);

        if (isSpace$c(ch)) {
          if (ch === 0x09) {
            offset += 4 - (offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4;
          } else {
            offset++;
          }
        } else {
          break;
        }

        pos++;
      }

      lastLineEmpty = pos >= max;

      oldBSCount.push(state.bsCount[nextLine]);
      state.bsCount[nextLine] = state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

      oldSCount.push(state.sCount[nextLine]);
      state.sCount[nextLine] = offset - initial;

      oldTShift.push(state.tShift[nextLine]);
      state.tShift[nextLine] = pos - state.bMarks[nextLine];
      continue;
    }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) { break; }

    // Case 3: another tag found.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }

    if (terminate) {
      // Quirk to enforce "hard termination mode" for paragraphs;
      // normally if you call `tokenize(state, startLine, nextLine)`,
      // paragraphs will look below nextLine for paragraph continuation,
      // but if blockquote is terminated by another tag, they shouldn't
      state.lineMax = nextLine;

      if (state.blkIndent !== 0) {
        // state.blkIndent was non-zero, we now set it to zero,
        // so we need to re-calculate all offsets to appear as
        // if indent wasn't changed
        oldBMarks.push(state.bMarks[nextLine]);
        oldBSCount.push(state.bsCount[nextLine]);
        oldTShift.push(state.tShift[nextLine]);
        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] -= state.blkIndent;
      }

      break;
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldBSCount.push(state.bsCount[nextLine]);
    oldTShift.push(state.tShift[nextLine]);
    oldSCount.push(state.sCount[nextLine]);

    // A negative indentation means that this is a paragraph continuation
    //
    state.sCount[nextLine] = -1;
  }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;

  token        = state.push('blockquote_open', 'blockquote', 1);
  token.markup = '>';
  token.map    = lines = [ startLine, 0 ];

  state.md.block.tokenize(state, startLine, nextLine);

  token        = state.push('blockquote_close', 'blockquote', -1);
  token.markup = '>';

  state.lineMax = oldLineMax;
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
    state.sCount[i + startLine] = oldSCount[i];
    state.bsCount[i + startLine] = oldBSCount[i];
  }
  state.blkIndent = oldIndent;

  return true;
};

var isSpace$d = utils$1.isSpace;


var hr = function hr(state, startLine, endLine, silent) {
  var marker, cnt, ch, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x5F/* _ */) {
    return false;
  }

  // markers can be mixed with spaces, but there should be at least 3 of them

  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && !isSpace$d(ch)) { return false; }
    if (ch === marker) { cnt++; }
  }

  if (cnt < 3) { return false; }

  if (silent) { return true; }

  state.line = startLine + 1;

  token        = state.push('hr', 'hr', 0);
  token.map    = [ startLine, state.line ];
  token.markup = Array(cnt + 1).join(String.fromCharCode(marker));

  return true;
};

var isSpace$e = utils$1.isSpace;


// Search `[-+*][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipBulletListMarker(state, startLine) {
  var marker, pos, max, ch;

  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];

  marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A/* * */ &&
      marker !== 0x2D/* - */ &&
      marker !== 0x2B/* + */) {
    return -1;
  }

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace$e(ch)) {
      // " -test " - is not a list item
      return -1;
    }
  }

  return pos;
}

// Search `\d+[.)][\n ]`, returns next pos after marker on success
// or -1 on fail.
function skipOrderedListMarker(state, startLine) {
  var ch,
      start = state.bMarks[startLine] + state.tShift[startLine],
      pos = start,
      max = state.eMarks[startLine];

  // List marker should have at least 2 chars (digit + dot)
  if (pos + 1 >= max) { return -1; }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30/* 0 */ || ch > 0x39/* 9 */) { return -1; }

  for (;;) {
    // EOL -> fail
    if (pos >= max) { return -1; }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30/* 0 */ && ch <= 0x39/* 9 */) {

      // List marker should have no more than 9 digits
      // (prevents integer overflow in browsers)
      if (pos - start >= 10) { return -1; }

      continue;
    }

    // found valid marker
    if (ch === 0x29/* ) */ || ch === 0x2e/* . */) {
      break;
    }

    return -1;
  }


  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (!isSpace$e(ch)) {
      // " 1.test " - is not a list item
      return -1;
    }
  }
  return pos;
}

function markTightParagraphs(state, idx) {
  var i, l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].hidden = true;
      state.tokens[i].hidden = true;
      i += 2;
    }
  }
}


var list = function list(state, startLine, endLine, silent) {
  var ch,
      contentStart,
      i,
      indent,
      indentAfterMarker,
      initial,
      isOrdered,
      itemLines,
      l,
      listLines,
      listTokIdx,
      markerCharCode,
      markerValue,
      max,
      nextLine,
      offset,
      oldListIndent,
      oldParentType,
      oldSCount,
      oldTShift,
      oldTight,
      pos,
      posAfterMarker,
      prevEmptyEnd,
      start,
      terminate,
      terminatorRules,
      token,
      isTerminatingParagraph = false,
      tight = true;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  // Special case:
  //  - item 1
  //   - item 2
  //    - item 3
  //     - item 4
  //      - this one is a paragraph continuation
  if (state.listIndent >= 0 &&
      state.sCount[startLine] - state.listIndent >= 4 &&
      state.sCount[startLine] < state.blkIndent) {
    return false;
  }

  // limit conditions when list can interrupt
  // a paragraph (validation mode only)
  if (silent && state.parentType === 'paragraph') {
    // Next list item should still terminate previous list item;
    //
    // This code can fail if plugins use blkIndent as well as lists,
    // but I hope the spec gets fixed long before that happens.
    //
    if (state.tShift[startLine] >= state.blkIndent) {
      isTerminatingParagraph = true;
    }
  }

  // Detect list type and position after marker
  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

    // If we're starting a new ordered list right after
    // a paragraph, it should start with 1.
    if (isTerminatingParagraph && markerValue !== 1) return false;

  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;

  } else {
    return false;
  }

  // If we're starting a new unordered list right after
  // a paragraph, first line should not be empty.
  if (isTerminatingParagraph) {
    if (state.skipSpaces(posAfterMarker) >= state.eMarks[startLine]) return false;
  }

  // We should terminate list on style change. Remember first one to compare.
  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // For validation mode we can terminate immediately
  if (silent) { return true; }

  // Start list
  listTokIdx = state.tokens.length;

  if (isOrdered) {
    token       = state.push('ordered_list_open', 'ol', 1);
    if (markerValue !== 1) {
      token.attrs = [ [ 'start', markerValue ] ];
    }

  } else {
    token       = state.push('bullet_list_open', 'ul', 1);
  }

  token.map    = listLines = [ startLine, 0 ];
  token.markup = String.fromCharCode(markerCharCode);

  //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.md.block.ruler.getRules('list');

  oldParentType = state.parentType;
  state.parentType = 'list';

  while (nextLine < endLine) {
    pos = posAfterMarker;
    max = state.eMarks[nextLine];

    initial = offset = state.sCount[nextLine] + posAfterMarker - (state.bMarks[startLine] + state.tShift[startLine]);

    while (pos < max) {
      ch = state.src.charCodeAt(pos);

      if (ch === 0x09) {
        offset += 4 - (offset + state.bsCount[nextLine]) % 4;
      } else if (ch === 0x20) {
        offset++;
      } else {
        break;
      }

      pos++;
    }

    contentStart = pos;

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = offset - initial;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) { indentAfterMarker = 1; }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    indent = initial + indentAfterMarker;

    // Run subparser & write tokens
    token        = state.push('list_item_open', 'li', 1);
    token.markup = String.fromCharCode(markerCharCode);
    token.map    = itemLines = [ startLine, 0 ];

    // change current state, then restore it after parser subcall
    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldSCount = state.sCount[startLine];

    //  - example list
    // ^ listIndent position will be here
    //   ^ blkIndent position will be here
    //
    oldListIndent = state.listIndent;
    state.listIndent = state.blkIndent;
    state.blkIndent = indent;

    state.tight = true;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.sCount[startLine] = offset;

    if (contentStart >= max && state.isEmpty(startLine + 1)) {
      // workaround for this case
      // (list item is empty, list terminates before "foo"):
      // ~~~~~~~~
      //   -
      //
      //     foo
      // ~~~~~~~~
      state.line = Math.min(state.line + 2, endLine);
    } else {
      state.md.block.tokenize(state, startLine, endLine, true);
    }

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = (state.line - startLine) > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = state.listIndent;
    state.listIndent = oldListIndent;
    state.tShift[startLine] = oldTShift;
    state.sCount[startLine] = oldSCount;
    state.tight = oldTight;

    token        = state.push('list_item_close', 'li', -1);
    token.markup = String.fromCharCode(markerCharCode);

    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) { break; }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.sCount[nextLine] < state.blkIndent) { break; }

    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) { break; }

    // fail if terminating block found
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) { break; }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) { break; }
  }

  // Finalize list
  if (isOrdered) {
    token = state.push('ordered_list_close', 'ol', -1);
  } else {
    token = state.push('bullet_list_close', 'ul', -1);
  }
  token.markup = String.fromCharCode(markerCharCode);

  listLines[1] = nextLine;
  state.line = nextLine;

  state.parentType = oldParentType;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};

var normalizeReference$3   = utils$1.normalizeReference;
var isSpace$f              = utils$1.isSpace;


var reference = function reference(state, startLine, _endLine, silent) {
  var ch,
      destEndPos,
      destEndLineNo,
      endLine,
      href,
      i,
      l,
      label,
      labelEnd,
      oldParentType,
      res,
      start,
      str,
      terminate,
      terminatorRules,
      title,
      lines = 0,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine],
      nextLine = startLine + 1;

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (state.src.charCodeAt(pos) !== 0x5B/* [ */) { return false; }

  // Simple check to quickly interrupt scan on [link](url) at the start of line.
  // Can be useful on practice: https://github.com/markdown-it/markdown-it/issues/54
  while (++pos < max) {
    if (state.src.charCodeAt(pos) === 0x5D /* ] */ &&
        state.src.charCodeAt(pos - 1) !== 0x5C/* \ */) {
      if (pos + 1 === max) { return false; }
      if (state.src.charCodeAt(pos + 1) !== 0x3A/* : */) { return false; }
      break;
    }
  }

  endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  terminatorRules = state.md.block.ruler.getRules('reference');

  oldParentType = state.parentType;
  state.parentType = 'reference';

  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  str = state.getLines(startLine, nextLine, state.blkIndent, false).trim();
  max = str.length;

  for (pos = 1; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x5B /* [ */) {
      return false;
    } else if (ch === 0x5D /* ] */) {
      labelEnd = pos;
      break;
    } else if (ch === 0x0A /* \n */) {
      lines++;
    } else if (ch === 0x5C /* \ */) {
      pos++;
      if (pos < max && str.charCodeAt(pos) === 0x0A) {
        lines++;
      }
    }
  }

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A/* : */) { return false; }

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace$f(ch)) ; else {
      break;
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  res = state.md.helpers.parseLinkDestination(str, pos, max);
  if (!res.ok) { return false; }

  href = state.md.normalizeLink(res.str);
  if (!state.md.validateLink(href)) { return false; }

  pos = res.pos;
  lines += res.lines;

  // save cursor state, we could require to rollback later
  destEndPos = pos;
  destEndLineNo = lines;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  start = pos;
  for (; pos < max; pos++) {
    ch = str.charCodeAt(pos);
    if (ch === 0x0A) {
      lines++;
    } else if (isSpace$f(ch)) ; else {
      break;
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  res = state.md.helpers.parseLinkTitle(str, pos, max);
  if (pos < max && start !== pos && res.ok) {
    title = res.str;
    pos = res.pos;
    lines += res.lines;
  } else {
    title = '';
    pos = destEndPos;
    lines = destEndLineNo;
  }

  // skip trailing spaces until the rest of the line
  while (pos < max) {
    ch = str.charCodeAt(pos);
    if (!isSpace$f(ch)) { break; }
    pos++;
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    if (title) {
      // garbage at the end of the line after title,
      // but it could still be a valid reference if we roll back
      title = '';
      pos = destEndPos;
      lines = destEndLineNo;
      while (pos < max) {
        ch = str.charCodeAt(pos);
        if (!isSpace$f(ch)) { break; }
        pos++;
      }
    }
  }

  if (pos < max && str.charCodeAt(pos) !== 0x0A) {
    // garbage at the end of the line
    return false;
  }

  label = normalizeReference$3(str.slice(1, labelEnd));
  if (!label) {
    // CommonMark 0.20 disallows empty labels
    return false;
  }

  // Reference can not terminate anything. This check is for safety only.
  /*istanbul ignore if*/
  if (silent) { return true; }

  if (typeof state.env.references === 'undefined') {
    state.env.references = {};
  }
  if (typeof state.env.references[label] === 'undefined') {
    state.env.references[label] = { title: title, href: href };
  }

  state.parentType = oldParentType;

  state.line = startLine + lines + 1;
  return true;
};

var isSpace$g = utils$1.isSpace;


var heading = function heading(state, startLine, endLine, silent) {
  var ch, level, tmp, token,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  ch  = state.src.charCodeAt(pos);

  if (ch !== 0x23/* # */ || pos >= max) { return false; }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23/* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || (pos < max && !isSpace$g(ch))) { return false; }

  if (silent) { return true; }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipSpacesBack(max, pos);
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && isSpace$g(state.src.charCodeAt(tmp - 1))) {
    max = tmp;
  }

  state.line = startLine + 1;

  token        = state.push('heading_open', 'h' + String(level), 1);
  token.markup = '########'.slice(0, level);
  token.map    = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = state.src.slice(pos, max).trim();
  token.map      = [ startLine, state.line ];
  token.children = [];

  token        = state.push('heading_close', 'h' + String(level), -1);
  token.markup = '########'.slice(0, level);

  return true;
};

// lheading (---, ===)


var lheading = function lheading(state, startLine, endLine/*, silent*/) {
  var content, terminate, i, l, token, pos, max, level, marker,
      nextLine = startLine + 1, oldParentType,
      terminatorRules = state.md.block.ruler.getRules('paragraph');

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  oldParentType = state.parentType;
  state.parentType = 'paragraph'; // use paragraph to match terminatorRules

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    //
    // Check for underline in setext header
    //
    if (state.sCount[nextLine] >= state.blkIndent) {
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];

      if (pos < max) {
        marker = state.src.charCodeAt(pos);

        if (marker === 0x2D/* - */ || marker === 0x3D/* = */) {
          pos = state.skipChars(pos, marker);
          pos = state.skipSpaces(pos);

          if (pos >= max) {
            level = (marker === 0x3D/* = */ ? 1 : 2);
            break;
          }
        }
      }
    }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  if (!level) {
    // Didn't find valid underline
    return false;
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine + 1;

  token          = state.push('heading_open', 'h' + String(level), 1);
  token.markup   = String.fromCharCode(marker);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line - 1 ];
  token.children = [];

  token          = state.push('heading_close', 'h' + String(level), -1);
  token.markup   = String.fromCharCode(marker);

  state.parentType = oldParentType;

  return true;
};

// List of valid html blocks names, accorting to commonmark spec


var html_blocks = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'meta',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

// Regexps to match html elements

var attr_name     = '[a-zA-Z_:][a-zA-Z0-9:._-]*';

var unquoted      = '[^"\'=<>`\\x00-\\x20]+';
var single_quoted = "'[^']*'";
var double_quoted = '"[^"]*"';

var attr_value  = '(?:' + unquoted + '|' + single_quoted + '|' + double_quoted + ')';

var attribute   = '(?:\\s+' + attr_name + '(?:\\s*=\\s*' + attr_value + ')?)';

var open_tag    = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';

var close_tag   = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment     = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing  = '<[?].*?[?]>';
var declaration = '<![A-Z]+\\s+[^>]*>';
var cdata       = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

var HTML_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + '|' + comment +
                        '|' + processing + '|' + declaration + '|' + cdata + ')');
var HTML_OPEN_CLOSE_TAG_RE = new RegExp('^(?:' + open_tag + '|' + close_tag + ')');

var HTML_TAG_RE_1 = HTML_TAG_RE;
var HTML_OPEN_CLOSE_TAG_RE_1 = HTML_OPEN_CLOSE_TAG_RE;

var html_re = {
	HTML_TAG_RE: HTML_TAG_RE_1,
	HTML_OPEN_CLOSE_TAG_RE: HTML_OPEN_CLOSE_TAG_RE_1
};

var HTML_OPEN_CLOSE_TAG_RE$1 = html_re.HTML_OPEN_CLOSE_TAG_RE;

// An array of opening and corresponding closing sequences for html tags,
// last argument defines whether it can terminate a paragraph or not
//
var HTML_SEQUENCES = [
  [ /^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true ],
  [ /^<!--/,        /-->/,   true ],
  [ /^<\?/,         /\?>/,   true ],
  [ /^<![A-Z]/,     />/,     true ],
  [ /^<!\[CDATA\[/, /\]\]>/, true ],
  [ new RegExp('^</?(' + html_blocks.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true ],
  [ new RegExp(HTML_OPEN_CLOSE_TAG_RE$1.source + '\\s*$'),  /^$/, false ]
];


var html_block = function html_block(state, startLine, endLine, silent) {
  var i, nextLine, token, lineText,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // if it's indented more than 3 spaces, it should be a code block
  if (state.sCount[startLine] - state.blkIndent >= 4) { return false; }

  if (!state.md.options.html) { return false; }

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  lineText = state.src.slice(pos, max);

  for (i = 0; i < HTML_SEQUENCES.length; i++) {
    if (HTML_SEQUENCES[i][0].test(lineText)) { break; }
  }

  if (i === HTML_SEQUENCES.length) { return false; }

  if (silent) {
    // true if this sequence can be a terminator, false otherwise
    return HTML_SEQUENCES[i][2];
  }

  nextLine = startLine + 1;

  // If we are here - we detected HTML block.
  // Let's roll down till block end.
  if (!HTML_SEQUENCES[i][1].test(lineText)) {
    for (; nextLine < endLine; nextLine++) {
      if (state.sCount[nextLine] < state.blkIndent) { break; }

      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      lineText = state.src.slice(pos, max);

      if (HTML_SEQUENCES[i][1].test(lineText)) {
        if (lineText.length !== 0) { nextLine++; }
        break;
      }
    }
  }

  state.line = nextLine;

  token         = state.push('html_block', '', 0);
  token.map     = [ startLine, nextLine ];
  token.content = state.getLines(startLine, nextLine, state.blkIndent, true);

  return true;
};

// Paragraph


var paragraph = function paragraph(state, startLine/*, endLine*/) {
  var content, terminate, i, l, token, oldParentType,
      nextLine = startLine + 1,
      terminatorRules = state.md.block.ruler.getRules('paragraph'),
      endLine = state.lineMax;

  oldParentType = state.parentType;
  state.parentType = 'paragraph';

  // jump line-by-line until empty one or EOF
  for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
    // this would be a code block normally, but after paragraph
    // it's considered a lazy continuation regardless of what's there
    if (state.sCount[nextLine] - state.blkIndent > 3) { continue; }

    // quirk for blockquotes, this line should already be checked by that rule
    if (state.sCount[nextLine] < 0) { continue; }

    // Some tags can terminate paragraph without empty line.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) { break; }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;

  token          = state.push('paragraph_open', 'p', 1);
  token.map      = [ startLine, state.line ];

  token          = state.push('inline', '', 0);
  token.content  = content;
  token.map      = [ startLine, state.line ];
  token.children = [];

  token          = state.push('paragraph_close', 'p', -1);

  state.parentType = oldParentType;

  return true;
};

var isSpace$h = utils$1.isSpace;


function StateBlock$1(src, md, env, tokens) {
  var ch, s, start, pos, len, indent, offset, indent_found;

  this.src = src;

  // link to parser instance
  this.md     = md;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = [];  // line begin offsets for fast jumps
  this.eMarks = [];  // line end offsets for fast jumps
  this.tShift = [];  // offsets of the first non-space characters (tabs not expanded)
  this.sCount = [];  // indents for each line (tabs expanded)

  // An amount of virtual spaces (tabs expanded) between beginning
  // of each line (bMarks) and real beginning of that line.
  //
  // It exists only as a hack because blockquotes override bMarks
  // losing information in the process.
  //
  // It's used only when expanding tabs, you can think about it as
  // an initial tab length, e.g. bsCount=21 applied to string `\t123`
  // means first tab should be expanded to 4-21%4 === 3 spaces.
  //
  this.bsCount = [];

  // block parser variables
  this.blkIndent  = 0; // required block content indent (for example, if we are
                       // inside a list, it would be positioned after list marker)
  this.line       = 0; // line index in src
  this.lineMax    = 0; // lines count
  this.tight      = false;  // loose/tight mode for lists
  this.ddIndent   = -1; // indent of the current dd block (-1 if there isn't any)
  this.listIndent = -1; // indent of the current list block (-1 if there isn't any)

  // can be 'blockquote', 'list', 'root', 'paragraph' or 'reference'
  // used in lists to determine if they interrupt a paragraph
  this.parentType = 'root';

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent_found = false;

  for (start = pos = indent = offset = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (isSpace$h(ch)) {
        indent++;

        if (ch === 0x09) {
          offset += 4 - offset % 4;
        } else {
          offset++;
        }
        continue;
      } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) { pos++; }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);
      this.sCount.push(offset);
      this.bsCount.push(0);

      indent_found = false;
      indent = 0;
      offset = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);
  this.sCount.push(0);
  this.bsCount.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

// Push new token to "stream".
//
StateBlock$1.prototype.push = function (type, tag, nesting) {
  var token = new token$1(type, tag, nesting);
  token.block = true;

  if (nesting < 0) this.level--; // closing tag
  token.level = this.level;
  if (nesting > 0) this.level++; // opening tag

  this.tokens.push(token);
  return token;
};

StateBlock$1.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock$1.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock$1.prototype.skipSpaces = function skipSpaces(pos) {
  var ch;

  for (var max = this.src.length; pos < max; pos++) {
    ch = this.src.charCodeAt(pos);
    if (!isSpace$h(ch)) { break; }
  }
  return pos;
};

// Skip spaces from given position in reverse.
StateBlock$1.prototype.skipSpacesBack = function skipSpacesBack(pos, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (!isSpace$h(this.src.charCodeAt(--pos))) { return pos + 1; }
  }
  return pos;
};

// Skip char codes from given position
StateBlock$1.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) { break; }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock$1.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) { return pos; }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) { return pos + 1; }
  }
  return pos;
};

// cut lines range from source.
StateBlock$1.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i, lineIndent, ch, first, last, queue, lineStart,
      line = begin;

  if (begin >= end) {
    return '';
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    lineIndent = 0;
    lineStart = first = this.bMarks[line];

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    while (first < last && lineIndent < indent) {
      ch = this.src.charCodeAt(first);

      if (isSpace$h(ch)) {
        if (ch === 0x09) {
          lineIndent += 4 - (lineIndent + this.bsCount[line]) % 4;
        } else {
          lineIndent++;
        }
      } else if (first - lineStart < this.tShift[line]) {
        // patched tShift masked characters to look like spaces (blockquotes, list markers)
        lineIndent++;
      } else {
        break;
      }

      first++;
    }

    if (lineIndent > indent) {
      // partially expanding tabs in code blocks, e.g '\t\tfoobar'
      // with indent=2 becomes '  \tfoobar'
      queue[i] = new Array(lineIndent - indent + 1).join(' ') + this.src.slice(first, last);
    } else {
      queue[i] = this.src.slice(first, last);
    }
  }

  return queue.join('');
};

// re-export Token class to use in block rules
StateBlock$1.prototype.Token = token$1;


var state_block = StateBlock$1;

var _rules$1 = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  [ 'table',      table,      [ 'paragraph', 'reference' ] ],
  [ 'code',       code ],
  [ 'fence',      fence,      [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'blockquote', blockquote, [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'hr',         hr,         [ 'paragraph', 'reference', 'blockquote', 'list' ] ],
  [ 'list',       list,       [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'reference',  reference ],
  [ 'heading',    heading,    [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'lheading',   lheading ],
  [ 'html_block', html_block, [ 'paragraph', 'reference', 'blockquote' ] ],
  [ 'paragraph',  paragraph ]
];


/**
 * new ParserBlock()
 **/
function ParserBlock() {
  /**
   * ParserBlock#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of block rules.
   **/
  this.ruler = new ruler();

  for (var i = 0; i < _rules$1.length; i++) {
    this.ruler.push(_rules$1[i][0], _rules$1[i][1], { alt: (_rules$1[i][2] || []).slice() });
  }
}


// Generate tokens for input range
//
ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      line = startLine,
      hasEmptyLines = false,
      maxNesting = state.md.options.maxNesting;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) { break; }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.sCount[line] < state.blkIndent) { break; }

    // If nesting level exceeded - skip tail to the end. That's not ordinary
    // situation and we should not care about content.
    if (state.level >= maxNesting) {
      state.line = endLine;
      break;
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) { break; }
    }

    // set state.tight if we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;
      state.line = line;
    }
  }
};


/**
 * ParserBlock.parse(str, md, env, outTokens)
 *
 * Process input string and push block tokens into `outTokens`
 **/
ParserBlock.prototype.parse = function (src, md, env, outTokens) {
  var state;

  if (!src) { return; }

  state = new this.State(src, md, env, outTokens);

  this.tokenize(state, state.line, state.lineMax);
};


ParserBlock.prototype.State = state_block;


var parser_block = ParserBlock;

// Skip text characters for text token, place those to pending buffer


// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

// !, ", #, $, %, &, ', (, ), *, +, ,, -, ., /, :, ;, <, =, >, ?, @, [, \, ], ^, _, `, {, |, }, or ~

// !!!! Don't confuse with "Markdown ASCII Punctuation" chars
// http://spec.commonmark.org/0.15/#ascii-punctuation-character
function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A/* \n */:
    case 0x21/* ! */:
    case 0x23/* # */:
    case 0x24/* $ */:
    case 0x25/* % */:
    case 0x26/* & */:
    case 0x2A/* * */:
    case 0x2B/* + */:
    case 0x2D/* - */:
    case 0x3A/* : */:
    case 0x3C/* < */:
    case 0x3D/* = */:
    case 0x3E/* > */:
    case 0x40/* @ */:
    case 0x5B/* [ */:
    case 0x5C/* \ */:
    case 0x5D/* ] */:
    case 0x5E/* ^ */:
    case 0x5F/* _ */:
    case 0x60/* ` */:
    case 0x7B/* { */:
    case 0x7D/* } */:
    case 0x7E/* ~ */:
      return true;
    default:
      return false;
  }
}

var text = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) { return false; }

  if (!silent) { state.pending += state.src.slice(state.pos, pos); }

  state.pos = pos;

  return true;
};

var isSpace$i = utils$1.isSpace;


var newline = function newline(state, silent) {
  var pmax, max, pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A/* \n */) { return false; }

  pmax = state.pending.length - 1;
  max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        state.pending = state.pending.replace(/ +$/, '');
        state.push('hardbreak', 'br', 0);
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push('softbreak', 'br', 0);
      }

    } else {
      state.push('softbreak', 'br', 0);
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && isSpace$i(state.src.charCodeAt(pos))) { pos++; }

  state.pos = pos;
  return true;
};

var isSpace$j = utils$1.isSpace;

var ESCAPED$1 = [];

for (var i$1 = 0; i$1 < 256; i$1++) { ESCAPED$1.push(0); }

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'
  .split('').forEach(function (ch) { ESCAPED$1[ch.charCodeAt(0)] = 1; });


var _escape = function escape(state, silent) {
  var ch, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C/* \ */) { return false; }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED$1[ch] !== 0) {
      if (!silent) { state.pending += state.src[pos]; }
      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push('hardbreak', 'br', 0);
      }

      pos++;
      // skip leading whitespaces from next line
      while (pos < max) {
        ch = state.src.charCodeAt(pos);
        if (!isSpace$j(ch)) { break; }
        pos++;
      }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) { state.pending += '\\'; }
  state.pos++;
  return true;
};

// Parse backticks

var backticks = function backtick(state, silent) {
  var start, max, marker, matchStart, matchEnd, token,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60/* ` */) { return false; }

  start = pos;
  pos++;
  max = state.posMax;

  while (pos < max && state.src.charCodeAt(pos) === 0x60/* ` */) { pos++; }

  marker = state.src.slice(start, pos);

  matchStart = matchEnd = pos;

  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60/* ` */) { matchEnd++; }

    if (matchEnd - matchStart === marker.length) {
      if (!silent) {
        token         = state.push('code_inline', 'code', 0);
        token.markup  = marker;
        token.content = state.src.slice(pos, matchStart)
          .replace(/\n/g, ' ')
          .replace(/^ (.+) $/, '$1');
      }
      state.pos = matchEnd;
      return true;
    }
  }

  if (!silent) { state.pending += marker; }
  state.pos += marker.length;
  return true;
};

// ~~strike through~~


// Insert each marker as a separate text token, and add it to delimiter list
//
var tokenize = function strikethrough(state, silent) {
  var i, scanned, token, len, ch,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x7E/* ~ */) { return false; }

  scanned = state.scanDelims(state.pos, true);
  len = scanned.length;
  ch = String.fromCharCode(marker);

  if (len < 2) { return false; }

  if (len % 2) {
    token         = state.push('text', '', 0);
    token.content = ch;
    len--;
  }

  for (i = 0; i < len; i += 2) {
    token         = state.push('text', '', 0);
    token.content = ch + ch;

    state.delimiters.push({
      marker: marker,
      length: 0, // disable "rule of 3" length checks meant for emphasis
      jump:   i,
      token:  state.tokens.length - 1,
      end:    -1,
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


function postProcess(state, delimiters) {
  var i, j,
      startDelim,
      endDelim,
      token,
      loneMarkers = [],
      max = delimiters.length;

  for (i = 0; i < max; i++) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x7E/* ~ */) {
      continue;
    }

    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    token         = state.tokens[startDelim.token];
    token.type    = 's_open';
    token.tag     = 's';
    token.nesting = 1;
    token.markup  = '~~';
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = 's_close';
    token.tag     = 's';
    token.nesting = -1;
    token.markup  = '~~';
    token.content = '';

    if (state.tokens[endDelim.token - 1].type === 'text' &&
        state.tokens[endDelim.token - 1].content === '~') {

      loneMarkers.push(endDelim.token - 1);
    }
  }

  // If a marker sequence has an odd number of characters, it's splitted
  // like this: `~~~~~` -> `~` + `~~` + `~~`, leaving one marker at the
  // start of the sequence.
  //
  // So, we have to move all those markers after subsequent s_close tags.
  //
  while (loneMarkers.length) {
    i = loneMarkers.pop();
    j = i + 1;

    while (j < state.tokens.length && state.tokens[j].type === 's_close') {
      j++;
    }

    j--;

    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
}


// Walk through delimiter list and replace text tokens with tags
//
var postProcess_1 = function strikethrough(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  postProcess(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess(state, tokens_meta[curr].delimiters);
    }
  }
};

var strikethrough = {
	tokenize: tokenize,
	postProcess: postProcess_1
};

// Process *this* and _that_


// Insert each marker as a separate text token, and add it to delimiter list
//
var tokenize$1 = function emphasis(state, silent) {
  var i, scanned, token,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (silent) { return false; }

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) { return false; }

  scanned = state.scanDelims(state.pos, marker === 0x2A);

  for (i = 0; i < scanned.length; i++) {
    token         = state.push('text', '', 0);
    token.content = String.fromCharCode(marker);

    state.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: marker,

      // Total length of these series of delimiters.
      //
      length: scanned.length,

      // An amount of characters before this one that's equivalent to
      // current one. In plain English: if this delimiter does not open
      // an emphasis, neither do previous `jump` characters.
      //
      // Used to skip sequences like "*****" in one step, for 1st asterisk
      // value will be 0, for 2nd it's 1 and so on.
      //
      jump:   i,

      // A position of the token this delimiter corresponds to.
      //
      token:  state.tokens.length - 1,

      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end:    -1,

      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open:   scanned.can_open,
      close:  scanned.can_close
    });
  }

  state.pos += scanned.length;

  return true;
};


function postProcess$1(state, delimiters) {
  var i,
      startDelim,
      endDelim,
      token,
      ch,
      isStrong,
      max = delimiters.length;

  for (i = max - 1; i >= 0; i--) {
    startDelim = delimiters[i];

    if (startDelim.marker !== 0x5F/* _ */ && startDelim.marker !== 0x2A/* * */) {
      continue;
    }

    // Process only opening markers
    if (startDelim.end === -1) {
      continue;
    }

    endDelim = delimiters[startDelim.end];

    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    //
    // `<em><em>whatever</em></em>` -> `<strong>whatever</strong>`
    //
    isStrong = i > 0 &&
               delimiters[i - 1].end === startDelim.end + 1 &&
               delimiters[i - 1].token === startDelim.token - 1 &&
               delimiters[startDelim.end + 1].token === endDelim.token + 1 &&
               delimiters[i - 1].marker === startDelim.marker;

    ch = String.fromCharCode(startDelim.marker);

    token         = state.tokens[startDelim.token];
    token.type    = isStrong ? 'strong_open' : 'em_open';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = 1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    token         = state.tokens[endDelim.token];
    token.type    = isStrong ? 'strong_close' : 'em_close';
    token.tag     = isStrong ? 'strong' : 'em';
    token.nesting = -1;
    token.markup  = isStrong ? ch + ch : ch;
    token.content = '';

    if (isStrong) {
      state.tokens[delimiters[i - 1].token].content = '';
      state.tokens[delimiters[startDelim.end + 1].token].content = '';
      i--;
    }
  }
}


// Walk through delimiter list and replace text tokens with tags
//
var postProcess_1$1 = function emphasis(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  postProcess$1(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      postProcess$1(state, tokens_meta[curr].delimiters);
    }
  }
};

var emphasis = {
	tokenize: tokenize$1,
	postProcess: postProcess_1$1
};

var normalizeReference$4   = utils$1.normalizeReference;
var isSpace$k              = utils$1.isSpace;


var link = function link(state, silent) {
  var attrs,
      code,
      label,
      labelEnd,
      labelStart,
      pos,
      res,
      ref,
      title,
      token,
      href = '',
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      parseReference = true;

  if (state.src.charCodeAt(state.pos) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 1;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos, true);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // might have found a valid shortcut link, disable reference parsing
    parseReference = false;

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace$k(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace$k(code) && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace$k(code) && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      // parsing a valid shortcut link failed, fallback to reference
      parseReference = true;
    }
    pos++;
  }

  if (parseReference) {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference$4(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    token        = state.push('link_open', 'a', 1);
    token.attrs  = attrs = [ [ 'href', href ] ];
    if (title) {
      attrs.push([ 'title', title ]);
    }

    state.md.inline.tokenize(state);

    token        = state.push('link_close', 'a', -1);
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

var normalizeReference$5   = utils$1.normalizeReference;
var isSpace$l              = utils$1.isSpace;


var image$2 = function image(state, silent) {
  var attrs,
      code,
      content,
      label,
      labelEnd,
      labelStart,
      pos,
      ref,
      res,
      title,
      token,
      tokens,
      start,
      href = '',
      oldPos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(state.pos) !== 0x21/* ! */) { return false; }
  if (state.src.charCodeAt(state.pos + 1) !== 0x5B/* [ */) { return false; }

  labelStart = state.pos + 2;
  labelEnd = state.md.helpers.parseLinkLabel(state, state.pos + 1, false);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) { return false; }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28/* ( */) {
    //
    // Inline link
    //

    // [link](  <href>  "title"  )
    //        ^^ skipping these spaces
    pos++;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace$l(code) && code !== 0x0A) { break; }
    }
    if (pos >= max) { return false; }

    // [link](  <href>  "title"  )
    //          ^^^^^^ parsing link destination
    start = pos;
    res = state.md.helpers.parseLinkDestination(state.src, pos, state.posMax);
    if (res.ok) {
      href = state.md.normalizeLink(res.str);
      if (state.md.validateLink(href)) {
        pos = res.pos;
      } else {
        href = '';
      }
    }

    // [link](  <href>  "title"  )
    //                ^^ skipping these spaces
    start = pos;
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (!isSpace$l(code) && code !== 0x0A) { break; }
    }

    // [link](  <href>  "title"  )
    //                  ^^^^^^^ parsing link title
    res = state.md.helpers.parseLinkTitle(state.src, pos, state.posMax);
    if (pos < max && start !== pos && res.ok) {
      title = res.str;
      pos = res.pos;

      // [link](  <href>  "title"  )
      //                         ^^ skipping these spaces
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (!isSpace$l(code) && code !== 0x0A) { break; }
      }
    } else {
      title = '';
    }

    if (pos >= max || state.src.charCodeAt(pos) !== 0x29/* ) */) {
      state.pos = oldPos;
      return false;
    }
    pos++;
  } else {
    //
    // Link reference
    //
    if (typeof state.env.references === 'undefined') { return false; }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B/* [ */) {
      start = pos + 1;
      pos = state.md.helpers.parseLinkLabel(state, pos);
      if (pos >= 0) {
        label = state.src.slice(start, pos++);
      } else {
        pos = labelEnd + 1;
      }
    } else {
      pos = labelEnd + 1;
    }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) { label = state.src.slice(labelStart, labelEnd); }

    ref = state.env.references[normalizeReference$5(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    content = state.src.slice(labelStart, labelEnd);

    state.md.inline.parse(
      content,
      state.md,
      state.env,
      tokens = []
    );

    token          = state.push('image', 'img', 0);
    token.attrs    = attrs = [ [ 'src', href ], [ 'alt', '' ] ];
    token.children = tokens;
    token.content  = content;

    if (title) {
      attrs.push([ 'title', title ]);
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

// Process autolinks '<protocol:...>'


/*eslint max-len:0*/
var EMAIL_RE    = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var AUTOLINK_RE = /^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;


var autolink = function autolink(state, silent) {
  var tail, linkMatch, emailMatch, url, fullUrl, token,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C/* < */) { return false; }

  tail = state.src.slice(pos);

  if (tail.indexOf('>') < 0) { return false; }

  if (AUTOLINK_RE.test(tail)) {
    linkMatch = tail.match(AUTOLINK_RE);

    url = linkMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink(url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += linkMatch[0].length;
    return true;
  }

  if (EMAIL_RE.test(tail)) {
    emailMatch = tail.match(EMAIL_RE);

    url = emailMatch[0].slice(1, -1);
    fullUrl = state.md.normalizeLink('mailto:' + url);
    if (!state.md.validateLink(fullUrl)) { return false; }

    if (!silent) {
      token         = state.push('link_open', 'a', 1);
      token.attrs   = [ [ 'href', fullUrl ] ];
      token.markup  = 'autolink';
      token.info    = 'auto';

      token         = state.push('text', '', 0);
      token.content = state.md.normalizeLinkText(url);

      token         = state.push('link_close', 'a', -1);
      token.markup  = 'autolink';
      token.info    = 'auto';
    }

    state.pos += emailMatch[0].length;
    return true;
  }

  return false;
};

var HTML_TAG_RE$1 = html_re.HTML_TAG_RE;


function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return (lc >= 0x61/* a */) && (lc <= 0x7a/* z */);
}


var html_inline = function html_inline(state, silent) {
  var ch, match, max, token,
      pos = state.pos;

  if (!state.md.options.html) { return false; }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C/* < */ ||
      pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21/* ! */ &&
      ch !== 0x3F/* ? */ &&
      ch !== 0x2F/* / */ &&
      !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE$1);
  if (!match) { return false; }

  if (!silent) {
    token         = state.push('html_inline', '', 0);
    token.content = state.src.slice(pos, pos + match[0].length);
  }
  state.pos += match[0].length;
  return true;
};

var has$1               = utils$1.has;
var isValidEntityCode$1 = utils$1.isValidEntityCode;
var fromCodePoint$1     = utils$1.fromCodePoint;


var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i;
var NAMED_RE   = /^&([a-z][a-z0-9]{1,31});/i;


var entity = function entity(state, silent) {
  var ch, code, match, pos = state.pos, max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26/* & */) { return false; }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23 /* # */) {
      match = state.src.slice(pos).match(DIGITAL_RE);
      if (match) {
        if (!silent) {
          code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
          state.pending += isValidEntityCode$1(code) ? fromCodePoint$1(code) : fromCodePoint$1(0xFFFD);
        }
        state.pos += match[0].length;
        return true;
      }
    } else {
      match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        if (has$1(entities$1, match[1])) {
          if (!silent) { state.pending += entities$1[match[1]]; }
          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) { state.pending += '&'; }
  state.pos++;
  return true;
};

// For each opening emphasis-like marker find a matching closing one


function processDelimiters(state, delimiters) {
  var closerIdx, openerIdx, closer, opener, minOpenerIdx, newMinOpenerIdx,
      isOddMatch, lastJump,
      openersBottom = {},
      max = delimiters.length;

  for (closerIdx = 0; closerIdx < max; closerIdx++) {
    closer = delimiters[closerIdx];

    // Length is only used for emphasis-specific "rule of 3",
    // if it's not defined (in strikethrough or 3rd party plugins),
    // we can default it to 0 to disable those checks.
    //
    closer.length = closer.length || 0;

    if (!closer.close) continue;

    // Previously calculated lower bounds (previous fails)
    // for each marker and each delimiter length modulo 3.
    if (!openersBottom.hasOwnProperty(closer.marker)) {
      openersBottom[closer.marker] = [ -1, -1, -1 ];
    }

    minOpenerIdx = openersBottom[closer.marker][closer.length % 3];
    newMinOpenerIdx = -1;

    openerIdx = closerIdx - closer.jump - 1;

    for (; openerIdx > minOpenerIdx; openerIdx -= opener.jump + 1) {
      opener = delimiters[openerIdx];

      if (opener.marker !== closer.marker) continue;

      if (newMinOpenerIdx === -1) newMinOpenerIdx = openerIdx;

      if (opener.open &&
          opener.end < 0 &&
          opener.level === closer.level) {

        isOddMatch = false;

        // from spec:
        //
        // If one of the delimiters can both open and close emphasis, then the
        // sum of the lengths of the delimiter runs containing the opening and
        // closing delimiters must not be a multiple of 3 unless both lengths
        // are multiples of 3.
        //
        if (opener.close || closer.open) {
          if ((opener.length + closer.length) % 3 === 0) {
            if (opener.length % 3 !== 0 || closer.length % 3 !== 0) {
              isOddMatch = true;
            }
          }
        }

        if (!isOddMatch) {
          // If previous delimiter cannot be an opener, we can safely skip
          // the entire sequence in future checks. This is required to make
          // sure algorithm has linear complexity (see *_*_*_*_*_... case).
          //
          lastJump = openerIdx > 0 && !delimiters[openerIdx - 1].open ?
            delimiters[openerIdx - 1].jump + 1 :
            0;

          closer.jump  = closerIdx - openerIdx + lastJump;
          closer.open  = false;
          opener.end   = closerIdx;
          opener.jump  = lastJump;
          opener.close = false;
          newMinOpenerIdx = -1;
          break;
        }
      }
    }

    if (newMinOpenerIdx !== -1) {
      // If match for this delimiter run failed, we want to set lower bound for
      // future lookups. This is required to make sure algorithm has linear
      // complexity.
      //
      // See details here:
      // https://github.com/commonmark/cmark/issues/178#issuecomment-270417442
      //
      openersBottom[closer.marker][(closer.length || 0) % 3] = newMinOpenerIdx;
    }
  }
}


var balance_pairs = function link_pairs(state) {
  var curr,
      tokens_meta = state.tokens_meta,
      max = state.tokens_meta.length;

  processDelimiters(state, state.delimiters);

  for (curr = 0; curr < max; curr++) {
    if (tokens_meta[curr] && tokens_meta[curr].delimiters) {
      processDelimiters(state, tokens_meta[curr].delimiters);
    }
  }
};

// Clean up tokens after emphasis and strikethrough postprocessing:


var text_collapse = function text_collapse(state) {
  var curr, last,
      level = 0,
      tokens = state.tokens,
      max = state.tokens.length;

  for (curr = last = 0; curr < max; curr++) {
    // re-calculate levels after emphasis/strikethrough turns some text nodes
    // into opening/closing tags
    if (tokens[curr].nesting < 0) level--; // closing tag
    tokens[curr].level = level;
    if (tokens[curr].nesting > 0) level++; // opening tag

    if (tokens[curr].type === 'text' &&
        curr + 1 < max &&
        tokens[curr + 1].type === 'text') {

      // collapse two adjacent text nodes
      tokens[curr + 1].content = tokens[curr].content + tokens[curr + 1].content;
    } else {
      if (curr !== last) { tokens[last] = tokens[curr]; }

      last++;
    }
  }

  if (curr !== last) {
    tokens.length = last;
  }
};

var isWhiteSpace$3   = utils$1.isWhiteSpace;
var isPunctChar$3    = utils$1.isPunctChar;
var isMdAsciiPunct$3 = utils$1.isMdAsciiPunct;


function StateInline$1(src, md, env, outTokens) {
  this.src = src;
  this.env = env;
  this.md = md;
  this.tokens = outTokens;
  this.tokens_meta = Array(outTokens.length);

  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).
  this.cache = {};

  // List of emphasis-like delimiters for current tag
  this.delimiters = [];

  // Stack of delimiter lists for upper level tags
  this._prev_delimiters = [];
}


// Flush pending text
//
StateInline$1.prototype.pushPending = function () {
  var token = new token$1('text', '', 0);
  token.content = this.pending;
  token.level = this.pendingLevel;
  this.tokens.push(token);
  this.pending = '';
  return token;
};


// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline$1.prototype.push = function (type, tag, nesting) {
  if (this.pending) {
    this.pushPending();
  }

  var token = new token$1(type, tag, nesting);
  var token_meta = null;

  if (nesting < 0) {
    // closing tag
    this.level--;
    this.delimiters = this._prev_delimiters.pop();
  }

  token.level = this.level;

  if (nesting > 0) {
    // opening tag
    this.level++;
    this._prev_delimiters.push(this.delimiters);
    this.delimiters = [];
    token_meta = { delimiters: this.delimiters };
  }

  this.pendingLevel = this.level;
  this.tokens.push(token);
  this.tokens_meta.push(token_meta);
  return token;
};


// Scan a sequence of emphasis-like markers, and determine whether
// it can start an emphasis sequence or end an emphasis sequence.
//
//  - start - position to scan from (it should point at a valid marker);
//  - canSplitWord - determine if these markers can be found inside a word
//
StateInline$1.prototype.scanDelims = function (start, canSplitWord) {
  var pos = start, lastChar, nextChar, count, can_open, can_close,
      isLastWhiteSpace, isLastPunctChar,
      isNextWhiteSpace, isNextPunctChar,
      left_flanking = true,
      right_flanking = true,
      max = this.posMax,
      marker = this.src.charCodeAt(start);

  // treat beginning of the line as a whitespace
  lastChar = start > 0 ? this.src.charCodeAt(start - 1) : 0x20;

  while (pos < max && this.src.charCodeAt(pos) === marker) { pos++; }

  count = pos - start;

  // treat end of the line as a whitespace
  nextChar = pos < max ? this.src.charCodeAt(pos) : 0x20;

  isLastPunctChar = isMdAsciiPunct$3(lastChar) || isPunctChar$3(String.fromCharCode(lastChar));
  isNextPunctChar = isMdAsciiPunct$3(nextChar) || isPunctChar$3(String.fromCharCode(nextChar));

  isLastWhiteSpace = isWhiteSpace$3(lastChar);
  isNextWhiteSpace = isWhiteSpace$3(nextChar);

  if (isNextWhiteSpace) {
    left_flanking = false;
  } else if (isNextPunctChar) {
    if (!(isLastWhiteSpace || isLastPunctChar)) {
      left_flanking = false;
    }
  }

  if (isLastWhiteSpace) {
    right_flanking = false;
  } else if (isLastPunctChar) {
    if (!(isNextWhiteSpace || isNextPunctChar)) {
      right_flanking = false;
    }
  }

  if (!canSplitWord) {
    can_open  = left_flanking  && (!right_flanking || isLastPunctChar);
    can_close = right_flanking && (!left_flanking  || isNextPunctChar);
  } else {
    can_open  = left_flanking;
    can_close = right_flanking;
  }

  return {
    can_open:  can_open,
    can_close: can_close,
    length:    count
  };
};


// re-export Token class to use in block rules
StateInline$1.prototype.Token = token$1;


var state_inline = StateInline$1;

////////////////////////////////////////////////////////////////////////////////
// Parser rules

var _rules$2 = [
  [ 'text',            text ],
  [ 'newline',         newline ],
  [ 'escape',          _escape ],
  [ 'backticks',       backticks ],
  [ 'strikethrough',   strikethrough.tokenize ],
  [ 'emphasis',        emphasis.tokenize ],
  [ 'link',            link ],
  [ 'image',           image$2 ],
  [ 'autolink',        autolink ],
  [ 'html_inline',     html_inline ],
  [ 'entity',          entity ]
];

var _rules2 = [
  [ 'balance_pairs',   balance_pairs ],
  [ 'strikethrough',   strikethrough.postProcess ],
  [ 'emphasis',        emphasis.postProcess ],
  [ 'text_collapse',   text_collapse ]
];


/**
 * new ParserInline()
 **/
function ParserInline() {
  var i;

  /**
   * ParserInline#ruler -> Ruler
   *
   * [[Ruler]] instance. Keep configuration of inline rules.
   **/
  this.ruler = new ruler();

  for (i = 0; i < _rules$2.length; i++) {
    this.ruler.push(_rules$2[i][0], _rules$2[i][1]);
  }

  /**
   * ParserInline#ruler2 -> Ruler
   *
   * [[Ruler]] instance. Second ruler used for post-processing
   * (e.g. in emphasis-like rules).
   **/
  this.ruler2 = new ruler();

  for (i = 0; i < _rules2.length; i++) {
    this.ruler2.push(_rules2[i][0], _rules2[i][1]);
  }
}


// Skip single token by running all rules in validation mode;
// returns `true` if any rule reported success
//
ParserInline.prototype.skipToken = function (state) {
  var ok, i, pos = state.pos,
      rules = this.ruler.getRules(''),
      len = rules.length,
      maxNesting = state.md.options.maxNesting,
      cache = state.cache;


  if (typeof cache[pos] !== 'undefined') {
    state.pos = cache[pos];
    return;
  }

  if (state.level < maxNesting) {
    for (i = 0; i < len; i++) {
      // Increment state.level and decrement it later to limit recursion.
      // It's harmless to do here, because no tokens are created. But ideally,
      // we'd need a separate private state variable for this purpose.
      //
      state.level++;
      ok = rules[i](state, true);
      state.level--;

      if (ok) { break; }
    }
  } else {
    // Too much nesting, just skip until the end of the paragraph.
    //
    // NOTE: this will cause links to behave incorrectly in the following case,
    //       when an amount of `[` is exactly equal to `maxNesting + 1`:
    //
    //       [[[[[[[[[[[[[[[[[[[[[foo]()
    //
    // TODO: remove this workaround when CM standard will allow nested links
    //       (we can replace it by preventing links from being parsed in
    //       validation mode)
    //
    state.pos = state.posMax;
  }

  if (!ok) { state.pos++; }
  cache[pos] = state.pos;
};


// Generate tokens for input range
//
ParserInline.prototype.tokenize = function (state) {
  var ok, i,
      rules = this.ruler.getRules(''),
      len = rules.length,
      end = state.posMax,
      maxNesting = state.md.options.maxNesting;

  while (state.pos < end) {
    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true

    if (state.level < maxNesting) {
      for (i = 0; i < len; i++) {
        ok = rules[i](state, false);
        if (ok) { break; }
      }
    }

    if (ok) {
      if (state.pos >= end) { break; }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};


/**
 * ParserInline.parse(str, md, env, outTokens)
 *
 * Process input string and push inline tokens into `outTokens`
 **/
ParserInline.prototype.parse = function (str, md, env, outTokens) {
  var i, rules, len;
  var state = new this.State(str, md, env, outTokens);

  this.tokenize(state);

  rules = this.ruler2.getRules('');
  len = rules.length;

  for (i = 0; i < len; i++) {
    rules[i](state);
  }
};


ParserInline.prototype.State = state_inline;


var parser_inline = ParserInline;

var re = function (opts) {
  var re = {};

  // Use direct extract instead of `regenerate` to reduse browserified size
  re.src_Any = regex$1.source;
  re.src_Cc  = regex$2.source;
  re.src_Z   = regex$4.source;
  re.src_P   = regex.source;

  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

  // \p{\Z\Cc} (white spaces + control)
  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

  // Experimental. List of chars, completely prohibited in links
  // because can separate it from other part of text
  var text_separators = '[><\uff5c]';

  // All possible word characters (everything without punctuation, spaces & controls)
  // Defined via punctuation & spaces to save space
  // Should be something like \p{\L\N\S\M} (\w but without `_`)
  re.src_pseudo_letter       = '(?:(?!' + text_separators + '|' + re.src_ZPCc + ')' + re.src_Any + ')';
  // The same as abothe but without [0-9]
  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

  ////////////////////////////////////////////////////////////////////////////////

  re.src_ip4 =

    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

  re.src_port =

    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

  re.src_host_terminator =

    '(?=$|' + text_separators + '|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

  re.src_path =

    '(?:' +
      '[/?#]' +
        '(?:' +
          '(?!' + re.src_ZCc + '|' + text_separators + '|[()[\\]{}.,"\'?!\\-]).|' +
          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
          '\\.{2,4}[a-zA-Z0-9%/]|' + // github has ... in commit range links,
                                     // google has .... in links (issue #66)
                                     // Restrict to
                                     // - english
                                     // - percent-encoded
                                     // - parts of file path
                                     // until more examples found.
          '\\.(?!' + re.src_ZCc + '|[.]).|' +
          (opts && opts['---'] ?
            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
            :
            '\\-+|'
          ) +
          '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
          '\\!(?!' + re.src_ZCc + '|[!]).|' +
          '\\?(?!' + re.src_ZCc + '|[?]).' +
        ')+' +
      '|\\/' +
    ')?';

  // Allow anything in markdown spec, forbid quote (") at the first position
  // because emails enclosed in quotes are far more common
  re.src_email_name =

    '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*';

  re.src_xn =

    'xn--[a-z0-9\\-]{1,59}';

  // More to read about domain names
  // http://serverfault.com/questions/638260/

  re.src_domain_root =

    // Allow letters & digits (http://test1)
    '(?:' +
      re.src_xn +
      '|' +
      re.src_pseudo_letter + '{1,63}' +
    ')';

  re.src_domain =

    '(?:' +
      re.src_xn +
      '|' +
      '(?:' + re.src_pseudo_letter + ')' +
      '|' +
      '(?:' + re.src_pseudo_letter + '(?:-|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
    ')';

  re.src_host =

    '(?:' +
    // Don't need IP check, because digits are already allowed in normal domain names
    //   src_ip4 +
    // '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
    ')';

  re.tpl_host_fuzzy =

    '(?:' +
      re.src_ip4 +
    '|' +
      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
    ')';

  re.tpl_host_no_ip_fuzzy =

    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

  re.src_host_strict =

    re.src_host + re.src_host_terminator;

  re.tpl_host_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_host_terminator;

  re.src_host_port_strict =

    re.src_host + re.src_port + re.src_host_terminator;

  re.tpl_host_port_fuzzy_strict =

    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

  re.tpl_host_port_no_ip_fuzzy_strict =

    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


  ////////////////////////////////////////////////////////////////////////////////
  // Main rules

  // Rude test fuzzy links by host, for quick deny
  re.tpl_host_fuzzy_test =

    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

  re.tpl_email_fuzzy =

      '(^|' + text_separators + '|"|\\(|' + re.src_ZCc + ')' +
      '(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

  re.tpl_link_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

  re.tpl_link_no_ip_fuzzy =
      // Fuzzy link can't be prepended with .:/\- and non punctuation.
      // but can start with > (markdown blockquote)
      '(^|(?![.:/\\-_@])(?:[$+<=>^`|\uff5c]|' + re.src_ZPCc + '))' +
      '((?![$+<=>^`|\uff5c])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

  return re;
};

////////////////////////////////////////////////////////////////////////////////
// Helpers

// Merge objects
//
function assign$2(obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) { return; }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

function _class(obj) { return Object.prototype.toString.call(obj); }
function isString(obj) { return _class(obj) === '[object String]'; }
function isObject(obj) { return _class(obj) === '[object Object]'; }
function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
function isFunction(obj) { return _class(obj) === '[object Function]'; }


function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

////////////////////////////////////////////////////////////////////////////////


var defaultOptions = {
  fuzzyLink: true,
  fuzzyEmail: true,
  fuzzyIP: false
};


function isOptionsObj(obj) {
  return Object.keys(obj || {}).reduce(function (acc, k) {
    return acc || defaultOptions.hasOwnProperty(k);
  }, false);
}


var defaultSchemas = {
  'http:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.http) {
        // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.http =  new RegExp(
          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
        );
      }
      if (self.re.http.test(tail)) {
        return tail.match(self.re.http)[0].length;
      }
      return 0;
    }
  },
  'https:':  'http:',
  'ftp:':    'http:',
  '//':      {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.no_http) {
      // compile lazily, because "host"-containing variables can change on tlds update.
        self.re.no_http =  new RegExp(
          '^' +
          self.re.src_auth +
          // Don't allow single-level domains, because of false positives like '//test'
          // with code comments
          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
          self.re.src_port +
          self.re.src_host_terminator +
          self.re.src_path,

          'i'
        );
      }

      if (self.re.no_http.test(tail)) {
        // should not be `://` & `///`, that protects from errors in protocol name
        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
        return tail.match(self.re.no_http)[0].length;
      }
      return 0;
    }
  },
  'mailto:': {
    validate: function (text, pos, self) {
      var tail = text.slice(pos);

      if (!self.re.mailto) {
        self.re.mailto =  new RegExp(
          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
        );
      }
      if (self.re.mailto.test(tail)) {
        return tail.match(self.re.mailto)[0].length;
      }
      return 0;
    }
  }
};

/*eslint-disable max-len*/

// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

/*eslint-enable max-len*/

////////////////////////////////////////////////////////////////////////////////

function resetScanCache(self) {
  self.__index__ = -1;
  self.__text_cache__   = '';
}

function createValidator(re) {
  return function (text, pos) {
    var tail = text.slice(pos);

    if (re.test(tail)) {
      return tail.match(re)[0].length;
    }
    return 0;
  };
}

function createNormalizer() {
  return function (match, self) {
    self.normalize(match);
  };
}

// Schemas compiler. Build regexps.
//
function compile(self) {

  // Load & clone RE patterns.
  var re$1 = self.re = re(self.__opts__);

  // Define dynamic patterns
  var tlds = self.__tlds__.slice();

  self.onCompile();

  if (!self.__tlds_replaced__) {
    tlds.push(tlds_2ch_src_re);
  }
  tlds.push(re$1.src_xn);

  re$1.src_tlds = tlds.join('|');

  function untpl(tpl) { return tpl.replace('%TLDS%', re$1.src_tlds); }

  re$1.email_fuzzy      = RegExp(untpl(re$1.tpl_email_fuzzy), 'i');
  re$1.link_fuzzy       = RegExp(untpl(re$1.tpl_link_fuzzy), 'i');
  re$1.link_no_ip_fuzzy = RegExp(untpl(re$1.tpl_link_no_ip_fuzzy), 'i');
  re$1.host_fuzzy_test  = RegExp(untpl(re$1.tpl_host_fuzzy_test), 'i');

  //
  // Compile each schema
  //

  var aliases = [];

  self.__compiled__ = {}; // Reset compiled data

  function schemaError(name, val) {
    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
  }

  Object.keys(self.__schemas__).forEach(function (name) {
    var val = self.__schemas__[name];

    // skip disabled methods
    if (val === null) { return; }

    var compiled = { validate: null, link: null };

    self.__compiled__[name] = compiled;

    if (isObject(val)) {
      if (isRegExp(val.validate)) {
        compiled.validate = createValidator(val.validate);
      } else if (isFunction(val.validate)) {
        compiled.validate = val.validate;
      } else {
        schemaError(name, val);
      }

      if (isFunction(val.normalize)) {
        compiled.normalize = val.normalize;
      } else if (!val.normalize) {
        compiled.normalize = createNormalizer();
      } else {
        schemaError(name, val);
      }

      return;
    }

    if (isString(val)) {
      aliases.push(name);
      return;
    }

    schemaError(name, val);
  });

  //
  // Compile postponed aliases
  //

  aliases.forEach(function (alias) {
    if (!self.__compiled__[self.__schemas__[alias]]) {
      // Silently fail on missed schemas to avoid errons on disable.
      // schemaError(alias, self.__schemas__[alias]);
      return;
    }

    self.__compiled__[alias].validate =
      self.__compiled__[self.__schemas__[alias]].validate;
    self.__compiled__[alias].normalize =
      self.__compiled__[self.__schemas__[alias]].normalize;
  });

  //
  // Fake record for guessed links
  //
  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

  //
  // Build schema condition
  //
  var slist = Object.keys(self.__compiled__)
                      .filter(function (name) {
                        // Filter disabled & fake schemas
                        return name.length > 0 && self.__compiled__[name];
                      })
                      .map(escapeRE)
                      .join('|');
  // (?!_) cause 1.5x slowdown
  self.re.schema_test   = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'i');
  self.re.schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + re$1.src_ZPCc + '))(' + slist + ')', 'ig');

  self.re.pretest = RegExp(
    '(' + self.re.schema_test.source + ')|(' + self.re.host_fuzzy_test.source + ')|@',
    'i'
  );

  //
  // Cleanup
  //

  resetScanCache(self);
}

/**
 * class Match
 *
 * Match result. Single element of array, returned by [[LinkifyIt#match]]
 **/
function Match(self, shift) {
  var start = self.__index__,
      end   = self.__last_index__,
      text  = self.__text_cache__.slice(start, end);

  /**
   * Match#schema -> String
   *
   * Prefix (protocol) for matched string.
   **/
  this.schema    = self.__schema__.toLowerCase();
  /**
   * Match#index -> Number
   *
   * First position of matched string.
   **/
  this.index     = start + shift;
  /**
   * Match#lastIndex -> Number
   *
   * Next position after matched string.
   **/
  this.lastIndex = end + shift;
  /**
   * Match#raw -> String
   *
   * Matched string.
   **/
  this.raw       = text;
  /**
   * Match#text -> String
   *
   * Notmalized text of matched string.
   **/
  this.text      = text;
  /**
   * Match#url -> String
   *
   * Normalized url of matched string.
   **/
  this.url       = text;
}

function createMatch(self, shift) {
  var match = new Match(self, shift);

  self.__compiled__[match.schema].normalize(match, self);

  return match;
}


/**
 * class LinkifyIt
 **/

/**
 * new LinkifyIt(schemas, options)
 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Creates new linkifier instance with optional additional schemas.
 * Can be called without `new` keyword for convenience.
 *
 * By default understands:
 *
 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
 * - "fuzzy" links and emails (example.com, foo@bar.com).
 *
 * `schemas` is an object, where each key/value describes protocol/rule:
 *
 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
 *   for example). `linkify-it` makes shure that prefix is not preceeded with
 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
 * - __value__ - rule to check tail after link prefix
 *   - _String_ - just alias to existing rule
 *   - _Object_
 *     - _validate_ - validator function (should return matched length on success),
 *       or `RegExp`.
 *     - _normalize_ - optional function to normalize text & url of matched result
 *       (for example, for @twitter mentions).
 *
 * `options`:
 *
 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
 *   like version numbers. Default `false`.
 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
 *
 **/
function LinkifyIt(schemas, options) {
  if (!(this instanceof LinkifyIt)) {
    return new LinkifyIt(schemas, options);
  }

  if (!options) {
    if (isOptionsObj(schemas)) {
      options = schemas;
      schemas = {};
    }
  }

  this.__opts__           = assign$2({}, defaultOptions, options);

  // Cache last tested result. Used to skip repeating steps on next `match` call.
  this.__index__          = -1;
  this.__last_index__     = -1; // Next scan position
  this.__schema__         = '';
  this.__text_cache__     = '';

  this.__schemas__        = assign$2({}, defaultSchemas, schemas);
  this.__compiled__       = {};

  this.__tlds__           = tlds_default;
  this.__tlds_replaced__  = false;

  this.re = {};

  compile(this);
}


/** chainable
 * LinkifyIt#add(schema, definition)
 * - schema (String): rule name (fixed pattern prefix)
 * - definition (String|RegExp|Object): schema definition
 *
 * Add new rule definition. See constructor description for details.
 **/
LinkifyIt.prototype.add = function add(schema, definition) {
  this.__schemas__[schema] = definition;
  compile(this);
  return this;
};


/** chainable
 * LinkifyIt#set(options)
 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
 *
 * Set recognition options for links without schema.
 **/
LinkifyIt.prototype.set = function set(options) {
  this.__opts__ = assign$2(this.__opts__, options);
  return this;
};


/**
 * LinkifyIt#test(text) -> Boolean
 *
 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
 **/
LinkifyIt.prototype.test = function test(text) {
  // Reset scan cache
  this.__text_cache__ = text;
  this.__index__      = -1;

  if (!text.length) { return false; }

  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

  // try to scan for link with schema - that's the most simple rule
  if (this.re.schema_test.test(text)) {
    re = this.re.schema_search;
    re.lastIndex = 0;
    while ((m = re.exec(text)) !== null) {
      len = this.testSchemaAt(text, m[2], re.lastIndex);
      if (len) {
        this.__schema__     = m[2];
        this.__index__      = m.index + m[1].length;
        this.__last_index__ = m.index + m[0].length + len;
        break;
      }
    }
  }

  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
    // guess schemaless links
    tld_pos = text.search(this.re.host_fuzzy_test);
    if (tld_pos >= 0) {
      // if tld is located after found link - no need to check fuzzy pattern
      if (this.__index__ < 0 || tld_pos < this.__index__) {
        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

          shift = ml.index + ml[1].length;

          if (this.__index__ < 0 || shift < this.__index__) {
            this.__schema__     = '';
            this.__index__      = shift;
            this.__last_index__ = ml.index + ml[0].length;
          }
        }
      }
    }
  }

  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
    // guess schemaless emails
    at_pos = text.indexOf('@');
    if (at_pos >= 0) {
      // We can't skip this check, because this cases are possible:
      // 192.168.1.1@gmail.com, my.in@example.com
      if ((me = text.match(this.re.email_fuzzy)) !== null) {

        shift = me.index + me[1].length;
        next  = me.index + me[0].length;

        if (this.__index__ < 0 || shift < this.__index__ ||
            (shift === this.__index__ && next > this.__last_index__)) {
          this.__schema__     = 'mailto:';
          this.__index__      = shift;
          this.__last_index__ = next;
        }
      }
    }
  }

  return this.__index__ >= 0;
};


/**
 * LinkifyIt#pretest(text) -> Boolean
 *
 * Very quick check, that can give false positives. Returns true if link MAY BE
 * can exists. Can be used for speed optimization, when you need to check that
 * link NOT exists.
 **/
LinkifyIt.prototype.pretest = function pretest(text) {
  return this.re.pretest.test(text);
};


/**
 * LinkifyIt#testSchemaAt(text, name, position) -> Number
 * - text (String): text to scan
 * - name (String): rule (schema) name
 * - position (Number): text offset to check from
 *
 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
 * at given position. Returns length of found pattern (0 on fail).
 **/
LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
  // If not supported schema check requested - terminate
  if (!this.__compiled__[schema.toLowerCase()]) {
    return 0;
  }
  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
};


/**
 * LinkifyIt#match(text) -> Array|null
 *
 * Returns array of found link descriptions or `null` on fail. We strongly
 * recommend to use [[LinkifyIt#test]] first, for best speed.
 *
 * ##### Result match description
 *
 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
 *   protocol-neutral  links.
 * - __index__ - offset of matched text
 * - __lastIndex__ - index of next char after mathch end
 * - __raw__ - matched text
 * - __text__ - normalized text
 * - __url__ - link, generated from matched text
 **/
LinkifyIt.prototype.match = function match(text) {
  var shift = 0, result = [];

  // Try to take previous element from cache, if .test() called before
  if (this.__index__ >= 0 && this.__text_cache__ === text) {
    result.push(createMatch(this, shift));
    shift = this.__last_index__;
  }

  // Cut head if cache was used
  var tail = shift ? text.slice(shift) : text;

  // Scan string until end reached
  while (this.test(tail)) {
    result.push(createMatch(this, shift));

    tail = tail.slice(this.__last_index__);
    shift += this.__last_index__;
  }

  if (result.length) {
    return result;
  }

  return null;
};


/** chainable
 * LinkifyIt#tlds(list [, keepOld]) -> this
 * - list (Array): list of tlds
 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
 *
 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
 * to avoid false positives. By default this algorythm used:
 *
 * - hostname with any 2-letter root zones are ok.
 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
 *   are ok.
 * - encoded (`xn--...`) root zones are ok.
 *
 * If list is replaced, then exact match for 2-chars root zones will be checked.
 **/
LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
  list = Array.isArray(list) ? list : [ list ];

  if (!keepOld) {
    this.__tlds__ = list.slice();
    this.__tlds_replaced__ = true;
    compile(this);
    return this;
  }

  this.__tlds__ = this.__tlds__.concat(list)
                                  .sort()
                                  .filter(function (el, idx, arr) {
                                    return el !== arr[idx - 1];
                                  })
                                  .reverse();

  compile(this);
  return this;
};

/**
 * LinkifyIt#normalize(match)
 *
 * Default normalizer (if schema does not define it's own).
 **/
LinkifyIt.prototype.normalize = function normalize(match) {

  // Do minimal possible changes by default. Need to collect feedback prior
  // to move forward https://github.com/markdown-it/linkify-it/issues/1

  if (!match.schema) { match.url = 'http://' + match.url; }

  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
    match.url = 'mailto:' + match.url;
  }
};


/**
 * LinkifyIt#onCompile()
 *
 * Override to modify basic RegExp-s.
 **/
LinkifyIt.prototype.onCompile = function onCompile() {
};


var linkifyIt = LinkifyIt;

// markdown-it default options


var _default = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   100            // Internal protection, recursion limit
  },

  components: {

    core: {},
    block: {},
    inline: {}
  }
};

// "Zero" preset, with nothing enabled. Useful for manual configuring of simple


var zero = {
  options: {
    html:         false,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'text'
      ],
      rules2: [
        'balance_pairs',
        'text_collapse'
      ]
    }
  }
};

// Commonmark default options


var commonmark = {
  options: {
    html:         true,         // Enable HTML tags in source
    xhtmlOut:     true,         // Use '/' to close single tags (<br />)
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      false,        // autoconvert URL-like texts to links

    // Enable some language-neutral replacements + quotes beautification
    typographer:  false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '\u201c\u201d\u2018\u2019', /* “”‘’ */

    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting:   20            // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: [
        'normalize',
        'block',
        'inline'
      ]
    },

    block: {
      rules: [
        'blockquote',
        'code',
        'fence',
        'heading',
        'hr',
        'html_block',
        'lheading',
        'list',
        'reference',
        'paragraph'
      ]
    },

    inline: {
      rules: [
        'autolink',
        'backticks',
        'emphasis',
        'entity',
        'escape',
        'html_inline',
        'image',
        'link',
        'newline',
        'text'
      ],
      rules2: [
        'balance_pairs',
        'emphasis',
        'text_collapse'
      ]
    }
  }
};

var config = {
  'default': _default,
  zero: zero,
  commonmark: commonmark
};

////////////////////////////////////////////////////////////////////////////////
//
// This validator can prohibit more than really needed to prevent XSS. It's a
// tradeoff to keep code simple and to be secure by default.
//
// If you need different setup - override validator method as you wish. Or
// replace it with dummy function and use external sanitizer.
//

var BAD_PROTO_RE = /^(vbscript|javascript|file|data):/;
var GOOD_DATA_RE = /^data:image\/(gif|png|jpeg|webp);/;

function validateLink(url) {
  // url should be normalized at this point, and existing entities are decoded
  var str = url.trim().toLowerCase();

  return BAD_PROTO_RE.test(str) ? (GOOD_DATA_RE.test(str) ? true : false) : true;
}

////////////////////////////////////////////////////////////////////////////////


var RECODE_HOSTNAME_FOR = [ 'http:', 'https:', 'mailto:' ];

function normalizeLink(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toASCII(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.encode(mdurl.format(parsed));
}

function normalizeLinkText(url) {
  var parsed = mdurl.parse(url, true);

  if (parsed.hostname) {
    // Encode hostnames in urls like:
    // `http://host/`, `https://host/`, `mailto:user@host`, `//host/`
    //
    // We don't encode unknown schemas, because it's likely that we encode
    // something we shouldn't (e.g. `skype:name` treated as `skype:host`)
    //
    if (!parsed.protocol || RECODE_HOSTNAME_FOR.indexOf(parsed.protocol) >= 0) {
      try {
        parsed.hostname = punycode.toUnicode(parsed.hostname);
      } catch (er) { /**/ }
    }
  }

  return mdurl.decode(mdurl.format(parsed));
}


/**
 * class MarkdownIt
 *
 * Main parser/renderer class.
 *
 * ##### Usage
 *
 * ```javascript
 * // node.js, "classic" way:
 * var MarkdownIt = require('markdown-it'),
 *     md = new MarkdownIt();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // node.js, the same, but with sugar:
 * var md = require('markdown-it')();
 * var result = md.render('# markdown-it rulezz!');
 *
 * // browser without AMD, added to "window" on script load
 * // Note, there are no dash.
 * var md = window.markdownit();
 * var result = md.render('# markdown-it rulezz!');
 * ```
 *
 * Single line rendering, without paragraph wrap:
 *
 * ```javascript
 * var md = require('markdown-it')();
 * var result = md.renderInline('__markdown-it__ rulezz!');
 * ```
 **/

/**
 * new MarkdownIt([presetName, options])
 * - presetName (String): optional, `commonmark` / `zero`
 * - options (Object)
 *
 * Creates parser instanse with given config. Can be called without `new`.
 *
 * ##### presetName
 *
 * MarkdownIt provides named presets as a convenience to quickly
 * enable/disable active syntax rules and options for common use cases.
 *
 * - ["commonmark"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/commonmark.js) -
 *   configures parser to strict [CommonMark](http://commonmark.org/) mode.
 * - [default](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/default.js) -
 *   similar to GFM, used when no preset name given. Enables all available rules,
 *   but still without html, typographer & autolinker.
 * - ["zero"](https://github.com/markdown-it/markdown-it/blob/master/lib/presets/zero.js) -
 *   all rules disabled. Useful to quickly setup your config via `.enable()`.
 *   For example, when you need only `bold` and `italic` markup and nothing else.
 *
 * ##### options:
 *
 * - __html__ - `false`. Set `true` to enable HTML tags in source. Be careful!
 *   That's not safe! You may need external sanitizer to protect output from XSS.
 *   It's better to extend features via plugins, instead of enabling HTML.
 * - __xhtmlOut__ - `false`. Set `true` to add '/' when closing single tags
 *   (`<br />`). This is needed only for full CommonMark compatibility. In real
 *   world you will need HTML output.
 * - __breaks__ - `false`. Set `true` to convert `\n` in paragraphs into `<br>`.
 * - __langPrefix__ - `language-`. CSS language class prefix for fenced blocks.
 *   Can be useful for external highlighters.
 * - __linkify__ - `false`. Set `true` to autoconvert URL-like text to links.
 * - __typographer__  - `false`. Set `true` to enable [some language-neutral
 *   replacement](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js) +
 *   quotes beautification (smartquotes).
 * - __quotes__ - `“”‘’`, String or Array. Double + single quotes replacement
 *   pairs, when typographer enabled and smartquotes on. For example, you can
 *   use `'«»„“'` for Russian, `'„“‚‘'` for German, and
 *   `['«\xA0', '\xA0»', '‹\xA0', '\xA0›']` for French (including nbsp).
 * - __highlight__ - `null`. Highlighter function for fenced code blocks.
 *   Highlighter `function (str, lang)` should return escaped HTML. It can also
 *   return empty string if the source was not changed and should be escaped
 *   externaly. If result starts with <pre... internal wrapper is skipped.
 *
 * ##### Example
 *
 * ```javascript
 * // commonmark mode
 * var md = require('markdown-it')('commonmark');
 *
 * // default mode
 * var md = require('markdown-it')();
 *
 * // enable everything
 * var md = require('markdown-it')({
 *   html: true,
 *   linkify: true,
 *   typographer: true
 * });
 * ```
 *
 * ##### Syntax highlighting
 *
 * ```js
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return hljs.highlight(lang, str, true).value;
 *       } catch (__) {}
 *     }
 *
 *     return ''; // use external default escaping
 *   }
 * });
 * ```
 *
 * Or with full wrapper override (if you need assign class to `<pre>`):
 *
 * ```javascript
 * var hljs = require('highlight.js') // https://highlightjs.org/
 *
 * // Actual default values
 * var md = require('markdown-it')({
 *   highlight: function (str, lang) {
 *     if (lang && hljs.getLanguage(lang)) {
 *       try {
 *         return '<pre class="hljs"><code>' +
 *                hljs.highlight(lang, str, true).value +
 *                '</code></pre>';
 *       } catch (__) {}
 *     }
 *
 *     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
 *   }
 * });
 * ```
 *
 **/
function MarkdownIt(presetName, options) {
  if (!(this instanceof MarkdownIt)) {
    return new MarkdownIt(presetName, options);
  }

  if (!options) {
    if (!utils$1.isString(presetName)) {
      options = presetName || {};
      presetName = 'default';
    }
  }

  /**
   * MarkdownIt#inline -> ParserInline
   *
   * Instance of [[ParserInline]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.inline = new parser_inline();

  /**
   * MarkdownIt#block -> ParserBlock
   *
   * Instance of [[ParserBlock]]. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.block = new parser_block();

  /**
   * MarkdownIt#core -> Core
   *
   * Instance of [[Core]] chain executor. You may need it to add new rules when
   * writing plugins. For simple rules control use [[MarkdownIt.disable]] and
   * [[MarkdownIt.enable]].
   **/
  this.core = new parser_core();

  /**
   * MarkdownIt#renderer -> Renderer
   *
   * Instance of [[Renderer]]. Use it to modify output look. Or to add rendering
   * rules for new token types, generated by plugins.
   *
   * ##### Example
   *
   * ```javascript
   * var md = require('markdown-it')();
   *
   * function myToken(tokens, idx, options, env, self) {
   *   //...
   *   return result;
   * };
   *
   * md.renderer.rules['my_token'] = myToken
   * ```
   *
   * See [[Renderer]] docs and [source code](https://github.com/markdown-it/markdown-it/blob/master/lib/renderer.js).
   **/
  this.renderer = new renderer();

  /**
   * MarkdownIt#linkify -> LinkifyIt
   *
   * [linkify-it](https://github.com/markdown-it/linkify-it) instance.
   * Used by [linkify](https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/linkify.js)
   * rule.
   **/
  this.linkify = new linkifyIt();

  /**
   * MarkdownIt#validateLink(url) -> Boolean
   *
   * Link validation function. CommonMark allows too much in links. By default
   * we disable `javascript:`, `vbscript:`, `file:` schemas, and almost all `data:...` schemas
   * except some embedded image types.
   *
   * You can change this behaviour:
   *
   * ```javascript
   * var md = require('markdown-it')();
   * // enable everything
   * md.validateLink = function () { return true; }
   * ```
   **/
  this.validateLink = validateLink;

  /**
   * MarkdownIt#normalizeLink(url) -> String
   *
   * Function used to encode link url to a machine-readable format,
   * which includes url-encoding, punycode, etc.
   **/
  this.normalizeLink = normalizeLink;

  /**
   * MarkdownIt#normalizeLinkText(url) -> String
   *
   * Function used to decode link url to a human-readable format`
   **/
  this.normalizeLinkText = normalizeLinkText;


  // Expose utils & helpers for easy acces from plugins

  /**
   * MarkdownIt#utils -> utils
   *
   * Assorted utility functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/common/utils.js).
   **/
  this.utils = utils$1;

  /**
   * MarkdownIt#helpers -> helpers
   *
   * Link components parser functions, useful to write plugins. See details
   * [here](https://github.com/markdown-it/markdown-it/blob/master/lib/helpers).
   **/
  this.helpers = utils$1.assign({}, helpers);


  this.options = {};
  this.configure(presetName);

  if (options) { this.set(options); }
}


/** chainable
 * MarkdownIt.set(options)
 *
 * Set parser options (in the same format as in constructor). Probably, you
 * will never need it, but you can change options after constructor call.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .set({ html: true, breaks: true })
 *             .set({ typographer, true });
 * ```
 *
 * __Note:__ To achieve the best possible performance, don't modify a
 * `markdown-it` instance options on the fly. If you need multiple configurations
 * it's best to create multiple instances and initialize each with separate
 * config.
 **/
MarkdownIt.prototype.set = function (options) {
  utils$1.assign(this.options, options);
  return this;
};


/** chainable, internal
 * MarkdownIt.configure(presets)
 *
 * Batch load of all options and compenent settings. This is internal method,
 * and you probably will not need it. But if you with - see available presets
 * and data structure [here](https://github.com/markdown-it/markdown-it/tree/master/lib/presets)
 *
 * We strongly recommend to use presets instead of direct config loads. That
 * will give better compatibility with next versions.
 **/
MarkdownIt.prototype.configure = function (presets) {
  var self = this, presetName;

  if (utils$1.isString(presets)) {
    presetName = presets;
    presets = config[presetName];
    if (!presets) { throw new Error('Wrong `markdown-it` preset "' + presetName + '", check name'); }
  }

  if (!presets) { throw new Error('Wrong `markdown-it` preset, can\'t be empty'); }

  if (presets.options) { self.set(presets.options); }

  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enableOnly(presets.components[name].rules);
      }
      if (presets.components[name].rules2) {
        self[name].ruler2.enableOnly(presets.components[name].rules2);
      }
    });
  }
  return this;
};


/** chainable
 * MarkdownIt.enable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to enable
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * Enable list or rules. It will automatically find appropriate components,
 * containing rules with given names. If rule not found, and `ignoreInvalid`
 * not set - throws exception.
 *
 * ##### Example
 *
 * ```javascript
 * var md = require('markdown-it')()
 *             .enable(['sub', 'sup'])
 *             .disable('smartquotes');
 * ```
 **/
MarkdownIt.prototype.enable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.enable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.enable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to enable unknown rule(s): ' + missed);
  }

  return this;
};


/** chainable
 * MarkdownIt.disable(list, ignoreInvalid)
 * - list (String|Array): rule name or list of rule names to disable.
 * - ignoreInvalid (Boolean): set `true` to ignore errors when rule not found.
 *
 * The same as [[MarkdownIt.enable]], but turn specified rules off.
 **/
MarkdownIt.prototype.disable = function (list, ignoreInvalid) {
  var result = [];

  if (!Array.isArray(list)) { list = [ list ]; }

  [ 'core', 'block', 'inline' ].forEach(function (chain) {
    result = result.concat(this[chain].ruler.disable(list, true));
  }, this);

  result = result.concat(this.inline.ruler2.disable(list, true));

  var missed = list.filter(function (name) { return result.indexOf(name) < 0; });

  if (missed.length && !ignoreInvalid) {
    throw new Error('MarkdownIt. Failed to disable unknown rule(s): ' + missed);
  }
  return this;
};


/** chainable
 * MarkdownIt.use(plugin, params)
 *
 * Load specified plugin with given params into current parser instance.
 * It's just a sugar to call `plugin(md, params)` with curring.
 *
 * ##### Example
 *
 * ```javascript
 * var iterator = require('markdown-it-for-inline');
 * var md = require('markdown-it')()
 *             .use(iterator, 'foo_replace', 'text', function (tokens, idx) {
 *               tokens[idx].content = tokens[idx].content.replace(/foo/g, 'bar');
 *             });
 * ```
 **/
MarkdownIt.prototype.use = function (plugin /*, params, ... */) {
  var args = [ this ].concat(Array.prototype.slice.call(arguments, 1));
  plugin.apply(plugin, args);
  return this;
};


/** internal
 * MarkdownIt.parse(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Parse input string and returns list of block tokens (special token type
 * "inline" will contain list of inline tokens). You should not call this
 * method directly, until you write custom renderer (for example, to produce
 * AST).
 *
 * `env` is used to pass data between "distributed" rules and return additional
 * metadata like reference info, needed for the renderer. It also can be used to
 * inject data in specific cases. Usually, you will be ok to pass `{}`,
 * and then pass updated object to renderer.
 **/
MarkdownIt.prototype.parse = function (src, env) {
  if (typeof src !== 'string') {
    throw new Error('Input data should be a String');
  }

  var state = new this.core.State(src, this, env);

  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.render(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Render markdown string into html. It does all magic for you :).
 *
 * `env` can be used to inject additional metadata (`{}` by default).
 * But you will not need it with high probability. See also comment
 * in [[MarkdownIt.parse]].
 **/
MarkdownIt.prototype.render = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parse(src, env), this.options, env);
};


/** internal
 * MarkdownIt.parseInline(src, env) -> Array
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * The same as [[MarkdownIt.parse]] but skip all block rules. It returns the
 * block tokens list with the single `inline` element, containing parsed inline
 * tokens in `children` property. Also updates `env` object.
 **/
MarkdownIt.prototype.parseInline = function (src, env) {
  var state = new this.core.State(src, this, env);

  state.inlineMode = true;
  this.core.process(state);

  return state.tokens;
};


/**
 * MarkdownIt.renderInline(src [, env]) -> String
 * - src (String): source string
 * - env (Object): environment sandbox
 *
 * Similar to [[MarkdownIt.render]] but for single paragraph content. Result
 * will NOT be wrapped into `<p>` tags.
 **/
MarkdownIt.prototype.renderInline = function (src, env) {
  env = env || {};

  return this.renderer.render(this.parseInline(src, env), this.options, env);
};


var lib = MarkdownIt;

var markdownIt = lib;

// ::Schema Document schema for the data model used by CommonMark.
var schema = new Schema({
  nodes: {
    doc: {
      content: "block+"
    },

    paragraph: {
      content: "inline*",
      group: "block",
      parseDOM: [{tag: "p"}],
      toDOM: function toDOM() { return ["p", 0] }
    },

    blockquote: {
      content: "block+",
      group: "block",
      parseDOM: [{tag: "blockquote"}],
      toDOM: function toDOM() { return ["blockquote", 0] }
    },

    horizontal_rule: {
      group: "block",
      parseDOM: [{tag: "hr"}],
      toDOM: function toDOM() { return ["div", ["hr"]] }
    },

    heading: {
      attrs: {level: {default: 1}},
      content: "(text | image)*",
      group: "block",
      defining: true,
      parseDOM: [{tag: "h1", attrs: {level: 1}},
                 {tag: "h2", attrs: {level: 2}},
                 {tag: "h3", attrs: {level: 3}},
                 {tag: "h4", attrs: {level: 4}},
                 {tag: "h5", attrs: {level: 5}},
                 {tag: "h6", attrs: {level: 6}}],
      toDOM: function toDOM(node) { return ["h" + node.attrs.level, 0] }
    },

    code_block: {
      content: "text*",
      group: "block",
      code: true,
      defining: true,
      marks: "",
      attrs: {params: {default: ""}},
      parseDOM: [{tag: "pre", preserveWhitespace: "full", getAttrs: function (node) { return (
        {params: node.getAttribute("data-params") || ""}
      ); }}],
      toDOM: function toDOM(node) { return ["pre", node.attrs.params ? {"data-params": node.attrs.params} : {}, ["code", 0]] }
    },

    ordered_list: {
      content: "list_item+",
      group: "block",
      attrs: {order: {default: 1}, tight: {default: false}},
      parseDOM: [{tag: "ol", getAttrs: function getAttrs(dom) {
        return {order: dom.hasAttribute("start") ? +dom.getAttribute("start") : 1,
                tight: dom.hasAttribute("data-tight")}
      }}],
      toDOM: function toDOM(node) {
        return ["ol", {start: node.attrs.order == 1 ? null : node.attrs.order,
                       "data-tight": node.attrs.tight ? "true" : null}, 0]
      }
    },

    bullet_list: {
      content: "list_item+",
      group: "block",
      attrs: {tight: {default: false}},
      parseDOM: [{tag: "ul", getAttrs: function (dom) { return ({tight: dom.hasAttribute("data-tight")}); }}],
      toDOM: function toDOM(node) { return ["ul", {"data-tight": node.attrs.tight ? "true" : null}, 0] }
    },

    list_item: {
      content: "paragraph block*",
      defining: true,
      parseDOM: [{tag: "li"}],
      toDOM: function toDOM() { return ["li", 0] }
    },

    text: {
      group: "inline"
    },

    image: {
      inline: true,
      attrs: {
        src: {},
        alt: {default: null},
        title: {default: null}
      },
      group: "inline",
      draggable: true,
      parseDOM: [{tag: "img[src]", getAttrs: function getAttrs(dom) {
        return {
          src: dom.getAttribute("src"),
          title: dom.getAttribute("title"),
          alt: dom.getAttribute("alt")
        }
      }}],
      toDOM: function toDOM(node) { return ["img", node.attrs] }
    },

    hard_break: {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [{tag: "br"}],
      toDOM: function toDOM() { return ["br"] }
    }
  },

  marks: {
    em: {
      parseDOM: [{tag: "i"}, {tag: "em"},
                 {style: "font-style", getAttrs: function (value) { return value == "italic" && null; }}],
      toDOM: function toDOM() { return ["em"] }
    },

    strong: {
      parseDOM: [{tag: "b"}, {tag: "strong"},
                 {style: "font-weight", getAttrs: function (value) { return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null; }}],
      toDOM: function toDOM() { return ["strong"] }
    },

    link: {
      attrs: {
        href: {},
        title: {default: null}
      },
      inclusive: false,
      parseDOM: [{tag: "a[href]", getAttrs: function getAttrs(dom) {
        return {href: dom.getAttribute("href"), title: dom.getAttribute("title")}
      }}],
      toDOM: function toDOM(node) { return ["a", node.attrs] }
    },

    code: {
      parseDOM: [{tag: "code"}],
      toDOM: function toDOM() { return ["code"] }
    }
  }
});

function maybeMerge(a, b) {
  if (a.isText && b.isText && Mark.sameSet(a.marks, b.marks))
    { return a.withText(a.text + b.text) }
}

// Object used to track the context of a running parse.
var MarkdownParseState = function MarkdownParseState(schema, tokenHandlers) {
  this.schema = schema;
  this.stack = [{type: schema.topNodeType, content: []}];
  this.marks = Mark.none;
  this.tokenHandlers = tokenHandlers;
};

MarkdownParseState.prototype.top = function top () {
  return this.stack[this.stack.length - 1]
};

MarkdownParseState.prototype.push = function push (elt) {
  if (this.stack.length) { this.top().content.push(elt); }
};

// : (string)
// Adds the given text to the current position in the document,
// using the current marks as styling.
MarkdownParseState.prototype.addText = function addText (text) {
  if (!text) { return }
  var nodes = this.top().content, last = nodes[nodes.length - 1];
  var node = this.schema.text(text, this.marks), merged;
  if (last && (merged = maybeMerge(last, node))) { nodes[nodes.length - 1] = merged; }
  else { nodes.push(node); }
};

// : (Mark)
// Adds the given mark to the set of active marks.
MarkdownParseState.prototype.openMark = function openMark (mark) {
  this.marks = mark.addToSet(this.marks);
};

// : (Mark)
// Removes the given mark from the set of active marks.
MarkdownParseState.prototype.closeMark = function closeMark (mark) {
  this.marks = mark.removeFromSet(this.marks);
};

MarkdownParseState.prototype.parseTokens = function parseTokens (toks) {
  for (var i = 0; i < toks.length; i++) {
    var tok = toks[i];
    var handler = this.tokenHandlers[tok.type];
    if (!handler)
      { throw new Error("Token type `" + tok.type + "` not supported by Markdown parser") }
    handler(this, tok, toks, i);
  }
};

// : (NodeType, ?Object, ?[Node]) → ?Node
// Add a node at the current position.
MarkdownParseState.prototype.addNode = function addNode (type, attrs, content) {
  var node = type.createAndFill(attrs, content, this.marks);
  if (!node) { return null }
  this.push(node);
  return node
};

// : (NodeType, ?Object)
// Wrap subsequent content in a node of the given type.
MarkdownParseState.prototype.openNode = function openNode (type, attrs) {
  this.stack.push({type: type, attrs: attrs, content: []});
};

// : () → ?Node
// Close and return the node that is currently on top of the stack.
MarkdownParseState.prototype.closeNode = function closeNode () {
  if (this.marks.length) { this.marks = Mark.none; }
  var info = this.stack.pop();
  return this.addNode(info.type, info.attrs, info.content)
};

function attrs(spec, token, tokens, i) {
  if (spec.getAttrs) { return spec.getAttrs(token, tokens, i) }
  // For backwards compatibility when `attrs` is a Function
  else if (spec.attrs instanceof Function) { return spec.attrs(token) }
  else { return spec.attrs }
}

// Code content is represented as a single token with a `content`
// property in Markdown-it.
function noCloseToken(spec, type) {
  return spec.noCloseToken || type == "code_inline" || type == "code_block" || type == "fence"
}

function withoutTrailingNewline(str) {
  return str[str.length - 1] == "\n" ? str.slice(0, str.length - 1) : str
}

function noOp() {}

function tokenHandlers(schema, tokens) {
  var handlers = Object.create(null);
  var loop = function ( type ) {
    var spec = tokens[type];
    if (spec.block) {
      var nodeType = schema.nodeType(spec.block);
      if (noCloseToken(spec, type)) {
        handlers[type] = function (state, tok, tokens, i) {
          state.openNode(nodeType, attrs(spec, tok, tokens, i));
          state.addText(withoutTrailingNewline(tok.content));
          state.closeNode();
        };
      } else {
        handlers[type + "_open"] = function (state, tok, tokens, i) { return state.openNode(nodeType, attrs(spec, tok, tokens, i)); };
        handlers[type + "_close"] = function (state) { return state.closeNode(); };
      }
    } else if (spec.node) {
      var nodeType$1 = schema.nodeType(spec.node);
      handlers[type] = function (state, tok, tokens, i) { return state.addNode(nodeType$1, attrs(spec, tok, tokens, i)); };
    } else if (spec.mark) {
      var markType = schema.marks[spec.mark];
      if (noCloseToken(spec, type)) {
        handlers[type] = function (state, tok, tokens, i) {
          state.openMark(markType.create(attrs(spec, tok, tokens, i)));
          state.addText(withoutTrailingNewline(tok.content));
          state.closeMark(markType);
        };
      } else {
        handlers[type + "_open"] = function (state, tok, tokens, i) { return state.openMark(markType.create(attrs(spec, tok, tokens, i))); };
        handlers[type + "_close"] = function (state) { return state.closeMark(markType); };
      }
    } else if (spec.ignore) {
      if (noCloseToken(spec, type)) {
        handlers[type] = noOp;
      } else {
        handlers[type + '_open'] = noOp;
        handlers[type + '_close'] = noOp;
      }
    } else {
      throw new RangeError("Unrecognized parsing spec " + JSON.stringify(spec))
    }
  };

  for (var type in tokens) loop( type );

  handlers.text = function (state, tok) { return state.addText(tok.content); };
  handlers.inline = function (state, tok) { return state.parseTokens(tok.children); };
  handlers.softbreak = handlers.softbreak || (function (state) { return state.addText("\n"); });

  return handlers
}

// ::- A configuration of a Markdown parser. Such a parser uses
// [markdown-it](https://github.com/markdown-it/markdown-it) to
// tokenize a file, and then runs the custom rules it is given over
// the tokens to create a ProseMirror document tree.
var MarkdownParser = function MarkdownParser(schema, tokenizer, tokens) {
  // :: Object The value of the `tokens` object used to construct
  // this parser. Can be useful to copy and modify to base other
  // parsers on.
  this.tokens = tokens;
  this.schema = schema;
  this.tokenizer = tokenizer;
  this.tokenHandlers = tokenHandlers(schema, tokens);
};

// :: (string) → Node
// Parse a string as [CommonMark](http://commonmark.org/) markup,
// and create a ProseMirror document as prescribed by this parser's
// rules.
MarkdownParser.prototype.parse = function parse (text) {
  var state = new MarkdownParseState(this.schema, this.tokenHandlers), doc;
  state.parseTokens(this.tokenizer.parse(text, {}));
  do { doc = state.closeNode(); } while (state.stack.length)
  return doc
};

function listIsTight(tokens, i) {
  while (++i < tokens.length)
    { if (tokens[i].type != "list_item_open") { return tokens[i].hidden } }
  return false
}

// :: MarkdownParser
// A parser parsing unextended [CommonMark](http://commonmark.org/),
// without inline HTML, and producing a document in the basic schema.
var defaultMarkdownParser = new MarkdownParser(schema, markdownIt("commonmark", {html: false}), {
  blockquote: {block: "blockquote"},
  paragraph: {block: "paragraph"},
  list_item: {block: "list_item"},
  bullet_list: {block: "bullet_list", getAttrs: function (_, tokens, i) { return ({tight: listIsTight(tokens, i)}); }},
  ordered_list: {block: "ordered_list", getAttrs: function (tok, tokens, i) { return ({
    order: +tok.attrGet("start") || 1,
    tight: listIsTight(tokens, i)
  }); }},
  heading: {block: "heading", getAttrs: function (tok) { return ({level: +tok.tag.slice(1)}); }},
  code_block: {block: "code_block", noCloseToken: true},
  fence: {block: "code_block", getAttrs: function (tok) { return ({params: tok.info || ""}); }, noCloseToken: true},
  hr: {node: "horizontal_rule"},
  image: {node: "image", getAttrs: function (tok) { return ({
    src: tok.attrGet("src"),
    title: tok.attrGet("title") || null,
    alt: tok.children[0] && tok.children[0].content || null
  }); }},
  hardbreak: {node: "hard_break"},

  em: {mark: "em"},
  strong: {mark: "strong"},
  link: {mark: "link", getAttrs: function (tok) { return ({
    href: tok.attrGet("href"),
    title: tok.attrGet("title") || null
  }); }},
  code_inline: {mark: "code", noCloseToken: true}
});

var HtmlEditor = function (_a) {
    var schema = _a.schema, plugins = _a.plugins, value = _a.value, handleChange = _a.handleChange, debounce = _a.debounce, children = _a.children;
    var htmlTransformer = react.useState(function () {
        return createHTMLTransformer(schema);
    })[0];
    var initialDoc = react.useState(function () {
        return htmlTransformer.parse(value);
    })[0];
    return (react.createElement(EditorProvider, { plugins: plugins, doc: initialDoc },
        react.createElement(ChangeHandler, { transformer: htmlTransformer, handleChange: handleChange, debounce: debounce }),
        children));
};

/** SNOWPACK INJECT STYLE: @aeaton/react-prosemirror/style/toolbar.css */
function __snowpack__injectStyle$3(css) {
  const headEl = document.head || document.getElementsByTagName('head')[0];
  const styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  if (styleEl.styleSheet) {
    styleEl.styleSheet.cssText = css;
  } else {
    styleEl.appendChild(document.createTextNode(css));
  }
  headEl.appendChild(styleEl);
}
__snowpack__injectStyle$3(".prosemirror-toolbar {\n  --toolbar-color: #000;\n  --toolbar-color-hover: #00000022;\n  --toolbar-color-inverse: #fff;\n  --toolbar-border-radius: 0;\n  display: flex;\n  flex-wrap: wrap;\n  color: var(--toolbar-color);\n}\n\n.prosemirror-toolbar-group {\n  white-space: nowrap;\n  border: 1px solid var(--toolbar-color);\n  border-radius: var(--toolbar-border-radius);\n  margin-bottom: 4px;\n  overflow: hidden;\n}\n\n.prosemirror-toolbar-group:not(:last-child) {\n  margin-right: 16px;\n}\n\n.prosemirror-toolbar-item {\n  padding: 6px 12px;\n  font-size: 12px;\n  cursor: pointer;\n  border: 1px solid transparent;\n  background: transparent;\n  color: inherit;\n  transition: background-color 0.1s;\n}\n\n.prosemirror-toolbar-item:hover {\n  background-color: var(--toolbar-color-hover);\n}\n\n.prosemirror-toolbar-item[disabled]:not([data-active='true']) {\n  opacity: 0.2;\n}\n\n.prosemirror-toolbar-item[data-active='true'] {\n  background-color: var(--toolbar-color);\n  color: var(--toolbar-color-inverse);\n}\n\n.prosemirror-toolbar-item:not([disabled]):active {\n  background-color: var(--toolbar-color);\n  color: var(--toolbar-color-inverse);\n}\n");

var ToolbarButton = function (_a) {
    var item = _a.item;
    var state = useEditorState();
    var view = useEditorView();
    var executeAction = react.useCallback(function (event) {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/unbound-method
        item.action(state, view.dispatch, view);
    }, [item, state, view]);
    return (react.createElement("button", { type: "button", className: "prosemirror-toolbar-item", "data-active": item.active && item.active(state), disabled: item.enable && !item.enable(state), onMouseDown: executeAction, title: item.title }, item.content));
};
var ToolbarGroup = function (_a) {
    var items = _a.items;
    return (react.createElement("div", { className: "prosemirror-toolbar-group" }, items.map(function (item) { return (react.createElement(ToolbarButton, { key: item.id, item: item })); })));
};
var Toolbar = react.memo(function (_a) {
    var toolbar = _a.toolbar, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (react.createElement("div", { className: "prosemirror-toolbar " + className }, toolbar.map(function (group) { return (react.createElement(ToolbarGroup, { key: group.id, items: group.items })); })));
});
Toolbar.displayName = 'Toolbar';

export { Editor, HtmlEditor, Toolbar };
