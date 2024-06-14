import React from 'react';
import  {
  Heading,
  Text,
  Stack,
  Box,
} from '@forge/react';

const Contributions = ({ data }) => {
  return (
    <Stack>
      {/* <Heading as="h2">{data.userName}</Heading> */}
      <Heading as="h3">Contribution Statistics</Heading>
      <Text>Total Commits: {data.contributions.user.contributionsCollection.totalCommitContributions}</Text>
      <Text>Total Pull Requests: {data.contributions.user.contributionsCollection.totalPullRequestContributions}</Text>
      <Text>Total Code Reviews: {data.contributions.user.contributionsCollection.totalPullRequestReviewContributions}</Text>
      <Heading as="h4">Code Review:</Heading>
      <Box>
        {data.contributions.user.contributionsCollection.pullRequestReviewContributionsByRepository.map(repo => (
          <Text key={repo.repository.name}>
            {repo.repository.name}: {repo.contributions.totalCount}
          </Text>
        ))}
      </Box>
      <Heading as="h4">Commits:</Heading>
      <Box>
        {data.contributions.user.contributionsCollection.commitContributionsByRepository.map(repo => (
          <Text key={repo.repository.name}>
            {repo.repository.name}: {repo.contributions.totalCount}
          </Text>
        ))}
      </Box>
      <Heading as="h4">PRs:</Heading>
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
