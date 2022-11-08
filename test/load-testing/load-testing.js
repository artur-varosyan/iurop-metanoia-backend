import http from 'k6/http';
import { sleep } from 'k6';

const users = [
    "adam.smith",
    "bob.smith",
    "charlie.smith",
    "daniel.smith",
    "emma.smith"
]

const companies = [
    "62343262-6238-3164-2d34-6165662d3131",
    "39343831-3766-6635-2d66-6533312d3438",
    "39343038-3230-3561-2d31-6562312d3437"
]

const URL = ''
const endpoints = [
    {
        path: "prefab/get?username=",
        options: users
    },
    {
        path: "user/get?username=",
        options: users
    },
    {
        path: "company/get?companyID=",
        options: companies
    }
]

export let options = {
    duration: '60s',
    thresholds: {
        http_req_duration: ['p(95)<1500']
    }
};  

export default function () {
    const params = {}

    const i = getRandom(endpoints.length);
    const j = getRandom(endpoints[i].options.length)

    http.get(URL + endpoints[i].path + endpoints[i].options[j], params);
    sleep(1); // One request per second
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
  }