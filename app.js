//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}


UI.prototype.addBookToList = function (book){
  const list = document.querySelector('#book-list');
  //create tr element to add book
  const row = document.createElement('tr');
  //Insert Cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#"  class="delete">X</a></td>
  `;
  list.appendChild(row);
}

//Show Alert

UI.prototype.showAlert = function (message, className) {
  //Create div
  const div = document.createElement('div');
  //Add classes to div
  div.className = `alert ${className}`;
  //Add text
  div.appendChild(document.createTextNode(message));
  //Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  container.insertBefore(div, form);

  //timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();  
  }, 3000);
}

//Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

//Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById("isbn").value = '';
}

document.getElementById('book-form').addEventListener('submit', function(e){
  //Get form values 
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  //Instantiate books 
  const book = new Book(title, author, isbn);

  //Instatiate UI
  const ui = new UI();
  
  //validate
  if(title === '' || author == '' || isbn === ''){
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    //Add book to list
    ui.addBookToList(book);

    //Clear Fields
    ui.clearFields();
  }

  console.log(ui);

  console.log(book);
  e.preventDefault();
});

//Event Listener for Delete book
document.getElementById('book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);
  //Show message
  ui.showAlert('Book Removed', 'success');
  e.preventDefault(); 
}); 