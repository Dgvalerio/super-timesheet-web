import octokit from '@/api/github';
import Commit from '@/components/appointment/create/with-github/commit/types';

const getBranchCommits = async (
  repo: string,
  sha: string
): Promise<Commit.List> => {
  const response = await octokit.request('GET /repos/{owner}/{repo}/commits', {
    owner: 'lubysoftware',
    repo,
    sha,
  });

  return response.data;
};

export default getBranchCommits;
