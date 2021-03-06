'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes3 = require('./utils/propTypes');

var _dates = require('./utils/dates.js');

var _dates2 = _interopRequireDefault(_dates);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

window.moment = _momentTimezone2.default;

var TimeSlot = function (_Component) {
  _inherits(TimeSlot, _Component);

  function TimeSlot(props) {
    _classCallCheck(this, TimeSlot);

    var _this = _possibleConstructorReturn(this, (TimeSlot.__proto__ || Object.getPrototypeOf(TimeSlot)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(TimeSlot, [{
    key: 'render',
    value: function render() {
      var businessHours = this.props.businessHours;
      var selectedServices = this.props.selectedServices || [];

      var value = this.props.value;

      var Wrapper = this.props.dayWrapperComponent;

      var available = businessHours && businessHours.open;

      var selectedIsAvailable = true;
      if (selectedServices.length) {
        selectedIsAvailable = false;
        _lodash2.default.forEach(selectedServices, function (s) {
          var a = _lodash2.default.get(businessHours, 'available', []).indexOf(s);
          if (a && !selectedIsAvailable) {
            selectedIsAvailable = true;
          }
        });
      }
      available = available && selectedIsAvailable;

      return _react2.default.createElement(
        Wrapper,
        { value: value },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)('rbc-time-slot', !available && 'unavailable', this.props.showLabel && 'rbc-label', this.props.isNow && 'rbc-now')
          },
          this.props.showLabel && _react2.default.createElement(
            'span',
            null,
            this.props.content
          )
        )
      );
    }
  }]);

  return TimeSlot;
}(_react.Component);

TimeSlot.propTypes = {
  dayWrapperComponent: _propTypes3.elementType,
  value: _propTypes2.default.instanceOf(Date).isRequired,
  isNow: _propTypes2.default.bool,
  showLabel: _propTypes2.default.bool,
  content: _propTypes2.default.string,
  culture: _propTypes2.default.string
};
TimeSlot.defaultProps = {
  isNow: false,
  showLabel: false,
  content: ''
};
exports.default = TimeSlot;