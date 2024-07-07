// Delete a review in onlybooks_db
// If there user click the DELETE button the delete that review

const deleteFormHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
      const reviewId = event.target.getAttribute('data-id');
      console.log(reviewId);
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete review');
      }
    }
  };
  
  document
    .querySelector('.delete-review-form')
    .addEventListener('click', deleteFormHandler);
  