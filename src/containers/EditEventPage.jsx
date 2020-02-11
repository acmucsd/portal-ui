import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import EditEventPage from '../components/EditEventPage';
import PageLayout from './PageLayout';

import { fetchEvent } from '../actions/eventsActions';

import { useParams } from 'react-router-dom';

const EditEventPageContainer = (props) => {
  const params = useParams();
  const [eventData, setEventData] = useState({});
  useEffect(() => {
    console.log("trying to fetch " + params.uuid);
    props.fetchEvent(params.uuid);
    console.log(props.event);
  }, []);
  return (
    <PageLayout>
      <EditEventPage event={props.event}/>
    </PageLayout>
  );
};

const mapStateToProps = state => ({
  event: state.events.event,
});
export default connect(
  mapStateToProps,
  { fetchEvent }
)(EditEventPageContainer);
