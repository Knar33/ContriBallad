const UserContributions = {};
var sound = new Audio("../sound/Piano1.wav");

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
        contributions.push({
            date: day.getAttribute("data-date"),
            count: day.getAttribute("data-count")
        }); 
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

    setInterval(function() {
        pauseTimer = window.performance.now();
        if ((lastFrameTime + (pauseTimer - pauseStart)) < timePerFrame) {
            isPaused = true;
        } else {
            isPaused = false;
        }
        if (!isPaused) {
            frameStart = window.performance.now();

            const newAudio = document.getElementById('Piano1').cloneNode()
            newAudio.play();

            frameTime = window.performance.now();
            lastFrameTime = frameTime - frameStart;
            pauseStart = window.performance.now();
            isPaused = false;
        }
    }, 1);
}