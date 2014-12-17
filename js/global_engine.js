$(document).ready(function()
{
    $("#settings ul").click(function(event)
    {
        $("#settings ul ul").slideToggle();
        $("#settings ul ul li").click(function(e)
        {
            e.stopPropagation()
        });
    });
    $("#logMeOut").click(function(event)
    {
        $.ajax(
        {
            type: "POST",
            url: globalURL + "php/signout.php",
            data:
            {
                signMeOut: true
            },
            success: function(serverResponse)
            {
                console.log(serverResponse);
                if (serverResponse == "success")
                {
                    window.location = globalURL + "login.php";
                }
            }
        });
    });
    var links = [
        "<div><a href='index.php'>Dashboard</a></div>",
        "<div><a href='fooddrink.php'>Food and Drink</a></div>",
        "<div><a href='exercises.php'>Exercises</a></div>",
        "<div><a href='stats.php'>Statistics</a></div>",
    ];
    for (i = 0; i <= links.length - 1; i++)
    {
        $(".menu_panel").append(links[i]);
    }
});
var globalURL = "http://localhost/workout-diary/";
var data = {};
var s;

function localStorageController(key, val, type)
{
    var stor = localStorage.getItem(type);
    var parse = JSON.parse(stor);
    // before i even submit this anywhere, build an object that groups together exercises
    if (!data.hasOwnProperty(type))
    {
        Object.defineProperty(data, type,
        {
            value:
            {},
            enumerable: true,
            writable: true
        });
    }
    if (stor !== null)
    {
        for (keys in parse)
        {
            Object.defineProperty(data[type], keys,
            {
                value: parse[keys],
                enumerable: true,
                writable: true
            });
        }
    }
    // now start appending 
    Object.defineProperty(data[type], key,
    {
        value: val,
        enumerable: true,
        writable: true
    });
    // build a json string
    // the vars are global so everything gets appended
    s = JSON.stringify(data[type]);
    localStorage.setItem(type, s);
}

function whatDate()
{
    var date = new Date(); // create a date object
    var dayOfMonth = date.getDate(); // get our day of the month;
    var dayOfWeek = date.getDay(); // get our day of the week
    var month = date.getMonth();
    var year = date.getFullYear();
    var result = dayOfMonth % 10; // modulo to get remainder, will give val within range 1-4
    var o; // blank ordinal
    if (dayOfMonth >= 4 && dayOfMonth <= 20)
    {
        o = "th";
    }
    // because numbers 4 to 20 are th's ^^
    // everything else follows the same ordinal labelling vv
    else
    {
        switch (result)
        {
            case 1:
                o = "st";
                break;
            case 2:
                o = "nd";
                break;
            case 3:
                o = "rd";
                break;
            default:
                o = "th";
                break;
        }
    }
    var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var write = days[dayOfWeek - 1] + " the " + dayOfMonth + o + " of " + months[month] + " " + year;
    return write;
}

function showWarning(msg)
{
    $("body").append("<div class='warning'>\
    " + msg + "<br /><br />\
    <span class='dismiss'>close x</span>\
    </div>");
    $(".warning").hide().fadeIn();
    $(".warning").click(function()
    {
        $(this).fadeOut(500, function()
        {
            $(this).remove()
        })
    });
}

function dayOfYearCounter()
{
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
}

function getOrdinal(number)
{
    var o; // blank ordinal
    if ((parseInt(number) + 1) >= 4 && (parseInt(number) + 1) <= 20)
    {
        o = "th";
    }
    // because numbers 4 to 20 are th's ^^
    // everything else follows the same ordinal labelling vv
    else
    {
        switch ((parseInt(number) + 1) % 10)
        {
            case 1:
                o = "st";
                break;
            case 2:
                o = "nd";
                break;
            case 3:
                o = "rd";
                break;
            default:
                o = "th";
                break;
        }
    }
    return o;
}
WebFontConfig = {
    google:
    {
        families: ['Raleway::latin']
    }
};
var wf = document.createElement('script');
wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
wf.type = 'text/javascript';
wf.async = 'true';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(wf, s);