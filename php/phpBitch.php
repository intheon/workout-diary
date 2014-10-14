<?php  
// this will get values from my cardio form and put them in the db
$db = mysqli_connect('localhost','root','','hiya'); // the trick to success

if (isset($_POST['exNum']))
{
    $exNum = $_POST['exNum']; // what column to go in
}
else
{
    $exNum = null;
}

if (isset($_POST['cardioEx']))
{
    $ex = $_POST['cardioEx']; 
}
else
{
    $ex = null;
}

if (isset($_POST['cardioExLabel']))
{
    $label = $_POST['cardioExLabel'];
}
else
{
    $label = null;
}

// THIS CHUNK PULLS OUT MOST RECENT WEEK UPON PAGE LOAD
// IF A TRUE RESET FLAG IS SENT THEN RESET THE WEEK BACK TO DEFAULT
if (isset($_POST['reset']))
{
    $reset = $_POST['reset'];

    if ($reset == "donotwant")
    {
        $getLastWeekInTable = mysqli_query($db,"SELECT week_num FROM workout ORDER BY id DESC LIMIT 0, 1");
        while($row = mysqli_fetch_array($getLastWeekInTable)) 
        {
            echo $row['week_num'];
        }  
    }

    else if ($reset == true)
    { // set the week to start counting at 1 again
        $resetWeekNum = mysqli_query($db,"UPDATE workout SET week_num='1' WHERE week_num");
        $getLastWeekInTable = mysqli_query($db,"SELECT week_num FROM workout ORDER BY id DESC LIMIT 0, 1");
        while($row = mysqli_fetch_array($getLastWeekInTable)) 
        {
            echo $row['week_num'];
        }   
    }
}
//
//

        $full = $label . $ex; // i want my database to at least be readable

        if ($exNum == 1){
            $tblName = 'cardioOne';
            iAmTheFirst($db,$tblName,$full);
        }
        else if ($exNum == 2){
            $tblName = 'cardioTwo';
            partOfPack($db,$tblName,$full);
        }
        else if ($exNum == 3){
            $tblName = 'cardioThree';
            partOfPack($db,$tblName,$full);
        }
        else if ($exNum == 4){
            $tblName = 'cardioFour';
            partOfPack($db,$tblName,$full);
        }
        else if ($exNum == 5){
            $tblName = 'cardioFive';
            partOfPack($db,$tblName,$full);
        }
        else if ($exNum == 6){
            $tblName = 'cardioSix';
            partOfPack($db,$tblName,$full);
        }
        

        function iAmTheFirst($db,$tblName,$full){

            if (mysqli_connect_errno()) {
                echo "could not connect due to: " . mysqli_connect_error();
            } // check its ok

            $sql = "INSERT INTO workout ($tblName) VALUES ('$full')";
            $addFirstExcercise = mysqli_query($db,$sql);
                
            mysqli_close($db); // close connection
        }

        function partOfPack($db,$tblName,$full){

            $sql = "SELECT * FROM `workout` where `id`= (SELECT MAX(id) FROM `workout`)";
            $latestId =  mysqli_query($db,$sql); // grab most recent id 

            while ($row = mysqli_fetch_assoc($latestId)){
                    $id_result = $row['id'];
                    echo $id_result;
                } // cycle through our returned query

            $sqlAction = "UPDATE workout SET $tblName = '$full' WHERE id = '$id_result'";
            $addRemaining = mysqli_query($db,$sqlAction);

            mysqli_close($db); // close connection
        }

                // SQL Playground
                
                //$getExcercise = "SELECT id,cardioOne,cardioTwo FROM workout ORDER BY id DESC LIMIT 1";
                
                //$jk2 = mysqli_query($db,$getExcercise);
                //$jk3 = mysqli_query($db,);
                //...
                // ensure it doesnt fuck up again

                //if (!mysqli_query($db,$jk1)){
                  //      die ("naw man! " . mysqli_error($db));
                //}

        //echo $_SERVER['QUERY_STRING']; // this gets the whole query string


        //echo $_SERVER;




?>