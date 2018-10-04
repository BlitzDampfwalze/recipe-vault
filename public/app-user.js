const createUser = () => {
    const loginTab = $('#loginTab');
    const signupTab = $('#signupTab');
    let isSignup = new URLSearchParams(window.location.search).has("signup")

    const showLogin = () => {
      loginTab.addClass('selected')
      signupTab.removeClass('selected')
      isSignup = false;
    };
    const showSignup = () => {
      signupTab.addClass('selected')
      loginTab.removeClass('selected')
      isSignup = true;
    };

    loginTab.click(showLogin)
    signupTab.click(showSignup)

    if (isSignup) {
      showSignup();
    }

    $('#sign-up').submit(event => {
      event.preventDefault();

    const formData = {};

    $('form').find('.inputs').each(function(index, node) {
      formData[node.id] = node.value;      
    });
    $('form').find('.inputs').each(function(index, node) {
      node.value = '';
    });

    const url = isSignup? '/users' : '/users/login';
    // const result = isSignup? loginResult() : signupResult();

  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(formData)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  })
  .then(user => {
    console.log(user);
    localStorage.setItem(TOKEN, user.token)
    localStorage.setItem(ID, user.id)
    // result    
  })
  // const settings = {
  //   type: 'POST',
  //   url: url,
  //   data: JSON.stringify(formData),
  //   success: '',
  //   contentType: 'application/json',
  //   dataType: 'json'
  // }
  // $.ajax(settings);
  })
}; 
createUser();