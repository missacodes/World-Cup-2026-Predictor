
const teams = [
        {
            group: "Group A", name: ["Mexico", "South Africa", "South Korea", "Czech Republic"], images:["images/a_group/mexico.png", "images/a_group/southafrica.png", "images/a_group/southkorea.png", "images/a_group/czechia.png"]
        },
        {
            group: "Group B", name: ["Canada", "Bosnia", "Qatar", "Switzerland"], images:["images/b_group/canada.png", "images/b_group/bosnia.png", "images/b_group/qatar.png", "images/b_group/switzerland.png"]
         },
        {
            group: "Group C", name: ["Brazil", "Haiti", "Morocco", "Scotland"], images:["images/c_group/brazil.png", "images/c_group/haiti.png", "images/c_group/morocco.png", "images/c_group/scotland.png"]
        },
        {
            group: "Group D", name: ["USA", "Paraguay", "Australia", "Turkey"], images:["images/d_group/usa.png", "images/d_group/paraguay.png", "images/d_group/australia.png", "images/d_group/turkey.png"]
        },
        {
            group: "Group E", name: ["Germany", "Curacao", "Ivory Coast", "Ecuador"], images:["images/e_group/germany.png", "images/e_group/curacao.png", "images/e_group/ivorycoast.png", "images/e_group/ecuador.png"]
        },
        {
            group: "Group F", name: ["Netherlands", "Japan", "Sweden", "Tunisia"], images:["images/f_group/netherlands.png", "images/f_group/japan.png", "images/f_group/sweden.png", "images/f_group/tunisia.png"]
        },
        {
            group: "Group G", name: ["Belgium", "Egypt", "Iran", "New Zealand"], images:["images/g_group/belgium.png", "images/g_group/egypt.png", "images/g_group/iran.png", "images/g_group/newzealand.png"]
        },
        {
            group: "Group H", name: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"], images:["images/h_group/spain.png", "images/h_group/capeverde.png", "images/h_group/saudiarabia.png", "images/h_group/uruguay.png"]
        },
        {
            group: "Group I", name: ["France", "Senegal", "Iraq", "Norway"], images:["images/i_group/france.png", "images/i_group/senegal.png", "images/i_group/iraq.png", "images/i_group/norway.png"]
        },
        {
            group: "Group J", name: ["Argentina", "Algeria", "Austria", "Jordan"], images:["images/j_group/argentina.png", "images/j_group/algeria.png", "images/j_group/austria.png", "images/j_group/jordan.png"]
        },
        {
            group: "Group K", name: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"], images:["images/k_group/portugal.png", "images/k_group/drcongo.png", "images/k_group/uzbekistan.png", "images/k_group/colombia.png"]
        },
        {
            group: "Group L", name: ["England", "Croatia", "Ghana", "Panama"], images:["images/l_group/england.png", "images/l_group/croatia.png", "images/l_group/ghana.png", "images/l_group/panama.png"]
        }

]

