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

  const getRecipeDetails = (id, baseUri) => {
    const settings = {
      url: `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/${id}/information`,
      headers: {
        'X-Mashape-Key': 'kvcVm8vCUSmsh2ZJ9svxOfQZOMMKp1BcOQPjsng9KQrpPmqogE',
        'X-Mashape-Host': 'spoonacular-recipe-food-nutrition-v1.p.mashape.com'
      },
      dataType: 'json',
      type: 'GET',
      success: (recipe) => {
        const ingredients = []
        recipe.extendedIngredients.map((item, index) => {
          ingredients.push(item.original);
        })
        const data = { 
          "title": recipe.title,
          "dishType": recipe.dishTypes[0],
          "ingredients": ingredients, 
          "instructions": recipe.instructions,
          "readyInMinutes": recipe.readyInMinutes,
          "image": `${baseUri}${recipe.image}`,
          "servings": recipe.servings,
          "source": recipe.sourceUrl,
        }
        console.log(ingredients)
        console.log(recipe)
        const settings = {
          type: 'POST',
          url: '/recipes',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json'
        }
        console.log(recipe.title, recipe.dishTypes[0], recipe.instructions, recipe.readyInMinutes, recipe.image, recipe.servings, recipe.sourceUrl)
        $.ajax(settings);            
          }, //end of success function
    }; //settings
    $.ajax(settings);
  };

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
                        <button id="${recipe.id}">Save</button>                        
                      </div>                      
                      `); 
                      // onclick="getRecipeDetails(recipe.id, savePostRecipe(recipe))"
                      //on click function, pass it different callback, same as post?
    //clicking a result calls and logs recipe details in the console
    handleSave(recipe.id);
    result.click( () => {
      getRecipeDetails(recipe.id, baseUri);
      
      // recipe => console.log(recipe)
    }) 
    // $(`#${recipe.id}`).on('click', savePostRecipe(recipe, getRecipeDetails(recipe.id, ))) //target the save button to trigger save function
  
    return result;
  };

  const handleSave = (id) => {
    $('#search-results').on('click', '#id', function(event){
      console.log(id);
    });
  }

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
