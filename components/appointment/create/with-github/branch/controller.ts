import octokit from '@/api/github';
import Branch from '@/components/appointment/create/with-github/branch/types';

const getRepositoryBranches = async (
  owner: string,
  repo: string
): Promise<Branch.List> => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner,
    repo,
  });

  return response.data;
};

export default getRepositoryBranches;
