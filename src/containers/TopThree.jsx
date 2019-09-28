import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import TopLeaderCard from '../components/TopLeaderCard';
import { fetchLeaderboard } from '../actions/leaderboardActions';

const TopThreeContainer = props => {
  useEffect(() => {
    props.fetchLeaderboard();
  }, []);

  return (
    <>
      {getTopThree(props.users)}
    </>
  )
***REMOVED***

const getTopThree = users => {
  let topThree = [];
  for (let i = 0; i < Math.min(users.length, 3); i++) {
    const user = users[i];
    topThree.push(
      <TopLeaderCard
        key={i}
        exp={user.points}
        image={user.image}
        name={`${user.firstName} ${user.lastName}`}
        placement={i+1}
        rank={user.rank}
        />
***REMOVED***
  }

  return topThree;
}

const mapStateToProps = state => ({
  users: state.leaderboard.users,
});

export default connect(
  mapStateToProps,
  { fetchLeaderboard }
)(TopThreeContainer);
