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
}