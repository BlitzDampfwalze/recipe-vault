// function() {
//   var initialDiv = $('#ingredients-wrapper');
//   var i = $('#ingredients-wrapper p').length + 1;
  
//   $('#addBox').on('click', function() {
//           $(`<p><div class="removeBox">
//             <label for="ingredient"><input type="text" id="ingredient" class="inputs" size="20" name="ingredient_' + ${i} +'" value="" placeholder="Input Value" /></label> 
//             <a href="#" class="removeBox">Remove</a>
//             </div>
//             </p>`).appendTo(initialDiv);
//           i++;
//           return false;
//   });
  
//   $('.removeBox').on('click', function() { 
//           if( i > 2 ) {
//                   $('.removeBox').parents('p').remove();
//                   i--;
//           }
//           return false;
//   });
// };

// RECIPE POST SUBMISSION
// const handleRecipeEntry = () => {
  // $('#recipe-entry').submit(event => {
  //   event.preventDefault();
  //   const 
  // })
// }

// const submitForm = (form) => {
//   const url = form.attr('action');
//   const formData = {};
//   $(form).find('input[id]').each(function(index, node) {
//     formData[node.id] = node.value;
//   });
//   $.post(url, formData).done(function (data) {
//     alert(data);
//   });
// }

$(() => {
const searchParams = new URLSearchParams(window.location.search)
const isEdit = searchParams.has('edit')
const recipeID = searchParams.get('edit');
const authToken = localStorage.getItem(TOKEN);

if (isEdit) {
  //retrieve data for this recipe, then populate the fields with it.
  fetch(`/recipes/${recipeID}`, 
  {
    headers: {
      "x-auth": authToken,
    }
  }
  ).then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject();
  }).then(body => {
    const recipe = body.recipe;
    // $('#title').val(recipe.title);
    // $('#dishType').val(recipe.dishType);
    $('form').find('.inputs').each(function(index, node) {
      node.value = recipe[node.id];      
    });
  })
}

$('#recipe-entry').submit(event => {
  event.preventDefault();

  const formData = {};

  // console.log($('form').find('.inputs'))
  $('form').find('.inputs').each(function(index, node) {
    formData[node.id] = node.value;      
  });
  $('form').find('.inputs').each(function(index, node) {
    node.value = '';
  });
  console.log(formData)
  const url = isEdit? `/recipes/${recipeID}` : '/recipes'
  fetch(url, {
    headers: {
      "x-auth": authToken,
      "Content-Type": "application/json; charset=utf-8"
    },
    method: 'PUT',
    body: JSON.stringify(formData)
  }).then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject();
  }).then(body => console.log(body))

})
})
