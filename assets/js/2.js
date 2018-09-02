var dogsArray = ["German Shepherd", "Anatolian Shepherd", "Border Collie"];

$(document).ready(function () {
    for (var i = 0; i < dogsArray.length; i++) {
        $("#dog-buttons").append("<button type='button' onclick='searchGif(\"" + dogsArray[i] + "\")' class='btn btn-primary' value=' " + dogsArray[i] + "'> " + dogsArray[i] + " </button>");
    }
});

function dogButtonClicked() {
    var userInput = $('#dog-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#dog-input').val();
    console.log(userInput);

    if (userInput) {
        $('#dog-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(imgName) {
    $.ajax({
        url: 'https://api.giphy.com/v1/gifs/search?q= ' + imgName + ' &api_key=dc6zaTOxFJmzC&limit=9',
        type: 'GET',
    })
        .done(function (response) {
            showGif(response);
        })
}



var playIcon = $('#clicker').on('click', function () {
    alert("Hi")
    
    });

    // $('#clicker').on('click', function () {
    //     alert("Hi")}

// var playIcon = $('.fas fa-play').on('click', function () {
//     var state = $(this).attr('data-state');
//     if (state == 'still') {
//         $(this).attr('src', $(this).attr("data-animate"));
//         $(this).attr('data-state', 'animate');
//     } else {
//         $(this).attr('src', $(this).attr("data-still"));
//         $(this).attr('data-state', 'still');
//     }

//     });

    console.log(playIcon);

function showGif(response) {
    var displayIcon = "<div id='clicker'><i class='fas fa-play'></i></div>";
    $('#images').empty();
    for (var i = 0; i < response.data.length; i++) { //this is the length of the data in the response object
        var rating = "<div class='ratings'> Rated:  " + (response.data[i].rating) + " | " + displayIcon + "</div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            '" data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:300px; height:300px; margin-bottom: 20px;">';

        image = '<div class="col-md-4">' + image + '<hr width="300"></div>';
        $('#images').append(image);
    }

    $('.movImage').on('click', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
        });

    }


    