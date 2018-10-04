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

const submitButton = $('#add-recipe');
const editButton = $('#edit-recipe');
let isEdit = new URLSearchParams(window.location.search).has("edit")

const showSubmit = () => {
  submitButton.removeClass('hidden')
  postRecipe();
};

const showEdit = () => {
  editButton.removeClass('hidden')
  editRecipe();
};

submitButton.click(showSubmit)
editButton.click(showEdit)

if (isEdit) {
  showEdit();
}
else {
  showSubmit();
}

})

const postRecipe = () => {

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
  const settings = {
    type: 'POST',
    url: '/recipes',
    data: JSON.stringify(formData),
    // data: { 
    //   "title": String,
    //   "dishType": String,
    //   "ingredients": [String], 
    //   "instructions": String,
    //   "readyInMinutes": Number,
    //   "image": String,
    //   "servings": Number,
    //   "source": String,
    // },
    // success: '',
    contentType: 'application/json',
    dataType: 'json'
  }
  $.ajax(settings);
  })
}; 

const editRecipe = () => {};
