// variables for the API call
var calorieRange = "500-1000";
var from = 0
var to = 5





function getFood(foodSearch) {

    var queryURL = "https://api.edamam.com/search?q=" + foodSearch + "&app_id=e24cb921&app_key=378bda3e9001f3259500ebfd83491004&from=" + from + "&to=" + to + "&calories=" + calorieRange;

    $.ajax({
        url: queryURL,
        method: "GET",
        beforeSend: function(){
            $(".preloader").css("visibility", "visible")
        },
        complete: function (){
            $(".preloader").css("visibility", "hidden")
        }
        })

        .then(function (response) {

            //global variable for API object response
            var foodHits = response.hits;
            // console.log(foodHits);

            foodHits.map(itemRecipe => {
                 // variables for each attribute of the receipe
                 var recipeName = $("<h3>").text(itemRecipe.recipe.label);
                //  $(".recipe-name").append(recipeName);
 
                 var ingredients = itemRecipe.recipe.ingredientLines;
                //  $(".ingredients-list").append(listUL);
 
                 var labelHealth = $("<h6>").text(itemRecipe.recipe.healthLabels);
                //  $(".health-label").append(labelHealth);
 
                 var labelDiet = $("<h6>").text(itemRecipe.recipe.dietLabels);
                //  $(".diet-label").append(labelDiet)
 
                 var imagePic = $("<img>").attr("src", itemRecipe.recipe.image);
                //  $(".food-image").append(imagePic);
 
 
 
                 // looping through the ingredients list and formatting into an unordered list
                 var listUL = $("<ul>");
                 for (var i = 0; i < ingredients.length; i++) {
                     listUL.append($("<li>").text(ingredients[i]))
                 }
 
                 // link variable/object URL page with complete instructions - opens in new tab
                 var foodURL = itemRecipe.recipe.url;
                 var linkButton = $("<a>").attr({
                     href: foodURL,
                     target: "_blank"
                 })
                 linkButton.text("Click here for full recipe!");
                 $("link-button").append(linkButton, "<p>");
 
 
 
                 // variable div to append all the recipe variables with stored API object data
                 var recipeAll = $("<div>");
 
                 // all variables appended to Div variable above
                 recipeAll.append(recipeName); // Recipe title
                 recipeAll.append(listUL); // Ingredient list in list form
                 recipeAll.prepend(imagePic); // Image
                 recipeAll.append(labelHealth); // Health restrictions 
                 recipeAll.append(labelDiet); // Diet info - aka Low-carb
                //  recipeAll.append(calServing); // Calories per serving
                //  recipeAll.append(servingPerPerson); // Number of servings from the recipe
                 recipeAll.append(linkButton, "<p>"); // Link to full recipe
                 $(".posted-food").append(recipeAll);
               

            })

                
            


            }




        // }
    ).then(() => $('.posted-food').slick({
        infinite: true,
        nextArrow: $(".slick-next"),
        prevArrow: $(".slick-prev"),
               
    }));
}


// function for submit button
$("#submit-class").on("click", function (e) {
    e.preventDefault();
    var q = $("#search").val();
    getFood(q);
    $("#back-class").css("visibility", "visible");
    $("#next-class").css("visibility", "visible");
    $(".posted-food").empty();
    $("#search").attr('disabled', 'disabled');
    $("#submit-class").attr('disabled', 'disabled');
    // $('.posted-food').slick();
})

$("#again-class").on("click", function (e) {
    location.reload();
});


$(document).ready(function(){
    $("#submit-class").attr("disabled", "true");
    $(".submit-recipe").on("input", function(){
        console.log("Josh");
        if ($(this).val() != "") {
            $("#submit-class").removeAttr("disabled");
        } else {
            $("#submit-class").attr("disabled", "true");        
        }
    });    
});






