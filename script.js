
const teams = [
        {
            group: "Group A", name: ["Mexico", "South Africa", "South Korea", "Czech Republic"], images:["/images/a_group/mexico.png", "/images/a_group/southafrica.png", "/images/a_group/southkorea.png", "/images/a_group/czechia.png"]
        },
        {
            group: "Group B", name: ["Canada", "Bosnia", "Qatar", "Switzerland"], images:["/images/b_group/canada.png", "/images/b_group/bosnia.png", "/images/b_group/qatar.png", "/images/b_group/switzerland.png"]
         },
        {
            group: "Group C", name: ["Brazil", "Haiti", "Morocco", "Scotland"], images:["/images/c_group/brazil.png", "/images/c_group/morocco.png", "/images/c_group/haiti.png", "/images/c_group/scotland.png"]
        },
        {
            group: "Group D", name: ["USA", "Paraguay", "Australia", "Turkey"], images:["/images/d_group/usa.png", "/images/d_group/paraguay.png", "/images/d_group/australia.png", "/images/d_group/turkey.png"]
        },
        {
            group: "Group E", name: ["Germany", "Curacao", "Ivory Coast", "Ecuador"], images:["/images/e_group/germany.png", "/images/e_group/curacao.png", "/images/e_group/ivorycoast.png", "/images/e_group/ecuador.png"]
        },
        {
            group: "Group F", name: ["Netherlands", "Japan", "Sweden", "Tunisia"], images:["/images/f_group/netherlands.png", "/images/f_group/japan.png", "/images/f_group/sweden.png", "/images/f_group/tunisia.png"]
        },
        {
            group: "Group G", name: ["Belgium", "Egypt", "Iran", "New Zealand"], images:["/images/g_group/belgium.png", "/images/g_group/egypt.png", "/images/g_group/iran.png", "/images/g_group/newzealand.png"]
        },
        {
            group: "Group H", name: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"], images:["/images/h_group/spain.png", "/images/h_group/capeverde.png", "/images/h_group/saudiarabia.png", "/images/h_group/uruguay.png"]
        },
        {
            group: "Group I", name: ["France", "Senegal", "Iraq", "Norway"], images:["/images/i_group/france.png", "/images/i_group/senegal.png", "/images/i_group/iraq.png", "/images/i_group/norway.png"]
        },
        {
            group: "Group J", name: ["Argentina", "Algeria", "Austria", "Jordan"], images:["/images/j_group/argentina.png", "/images/j_group/algeria.png", "/images/j_group/austria.png", "/images/j_group/jordan.png"]
        },
        {
            group: "Group K", name: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"], images:["/images/k_group/portugal.png", "/images/k_group/drcongo.png", "/images/k_group/uzbekistan.png", "/images/k_group/colombia.png"]
        },
        {
            group: "Group L", name: ["England", "Croatia", "Ghana", "Panama"], images:["/images/l_group/england.png", "/images/l_group/croatia.png", "/images/l_group/ghana.png", "/images/l_group/panama.png"]
        }

]

const rankings = [[], [], [], [], [], [], [], [], [], [], [], []]
const groupStage = document.getElementById("group-stage")
let html = "";
for (let i = 0; i <teams.length; i ++) {
    html += "<h2>" + teams[i].group + "</h2>"
    html += "<ul id='group-" + i + "'>";
    for (let j = 0; j<teams[i].name.length; j++) {
        html += "<li id='team-" + teams[i].name[j] + "'><img src='" + teams[i].images[j] + "'>" + teams[i].name[j] + "<button onclick='pickTeam(\"" + teams[i].name[j] + "\", " + i + ")'> Pick </button></li>"

    }
    html += "</ul>";
}
groupStage.innerHTML = html;
function pickTeam(teamName, groupIndex) {
    console.log( teamName, groupIndex )
    const groupList = document.getElementById("group-" + groupIndex)
    console.log(groupList)
    if (rankings[groupIndex].length<4 && !(rankings[groupIndex].includes(teamName))) {
        rankings[groupIndex].push(teamName)
    }
    console.log(rankings)
    const teamList = document.getElementById("team-" + teamName)
    if (rankings[groupIndex][0] === teamName) {
    teamList.style.border = "2px solid gold"
    }
    if (rankings[groupIndex][1] === teamName) {
        teamList.style.border = "2px solid silver"
    }
    if (rankings[groupIndex][2] === teamName) {
        teamList.style.border = "2px solid #CD7F32"
    }
    if (rankings[groupIndex].length === 3) {
        const lastTeam = teams[groupIndex].name.find(function(team) {
            return !(rankings[groupIndex].includes(team))
        })
        const lastTeamElement = document.getElementById("team-" + lastTeam)
        lastTeamElement.style.border = "2px solid red"
    }
    const allGroupsDone = rankings.every(function(group) {
        return group.length >= 2
    })

    if (allGroupsDone) {
        roundOf32()
    }

}
const knockoutStage = document.getElementById("knockout-stage")
function roundOf32 () {
    knockoutStage.innerHTML = "<h2>Round of 32</h2>" + "<br>" + "<p>" + rankings[0][1] + " vs " + rankings[1][1] + "</p>"+
        "<p>" + rankings[5][0] + " vs " + rankings[2][1] + "</p>"
        +"<p>" + rankings[2][0] + " vs " + rankings[5][1] + "</p>"
        + "<p>" + rankings[4][1] + " vs " + rankings[8][1] + "</p>"
        + "<p>" + rankings[10][1] + " vs " + rankings[11][1] + "</p>"
        + "<p>" + rankings[7][0] + " vs " + rankings[9][1] + "</p>"
        + "<p>" + rankings[9][0] + " vs " + rankings[7][1] + "</p>"
        + "<p>" + rankings[3][1] + " vs " + rankings[6][1] + "</p>"
}