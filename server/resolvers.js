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
    createJob: (root, args, context) => {
        if(!context.user){
            throw new Error("unauthorized")
        }
        console.log(args);
        let id= db.jobs.create(args.input);
        return db.jobs.get(id);
       //return null;
    }
}

module.exports = {Query, Job, Company, Mutation};