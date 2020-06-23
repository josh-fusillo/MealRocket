
function randomCocktail(){

var queryURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
        
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        
        .then(function (response) {
            console.log(response.drinks);
        
                    //global variable for API object response
                var drinkName = $("<h4>").text(response.drinks[0].strDrink);
                // console.log(drinkName)

                var drinkImage = $("<img width='150px' height='150px'>").attr("src", response.drinks[0].strDrinkThumb);
                // console.log(drinkImage)
                

        

                        // variable div to append all the recipe variables with stored API object data
                        var drinkAll = $("<div>");
                        var imageAll = $("<div>");
        
                        // all variables appended to Div variable above
                        drinkAll.append(drinkName); 
                        imageAll.append(drinkImage); 
                

        
        
                        // div located on chicken.html file for testing
                        $(".posted-drink").append(drinkAll);
                        $(".posted-drink-image").append(imageAll)
        
        
        
        })

}

// function to run cocktail generator
$("#cocktail-class").on("click", function (e) {
        $(".posted-drink").empty();
        $(".posted-drink-image").empty();
        randomCocktail();

});
