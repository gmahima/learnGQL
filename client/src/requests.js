import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost'
import { json } from "body-parser"
import gql from 'graphql-tag'
import {isLoggedIn, getAccessToken} from './auth'
const endPointUrl = "http://localhost:9000/graphql"
const authLink = new ApolloLink((operation, forward) => {
  if(isLoggedIn()) {
    //request.headers['authorization'] = 'Bearer ' + getAccessToken();
    operation.setContext({
      headers: {
        'authorization': 'Bearer ' + getAccessToken()
      }
    })
    
  }
  return forward(operation)
})
const client = new ApolloClient({
  link: new ApolloLink.from([authLink, new HttpLink({uri: endPointUrl})]),
  cache: new InMemoryCache()
})

const jobDetailFragment = gql`
fragment JobDetail on Job{
  id
  title
  company{
    id
    name
    description
  }
  description
}
`

export async function loadJobs () {
    const query = gql`
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
    const {data} = await client.query({query, fetchPolicy: 'no-cache'});
    
    return data.jobs;

}
const jobQuery = gql`
    query JobQuery($id: ID!){
        job(id: $id){
         ...JobDetail
        }
        
    }${jobDetailFragment}
`;
export async function loadJob (id) {
    
const {data} = await client.query({query:jobQuery, variables: {id}});
return data.job;

}
export async function loadCompany (id) {
    const query = gql`query CompanyQuery($id:ID!){
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
const {data} = await client.query({query, variables:{id}});
return data.company;

}
export async function CreateJob(input){
    const mutation = gql `mutation AddJob($input: CreateJobInput){ 
        job: createJob(input: $input){
          ...JobDetail
        }
        }${jobDetailFragment}`;
        const {data} = await client.mutate({mutation,
           variables: {input},
          update: (cache, mutationResult) => {
            cache.writeQuery({
              query: jobQuery,
              data: mutationResult.data,
              variables: {id: mutationResult.data.job.id},

            })
          }
          })
        return data.job;

}