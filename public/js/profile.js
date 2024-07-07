// This is a switch case for the options of the profile
// Each option sends to a homeRoute
const submitButtonHandler = (event) => {
    event.preventDefault();
    buttonId = document.activeElement.id;

    console.log('boton presionado',buttonId);
    
    switch (buttonId) {
        case 'btn-addbook':
              document.location.replace('/profile/addbook');
              break;
        case 'btn-addreview':
            console.log('pasando por aqui');
              document.location.replace('/profile/addreview');
              break;
        case 'btn-deletereview':
              document.location.replace('/profile/deletereview');
              break;
    }
};
    
document
    .querySelector('.profile-buttons-form')
    .addEventListener('click', submitButtonHandler);
  
