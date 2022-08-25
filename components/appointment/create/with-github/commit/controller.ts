import octokit from '@/api/github';
import Commit from '@/components/appointment/create/with-github/commit/types';

// todo: get from authentication
const author = 'dgvalerio';

const getBranchCommits = async (
  repo: string,
  sha: string
): Promise<Commit.List> => {
  const options = { owner: 'lubysoftware', author, repo, sha, per_page: 100 };

  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/commits',
    options
  );

  if (!response.headers.link) return response.data;

  const search = /page=(\d+)>; rel="last"/gm;

  const execArray = search.exec(response.headers.link);

  if (!execArray) return response.data;

  let list: Commit.List = [];

  const pages = Number(execArray[1]);

  for (let page = 1; page <= pages; page++) {
    const response = await octokit.request(
      'GET /repos/{owner}/{repo}/commits',
      { ...options, page }
    );

    list = list.concat(response.data);
  }

  return list;
};

export default getBranchCommits;
