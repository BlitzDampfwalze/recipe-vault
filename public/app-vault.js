let recipeTemplate = `
<div class="vault-recipes">
<h2 class="recipe-title"></h2>
<div class="recipe-type"></div>
<ul class="recipe-ingredients"></ul>
<div class="recipe-instructions"></div>
<div class="recipe-readyInMinutes"></div>
<div class="recipe-image"></div>
<div class="recipe-servings"></div>
<div class="recipe-source"></div>
<div class="recipe-date">Date: </div>
</div>`;
const getDisplayVaultRecipes = () => {
  $.getJSON('/recipes', res => {
    let recipe = res.recipes.map(post => {
      let element = $(recipeTemplate);
      element.attr('id', post.id);
      element.find('.recipe-title').text(post.title);
      element.find('.recipe-type').text(`Dish type: ${post.dishType}`);
      element.find('.recipe-ingredients').html(post.ingredients.map(ingredient => `<li>${ingredient}</li>`));
      element.find('.recipe-instructions').text(post.instructions);
      element.find('.recipe-readyInMinutes').text(`Ready in ${post.readyInMinutes} minutes`);
      element.find('.recipe-image').text(post.image);
      element.find('.recipe-servings').text(`Servings: ${post.servings}`);
      element.find('.recipe-source').text(`Source: ${post.source}`);
      element.find('.recipe-date').text(`Published on: ${new Date(post.created).toDateString()}`);
      return element;
    });
    $('#vault-recipes-wrapper').html(recipe);
  });
};

getDisplayVaultRecipes();