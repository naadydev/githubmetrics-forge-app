import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

// https://developer.atlassian.com/platform/forge/runtime-reference/fetch-api.basic
// https://developer.atlassian.com/platform/forge/manifest-reference/permissions

async function getMetrics() {
  try {
    const url = 'https://sefmetrics-rurgymcszq-uc.a.run.app/users-metrics';
    const bodyData = {
      "funckey": "424903837056DkLDYIQWwmKokS9sUul",
      "userNameList": [
        "wolfgangbecker",
        "TaylorBriggs"
      ],
      "fromDate": "2024-01-01",
      "toDate": "2024-03-29"
    };

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

