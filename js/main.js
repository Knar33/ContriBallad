var UserContributions = {};
var Notes = ["c1", "cs1", "d1", "ds1", "e1", "f1", "fs1", "g1", "gs1", "a1", "as1", "b1", "c2", "cs2", "d2", "ds2", "e2", "f2", "fs2", "g2", "gs2", "a2", "as2", "b2", "c3"];
var MinorScale = [0, 2, 3, 5, 7, 8, 10, 12];
var MajorScale = [0, 2, 4, 5, 7, 9, 11, 12];
var DoubleHarmonicScale = [0, 3, 4, 5, 8, 9, 11, 12];
var instruments = [];
var oldColors = [];
var urlParams = new URLSearchParams(window.location.search);
var UserID = urlParams.get("u") || "knar33";
var SongPaused = true;
var currentNote = 0;

function GetUserContributions(userID) {
    $("#graph").html("Loading user data from Github...<br><img src='images/loading.gif' />");
    pauseSong();
    currentNote = 0;
    var resData;
    oldColors = [];

    $.ajax({
        url: "https://contriballad.herokuapp.com/https://github.com/users/" + userID.toLowerCase() + "/contributions",
        method: 'get',
        dataType: 'text',
        async: false,
        statusCode: {
            200: function (data) {
                resData = data;
                UserID = userID.toLowerCase();
                $("#hiddenGraph").html(data);
                $("#graph").html($("#hiddenGraph .js-calendar-graph-svg")[0].outerHTML);
                $("#hiddenGraph").html("");
                $("#errorBox").html("");
            },
            404: function (data) {
                resData = data;
                $("#errorBox").html("<span style='color: red;'>That user does not exist.</span>");
                $("#graph").html("");
            }
        }
    });
    
    const calendarGraph = $(".js-calendar-graph")[0];
    const dailyContributions = $(".day");
    const contributions = [];

    for (let day of dailyContributions){
        newContribution = {
            date: day.getAttribute("data-date"),
            count: day.getAttribute("data-count")
        };

        //There are two colors for each case because of Halloween color changes. 
        //If any other color changes happen, additional cases need to be added.
        switch(day.getAttribute("fill")) {
            case "#ebedf0":
                newContribution.contributionDepth = 0;
                day.style.fill = "#ebedf0";
                break;
            case "#c6e48b":
            case "#ffee4a":
                newContribution.contributionDepth = 1;
                day.style.fill = "#c6e48b";
                break;
            case "#7bc96f":
            case "#ffc501":
                newContribution.contributionDepth = 2;
                day.style.fill = "#7bc96f";
                break;
            case "#239a3b":
            case "#fe9600":
                newContribution.contributionDepth = 3;
                day.style.fill = "#239a3b";
                break;
            case "#196127":
            case "#03001c":
                newContribution.contributionDepth = 4;
                day.style.fill = "#196127";
                break;
        }
        contributions.push(newContribution); 
    }
    
    UserContributions.DailyContributions = contributions;

    var scale = [];
    var startingLetter;

    if (UserID[0] == '-') {
        startingLetter = 0;
    }
    else {
        startingLetter = UserID.charCodeAt(0) - 97;
    }

    if (startingLetter % 2 === 0) {
        scale = MinorScale;
    }
    else {
        scale = MajorScale;
    }
    var startingNote = Math.floor(startingLetter / 2);

    SetInstruments(scale, startingNote)
}

