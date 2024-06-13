import React, { useEffect, useState, Fragment } from 'react';
import { invoke, view } from '@forge/bridge';
import ForgeReconciler, {
  useConfig,
  Heading,
  DatePicker,
  Image,
  Button,
  LoadingButton,
  Text,
  Textfield,
  SectionMessage,
  Inline,
  Stack,
  User,
  Box,
  ProgressBar,
  Lozenge,
  Label,
  Icon,
  Link,
  LinkButton,
  Checkbox,
  DynamicTable,
  xcss,
  Strong,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalHeader,
  ModalTransition,
  Spinner,
} from '@forge/react';
import { defaultConfig } from './components/Config';
import LoadingComponent from './components/LoadingComponent';
import { fetch } from '@forge/api';

export const App = () => {
  const config = useConfig() || defaultConfig;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState(JSON.parse(config?.usersList || '[]'));
  const [selectedUsers, setSelectedUsers] = useState([]);
  // const [repos, setRepos] = useState(JSON.parse(config?.reposList || '[]'));
  // const [selectedRepos, setSelectedRepos] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [showModalOkBtn, setShowModalOkBtn] = useState(true);

  useEffect(() => {
    // view.getContext().then((context) => {
    //   setContext(context);
    // });
    // invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  const waitForSpecificTime = (callback, delay) => {
    setTimeout(callback, delay);
  };

  const handleUnloadClick = () => {
    setIsLoading(false);
  };

  const handleUserClick = (user) => {
    setUsers(users.filter(u => u !== user));
    setSelectedUsers([...selectedUsers, user]);
  };

  const handleSelectedUserClick = (user) => {
    setSelectedUsers(selectedUsers.filter(u => u !== user));
    setUsers([...users, user]);
  };

  // const handleRepoClick = (repo) => {
  //   setRepos(repos.filter(r => r !== repo));
  //   setSelectedRepos([...selectedRepos, repo]);
  // };

  // const handleSelectedRepoClick = (repo) => {
  //   setSelectedRepos(selectedRepos.filter(r => r !== repo));
  //   setRepos([...repos, repo]);
  // };

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!selectedUsers.length) {
      isValid = false;
      errors.users = 'Please select at least one user.';
    }

    // if (!selectedRepos.length) {
    //   isValid = false;
    //   errors.repos = 'Please select at least one repository.';
    // }

    if (!fromDate || !toDate) {
      isValid = false;
      errors.dateRange = 'Please specify both start and end dates.';
    }

    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (fromDateObj > today) {
      isValid = false;
      errors.fromDateFuture = 'The from date cannot be in the future.';
    }

    if (toDateObj < fromDateObj) {
      isValid = false;
      errors.toDateBeforeFromDate = 'The to date cannot be before the from date.';
    }

    if (toDateObj > today) {
      isValid = false;
      errors.toDateFuture = 'The to date cannot be in the future.';
    }

    let errorsList = '';
    if (!isValid) {
      errorsList = Object.values(errors).map(error => `• ${error}`).join('\n');
    }

    return { isValid, errorsList };
  };

  const listStyle = xcss({
    minWidth: '500px',
    minHeight: '100px',
    borderRadius: 'border.radius',
    borderStyle: 'solid',
    borderWidth: 'border.width',
    borderColor: 'color.border.discovery',
    boxShadow: 'elevation.shadow.overlay',
  });

  const AppForm = () => (
    <Inline space="space.100" alignBlock="start" alignInline="center">
      <Stack space="space.100" alignBlock="start" alignInline="center">
        <LoadingComponent isLoading={isLoading} />
        <Inline key="row1" space="space.100" alignBlock="start" alignInline="center">
          <Row1LeftStack />
          <Row1RightStack />
        </Inline>
        <Inline key="row2" space="space.100" alignBlock="start" alignInline="center">
          <Row2Stack />
        </Inline>
        <Inline key="row3" space="space.100" alignBlock="start" alignInline="center">
          <Box xcss={{ margin: 'space.400' }}>
            <LoadingButton appearance="primary" onClick={handleGetMetricsClick} isLoading={isLoading}>Get Metrics</LoadingButton>
          </Box>
        </Inline>
      </Stack>
    </Inline>
  );

  const Row1LeftStack = () => (
    <Stack space="space.100" grow="hug">
      <Heading as="h2">FromAAAaaa:</Heading>
      <Box xcss={{ margin: 'space.075', minWidth: 200 }}>
        <DatePicker name="startDate" value={fromDate} label="Start Date" description="Select the start date" onChange={(value) => setFromDate(value)} />
      </Box>
      {/* <Heading as="h2">Repos List:AAA1</Heading>
       <Box xcss={listStyle}>
        {repos.map((repo, index) => (
          <Box key={index} xcss={{ margin: 'space.075' }}>
            <LinkButton target='_self' href='#' appearance="subtle" onClick={() => handleRepoClick(repo)}>
              <Icon size='small' glyph="addon" label="repos" />
              <Strong>{repo}</Strong>
            </LinkButton>
          </Box>
        ))}
      </Box>
      <Heading as="h2">Selected Repos:</Heading>
      <Box xcss={listStyle}>
        {selectedRepos.map((repo, index) => (
          <Box key={index} xcss={{ margin: 'space.075' }}>
            <LinkButton target='_self' href='#' appearance="subtle" onClick={() => handleSelectedRepoClick(repo)}>
              <Icon size='small' glyph="addon" label="repos" />
              <Strong>{repo}</Strong>
            </LinkButton>
          </Box>
        ))}
      </Box> */}
    </Stack>
  );

  const Row2Stack = () => (
    <Stack space="space.100" grow="hug">
      <Heading as="h2">Users List:</Heading>
      <Box xcss={listStyle}>
        {users.map((user, index) => (
          <LinkButton key={index} target='_self' href='#' appearance="subtle" onClick={() => handleUserClick(user)}>
            <User accountId={user.atlassianAccountId} />
          </LinkButton>
        ))}
      </Box>
      <Heading as="h2">Selected Users:</Heading>
      <Box xcss={listStyle}>
        {selectedUsers.map((user, index) => (
          <LinkButton key={index} target='_self' href='#' appearance="subtle" onClick={() => handleSelectedUserClick(user)}>
            <User accountId={user.atlassianAccountId} />
          </LinkButton>
        ))}
      </Box>
    </Stack>
  );

  const Row1RightStack = () => (
    <Stack space="space.100" grow="hug">
      <Heading as="h2">To:</Heading>
      <Box xcss={{ margin: 'space.075', minWidth: 200 }}>
        <DatePicker name="endDate" value={toDate} label="End Date" description="Select the end date" onChange={(value) => setToDate(value)} />
      </Box>
      {/* <Heading as="h2">Users List:</Heading>
      <Box xcss={listStyle}>
        {users.map((user, index) => (
          <LinkButton key={index} target='_self' href='#' appearance="subtle" onClick={() => handleUserClick(user)}>
            <User accountId={user.atlassianAccountId} />
          </LinkButton>
        ))}
      </Box>
      <Heading as="h2">Selected Users:</Heading>
      <Box xcss={listStyle}>
        {selectedUsers.map((user, index) => (
          <LinkButton key={index} target='_self' href='#' appearance="subtle" onClick={() => handleSelectedUserClick(user)}>
            <User accountId={user.atlassianAccountId} />
          </LinkButton>
        ))}
      </Box> */}
    </Stack>
  );

  const AppModal = () => (
    <ModalTransition>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <ModalHeader>
            <ModalTitle>{modalHeader}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Text>{modalBody}</Text>
          </ModalBody>
          <ModalFooter>
            {showModalOkBtn && <Button appearance="subtle" onClick={() => setIsModalOpen(false)}>OK</Button>}
          </ModalFooter>
        </Modal>
      )}
    </ModalTransition>
  );

  const head = {
    cells: [
      { "key": "User", "content": "User" },
      { "key": "Commits", "content": "Commits" },
      { "key": "PRs", "content": "PRs" },
      { "key": "Reviews", "content": "Reviews" },
    ],
  };

  const rows = [
    {
      "key": "1",
      "cells": [
        { "key": 0, "content": <User accountId="5b2c4b00d2f5b64e4d21afe4" /> },
        { "key": 1, "content": <Lozenge appearance="success" isBold>20</Lozenge> },
        { "key": 2, "content": <Lozenge appearance="success">30</Lozenge> },
        { "key": 3, "content": "14" }
      ]
    },
    {
      "key": "2",
      "cells": [
        { "key": 0, "content": <User accountId="606242ceaee24000685b8fb1" /> },
        { "key": 1, "content": "20" },
        { "key": 2, "content": "50" },
        { "key": 3, "content": "40" },
      ]
    }
  ];

  const GithubResultTable = () => (
    <DynamicTable
      caption="GitHub Metrics"
      isLoading={isLoading}
      head={head}
      rows={rows}
      isRankable
      emptyView="No data to display"
    />
  );

  // const getMetrics = async () => {
  //   // https://github.com/node-fetch/node-fetch#options
  //   const body = {
  //     "funckey": "424903837056DkLDYIQWwmKokS9sUul",
  //     "userNameList": [
  //       "wolfgangbecker",
  //       "TaylorBriggs"
  //     ],
  //     "fromDate": "2024-01-01",
  //     "toDate": "2024-03-29"
  //   };
  //   //const parsedBody = JSON.stringify(body);
  //   const response = await fetch("https://sefmetrics-rurgymcszq-uc.a.run.app/users-metrics", {
  //     method: 'POST',
  //     body: body,
  //     // headers: {'Content-Type': 'application/json'}
  //   });
  //   const status = response.status;
  //   const data = await response.json();
  //   console.log(data);
  // }


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

  const handleGetMetricsClick = async () => {
    const { isValid, errorsList } = validateForm();
    if (!isValid) {
      setModalHeader('Form Validation');
      setModalBody(errorsList);
      setIsModalOpen(true);
    } else {
      setIsLoading(true);

      const payload = {
        // repos: selectedRepos,
        users: selectedUsers,
        startDate: fromDate,
        endDate: toDate,
      };
   
      //#region Using Backend
      invoke('getMetrics', payload)
        .then((metrics) => {
          console.log("Metrics fetched successfully:", metrics);
          setData(metrics)
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch metrics:", error);
        });
      //#endregion
      // ------------------------
      //#region For Test
      // waitForSpecificTime(() => {
      //   console.log('This code will execute after 3 seconds.');
      //   console.log(payload);
      //   setIsLoading(false);
      // }, 5000);
      //#endregion


    }
  };


  return (
    <>
      <AppForm />
      {isLoading ?
        <Inline space="space.100" alignBlock="center" alignInline="center"><Spinner size={80} /></Inline>
        :
        <GithubResultTable />}
      <AppModal />
    </>
  );
};
