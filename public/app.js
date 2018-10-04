
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
        const settings = {
          type: 'POST',
          url: '/recipes',
          data: JSON.stringify(data),
          contentType: 'application/json',
          dataType: 'json'
        }        
        $.ajax(settings);                 
          }, //end of success
    }; 
    $.ajax(settings);
  };

  const recipeApiDisplaySearch = (data) => {   
    console.log(data);
    //returns search results with first API call
    const results = data.results.map((recipe, index) => renderApiResult(recipe, data.baseUri));
    $('#search-results').html(results);
  };

  const renderApiResult = (recipe, baseUri) => {
    
    const result = $(`<div class="${recipe.id}">
                        ${recipe.title}
                        <img src="${baseUri}${recipe.image}">
                        <button id="${recipe.id}">Save</button>                        
                      </div>                      
                      `); 
    
    result.click( () => {

      handleSave(recipe);
    })

    return result;
  };

  const handleSave = (recipe, baseUri) => {
    $('#search-results').on('click', `#${recipe.id}`, function(event){
      console.log(recipe.id);
      getRecipeDetails(recipe.id, baseUri);
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
