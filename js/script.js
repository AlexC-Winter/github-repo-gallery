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
    console.log(data)
}

githubProfile()