const rankings = []
for (let i = 0; i < teams.length; i++) {
    rankings.push(teams[i].name.slice())
}
const third = []
const teamImages = {}
for (let i = 0; i < teams.length; i++) {
    for (let j = 0; j < teams[i].name.length; j++) {
        teamImages[teams[i].name[j]] = teams[i].images[j]
    }
}
const rankBorders = ["2px solid gold", "2px solid silver", "2px solid #CD7F32", "2px solid red"]
let dragSource = null
const groupStage = document.getElementById("group-stage")
let html = "";
for (let i = 0; i < teams.length; i++) {
    html += "<div class='group-card'>"
    html += "<h2>" + teams[i].group + "</h2>"
    html += "<ul id='group-" + i + "'></ul>";
    html += "</div>";
}
groupStage.innerHTML = html;
for (let i = 0; i < teams.length; i++) {
    renderGroup(i)
}
function renderGroup (groupIndex) {
    let groupHtml = ""
    for (let j = 0; j < rankings[groupIndex].length; j++) {
        const teamName = rankings[groupIndex][j]
        groupHtml += "<li id='team-" + groupIndex + "-" + j + "' draggable='true' style='border: " + rankBorders[j] + "'"
            + " ondragstart='dragStart(event, " + groupIndex + ", " + j + ")'"
            + " ondragover='allowDrop(event)'"
            + " ondrop='dropTeam(event, " + groupIndex + ", " + j + ")'>"
            + "<img src='" + teamImages[teamName] + "'>" + teamName
            + "</li>"
    }
    document.getElementById("group-" + groupIndex).innerHTML = groupHtml
}
function dragStart (event, groupIndex, rankIndex) {
    dragSource = { groupIndex: groupIndex, rankIndex: rankIndex }
}
function allowDrop (event) {
    event.preventDefault()
}
function dropTeam (event, groupIndex, rankIndex) {
    event.preventDefault()
    if (dragSource !== null && dragSource.groupIndex === groupIndex && dragSource.rankIndex !== rankIndex) {
        const swap = rankings[groupIndex][dragSource.rankIndex]
        rankings[groupIndex][dragSource.rankIndex] = rankings[groupIndex][rankIndex]
        rankings[groupIndex][rankIndex] = swap
        renderGroup(groupIndex)
    }
    dragSource = null
}
const knockoutStage = document.getElementById("knockout-stage")
let currentRound = {}
function roundOf32 () {
    const matches = [
        [rankings[0][1], rankings[1][1]],
        [rankings[5][0], rankings[2][1]],
        [rankings[2][0], rankings[5][1]],
        [rankings[4][1], rankings[8][1]],
        [rankings[10][1], rankings[11][1]],
        [rankings[7][0], rankings[9][1]],
        [rankings[9][0], rankings[7][1]],
        [rankings[3][1], rankings[6][1]],
        [rankings[4][0], third[0]],
        [rankings[8][0], third[1]],
        [rankings[0][0], third[2]],
        [rankings[11][0], third[3]],
        [rankings[3][0], third[4]],
        [rankings[6][0], third[5]],
        [rankings[1][0], third[6]],
        [rankings[10][0], third[7]]
    ]
    startRound(matches, "Round of 32", roundOf16)
}
function roundOf16 (matches) {
    startRound(matches, "Round of 16", quarterFinals)
}
function quarterFinals (matches) {
    startRound(matches, "Quarterfinals", semiFinals)
}
function semiFinals (matches) {
    startRound(matches, "Semifinals", finalRound)
}
function finalRound (matches) {
    startRound(matches, "Final", null)
}
function startRound (matches, roundName, nextRound) {
    currentRound = { matches: matches, winners: new Array(matches.length).fill(null), name: roundName, next: nextRound }
    let roundHtml = "<h2>" + roundName + "</h2>" + "<br>" + "<ul>"
    for (let i = 0; i < matches.length; i++) {
        roundHtml += "<li id='match-" + i + "'>"
            + "<img src='" + teamImages[matches[i][0]] + "'>"
            + "<span id='pick-" + matches[i][0] + "'>" + matches[i][0] + "</span>"
            + "<button onclick='pickWinner(\"" + matches[i][0] + "\", " + i + ")'> Pick </button>"
            + "<span> vs </span>"
            + "<img src='" + teamImages[matches[i][1]] + "'>"
            + "<span id='pick-" + matches[i][1] + "'>" + matches[i][1] + "</span>"
            + "<button onclick='pickWinner(\"" + matches[i][1] + "\", " + i + ")'> Pick </button>"
            + "</li>"
    }
    roundHtml += "</ul>"
    knockoutStage.innerHTML = roundHtml
}
function pickWinner (teamName, matchIndex) {
    if (currentRound.winners[matchIndex] === null) {
        currentRound.winners[matchIndex] = teamName
        const pickedElement = document.getElementById("pick-" + teamName)
        pickedElement.style.border = "2px solid gold"
    }
    const allPicked = currentRound.winners.every(function(winner) {
        return winner !== null
    })
    if (allPicked) {
        if (currentRound.winners.length === 1) {
            showChampion(currentRound.winners[0])
        } else {
            const nextMatches = []
            for (let i = 0; i < currentRound.winners.length; i += 2) {
                nextMatches.push([currentRound.winners[i], currentRound.winners[i + 1]])
            }
            currentRound.next(nextMatches)
        }
    }
}
function showChampion (teamName) {
    knockoutStage.innerHTML += "<h2>Champion</h2>"
        + "<p class='champion'><img src='" + teamImages[teamName] + "'> " + teamName + "</p>"
}
function pickThird () {
    let html3 = "<h2>Pick the 8 best 3rd placed teams</h2>"
        for (let i = 0; i < rankings.length; i++) {
            html3 += "<li id='third-" + rankings[i][2] + "'><img src='" + teamImages[rankings[i][2]] + "'>" + rankings[i][2] + "<button onclick='selectThird(\"" + rankings[i][2] + "\")'> Pick </button></li>"
        }
        knockoutStage.innerHTML = html3;
}

function selectThird(teamName){
    if (third.length<8 && !(third.includes(teamName))) {
        third.push(teamName)
        const thirdElement = document.getElementById("third-" + teamName)
        thirdElement.style.border = "2px solid green"
    }
    if (third.length === 8) {
        roundOf32()
    }
}
