import _ from 'lodash';

import {
  EVENT_CHECKIN,
  EVENT_CHECKOUT,
  EVENT_ERROR,
  FETCH_FUTURE_EVENTS,
  FETCH_PAST_EVENTS,
  FETCH_EVENT,
} from '../actions/types';

const initialState = {
  currentEvent: {},
  event: {},
  futureEvents: [],
  pastEvents: [],
  checkin: false,
  error: null,
***REMOVED***

const EventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CHECKIN:
      return {
        ...state,
        checkin: true,
        currentEvent: action.payload,
      ***REMOVED***
    case EVENT_CHECKOUT:
      return {
        ...state,
        checkin: false,
      ***REMOVED***
    case FETCH_FUTURE_EVENTS:
      if (_.isEqual(state.futureEvents, action.payload)) {
        return {
          ...state,
        ***REMOVED***
      } else {
        return {
          ...state,
          futureEvents: action.payload,
        ***REMOVED***
      }
    case FETCH_PAST_EVENTS:
      if (_.isEqual(state.pastEvents, action.payload)) {
        return {
          ...state,
        ***REMOVED***
      } else {
        return {
          ...state,
          pastEvents: action.payload,
        ***REMOVED***
      }
    case FETCH_EVENT:
      if (_.isEqual(state.event, action.payload)) {
        return {
          ...state,
        ***REMOVED***
      } else {
        return {
          ...state,
          event: action.payload,
        ***REMOVED***
      }
    case EVENT_ERROR:
      return {
        ...state,
        checkin: false,
        error: action.payload,
      ***REMOVED***
    default:
      return state;
  }
***REMOVED***

export default EventsReducer;
