function addNewRewiew() {
    console.log('add new review starts >>');
    toggleModal();
    document.getElementById('submit-review').addEventListener('click', submitReview);
}

function toggleModal() {
    // open or close modal based on the class open-modal/close-modal. When modal has open-modal. then the function will close it
    const modal = document.getElementsByClassName('modal')[0];
    if (modal.classList.contains('open-modal')) {
        document.getElementById('close-0').removeEventListener('click', closeModal);
        document.getElementById('close-1').removeEventListener('click', closeModal);
        document.getElementById('submit-review').removeEventListener('click', submitReview);
        // it is important to remove eventListener because it we don't remove it, add events will add up and make the page slow
        closeModal();
    } else {
        openModal();
        document.getElementById('close-0').addEventListener('click', closeModal);
        document.getElementById('close-1').addEventListener('click', closeModal);
    }
}

async function submitReview(e) {
    e.preventDefault();
    // create a new review
    const rating = document.getElementById('raiting')?.value?.trim();
    const review_text = document.getElementById('review')?.value?.trim();
    const bookId = document.getElementsByClassName('book-info')[0].getAttribute('id');
    
    // if rating or review is missing, it will not add the review.
    if (rating && review_text) {
        const response = await fetch(`/api/reviews/${bookId}`, {
            method: 'POST',
            body: JSON.stringify({ rating, review_text }),
            headers: { 'Content-Type': 'application/json' },
          });
        // when the data has been saved, the page will reload to display all the reviews.
          if (response.ok) {
            window.location.reload();
          }
    } else {
        alert('rating and review inputs are required')
    }

}

function openModal() {
    const modal = document.getElementsByClassName('modal')[0];
    const backdrop = document.getElementsByClassName('backdrop')[0];
    modal.classList.add('open-modal');
    backdrop.classList.add('open-modal');
    modal.classList.remove('close-modal');
    backdrop.classList.remove('close-modal');
}

function closeModal() {
    const modal = document.getElementsByClassName('modal')[0];
    const backdrop = document.getElementsByClassName('backdrop')[0];
    modal.classList.add('close-modal');
    backdrop.classList.add('close-modal');
    modal.classList.remove('open-modal');
    backdrop.classList.remove('open-modal');
}


document.getElementById('add-new-review').addEventListener('click', addNewRewiew);