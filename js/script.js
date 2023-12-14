const overviewDiv = document.querySelector(".overview");
// The div element for the overview profile section
const username = "AlexC-Winter"
// GitHub username
const repoList = document.querySelector(".repo-list")
// ul of repos
const repoSecClass = document.querySelector(".repos")
// section class where repo info appears
const repoDataSecClass = document.querySelector(".repo-data")
// section class where individual repo data appears
const backButton = document.querySelector(".view-repos")
// Back to repo gallery button
const filterInput = document.querySelector(".filter-repos")
// input with search by name placeholder


const githubProfile = async function () {
    const userInfo = await fetch(
        `https://api.github.com/users/${username}`
    )
    const data = await userInfo.json()
    userDisplay(data)
}

githubProfile()

const userDisplay = function(data){
    const div = document.createElement("div")
    div.classList.add("user-info")
    div.innerHTML= `
        <figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div> `
    overviewDiv.append(div)
    githubRepos()
}


const githubRepos = async function () {
    const repoFetch = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    )
    const repoData = await repoFetch.json()
    repoDisplay(repoData)
}

const repoDisplay = function(repoData) {
    filterInput.classList.remove("hide")
    for (const repo of repoData) {
        const repoItem = document.createElement("li")
        repoItem.classList.add("repo")
        repoItem.innerHTML = `<h3>${repo.name}<h3/>`
        repoList.append(repoItem)
    }
}

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText
        getRepoInfo(repoName)
    }
})

const getRepoInfo = async function(repoName){
    const repoInfoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`)
    const repoInfo = await repoInfoFetch.json()
    console.log(repoInfo)

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language)
    }

    displayRepoInfo(repoInfo, languages)
}

const displayRepoInfo = function(repoInfo, languages){
    repoDataSecClass.innerHTML = "";
    repoDataSecClass.classList.remove("hide");
    repoSecClass.classList.add("hide");
    backButton.classList.remove("hide")
    const div = document.createElement("div")
    div.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <p>Link: alexc-winter.github.io/${repoInfo.name}/
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoDataSecClass.append(div)
}

backButton.addEventListener("click", function(){
    repoSecClass.classList.remove("hide")
    repoDataSecClass.classList.add("hide")
    backButton.classList.add("hide")
})

filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();
  
    for (const repo of repos) {
      const repoLowerText = repo.innerText.toLowerCase();
      if (repoLowerText.includes(searchLowerText)) {
        repo.classList.remove("hide");
      } else {
        repo.classList.add("hide");
      }
    }
})