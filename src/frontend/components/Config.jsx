import React from 'react';
import { Textfield } from '@forge/react';

const exampleUsersListString = `[
  {
    "displayName": "Wolfgang",
    "gitHubUserName": "wolfgangbecker",
    "avatar_url": "url",
    "atlassianAccountId": "5b2c4b00d2f5b64e4d21afe4"
  },
  {
    "displayName": "David Mora",
    "gitHubUserName": "davidgm0",
    "avatar_url": "url",
    "atlassianAccountId": "606242ceaee24000685b8fb1"
  },
  {
    "displayName": "Mohit Yadav",
    "gitHubUserName": "mohitkyadav",
    "avatar_url": "url",
    "atlassianAccountId": "6243931df813eb006928eaea"
  },
  {
    "displayName": "Mahmoud Adly",
    "gitHubUserName": "mahmoudadly-cobalt",
    "avatar_url": "url",
    "atlassianAccountId": "5fecb354d36496013986e885"
  },
  {
    "displayName": "Taylor Briggs",
    "gitHubUserName": "TaylorBriggs",
    "avatar_url": "url",
    "atlassianAccountId": "62e2aa503aaeedcae7566cce"
  },
  {
    "displayName": "Grayson Kuhns",
    "gitHubUserName": "grayson-cobalt",
    "avatar_url": "url",
    "atlassianAccountId": "622293504160640069c7eac3"
  },
  {
    "displayName": "Akos Kitta",
    "gitHubUserName": "kittaakos",
    "avatar_url": "url",
    "atlassianAccountId": "712020:7540217d-9c82-4bee-a37c-68ee0169cb23"
  }
]`;
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
