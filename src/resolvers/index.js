import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

// https://developer.atlassian.com/platform/forge/runtime-reference/fetch-api.basic
// https://developer.atlassian.com/platform/forge/manifest-reference/permissions

async function getMetrics(payload) {
  try {
    const url = 'https://sefmetrics-rurgymcszq-uc.a.run.app/users-metrics';

    //#region Data For Test
    // const selectedUsersFullObject = [
    //   { "gitHubUserName": "wolfgangbecker", "displayName": "Wolfgang", "avatar_url": "url", "atlassianAccountId": "5b2c4b00d2f5b64e4d21afe4" },
    //   { "gitHubUserName": "davidgm0", "displayName": "David Mora", "avatar_url": "url", "atlassianAccountId": "606242ceaee24000685b8fb1" },
    //   { "gitHubUserName": "mohitkyadav", "displayName": "Mohit Yadav", "avatar_url": "url", "atlassianAccountId": "6243931df813eb006928eaea" }
    // ];
    //#endregion

    const gitHubUserNamesArray = payload.users.map(user => user.gitHubUserName);

    const bodyData = {
      "funckey": "424903837056DkLDYIQWwmKokS9sUul",
      "userNameList": gitHubUserNamesArray,
      "fromDate": payload.startDate,
      "toDate": payload.endDate
    };

    //#region Data For test 
    // const bodyData = {
    //   "funckey": "424903837056DkLDYIQWwmKokS9sUul",
    //   "userNameList": [
    //     "wolfgangbecker",
    //     "TaylorBriggs"
    //   ],
    //   "fromDate": "2024-01-01",
    //   "toDate": "2024-03-29"
    // };
    //#endregion
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    });
    // const status = response.status;
    if (!response.ok) {
      return `An error has occurred: ${response.statusText}`;
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return error;
  }
}

const resolver = new Resolver();

resolver.define('getMetrics', async (req) => {
  return await getMetrics(req.payload);
  // console.log(req);
  // return 'Hello, world!';
});

export const handler = resolver.getDefinitions();

