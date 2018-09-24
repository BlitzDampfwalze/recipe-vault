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

  const recipeApiResults = (data) => {
    console.log(data);
  };

  const handleSubmit = () => {
    $('#search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('#search-input');
    const query = queryTarget.val(); 
    queryTarget.val(''); // clear out the input
    getApiRecipes(query, recipeApiResults);
    });
  };

  const getDisplayVaultRecipes = () => {}

handleSubmit();
});

// unirest.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?number=1")
// .header("X-Mashape-Key", "kvcVm8vCUSmsh2ZJ9svxOfQZOMMKp1BcOQPjsng9KQrpPmqogE")
// .header("X-Mashape-Host", "spoonacular-recipe-food-nutrition-v1.p.mashape.com")
// .end(function (result) {
//   console.log(result.status, result.headers, result.body);
// });
