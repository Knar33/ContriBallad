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
    setInterval(function() {
        const newAudio = document.getElementById('Piano1').cloneNode()
        newAudio.play();
    }, 100);
}