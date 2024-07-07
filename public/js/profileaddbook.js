// Add a book and a review to onlybooks_db
// If there are data in the inputs from the users,
// first make a fetch POST (to api/book) to the book model addinf title and author,
// then a fecth POST (to api/review) to the review model with rating and the review text adding book_id and reader_id

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#book-title').value.trim();
  const author = document.querySelector('#book-author').value.trim();
  const review_text = document.querySelector('#review-text').value.trim();
  const rating = document.querySelector('#review-rating').value.trim();

  if (title && author && review_text && rating) {
    console.log('fetch POST for a book and the review ');    
    const responseBook = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify({ title, author }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await responseBook.json();
    console.log(data.id);
     
    const responseReview = await fetch(`/api/reviews/${data.id}`, {
      method: 'POST',
      body: JSON.stringify({ review_text, rating }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (responseBook.ok && responseReview.ok) {
          document.location.replace('/profile');
       } else {
          alert('Failed to create book and review');
       }
  }
};

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newFormHandler);
