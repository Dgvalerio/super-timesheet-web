import octokit from '@/api/github';
import Repository from '@/components/appointment/create/with-github/repository/types';

export const getUserRepositories = async (
  username: string
): Promise<Repository.List> => {
  const {
    data: { public_repos: publicRepos, total_private_repos: totalPrivateRepos },
  } = await octokit.request('GET /user');

  const response = await octokit.request('GET /users/{username}/repos', {
    username,
    per_page: publicRepos + (totalPrivateRepos || 0),
  });

  return response.data;
};

export const getOrgRepositories = async (): Promise<Repository.List> => {
  const org = 'lubysoftware';

  const {
    data: { public_repos: publicRepos, total_private_repos: totalPrivateRepos },
  } = await octokit.request('GET /orgs/{org}', { org });

  const response = await octokit.request('GET /orgs/{org}/repos', {
    org,
    per_page: publicRepos + (totalPrivateRepos || 0),
  });

  return response.data;
};
