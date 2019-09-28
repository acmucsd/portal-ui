import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import EventCard from '../components/EventCard';
import EventsList from '../components/EventsList';
import background from '../assets/graphics/background.svg';
import { getHour, formatDate } from '../utils';
import { fetchPastEvents } from '../actions/eventsActions';

const PastEventsContainer = props => {
  useEffect(() => {
    props.fetchPastEvents();
  });

  return (
    <EventsList>
      {props.events.map((event) => {
        const startTime = formatDate(event.start);
        return (
          <EventCard
            key={`past-${event.uuid}`}
            cover={event.cover || background}
            date={startTime}
            description={event.description}
            location={event.location}
            points={event.pointValue}
            title={event.title}
          />
    ***REMOVED***;
***REMOVED***}
    </EventsList>
  );
***REMOVED***

const mapStateToProps = state => ({
  events: state.events.pastEvents,
});

export default connect(
  mapStateToProps,
  { fetchPastEvents }
)(PastEventsContainer);
