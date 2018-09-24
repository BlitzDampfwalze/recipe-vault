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
    console.log(data.results[0].title)

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

  let recipeTemplate = `
  <div class="recipes">
  <h2 class="recipe-title"></h2>
  <h5 class="recipe-date">Date: </h5>
  <p class="recipe-content"></p>
  </div>`;

  const getDisplayVaultRecipes = () => {
    $.getJSON('/recipes', recipes => {
      let recipe = recipes.map(post => {
        let element = $(recipeTemplate);
        element.attr('id', post.id);
        element.find('.recipe-title').text(post.title);
        element.find('.recipe-date').text(`Published on: ${post.publishDate}`);
        element.find('.recipe-content').text(post.content);
        return element;
      });
      $('#recipes').html(recipe);
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
