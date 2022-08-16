import octokit from '@/api/github';
import Branch from '@/components/appointment/create/with-github/branch/types';

const getRepositoryBranches = async (repo: string): Promise<Branch.List> => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner: 'lubysoftware',
    repo,
  });

  return response.data;
};

export default getRepositoryBranches;
