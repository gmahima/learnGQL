import { json } from "body-parser"

const endPointUrl = "http://localhost:9000/graphql"


async function gqlReq (query, variables = {}) {
    const res = await fetch(endPointUrl, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({query, variables})
    })
    const resBody = await res.json();
    if(resBody.errors) {
        const message = resBody.errors.map(e => e.message).join('\n');
        const e = new Error(message);
        throw(e);
    }
    return resBody.data;
}


export async function loadJobs () {
    const query = `
    {
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
    }`
    const data = await gqlReq(query);
    
    return data.jobs;

}
export async function loadJob (id) {
    const query = `
    query JobQuery($id: ID!){
        job(id: $id){
          id
          title
          company{
            id
            name
            description
          }
          description
        }
        
    }
`;
const data = await gqlReq(query, {id} );
return data.job;

}
export async function loadCompany (id) {
    const query = `query CompanyQuery($id:ID!){
        company(id: $id) {
          name,
          id,
          description
          jobs{
            id
            title
          }
        }
      }
`;
const data = await gqlReq(query, {id} );
return data.company;

}
export async function CreateJob(input){
    const mutation =  `mutation AddJob($input: CreateJobInput){ 
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
        const data =await gqlReq(mutation, {input});
        return data.job;

}