const UserContributions = {};

function GetUserContributions(userID) {
    //Make API call to https://github.com/users/userID/contributions
    var resData;

    $.ajax({
        url: "contributions/" + userID,
        method: 'get',
        dataType: 'text/html',
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

        switch(day.getAttribute("fill")) {
            case "#ebedf0":
                newContribution.contributionDepth = 0
                break;
            case "#c6e48b":
                newContribution.contributionDepth = 1
                break;
            case "#7bc96f":
                newContribution.contributionDepth = 2
                break;
            case "#239a3b":
                newContribution.contributionDepth = 3
                break;
            case "#196127":
                newContribution.contributionDepth = 4
                break;
        };
        contributions.push(newContribution); 
    }
    
    //set that array to UserContributions.DailyContributions
    UserContributions.DailyContributions = contributions;
}
  
function PlaySong() {
    var totalNotes = UserContributions.DailyContributions.length;
    var currentNote = 0;

    setInterval(function() {
        if (currentNote >= totalNotes) {
            currentNote = 0;
        }

        for (i = 0; i < 7; i++) {
            var instrument = "piano";
            switch(i) {
                case 0:
                    instrument = "piano2-";
                    break;
                case 1:
                    instrument = "piano1-";
                    break;
                case 2:
                    instrument = "drum1-";
                    break;
                case 3:
                    instrument = "drum2-";
                    break;
                case 4:
                    instrument = "guitar1-";
                    break;
                case 5:
                    instrument = "guitar2-";
                    break;
                case 6:
                    instrument = "guitar3-";
                    break;
            }
            var notePlusOffset = currentNote + i;
            
            if (notePlusOffset < totalNotes) {
                var depth = UserContributions.DailyContributions[notePlusOffset].contributionDepth;
                if (depth != 0) {
                    var instrumentNote = instrument + depth;
                    const newAudio = document.getElementById(instrumentNote).cloneNode();
                    newAudio.play();
                }
            }
        }
        currentNote += 7;
    }, 300);
}

$(window).on('load', function () {
    GetUserContributions("Knar33");
    PlaySong();
});