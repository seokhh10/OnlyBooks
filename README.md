# OnlyBooks - Your best ally in Book reviews  🤓 📖

Check out  reviews of books of your interest, such as classics, best sellers, reference books, etc.

OnlyBooks is a community for book reviews and consultations, which helps you make the right decision when choosing the book you want to read or buy in almost any genre.

# PROJECT USER STORY
- AS someone interested in reading and/or buying a book,
I want to know the community's opinion on the book, So based on the score and reviews, I consider whether the book is worth it according to my preferences.

- AS an active reader, I want to contribute my review of a certain book to help the community make a more accurate choice when they choose to read and/or buy a book.

# ACCEPTANCE CRITERIA:

- It's done WHEN I load the website,
THEN I am presented with a main page where I see "Today's recommendations", reviews by other users, and on the header I can click a button to LOG IN and/or REGISTER.

- It's done WHEN I click Register,
THEN a modal pops up with the necesary info to create a new account (username, password, e-mail).

- It's done WHEN I have created my account
THEN I can LOG IN to view and post reviews.

- It's done WHEN I enter to create a new review
THEN I write the book name, score and review to upload into the database.

- It's done WHEN I view the main page,
THEN I am presented with a list of review posts that are pulled from the database.

- It's done WHEN reviews have been added,
THEN I can see them in "My reviews" in order of when they were last updated.


### Acceptance Criteria

* It's done when the `/` homepage route renders a list of 5 books, display the last 3 reviews of our users, an a list  of all our books.

* It's done when the `/login` route renders a form to log in and a form to create a new account.

* It's done when an existing user can enter their credentials on the login page to create a session on the server.

* It's done when a new user can create an account on the login page and then be immediately logged in with a session

* It's done when the `/` book/:id route render all the reviews if the user has an account.

* It's done when the `/` review/

* It's done when the API routes to create book if user has an account.

* It's done when the API routes to create review if user has an account.

* It's done when the API routes to delete revies if user has an account.

* It's done when only a logged in user can visit the `/profile` route.

* It's done when a logged in user is redirected to `/profile` when they try to visit `/login` again.

* It's done when a user on the profile page can use the form to create a new book in the database.

* It's done when a user on the profile page can use the form to create a new review in the database.

* It's done when a logged-in user can select a "Logout" button to remove their session.

* It's done when the session for a logged-in user expires after a set time.
