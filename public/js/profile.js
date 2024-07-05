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

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
