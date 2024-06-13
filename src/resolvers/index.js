import Resolver from '@forge/resolver';
import { fetch } from '@forge/api';

// https://developer.atlassian.com/platform/forge/runtime-reference/fetch-api.basic
// https://developer.atlassian.com/platform/forge/manifest-reference/permissions/

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);
  return 'Hello, world!';
  // // -----------------
  //   // Fetch GitHub repositories using GitHub API
  //   const githubResponse = await fetch('https://api.github.com/orgs/cobalthq/repos', {
  //     headers: {
  //       'Authorization': 'Bearer YOUR_GITHUB_ACCESS_TOKEN'
  //     }
  //   });

  //   if (!githubResponse.ok) {
  //     // Error fetching GitHub repositories
  //   }

  //   const repositories = await githubResponse.json();
  //   console.log(repositories);
  // // -----------------

});

export const handler = resolver.getDefinitions();

