//burger nav menu open-close
$(document).ready(function(){
    
    $(".burger-nav").on("click", function(){
        
        //on click 
        //gives class open
        //or takes the class
        $("header nav ul").toggleClass("open");
        $("#answer").css("margin-top", "160px");
        
    });
    
});

var full_plot;
var short_plot;
var id_first;

//get first result with more details
function getanswer(query){    
    
    $.get("https://www.omdbapi.com/?t="+query+"&apikey=9758597e", function(rawdata){

        var rawstring =JSON.stringify(rawdata);
        var data =JSON.parse(rawstring);        

        if (data.Error === "Movie not found!"){
            document.getElementById('answer').innerHTML = "<h1 class='msg'><br><br>Movie not found..</h1>"
            document.getElementById('more_results').innerHTML= "";
        }else if (data.Title===undefined){
            document.getElementById('answer').innerHTML = "<h1 class='msg'><br><br>Search for a movie..</h1>"
            document.getElementById('more_results').innerHTML= "";
        }else{
            var title = data.Title;
            var year = data.Year;
            id_first = data.imdbID;
            var imdbURL="https://www.imdb.com/title/"+data.imdbID+"/";
            var posterURL =data.Poster;
            var duration = data.Runtime;
            var genre = data.Genre;
            var director = data.Director;
            var actors = data.Actors;
            short_plot = data.Plot;

            getFullPlot(title);

            document.getElementById('footer').style.position = "relative";

            
            document.getElementById('answer').innerHTML = "<div class='movie'><h1>"+title+"</h1> <br><img class='poster' src= '"+posterURL+"' alt='Poster'> <button class='bookmark_btn'      id='"+id_first+"' onclick = 'changeImg(this.id)'> <img id='"+id_first   +"unchecked' class='bookmark' src='images/bookmark.png' alt='Bookmark'       height='50px' width='50px'> </button> <br><p>Year Released: "+year+"</p> <p>Duration: "+duration+"</p> <p>Genre: "+genre+"</p> <p>Director: "+director+"</p> <p>Actors: "+actors+"</p> <p>IMDB page:      <a href='"+imdbURL       +"'target='_blank'>"+imdbURL+"</a></p>  <p     id='plot'>Plot: <br>"+short_plot+"</p> <div class='more' id='show-more'> <p    onclick='showMore()'>more detailed plot</p></div></div>";

            if (posterURL=== "N/A"){
                document.getElementById(id_first).style.position = "relative";
            }
            document.getElementById('more_results').innerHTML= "<br>See more results";   
        } 
                             
    }); 
}


//function to retrieve full plot
function getFullPlot(title){
    $.get("https://www.omdbapi.com/?t="+title+"&plot=full&apikey=9758597e", function(rawdata){
        var rawstring =JSON.stringify(rawdata);
        data =JSON.parse(rawstring);
        full_plot =data.Plot;

    });
}

function showMore(){
    document.getElementById('plot').innerHTML ="Plot: <br>"+full_plot+"</p> ";
    document.getElementById("show-more").innerHTML = "<p onclick='showLess()'>less detailed plot</p>";
}

function showLess(){
    document.getElementById('plot').innerHTML ="Plot: <br>"+short_plot+"</p> ";
    document.getElementById('show-more').innerHTML ="<p onclick='showMore()'>more detailed plot</p>";
}

//show more results with less details
function moreResults(query){
    document.getElementById('more_results').innerHTML= "";
    document.getElementById('footer').style.position = "relative";
    
    $.get("https://www.omdbapi.com/?s="+query+"&apikey=9758597e", function(rawdata){

        var rawstring =JSON.stringify(rawdata);
        var data =JSON.parse(rawstring);
        var i=0;

        while(i<data.Search.length){

            var id = data.Search[i].imdbID;
            
            if (id_first!==id) {

                var title = data.Search[i].Title;
                var year = data.Search[i].Year;
                var imdbURL = "https://www.imdb.com/title/" + data.Search[i].imdbID + "/";
                var posterURL = data.Search[i].Poster;
                var type = data.Search[i].Type;
                        
                document.getElementById('more_answers').innerHTML += "<div class='movie'> <h1>"+title+"</h1> <br><img class='poster' src= '"+posterURL+"' alt='Poster'> <button class='bookmark_btn' id='"+id+"' onclick = 'changeImg(this.id)'> <img id='"+id+"unchecked' class='bookmark' src='images/bookmark.png' alt='Bookmark' height='50px'width='50px'> </button><p>Year Released:"+year+"</p> <p>Type: "+type+"</p>  <p>IMDB page: <a href='"+imdbURL     +"'target='_blank'>"+imdbURL+"</a><p></div>";
                   
                if (posterURL=== "N/A"){
                    document.getElementById(id).style.position = "relative";
                }
            }
            i++;            
            
        }
   
    });
}

// function to change bookmark image
function changeImg(id){
    var unchecked = id+"unchecked";
    var checked = id+"checked";
    
    if (document.getElementById(unchecked) !== null){
        document.getElementById(id).innerHTML = "<img id='"+id+"checked' class='bookmark' src='images/bookmarked.png' alt='Bookmark' height='50px'       width='50px'>";
        
        //add to Database
    
    }else if (document.getElementById(checked) !== null){
        document.getElementById(id).innerHTML = "<img id='"+id+"unchecked' class='bookmark' src='images/bookmark.png' alt='Bookmark' height='50px' width='50px'>";
        
        //remove from Database
    }
    
}

//erase 'more results' for the next search
function handleChange() {
    document.getElementById('more_answers').innerHTML = "";
    document.getElementById('footer').style.position = "absolute";
}


// login/register form movement
function register(){
    var log = document.getElementById("login");
    var reg = document.getElementById("register");
    var btn = document.getElementById("btn");
    
    log.style.left = "-450px";
    reg.style.left = "50px";
    btn.style.left = "110px";
}

function login(){
    var log = document.getElementById("login");
    var reg = document.getElementById("register");
    var btn = document.getElementById("btn");
    
    log.style.left = "50px";
    reg.style.left = "550px";
    btn.style.left = "0px";
}
