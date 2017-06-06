import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';
import { elementType } from './utils/propTypes';
import date from './utils/dates.js';
import _ from 'lodash';


export default class TimeSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static propTypes = {
    dayWrapperComponent: elementType,
    value: PropTypes.instanceOf(Date).isRequired,
    isNow: PropTypes.bool,
    showLabel: PropTypes.bool,
    content: PropTypes.string,
    culture: PropTypes.string
  }

  static defaultProps = {
    isNow: false,
    showLabel: false,
    content: ''
  }

  componentWillMount() {
    this.calculateDateOfWeek();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.calculateDateOfWeek()
    }
  }

  calculateDateOfWeek() {
    const hoursForDay = _.filter(this.props.businessHours, ({dow}) => {
      return date.sameWeekDay(this.props.value, null, dow);
    })
    this.setState({hours: hoursForDay, available: this.timeAvailable(this.props.value, hoursForDay)})
  }

  timeAvailable(value, hours) {
    hours = hours || this.state.hours
    let available;
    _.forEach(hours, (h) => {
      if (!available) {
        available = date.between(h.start, h.end, this.props.value)
      }
    })
    return available;
  }

  render() {
    const { value } = this.props;
    const Wrapper = this.props.dayWrapperComponent;
    const available = this.state.available
    return (
      <Wrapper value={value}>
        <div
          className={cn(
            'rbc-time-slot',
            !available && 'unavailable',
            this.props.showLabel && 'rbc-label',
            this.props.isNow && 'rbc-now',
          )}
        >
        {this.props.showLabel &&
          <span>{this.props.content}</span>
        }
        </div>
      </Wrapper>
    )
  }
}
