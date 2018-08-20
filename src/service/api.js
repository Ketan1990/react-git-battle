var axios = require('axios');

var id = "234848cdbb68c6453963";
var sec = "43c754b52b25a62bedb87717e304e4619fd81ca6";
var params = "?client_id=" + id + "&client_secret=" + sec;

function getProfile (username) {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(function (user) {
      return user.data;
    });
}

function getRepos (username) {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

function getStarCount(repos){
  return repos.data.reduce(function (count, repo) {
    return count + repo.stargazers_count
  }, 0);
}
function calculateScore(profile,repo ) {
  var followers = profile.followers;
  var totalStars = getStarCount(repo)
  return (followers*3) +totalStars
}

function handleError (error) {
  console.warn(error);
  return null;
}

function getUserData(username) {
  return axios.all([getProfile(username),getRepos(username)])
  .then(function(data){
    const profile=data[0];
    const repo =data[1];
    return {
      profile:profile,
      score:calculateScore(profile,repo),
    };

  });
}

function sortPlayer(players){
  return players.sort(function(a,b){
    return b.score - a.score ;
  })
}
module.exports = {
  battle: function (players) {
      return axios.all(players.map(getUserData))
      .then(function(data){
        return sortPlayer(data)
      })
      .catch (handleError)

  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(function (response) {
        return response.data.items;
      });
  }
};
