// Delete a review in onlybooks_db
// If there user click the DELETE button the delete that review

const addFormHandler = async (event) => {
    event.preventDefault();
    console.log('Iniciando addformhandler')
    const bookId = document.querySelector('#books').value.trim();
    const review_text = document.querySelector('#review-text').value.trim();
    const rating = document.querySelector('#review-rating').value.trim();

    if (review_text && rating && bookId) {
        console.log('Si hay datos');
        console.log(bookId);
        // if (event.target.hasAttribute('data-id')) {
        //     console.log('Si hay book_id');
        //     const bookId = event.target.getAttribute('data-id');
            const responseReview = await fetch(`/api/reviews/${bookId}`, {
                method: 'POST',
                body: JSON.stringify({ review_text, rating }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            if (responseReview.ok) {
               document.location.replace('/profile');
            } else {
               alert('Failed to add review');
            }
    }      
};
  
document
    // .querySelector('.select-book-form')
    // .addEventListener('click', console.log('Hola Mundo'));

document
  .querySelector('.add-review-form')
  .addEventListener('click', addFormHandler);
