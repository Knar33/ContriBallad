const UserContributions = {};

function GetUserContributions(userID) {
    //Make API call to https://github.com/users/userID/contributions
    var resData;

    $.ajax({
        url: "https://github.com/users/" + userID + "/contributions",
        method: 'get',
        crossDomain: true,
        dataType: 'jsonp html',
        statusCode: {
            200: function (data) {
                resData = data;
                $("#graph").InnerHTML = data;
            },
            404: function (data) {
                resData = data;
                $("#graph").InnerHTML = "That user does not exist.";
            },
        }
    });

    //Parse the data into an array of Day/Contributions
    const calendarGraph = $(".js-calendar-graph")[0];
    const dailyContributions = $(".day");
    const contributions = [];

    for (let day of dailyContributions){
        newContribution = {
            date: day.getAttribute("data-date"),
            count: day.getAttribute("data-count")
        };
        if (day.getAttribute("fill") == "#ebedf0") {
            newContribution.contributionDepth = 0
        };
        if (day.getAttribute("fill") == "#c6e48b") {
            newContribution.contributionDepth = 1
        };
        if (day.getAttribute("fill") == "#7bc96f") {
            newContribution.contributionDepth = 2
        };
        if (day.getAttribute("fill") == "#239a3b") {
            newContribution.contributionDepth = 3
        };
        if (day.getAttribute("fill") == "#196127") {
            newContribution.contributionDepth = 4
        };
        contributions.push(newContribution); 
    }
    
    //set that array to UserContributions.DailyContributions
    UserContributions.DailyContributions = contributions;
}
  
function PlaySong() {
    var running = true;
    var timePerFrame = (300);
    var frameEnd = 0;
    var frameStart = window.performance.now();
    var lastFrameTime = 0;
    var isPaused = true;
    var pauseTimer = 0;
    var pauseStart = window.performance.now();

    var totalNotes = UserContributions.DailyContributions.length;
    var currentNote = 0;

    setInterval(function() {
        pauseTimer = window.performance.now();
        if ((lastFrameTime + (pauseTimer - pauseStart)) < timePerFrame) {
            isPaused = true;
        } else {
            isPaused = false;
        }
        if (!isPaused) {
            if (currentNote === totalNotes) {
                currentNote = 0;
            }
            frameStart = window.performance.now();

            var depth = UserContributions.DailyContributions[currentNote].contributionDepth;
            if (depth != 0) {
                var instrumentNote = "piano" + depth;
                const newAudio = document.getElementById(instrumentNote).cloneNode();
                newAudio.play();
            }

            frameTime = window.performance.now();
            lastFrameTime = frameTime - frameStart;
            pauseStart = window.performance.now();
            isPaused = false;
            currentNote++;
        }
    }, 1);
}