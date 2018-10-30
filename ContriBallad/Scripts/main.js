const UserContributions = {};

function GetUserContributions(userID) {
    //Make API call to https://github.com/users/userID/contributions
    var resData;

    $.ajax({
        url: "contributions/" + userID,
        method: 'get',
        dataType: 'html',
        async: false,
        statusCode: {
            200: function (data) {
                resData = data;
                $("#graph").html(data);
            },
            400: function (data) {
                resData = data;
                $("#graph").html("That user does not exist.");
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
    var instruments = [];

    var piano1 = [];
    piano1[1] = new Howl({ src: ['Content/sound/piano/39187__jobro__piano-ff-040.wav'], preload: true });
    piano1[2] = new Howl({ src: ['Content/sound/piano/39189__jobro__piano-ff-042.wav'], preload: true });
    piano1[3] = new Howl({ src: ['Content/sound/piano/39190__jobro__piano-ff-043.wav'], preload: true });
    piano1[4] = new Howl({ src: ['Content/sound/piano/39193__jobro__piano-ff-045.wav'], preload: true });
    instruments[1] = piano1;

    var piano2 = [];
    piano2[1] = new Howl({ src: ['Content/sound/piano/39195__jobro__piano-ff-047.wav'], preload: true });
    piano2[2] = new Howl({ src: ['Content/sound/piano/39196__jobro__piano-ff-048.wav'], preload: true });
    piano2[3] = new Howl({ src: ['Content/sound/piano/39198__jobro__piano-ff-050.wav'], preload: true });
    piano2[4] = new Howl({ src: ['Content/sound/piano/39200__jobro__piano-ff-052.wav'], preload: true });
    instruments[0] = piano2;

    var drum1 = [];
    drum1[1] = new Howl({ src: ['Content/sound/drum/snare/82238__kevoy__snare-drum.wav'], preload: true });
    drum1[2] = new Howl({ src: ['Content/sound/drum/snare/387186__alexiero-1__ai-snare-20.wav'], preload: true });
    drum1[3] = new Howl({ src: ['Content/sound/drum/snare/270156__theriavirra__04c-snare-smooth-cymbals-snares.wav'], preload: true });
    drum1[4] = new Howl({ src: ['Content/sound/drum/snare/212208__alexthegr81__tapesnare-15.wav'], preload: true });
    instruments[2] = drum1;

    var drum2 = [];
    drum2[1] = new Howl({ src: ['Content/sound/drum/cymbal/316874__dtrostli__tr-dhita-cymbal02.wav'], preload: true });
    drum2[2] = new Howl({ src: ['Content/sound/drum/cymbal/116968__cbeeching__cymbal-bell-1.wav'], preload: true });
    drum2[3] = new Howl({ src: ['Content/sound/drum/cymbal/102793__mhc__acoustic-ride-cymbal1.wav'], preload: true });
    drum2[4] = new Howl({ src: ['Content/sound/drum/cymbal/339247__inspectorj__cymbal-14-hard-hit-a.wav'], preload: true });
    instruments[3] = drum2;

    var guitar1 = [];
    guitar1[1] = new Howl({ src: ['Content/sound/guitar/c1.wav'], preload: true });
    guitar1[2] = new Howl({ src: ['Content/sound/guitar/d1.wav'], preload: true });
    guitar1[3] = new Howl({ src: ['Content/sound/guitar/ds1.wav'], preload: true });
    guitar1[4] = new Howl({ src: ['Content/sound/guitar/f1.wav'], preload: true });
    instruments[4] = guitar1;

    var guitar2 = [];
    guitar2[1] = new Howl({ src: ['Content/sound/guitar/g1.wav'], preload: true });
    guitar2[2] = new Howl({ src: ['Content/sound/guitar/gs1.wav'], preload: true });
    guitar2[3] = new Howl({ src: ['Content/sound/guitar/as1.wav'], preload: true });
    guitar2[4] = new Howl({ src: ['Content/sound/guitar/c2.wav'], preload: true });
    instruments[5] = guitar2;

    var bass1 = [];
    bass1[1] = new Howl({ src: ['Content/sound/bass/162942__project16__c1-ff.wav'], preload: true });
    bass1[2] = new Howl({ src: ['Content/sound/bass/162948__project16__d1-ff.wav'], preload: true });
    bass1[3] = new Howl({ src: ['Content/sound/bass/162950__project16__d-1-ff.wav'], preload: true });
    bass1[4] = new Howl({ src: ['Content/sound/bass/162957__project16__f2-ff.wav'], preload: true });
    instruments[6] = bass1;

    var totalNotes = UserContributions.DailyContributions.length;
    var currentNote = 0;

    setInterval(function() {
        if (currentNote >= totalNotes) {
            currentNote = 0;
        }

        for (i = 0; i < 7; i++) {
            var notePlusOffset = currentNote + i;
            
            if (notePlusOffset < totalNotes) {
                var depth = UserContributions.DailyContributions[notePlusOffset].contributionDepth;
                if (depth != 0) {
                    instruments[i][depth].play();
                }
            }
        }
        currentNote += 7;
    }, 300);
}

$(window).on('load', function () {
    GetUserContributions("knar33");
    PlaySong();
});

function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}