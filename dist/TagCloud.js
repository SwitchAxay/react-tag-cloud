"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:jsx-no-multiline-js */
const d3_cloud_1 = __importDefault(require("d3-cloud"));
const PropTypes = __importStar(require("prop-types"));
const React = __importStar(require("react"));
const react_measure_1 = __importDefault(require("react-measure"));

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagCloud = function (_React$Component) {
    _inherits(TagCloud, _React$Component);

    function TagCloud() {
        _classCallCheck(this, TagCloud);

        var _this = _possibleConstructorReturn(this, (TagCloud.__proto__ || Object.getPrototypeOf(TagCloud)).apply(this, arguments));

        _this.state = {
            children: undefined,
            height: 0,
            width: 0,
            wrappedChildren: []
        };
        _this.mounted = false;
        _this.resizeTimer = undefined;
        _this.fontFamily = _this.getStyleValue.bind(_this, "fontFamily");
        _this.fontSize = _this.getStyleValue.bind(_this, "fontSize");
        _this.fontWeight = _this.getStyleValue.bind(_this, "fontWeight");
        _this.fontStyle = _this.getStyleValue.bind(_this, "fontStyle");
        _this.padding = _this.getStyleValue.bind(_this, "padding");
        _this.rotate = function (word) {
            var value = word.child.props.rotate || _this.props.rotate || TagCloud.defaultProps.rotate;
            if (typeof value === "function") {
                return value(word.child.props);
            } else {
                return value;
            }
        };
        _this.text = function (word) {
            var text = word.child.props.text;
            if (!text) {
                var children = word.child.props.children;
                text = Array.isArray(children) ? children[0] : children;
            }
            return text;
        };
        _this.onResize = function (contentRect) {
            var _contentRect$bounds = contentRect.bounds;
            var width = _contentRect$bounds.width;
            var height = _contentRect$bounds.height;

            if (_this.state.width !== width || _this.state.height !== height) {
                // Handle the initial size observer immediately
                if (!_this.state.width && !_this.state.height) {
                    _this.setState({
                        height: height,
                        width: width
                    });
                    return;
                }
                // Handle resizes with a debounce timeout of 100ms
                if (_this.resizeTimer) {
                    clearTimeout(_this.resizeTimer);
                }
                _this.resizeTimer = setTimeout(function () {
                    _this.resizeTimer = undefined;
                    if (_this.mounted) {
                        _this.setState({
                            children: undefined,
                            height: height,
                            width: width
                        });
                    }
                }, 100);
            }
        };
        return _this;
    }

    _createClass(TagCloud, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.mounted = true;
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.mounted = false;
        }
    }, {
        key: "calculateLayout",
        value: function calculateLayout(props, state) {
            var _this2 = this;

            var children = props.children;
            var spiral = props.spiral;
            var random = props.random;
            var style = props.style;
            var width = state.width;
            var height = state.height;

            var spiralAny = spiral;
            return new Promise(function (resolve) {
                var words = React.Children.map(children, function (child) {
                    return { child: child };
                });
                var res = d3_cloud_1.default().size([width, height]).words(words).text(_this2.text).font(_this2.fontFamily).fontStyle(_this2.fontStyle).fontWeight(_this2.fontWeight).fontSize(_this2.fontSize).rotate(_this2.rotate).padding(_this2.padding);
                if (spiralAny) {
                    res = res.spiral(spiralAny);
                }
                if (random) {
                    res = res.random(random);
                }
                res.on("end", function (items) {
                    var newChildren = items.map(function (item, index) {
                        var x = item.x;
                        x += item.x0;
                        x += width / 2;
                        var y = item.y;
                        y += item.y0;
                        y += height / 2;
                        var transform = "translate(" + x + "px," + y + "px) rotate(" + item.rotate + "deg)";
                        var newStyle = Object.assign({ position: "absolute" }, item.child.props.style, { MozTransform: transform, MsTransform: transform, OTransform: transform, WebkitTransform: transform, fontFamily: item.font, fontSize: item.size, fontStyle: item.style, fontWeight: item.weight, textAlign: "center", transform: transform, transformOrigin: "center bottom", whiteSpace: "nowrap", width: item.width });
                        if (!newStyle.color && style.color && typeof style.color === "function") {
                            newStyle.color = style.color(item.child, index);
                        }
                        return React.cloneElement(item.child, Object.assign({}, item.child.props, { key: item.text, style: newStyle }), item.child.props.children);
                    });
                    resolve(newChildren);
                }).start();
            });
        }
    }, {
        key: "getStyleValue",
        value: function getStyleValue(propName, word) {
            var childValue = word.child.props.style ? word.child.props.style[propName] : undefined;
            var value = childValue || this.props.style[propName] || TagCloud.defaultProps.style[propName];
            if (typeof value === "function") {
                value = value(word.child.props);
            }
            if (propName === "fontSize") {
                value += 2;
            }
            return value;
        }
    }, {
        key: "render",
        value: function render() {
            var _a = this.props;var style = _a.style;
            var children = _a.children;
            var rotate = _a.rotate;
            var spiral = _a.spiral;
            var random = _a.random; // eslint-disable-line
            var props = __rest(_a, ["style", "children", "rotate", "spiral", "random"]);var fontFamily = style.fontFamily;
            var fontSize = style.fontSize;
            var fontWeight = style.fontWeight;
            var fontStyle = style.fontStyle;
            var color = style.color;
            var padding = style.padding; // eslint-disable-line
            var otherStyle = __rest(style, ["fontFamily", "fontSize", "fontWeight", "fontStyle", "color", "padding"]);var wrappedChildren = this.state.wrappedChildren;

            return React.createElement(react_measure_1.default, { bounds: true, onResize: this.onResize }, function (_ref) {
                var measureRef = _ref.measureRef;
                return React.createElement("div", Object.assign({ ref: measureRef }, props, { style: otherStyle }), wrappedChildren);
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            var _this3 = this;

            var _state = this.state;
            var width = _state.width;
            var height = _state.height;
            var children = this.props.children;

            if (width && height && children !== this.state.children) {
                this.calculateLayout(this.props, this.state).then(function (wrappedChildren) {
                    if (!_this3.mounted) {
                        return;
                    }
                    _this3.setState({
                        children: children,
                        wrappedChildren: wrappedChildren
                    });
                });
            }
        }
    }]);

    return TagCloud;
}(React.Component);

TagCloud.propTypes = {
    children: PropTypes.any,
    random: PropTypes.func,
    rotate: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    spiral: PropTypes.oneOfType([
        PropTypes.oneOf(["archimedean", "rectangular"]),
        PropTypes.func,
    ]),
    style: PropTypes.shape({
        color: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        fontFamily: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        fontSize: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
        fontStyle: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        fontWeight: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.number,
            PropTypes.string,
        ]),
        padding: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
    }),
};
TagCloud.defaultProps = {
    random: Math.random,
    rotate: 0,
    spiral: "archimedean",
    style: {
        fontFamily: "serif",
        fontSize: 20,
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
    },
};
exports.default = TagCloud;
