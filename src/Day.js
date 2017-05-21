import PropTypes from 'prop-types';
import React from 'react';
import dates from './utils/dates';
import TimeGrid from './TimeGrid';
import { navigate } from './utils/constants';

class Day extends React.Component {
  render() {
    let { date, calendars = [], ...props } = this.props;
    let range = Day.range(date);
    let calendarComponents;
    if (calendars && calendars.length) {
      calendarComponents = calendars.map((comp, i) => {
        const compProps = comp.props || props;
        return (
          <TimeGrid headerLabel={compProps.label} secondaryTimeColumn={i>0} key={'time-grid-calendar-'+i} {...props} range={range} eventOffset={10} />
        )
      })
    } else {
      calendarComponents = <TimeGrid key={'time-grid-calendar'} {...props} range={range} eventOffset={10} />
    }

    return (
      <div className="day-column-wrappers" style={calendars.length ? {display: 'flex'} : {}}>
        {calendarComponents}
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
