const db = require('./db')

const Query = {
    company: (root,args) => db.companies.get(args.id),
    job: (root, args) => db.jobs.get(args.id),
    jobs: () => db.jobs.list()
};
const Job = {
    company: (job) => db.companies.get(job.companyId)
}
const Company = {
    jobs: (company) => db.jobs.list().filter(job => (job.companyId===company.id))
}
const Mutation = {
    createJob: (root, args) => {
        return db.jobs.get(db.jobs.create(args.input));
        
    }
}

module.exports = {Query, Job, Company, Mutation};