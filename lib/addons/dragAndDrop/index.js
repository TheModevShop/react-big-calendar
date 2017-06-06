'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withDragAndDrop;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDnd = require('react-dnd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes3 = require('../../utils/propTypes');

var _DraggableEventWrapper = require('./DraggableEventWrapper');

var _DraggableEventWrapper2 = _interopRequireDefault(_DraggableEventWrapper);

var _backgroundWrapper = require('./backgroundWrapper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var html5Backend = void 0;

try {
  html5Backend = require('react-dnd-html5-backend');
} catch (err) {/* optional dep missing */}

function withDragAndDrop(Calendar) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$backend = _ref.backend,
      backend = _ref$backend === undefined ? html5Backend : _ref$backend;

  var DragAndDropCalendar = function (_React$Component) {
    _inherits(DragAndDropCalendar, _React$Component);

    _createClass(DragAndDropCalendar, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return {
          onEventDrop: this.props.onEventDrop,
          startAccessor: this.props.startAccessor,
          endAccessor: this.props.endAccessor
        };
      }
    }]);

    function DragAndDropCalendar() {
      var _ref2;

      _classCallCheck(this, DragAndDropCalendar);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref2 = DragAndDropCalendar.__proto__ || Object.getPrototypeOf(DragAndDropCalendar)).call.apply(_ref2, [this].concat(args)));

      _this.handleStateChange = function () {
        var isDragging = !!_this.monitor.getItem();

        if (isDragging !== _this.state.isDragging) {
          setTimeout(function () {
            return _this.setState({ isDragging: isDragging });
          });
        }
      };

      _this.state = { isDragging: false };
      return _this;
    }

    _createClass(DragAndDropCalendar, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var monitor = this.context.dragDropManager.getMonitor();
        this.monitor = monitor;
        this.unsubscribeToStateChange = monitor.subscribeToStateChange(this.handleStateChange);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.monitor = null;
        this.unsubscribeToStateChange();
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            selectable = _props.selectable,
            components = _props.components,
            props = _objectWithoutProperties(_props, ['selectable', 'components']);

        delete props.onEventDrop;

        props.selectable = selectable ? 'ignoreEvents' : false;

        props.className = (0, _classnames2.default)(props.className, 'rbc-addons-dnd', this.state.isDragging && 'rbc-addons-dnd-is-dragging');

        props.components = _extends({}, components, {
          eventWrapper: _DraggableEventWrapper2.default,
          dateCellWrapper: _backgroundWrapper.DateCellWrapper,
          dayWrapper: _backgroundWrapper.DayWrapper
        });

        return _react2.default.createElement(Calendar, props);
      }
    }]);

    return DragAndDropCalendar;
  }(_react2.default.Component);

  DragAndDropCalendar.propTypes = {
    selectable: _propTypes2.default.oneOf([true, false, 'ignoreEvents']).isRequired,
    components: _propTypes2.default.object
  };


  DragAndDropCalendar.propTypes = {
    onEventDrop: _propTypes2.default.func.isRequired,
    startAccessor: _propTypes3.accessor,
    endAccessor: _propTypes3.accessor
  };

  DragAndDropCalendar.defaultProps = {
    startAccessor: 'start',
    endAccessor: 'end'
  };

  DragAndDropCalendar.contextTypes = {
    dragDropManager: _propTypes2.default.object
  };

  DragAndDropCalendar.childContextTypes = {
    onEventDrop: _propTypes2.default.func,
    startAccessor: _propTypes3.accessor,
    endAccessor: _propTypes3.accessor
  };

  if (backend === false) {
    return DragAndDropCalendar;
  } else {
    return (0, _reactDnd.DragDropContext)(backend)(DragAndDropCalendar);
  }
}