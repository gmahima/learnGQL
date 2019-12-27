import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Query } from 'react-apollo'
import gql from 'graphql-tag'
export function JobDetail(props){
//   constructor(props) {
//     super(props);
    
//     this.state = {job: null};
//   }
// async componentDidMount() {
     const {jobId} = props.match.params;
//   const job  = await loadJob(jobId);
//   this.setState({job})
// }
const jobQuery = gql`
    query JobQuery($id: ID!){
        job(id: $id){
         title
         description
         company{
           id
           name
         }
        }
        
    }
`;
  
    
    return (
      <Query query={jobQuery} variables={{id: jobId}}>
      {({data, loading, error}) => {
        if(loading) {
          return <p>loading</p>
        }
        if(error) {
          throw new Error("error")
        }
        return(
          <div>
        <h1 className="title">{data.job.title}</h1>
        <h2 className="subtitle">
          <Link to={`/companies/${data.job.company.id}`}>{data.job.company.name}</Link>
        </h2>
        <div className="box">{data.job.description}</div>
      </div>
      )
      }
      }
      </Query>
    );
  }

