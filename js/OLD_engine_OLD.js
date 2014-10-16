// both the client and the server need to know a text representation of the date because i want to read it 
// that way later... the following two functions calculate the date then draw in within the dom. 
window.onload = function calculateDate()
{  
    var date = new Date(); // create a date object
    var dayOfMonth = date.getDate(); // get our day of the month;
    var dayOfWeek = date.getDay(); // get our day of the week
    var month = date.getMonth();
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
    // FEED THE PARSER
    writeDate(dayOfMonth,dayOfWeek,month,o);
    // WEEK NUMBER IS ALSO NEEDED UPON DOCUMENT LOAD
    getDateFromDB();
    localStorageMastery(); 
    gatherValues();
    $('.small').on("click",deleteFromLocalStorage);
}

// WRITE THE DATE TO THE DOM
function writeDate(dayOfMonth,dayOfWeek,month,o)
{
    var el = document.getElementById("date");
    var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var write = document.createTextNode(days[dayOfWeek-1] + " the " + dayOfMonth + o + " of " + months[month]);
    el.appendChild(write);
}
// END TIME CALCULATION DIVS

// OBJECT THAT IS BEING WATCHED
// THIS IS SUPER HANDY AS I CAN FIRE STUFF WHEN IT CHANGES
// USED TO STORE XMLHTTPRESPONSE TEXT
var fromPHP = {};

// DATE I/O FUNCTIONS
function getDateFromDB()
{
    ajaxFormer("reset=","donotwant");
    Object.observe(fromPHP, function()
    {
        $('#weekNumber').html(fromPHP.weekNumber);
    }); 
}

function resetWeek()
{
    ajaxFormer("reset=",true);
}

// AJAX HELPER FUNCTION
// REUSE THIS!
function ajaxFormer(key,value)
{
    $.ajax({
        type:   "POST",
        url:    "http://localhost/workout-diary/php/phpBitch.php",
        data:    key+value,
        success: function(text)
        {
            fromPHP.weekNumber = text;
        }
    });
}

// SHOW/HIDE HELPER FUNCTIONS
function showElement(element)
{
    var elToShow = document.getElementById(element);
        elToShow.style.display = "block";
}
function hideElement(element)
{    
    var elToHide = document.getElementById(element);
        elToHide.style.display = "none";
}

function gatherValues()
{
    $.ajax({
        type: 'GET',
        dataType: 'JSON',
        url: 'http://localhost/workout-diary/php/module_pull_exercises.php',
        success: function(response)
        {
            addToHTML(response);
        }
    });
}

var html = [];
var data;

function addToHTML(jsondata)
{
    data = JSON.parse(jsondata);

    for (key in data)
    {
        $("#output").append(data[key].exercise_name + " spends " + data[key].calories + " calories per minute <br />");

        html.push("<option value='" + data[key].exercise_name + "'>" + data[key].exercise_name +  "</option>");
    }

    $("#form").append("<form>\
        <select id='select_exercise'>\
            " + html + "\
        </select>\
        <input type='text' id='input_minutes' onchange='hoDown(this.value,select_exercise.value)'>\
        </form>");
}

var calorieTotals = [];

function hoDown(minutes,exercise)
{

    if (!minutes || isNaN(minutes))
    {
        return false;
    }

    for (i = 0; i <= data.length - 1; i++)
    {
        if (data[i].exercise_name == exercise)
        {
            calorieTotals.push(data[i].calories*minutes);
            $("#header").append("<div>"+minutes+" minutes of "+exercise+"</div>");
            $("#content").append("<div>"+data[i].calories*minutes+"</div>");
            $("#total").html("<h3>Total: "+eval(calorieTotals.join('+'))+"</h3>");
            break;
        }
    }

}

// EVENT LISTENERS

//$('#whatTypeOfCardio').click(function(){
//    console.log(input.id);
//});

var whatTypeOfCardio = document.getElementById("whatTypeOfCardio");
    whatTypeOfCardio.addEventListener("click",bubbleClickedElementId);

$('#testWrapper input[type="button"]').on("click",assumeSelectionBoxValue);

// PRETTY CLEVER
// GETS ID OF WHATEVER THE HELL WAS CLICKED WITHIN A FORM
function bubbleClickedElementId(e)
{
    if (e.target !== e.currentTarget)
    {
        var clicked = e.target.id;
        showElement(clicked.substring(0,clicked.length-3) + "Div");
    }
    e.stopPropagation();

}


