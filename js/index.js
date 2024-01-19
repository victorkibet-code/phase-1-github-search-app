document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('github-form').addEventListener('submit', function (event) {
      event.preventDefault();
    
      const searchInput = document.getElementById('search');
      const searchTerm = searchInput.value.trim();
    
      if (searchTerm) {
        searchUsers(searchTerm);
      } else {
        alert('Please enter a search term');
      }
    });
    
    function searchUsers(searchTerm) {
      const userApiUrl = `https://api.github.com/search/users?q=${searchTerm}`;
    
      fetch(userApiUrl)
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => {
          console.error('Error searching for users:', error);
          alert('Error searching for users. Please try again.');
        });
    }
    
    function displayUsers(users) {
      const userList = document.getElementById('user-list');
      userList.innerHTML = '';
    
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" />
          <p>${user.login}</p>
          <a href="${user.html_url}" target="_blank">Profile</a>
        `;
        listItem.addEventListener('click', () => {
          getUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    }
    
    function getUserRepos(username) {
      const reposApiUrl = `https://api.github.com/users/${username}/repos`;
    
      fetch(reposApiUrl)
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => {
          console.error('Error fetching user repositories:', error);
          alert('Error fetching user repositories. Please try again.');
        });
    }
    
    function displayRepos(repos) {
      const reposList = document.getElementById('repos-list');
      reposList.innerHTML = '';
    
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <p><strong>${repo.name}</strong></p>
          <p>${repo.description || 'No description'}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        reposList.appendChild(listItem);
      });
    }
    })