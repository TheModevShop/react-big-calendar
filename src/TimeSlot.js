import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';
import { elementType } from './utils/propTypes';
import date from './utils/dates.js';
import moment from 'moment-timezone';
import _ from 'lodash';

window.moment = moment;


export default class TimeSlot extends Component {
  constructor(props) {
    super(props)
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

  render() {
    const businessHours = this.props.businessHours;
    const selectedServices = this.props.selectedServices || [];

    const { value } = this.props;
    const Wrapper = this.props.dayWrapperComponent;

    let available = businessHours && businessHours.open;

    let selectedIsAvailable = true;
    if (selectedServices.length) {
      selectedIsAvailable = false;
      _.forEach(selectedServices, (s) => {
        const a = _.get(businessHours, 'available', []).indexOf(s)
        if (a && !selectedIsAvailable) {
          selectedIsAvailable = true;
        }
      })
    }
    available = available && selectedIsAvailable;

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
