import PropTypes from 'prop-types';
import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import { navigate } from './utils/constants';

class Day extends React.Component {
  static defaultProps = {
    min: dates.startOf(new Date(), 'day'),
    max: dates.endOf(new Date(), 'day'),
    scrollToTime: dates.startOf(new Date(), 'day')
  }

  componentWillMount() {
    this.calculateScroll();
  }

  componentDidMount() {
    this.applyScroll();
  }

  applyScroll() {
    if (this._scrollRatio) {
      const { content } = this.refs;
      content.scrollTop = (content.scrollHeight * this._scrollRatio);
      // Only do this once
      this._scrollRatio = null;
    }
  }

  calculateScroll() {
    const { min, max, scrollToTime } = this.props;

    const diffMillis = scrollToTime - dates.startOf(scrollToTime, 'day');
    const totalMillis = dates.diff(max, min);

    this._scrollRatio = diffMillis / totalMillis;
  }

  componentWillReceiveProps(nextProps) {
    const { date, scrollToTime } = this.props;
    // When paginating, reset scroll
    if (
      !dates.eq(nextProps.date, date, 'minute') ||
      !dates.eq(nextProps.scrollToTime, scrollToTime, 'minute')
    ) {
      this.calculateScroll();
    }
  }

  render() {
    let { date, calendars = [], businessHours, ...props } = this.props;
    let range = Day.range(date);
    let calendarComponents;
    if (calendars && calendars.length) {
      calendarComponents = calendars.map((comp, i) => {
        return (
          <TimeGrid
            businessHours={businessHours}
            headerLabel={comp.label}
            secondaryTimeColumn={i>0} key={'time-grid-calendar-'+i}
            {...props}
            events={comp.events || props.events}
            staffId={comp.staffId}
            timeGutterFormat={this.props.timeGutterFormatOverride || this.props.timeGutterFormat}
            range={range}
            eventOffset={10} />
        )
      })
    } else {
      calendarComponents = <TimeGrid key={'time-grid-calendar'} {...props} businessHours={businessHours} range={range} eventOffset={10} />
    }

    return (
      <div className="day-wrapper">
        <div className="header">
          {
            calendars.map((comp, i) => {
              return <div className={`label-wrapper-${i}`} key={i}>
                {
                  i === 0 ?
                  <span className="flex">
                    <span className="ghost"></span>
                    <span className="label">{comp.label}</span>
                  </span> :
                  <span className="label">{comp.label}</span>
                }
              </div>
            })
          }
        </div>
        <div ref='content' className="day-column-wrappers" style={calendars.length ? {display: 'flex'} : {}}>
          {calendarComponents}
        </div>
      </div>
    );
  }
}

Day.navigate = (date, action)=>{
  switch (action){
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'day');

    case navigate.NEXT:
      return dates.add(date, 1, 'day')

    default:
      return date;
  }
}


Day.range = (date)=> {
  return [dates.startOf(date, 'day')]
}


export default Day
