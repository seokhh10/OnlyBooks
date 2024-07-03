import { faker } from "@faker-js/faker";

//Generate a list of books
export const generateFakeBooks = (numBooks) =>{
const books = [];
for (let i = 0; i < numBooks; i++) {
    const book = {
        title: faker.book.title(),
        author: faker.book.author(),
        PublishDate: faker.book.past(10).toISOString().split('T')[0],
        description: faker.lorem.paragraph(2),
        };
        books.push(book);
}
return books;
};

//Generate 10 books
const fakeBooks = generateFakeBooks(10);
console.log(fakeBooks);