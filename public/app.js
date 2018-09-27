$(() => {

  const getApiRecipes = (query, callback) => {
    const settings = {
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
      headers: {
        'X-Mashape-Key': 'kvcVm8vCUSmsh2ZJ9svxOfQZOMMKp1BcOQPjsng9KQrpPmqogE',
        'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
      },
      data: {
        query: query,
        number: '6'
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };
    console.log(query);
    $.ajax(settings);
  };

  const getRecipeDetails = (id, callback) => {
    const settings = {
      url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`,
      headers: {
        'X-Mashape-Key': 'kvcVm8vCUSmsh2ZJ9svxOfQZOMMKp1BcOQPjsng9KQrpPmqogE',
        'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
      },
      dataType: 'json',
      type: 'GET',
      success: callback
    };
    $.ajax(settings);
  }

  const recipeApiDisplaySearch = (data) => {
    console.log(data);
    console.log(data.results[0].title)
    //returns search results with first API call
    const results = data.results.map((recipe, index) => renderApiResult(recipe, data.baseUri));
    $('#search-results').html(results);
  };

  const renderApiResult = (recipe, baseUri) => {
    //called above, returns/places basic recipe information/results in the above .html(results)
    const result = $(`<div class="${recipe.id}">
                        ${recipe.title}
                        <img src="${baseUri}${recipe.image}">
                        <button id="${recipe.id} onclick="getRecipeDetails(recipe.id, savePostRecipe(recipe))">Save</button>
                      </div>`); //on click function, pass it different callback, same as post?
    //clicking a result calls and logs recipe details in the console
    result.click( () => {
      getRecipeDetails(recipe.id, (recipe) => {console.log(recipe);});
    })
    $(`#${recipe.id}`).on('click', savePostRecipe(recipe, getRecipeDetails(recipe.id, ))) //target the save button to trigger save function
  
    return result;
  };

  const savePostRecipe = (recipe) => {
    console.log(recipe);
    // recipeData = {
    //   title: recipe.,
    //   dishType: String,
    //   ingredients: [String], 
    //   instructions: String,
    //   readyInMinutes: Number,
    //   image: String,
    //   servings: Number,
    //   source: String,
    // };
    savePostRecipe()

  };

  const handleSubmit = () => {
    $('#search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#search-input');
    const query = queryTarget.val(); 
    queryTarget.val(''); // clear out the input
    getApiRecipes(query, recipeApiDisplaySearch);
    });
  };


handleSubmit();
});

// unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=1")
// .header("X-Mashape-Key", "kvcVm8vCUSmsh2ZJ9svxOfQZOMMKp1BcOQPjsng9KQrpPmqogE")
// .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
