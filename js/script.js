const overviewDiv = document.querySelector(".overview");
console.log(overviewDiv);
// The div for the overview profile section

const username = "AlexC-Winter"
// GitHub usernamne

const githubProfile = async function () {
    const res = await fetch(
        `https://api.github.com/users/${username}`
    )
    const data = await res.json()
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
}