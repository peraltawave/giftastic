var dogsArray = ["German Shepherd", "Anatolian Shepherd", "Border Collie"];

$(document).ready(function() {
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

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#images').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:300px; height:300px; margin-bottom: 20px; text-align: center;">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#images').append(image);
    }

    $('.movImage').on('click', function() {
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
