'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dates = require('./utils/dates');

var _dates2 = _interopRequireDefault(_dates);

var _TimeGrid = require('./TimeGrid');

var _TimeGrid2 = _interopRequireDefault(_TimeGrid);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Day = function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).apply(this, arguments));
  }

  _createClass(Day, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.calculateScroll();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.applyScroll();
    }
  }, {
    key: 'applyScroll',
    value: function applyScroll() {
      if (this._scrollRatio) {
        var content = this.refs.content;

        content.scrollTop = content.scrollHeight * this._scrollRatio;
        // Only do this once
        this._scrollRatio = null;
      }
    }
  }, {
    key: 'calculateScroll',
    value: function calculateScroll() {
      var _props = this.props,
          min = _props.min,
          max = _props.max,
          scrollToTime = _props.scrollToTime;


      var diffMillis = scrollToTime - _dates2.default.startOf(scrollToTime, 'day');
      var totalMillis = _dates2.default.diff(max, min);

      this._scrollRatio = diffMillis / totalMillis;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props2 = this.props,
          date = _props2.date,
          scrollToTime = _props2.scrollToTime;
      // When paginating, reset scroll

      if (!_dates2.default.eq(nextProps.date, date, 'minute') || !_dates2.default.eq(nextProps.scrollToTime, scrollToTime, 'minute')) {
        this.calculateScroll();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          date = _props3.date,
          _props3$calendars = _props3.calendars,
          calendars = _props3$calendars === undefined ? [] : _props3$calendars,
          businessHours = _props3.businessHours,
          props = _objectWithoutProperties(_props3, ['date', 'calendars', 'businessHours']);

      var range = Day.range(date);
      var calendarComponents = void 0;
      if (calendars && calendars.length) {
        calendarComponents = calendars.map(function (comp, i) {
          return _react2.default.createElement(_TimeGrid2.default, _extends({
            businessHours: businessHours,
            headerLabel: comp.label,
            secondaryTimeColumn: i > 0, key: 'time-grid-calendar-' + i
          }, props, {
            events: comp.events || props.events,
            timeGutterFormat: _this2.props.timeGutterFormatOverride || _this2.props.timeGutterFormat,
            range: range,
            eventOffset: 10 }));
        });
      } else {
        calendarComponents = _react2.default.createElement(_TimeGrid2.default, _extends({ key: 'time-grid-calendar' }, props, { businessHours: businessHours, range: range, eventOffset: 10 }));
      }

      return _react2.default.createElement(
        'div',
        { className: 'day-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'header' },
          calendars.map(function (comp, i) {
            return _react2.default.createElement(
              'div',
              { className: 'label-wrapper-' + i, key: i },
              i === 0 ? _react2.default.createElement(
                'span',
                { className: 'flex' },
                _react2.default.createElement('span', { className: 'ghost' }),
                _react2.default.createElement(
                  'span',
                  { className: 'label' },
                  comp.label
                )
              ) : _react2.default.createElement(
                'span',
                { className: 'label' },
                comp.label
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { ref: 'content', className: 'day-column-wrappers', style: calendars.length ? { display: 'flex' } : {} },
          calendarComponents
        )
      );
    }
  }]);

  return Day;
}(_react2.default.Component);

Day.defaultProps = {
  min: _dates2.default.startOf(new Date(), 'day'),
  max: _dates2.default.endOf(new Date(), 'day'),
  scrollToTime: _dates2.default.startOf(new Date(), 'day')
};


Day.navigate = function (date, action) {
  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates2.default.add(date, -1, 'day');

    case _constants.navigate.NEXT:
      return _dates2.default.add(date, 1, 'day');

    default:
      return date;
  }
};

Day.range = function (date) {
  return [_dates2.default.startOf(date, 'day')];
};

exports.default = Day;