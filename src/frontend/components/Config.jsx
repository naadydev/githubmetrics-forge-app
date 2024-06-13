import React from 'react';
import { Textfield } from '@forge/react';

const exampleUsersListString = '[{"gitHubUserName":"wolfgangbecker","displayName":"Wolfgang","avatar_url":"url","atlassianAccountId":"5b2c4b00d2f5b64e4d21afe4"},{"gitHubUserName":"davidgm0","displayName":"David Mora","avatar_url":"url","atlassianAccountId":"606242ceaee24000685b8fb1"},{"gitHubUserName":"mohitkyadav","displayName":"Mohit Yadav","avatar_url":"url","atlassianAccountId":"6243931df813eb006928eaea"}]';
const exampleReposListString = '["cobalt-pentest-api", "cobalt-app-web"]';

export const defaultConfig = {
  usersList: exampleUsersListString,
  reposList: exampleReposListString
};

const Config = () => (
  <>
    <Textfield name="usersList" label="Users Object List" defaultValue={defaultConfig.usersList} />
    <Textfield name="reposList" label="Repos Object List" defaultValue={defaultConfig.reposList} />
  </>
);

export default Config;
