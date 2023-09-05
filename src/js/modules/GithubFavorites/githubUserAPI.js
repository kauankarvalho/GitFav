export class GithubUserAPI {
  static search(username) {
    const url = `https://api.github.com/users/${username}`
    return fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const { login, avatar_url, html_url, name, public_repos, followers } =
          json
        return {
          login,
          avatar_url,
          html_url,
          name,
          public_repos,
          followers,
        }
      })
  }
}
