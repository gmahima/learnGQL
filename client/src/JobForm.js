import React, { Component } from 'react';

import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'

const mutation = gql `mutation createJob($input: CreateJobInput){ 
  job: createJob(input: $input){
    id
    title
    description
    company{
      id
      name
      description

    }
  }
  }`;

export class JobForm extends Component {
  constructor(props) {
    super(props);
    this.state = {title: '', description: ''};
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

//  // handleClick(event) {
//     companyId = "SJV0-wdOM";
  //   const{title, description} = this.state;
  //   event.preventDefault();
  //   CreateJob({title, description, companyId}).then(
  //     (job) => {
  //       //console.log(job);
  //       this.props.history.push(`/jobs/${job.id}`)
  //     }
  //   )   
  // }
  

  render() {
    
    const companyId = "SJV0-wdOM";
    const {title, description} = this.state;
    return (
      <Mutation mutation={mutation} variables={{title, description, companyId}}>
    {(createJob, {res, loading, error}) => {
    
      return (  
        <div>
        <h1 className="title">New Job</h1>
        <div className="box">
          <form onSubmit={
            createJob
          }>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input className="input" type="text" name="title" value={title}
                  onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea className="input" style={{height: '10em'}}
                  name="description" value={description} onChange={this.handleChange.bind(this)} />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-link" type="submit" value="submit">submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>)}}
    </Mutation>   
   );
  }
}
