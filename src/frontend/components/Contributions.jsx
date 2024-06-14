import React from 'react';
import  {
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

const Contributions = ({ data }) => {
  return (
    <Stack>
      <Heading as="h2">{data.userName}</Heading>
      <Heading as="h3">Contribution Statistics</Heading>
      <Text>Total Commits: {data.contributions.user.contributionsCollection.totalCommitContributions}</Text>
      <Text>Total Pull Requests: {data.contributions.user.contributionsCollection.totalPullRequestContributions}</Text>
      <Text>Total Reviews: {data.contributions.user.contributionsCollection.totalPullRequestReviewContributions}</Text>
      <Heading as="h4">Review Contributions by Repository:</Heading>
      <Box>
        {data.contributions.user.contributionsCollection.pullRequestReviewContributionsByRepository.map(repo => (
          <Text key={repo.repository.name}>
            {repo.repository.name}: {repo.contributions.totalCount}
          </Text>
        ))}
      </Box>
      <Heading as="h4">Commit Contributions by Repository:</Heading>
      <Box>
        {data.contributions.user.contributionsCollection.commitContributionsByRepository.map(repo => (
          <Text key={repo.repository.name}>
            {repo.repository.name}: {repo.contributions.totalCount}
          </Text>
        ))}
      </Box>
      <Heading as="h4">Pull Request Contributions by Repository:</Heading>
      <Box>
        {data.contributions.user.contributionsCollection.pullRequestContributionsByRepository.map(repo => (
          <Text key={repo.repository.name}>
            {repo.repository.name}: {repo.contributions.totalCount}
          </Text>
        ))}
      </Box>
    </Stack>
  );
};

export default Contributions;