function SetInstruments(scale, startingNote) {
    var piano1 = [];
    piano1[1] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[0]] + '.wav'], volume: 1, preload: true });
    piano1[2] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[1]] + '.wav'], volume: 1, preload: true });
    piano1[3] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[2]] + '.wav'], volume: 1, preload: true });
    piano1[4] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[3]] + '.wav'], volume: 1, preload: true });
    instruments[1] = piano1;

    var piano2 = [];
    piano2[1] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[4]] + '.wav'], volume: 1, preload: true });
    piano2[2] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[5]] + '.wav'], volume: 1, preload: true });
    piano2[3] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[6]] + '.wav'], volume: 1, preload: true });
    piano2[4] = new Howl({ src: ['sound/piano/' + Notes[startingNote + scale[7]] + '.wav'], volume: 1, preload: true });
    instruments[0] = piano2;

    var drum1 = [];
    drum1[1] = new Howl({ src: ['sound/drum/snare/' + (startingNote + 0) + '.wav'], volume: 1, preload: true });
    drum1[2] = new Howl({ src: ['sound/drum/snare/' + (startingNote + 1) + '.wav'], volume: 1, preload: true });
    drum1[3] = new Howl({ src: ['sound/drum/snare/' + (startingNote + 2) + '.wav'], volume: 1, preload: true });
    drum1[4] = new Howl({ src: ['sound/drum/snare/' + (startingNote + 3) + '.wav'], volume: 1, preload: true });
    instruments[2] = drum1;

    var drum2 = [];
    drum2[1] = new Howl({ src: ['sound/drum/cymbal/' + (startingNote + 0) + '.wav'], volume: 1, preload: true });
    drum2[2] = new Howl({ src: ['sound/drum/cymbal/' + (startingNote + 1) + '.wav'], volume: 1, preload: true });
    drum2[3] = new Howl({ src: ['sound/drum/cymbal/' + (startingNote + 2) + '.wav'], volume: 1, preload: true });
    drum2[4] = new Howl({ src: ['sound/drum/cymbal/' + (startingNote + 3) + '.wav'], volume: 1, preload: true });
    instruments[3] = drum2;

    var bass1 = [];
    bass1[1] = new Howl({ src: ['sound/bass/' + Notes[startingNote + scale[0]] + '.wav'], volume: 1, preload: true });
    bass1[2] = new Howl({ src: ['sound/bass/' + Notes[startingNote + scale[2]] + '.wav'], volume: 1, preload: true });
    bass1[3] = new Howl({ src: ['sound/bass/' + Notes[startingNote + scale[4]] + '.wav'], volume: 1, preload: true });
    bass1[4] = new Howl({ src: ['sound/bass/' + Notes[startingNote + scale[6]] + '.wav'], volume: 1, preload: true });
    instruments[4] = bass1;

    var guitar1 = [];
    guitar1[1] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[0]] + '.wav'], volume: 0.8, preload: true });
    guitar1[2] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[1]] + '.wav'], volume: 0.8, preload: true });
    guitar1[3] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[2]] + '.wav'], volume: 0.8, preload: true });
    guitar1[4] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[3]] + '.wav'], volume: 0.8, preload: true });
    instruments[5] = guitar1;

    var guitar2 = [];
    guitar2[1] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[4]] + '.wav'], volume: 0.8, preload: true });
    guitar2[2] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[5]] + '.wav'], volume: 0.8, preload: true });
    guitar2[3] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[6]] + '.wav'], volume: 0.8, preload: true });
    guitar2[4] = new Howl({ src: ['sound/guitar/' + Notes[startingNote + scale[7]] + '.wav'], volume: 0.8, preload: true });
    instruments[6] = guitar2;
}
  
function PlaySong() {
    var totalNotes = UserContributions.DailyContributions.length;

    setInterval(function() {
        if (!SongPaused) {
            if (currentNote >= totalNotes) {
                currentNote = 0;
            }

            for (i = 0; i < 7; i++) {
                var notePlusOffset = currentNote + i;

                var newColor
                var oldColor
                if (notePlusOffset < totalNotes) {
                    var depth = UserContributions.DailyContributions[notePlusOffset].contributionDepth;
                    
                    switch (depth) {
                        case 0:
                            oldColor = "#ebedf0";
                            newColor = "#f9ccf5";
                            break;
                        case 1:
                            oldColor = "#c6e48b";
                            newColor = "#ffa5f7";
                            break;
                        case 2:
                            oldColor = "#7bc96f";
                            newColor = "#ff7ff3";
                            break;
                        case 3:
                            oldColor = "#239a3b";
                            newColor = "#fc53ec";
                            break;
                        case 4:
                            oldColor = "#196127";
                            newColor = "#910083";
                            break;
                    }
                    
                    if (depth !== 0) {
                        instruments[i][depth].play();
                    }
                }

                $("#graph rect").eq(notePlusOffset).css("fill", newColor);
                if (notePlusOffset > 6) {
                    $("#graph rect").eq(notePlusOffset - 7).css("fill", oldColors[i]);
                }
                else {
                    $("#graph rect").eq(364 + i).css("fill", oldColors[i]);
                }
                oldColors[i] = oldColor;
            }
            currentNote += 7;
        }
    }, 300);
}

function pauseSong() {
    SongPaused = true;
    $("#songToggle").attr("onClick", "ResumeSong()").attr("value", "Play");
}

function ResumeSong() {
    SongPaused = false;
    $("#songToggle").attr("onClick", "pauseSong()").attr("value", "Pause");
}

$(window).on('load', function () {
    GetUserContributions(UserID);
    PlaySong();
});

function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}