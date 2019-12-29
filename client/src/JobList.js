import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class JobList extends Component {
  render() {
    const {jobs} = this.props;
  //  console.log(jobs);
    return (
      <ul className="box">
        {(jobs) ?jobs.map(this.renderJob.bind(this)): null}
      </ul>
    );
  }

  renderJob(job) {
    const title = job.company ? `${job.title} at ${job.company.name}` : job.title;
  
    return (
      <li className="media" key={job.id}>
        <div className="media-content">
          <Link to={`/jobs/${job.id}`}>{title}</Link>
          <span color={job.isStarred?'yellow':'grey'}>{job.isStarred?'*****':null}</span>
        </div>
      </li>
    );
  }
}
