import React, { Component } from 'react';
import { JobList } from './JobList';
//import {loadJobs} from './requests'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'


export class JobBoard extends Component {
  render() {
    return (
      <Query query={
        gql`
    query {
      jobs{
        id
        title
        description
        company{
            name
            id
            description
        }
      }
    }
  `
      }>
      {({data, loading, error}) => {
        if(loading) {
          return <p>loading</p>
      }
      if(error) {
        throw new Error("errror")
        return null;
      }

        return(
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={data.jobs} />
      </div>)}}
      </Query>
    );
  }
}
