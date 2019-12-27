import React, { Component } from 'react';
import {loadCompany} from './requests'
import { JobList } from './JobList';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {company: {}};
  }
  async componentDidMount() {
    const {companyId} = this.props.match.params;
    const company = await loadCompany(companyId);
    this.setState({company})
  }
  

  render() {
    const {company} = this.state;
    let jobs = company.jobs;
    //console.log(jobs + " from cd0")
    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5 className="title is-5">Jobs at {company.name}</h5>
        {/* {console.log(jobs + " from cd")} */}
        <JobList jobs={jobs} />
  

      </div>
    );
  }
}
