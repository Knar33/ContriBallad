const UserContributions = {};

function GetUserContributions(userID) {
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
    piano1[1] = new Howl({ src: ['ContriBallad/Content/sound/piano/39187__jobro__piano-ff-040.wav'] });
    piano1[2] = new Howl({ src: ['ContriBallad/Content/sound/piano/39189__jobro__piano-ff-042.wav'] });
    piano1[3] = new Howl({ src: ['ContriBallad/Content/sound/piano/39190__jobro__piano-ff-043.wav'] });
    piano1[4] = new Howl({ src: ['ContriBallad/Content/sound/piano/39193__jobro__piano-ff-045.wav'] });
    instruments[1] = piano1;

    var piano2 = [];
    piano2[1] = new Howl({ src: ['ContriBallad/Content/sound/piano/39195__jobro__piano-ff-047.wav'] });
    piano2[2] = new Howl({ src: ['ContriBallad/Content/sound/piano/39196__jobro__piano-ff-048.wav'] });
    piano2[3] = new Howl({ src: ['ContriBallad/Content/sound/piano/39198__jobro__piano-ff-050.wav'] });
    piano2[4] = new Howl({ src: ['ContriBallad/Content/sound/piano/39200__jobro__piano-ff-052.wav'] });
    instruments[0] = piano2;

    var drum1 = [];
    drum1[1] = new Howl({ src: ['ContriBallad/Content/sound/drum/snare/82238__kevoy__snare-drum.wav'] });
    drum1[2] = new Howl({ src: ['ContriBallad/Content/sound/drum/snare/387186__alexiero-1__ai-snare-20.wav'] });
    drum1[3] = new Howl({ src: ['ContriBallad/Content/sound/drum/snare/270156__theriavirra__04c-snare-smooth-cymbals-snares.wav'] });
    drum1[4] = new Howl({ src: ['ContriBallad/Content/sound/drum/snare/212208__alexthegr81__tapesnare-15.wav'] });
    instruments[2] = drum1;

    var drum2 = [];
    drum2[1] = new Howl({ src: ['ContriBallad/Content/sound/drum/cymbal/316874__dtrostli__tr-dhita-cymbal02.wav'] });
    drum2[2] = new Howl({ src: ['ContriBallad/Content/sound/drum/cymbal/116968__cbeeching__cymbal-bell-1.wav'] });
    drum2[3] = new Howl({ src: ['ContriBallad/Content/sound/drum/cymbal/102793__mhc__acoustic-ride-cymbal1.wav'] });
    drum2[4] = new Howl({ src: ['ContriBallad/Content/sound/drum/cymbal/339247__inspectorj__cymbal-14-hard-hit-a.wav'] });
    instruments[3] = drum2;

    var guitar1 = [];
    guitar1[1] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162942__project16__c1-ff.wav'] });
    guitar1[2] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162948__project16__d1-ff.wav'] });
    guitar1[3] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162950__project16__d-1-ff.wav'] });
    guitar1[4] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162957__project16__f2-ff.wav'] });
    instruments[4] = guitar1;

    var guitar2 = [];
    guitar2[1] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162961__project16__g2-ff.wav'] });
    guitar2[2] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162966__project16__g-2-ff.wav'] });
    guitar2[3] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162972__project16__a-2-ff.wav'] });
    guitar2[4] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162978__project16__c2-ff.wav'] });
    instruments[5] = guitar2;

    var guitar3 = [];
    guitar3[1] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162984__project16__d2-ff.wav'] });
    guitar3[2] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162987__project16__d-2-ff.wav'] });
    guitar3[3] = new Howl({ src: ['ContriBallad/Content/sound/guitar/162998__project16__g3-ff.wav'] });
    guitar3[4] = new Howl({ src: ['ContriBallad/Content/sound/guitar/163008__project16__a-3-ff.wav'] });
    instruments[6] = guitar3;

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