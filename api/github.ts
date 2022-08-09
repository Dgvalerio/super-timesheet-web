// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
import { Octokit } from '@octokit/core';

const octokit = new Octokit({
  auth: `${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
});

export default octokit;