function assumeSelectionBoxValue(e)
{
    var idOfInputDiv = e.currentTarget.id;
    var idOfOutputDiv = idOfInputDiv.substr(0,idOfInputDiv.length - 7);
    var actualValue = document.getElementById(idOfOutputDiv).value;
    localStorage.setItem(idOfInputDiv,actualValue);
    $('#sidePane').html("");
    localStorageMastery();
}
function localStorageMastery()
{
    if (localStorage == null)
    {
        $('#sidePane').html("Local Storage is currently empty");
    }
    for (key in localStorage)
    {
    $('#sidePane').append(
            "<span id='divFor"+key+"' class='delete'>"
                +
            "<div id=outputKey"+key+">" 
                + 
                key 
                + 
            "<span class='small'>X</span>"
                +
            "</div>" 
                + 
            "<div id=outputValue"+key+">"
                +
                localStorage.getItem(key) 
                + 
            "</div>"
                +
            "</span>"
            );
    }
    $('.small').on("click",deleteFromLocalStorage);
}

function deleteFromLocalStorage(e)
{
    var captured = e.currentTarget.parentElement.id;
    var shortVer = captured.substr(9,captured.length);
    $('#divFor' + shortVer).remove();
    localStorage.removeItem(shortVer);
}



// BEGIN QUESTION PROCESSING SCRIPTS

var muscleGroups = ['Chest','Triceps','Back and Biceps','Shoulders'];

var count = 0; // important this is global. Used for calculating how many excercises have been done per session.





function did(){
    var elToShow = document.getElementById("didCardio");
    elToShow.style.display = "block";
}

function yesFunc(v){
    showElement("whatCardio");
    hideElement("didCardio");
}

function noFunc(v){
    showElement("whatExcercises");
    hideElement("didCardio");
}


function will(){

}

//submitToPHP(crossTrainerTime.name,crossTrainerTime.value)


function submitToPHP(a,b){ // gets our form values
    // submit to php script via xmlhttp request
    count++; // counts number of times this bastard function is called
    // our variables
    var httpObject = new XMLHttpRequest();
    var exNum = count;
    var cardioExLabel = a + ": "; // can be anything
    var cardioEx = b; // place others here
    // ****** //
        httpObject.open("POST", "http://localhost/workout-diary/php/phpBitch.php", true); // POST to this page
        httpObject.setRequestHeader("Content-type","application/x-www-form-urlencoded");      
        httpObject.send("exNum="+exNum+"&cardioExLabel="+cardioExLabel+"&cardioEx="+cardioEx); //send it! -- the 'cardioEx1=' is key!
            httpObject.onload = function(){ // this happens when much success
                console.log("JS: it worked! Response:");
                    drawOutput(a);
                    console.log(httpObject.responseText);
                    console.log(cardioEx + " -- JS: End of our script");
                    }
    // ****** ****** ****** ****** //
}   

function grabFromPHP(h,hv){
    var httpObject = new XMLHttpRequest();
        console.log("attempting...");
        httpObject.open("POST", "http://localhost/workout-diary/phpBitch.php", true); // POST to this page
        httpObject.setRequestHeader("Content-type","application/x-www-form-urlencoded");      
        httpObject.send(h+hv);
            httpObject.onload = function(){ // this happens when much success
                console.log("JS: it worked! Response:");
                    console.log("grabFromPHP");
                    console.log(httpObject.responseText);
                    onComplete(httpObject.responseText);
            }     
}  

function onComplete(response){

    setTimeout(function(){
           return "sent this" + response;
    }),3000;
    
}

function drawOutput(a){
    var mal = a.substring(0,a.length-4) + "Div";
    var img = document.createElement("img");
    img.src="http://localhost/workout-diary/img/arrow.png";
    document.getElementById(mal).appendChild(img);              
}

function listSets (v,id){
        var initial = document.getElementById(id.substring(0,id.length-7) + "CommitDiv");
        //var a =  // our root element
        var weights = ["4kg","6kg","8kg","10kg","12kg","14kg","16kg","18kg","20kg","22kg","24kg"]; // our weights

        for (var i = 1; i <= v; i++){

        
        var parent = initial.parentNode;

        var label = document.createTextNode("Set number " + i + ": "); 
        var reps = document.createElement("input");
            reps.setAttribute("type","text");
            reps.setAttribute("placeholder","reps of");
            reps.setAttribute("id","repInputBox" + i);
        var middle = document.createTextNode(" Reps of ");
        var select = document.createElement("select");
            select.setAttribute("id","weightSelectBox" + i);
        var breakLine = document.createElement("br");

            for (var q = 0; q < weights.length; q++) {
                var option = document.createElement("option");
                    option.value = weights[q];
                    option.text = weights[q]; 
                    select.appendChild(option);
            }

        parent.insertBefore(label,initial);
        parent.insertBefore(reps,initial);
        parent.insertBefore(middle,initial);
        parent.insertBefore(select,initial);
        parent.insertBefore(breakLine,initial);

        
        }

}

