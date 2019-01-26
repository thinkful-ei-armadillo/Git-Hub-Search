/* $ */
'use strict';

const options = {
  headers: new Headers({
    'Accept': 'application/vnd.github.v3+json'
  })
};

function displayResults(responseJson){
  $('#results').empty();
  $('#js-error-message').empty(); 
  for (let i = 0; i < responseJson.length; i++){
    $('#results').append(
      `<li><a href="${responseJson[i].svn_url}">${responseJson[i].name}</a></li>`  
    ); 
  }  
} 

function getRepos(userName){
  const url = `https://api.github.com/users/${userName}/repos`; 
  fetch(url, options)
    .then(response => {
      if(response.ok){
        return response.json(); 
      }
      throw new Error(`${response.status}: ${response.statusText}`); 
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => { 
      $('#js-error-message').html(`Something went wrong! </br> ${error.message}`); 
    });  
}

function watchForm(){
  $('.js-form').submit(function(event){
    event.preventDefault(); 
    const userName = ($('.js-input-field').val());
    $('.js-input-field').val('');
    getRepos(userName);  
  }); 
}



$(watchForm); 