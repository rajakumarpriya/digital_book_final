import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorDetils } from '../entitys/athor.details.model';
import { Observable } from 'rxjs';
import { AuthorService } from './author.service';
import { ResponseConstants } from '../constants/response-constants';
import { BaseResponse } from '../entitys/base-response.model';
import { BookDetails } from '../entitys/book-details.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  email: string = "";
  password: string = "";
  showRegistrationForm: boolean = false;
  showLoginForm: boolean = true;
  showBooks: boolean = false;
  publishButton: boolean = false;
  publishTable: boolean = false;
  saveBook: boolean = false;
  booksButton: boolean = false;
  logoutButton: boolean = false;
  mainDiv: boolean = true;

  authorDetils: AuthorDetils = new AuthorDetils();
  response: BaseResponse = new BaseResponse;
  cookies: BaseResponse = new BaseResponse;
  booksDetailsList: BookDetails[] = [];
  publishBook: BookDetails = new BookDetails();

  constructor(public authorService: AuthorService) { }

  ngOnInit(): void {
  }


  registerAuthor() {
    console.info("register request " + JSON.stringify(this.authorDetils))
    this.authorService.registerAuthor(this.authorDetils).subscribe(data => {
      this.response = data;
      if (data.statusCode === ResponseConstants.SUCCESS) {
        console.info(document.cookie)
        alert(data.statusMessage);
        this.showLoginForm = true;
        this.showRegistrationForm = false;
        this.authorDetils = new AuthorDetils();
      }
    },
      error => console.info(error));
  }

  loginAuthor() {
    console.info("login request " + JSON.stringify(this.authorDetils))
    this.authorService.authorLogin(this.authorDetils).subscribe(data => {
      console.info("response : " + JSON.stringify(data));
      alert(data.statusMessage);
      if (data.statusCode === ResponseConstants.SUCCESS) {
        localStorage.setItem("details", JSON.stringify(data));
        // document.cookie = 'response=' + JSON.stringify(data);
        // console.info(JSON.stringify(localStorage.getItem("details")))
        this.cookies = JSON.parse(localStorage.getItem("details"))
        this.authorDetils = new AuthorDetils();
        this.showBooks = true;
        this.showRegistrationForm = false;
        this.showLoginForm = false;
        this.publishButton = true;
        this.booksButton = true;
        this.logoutButton = true;
        this.mainDiv = false;
        this.getBooksForAuthor();
      }
    },
      error => console.info(error));
  }

  getBooksForAuthor() {
    console.info("inside getbookdetails")
    this.authorService.getBooksForAuthor().subscribe(data => {
      this.booksDetailsList = data;
      console.info(JSON.stringify(data));
    },
      error => console.info(error));
  }

  publishABook() {
    console.info("inside getbookdetails")
    this.authorService.publishABook(this.publishBook).subscribe(data => {
      this.response = data;
      console.info(JSON.stringify(data));
      alert(this.response.statusMessage)
      this.publishBook = new BookDetails();
      this.showBooks = !this.showBooks;
    },
      error => console.info(error));
  }

  editBook(editBookIndex: number) {
    console.info("editIndex : " + editBookIndex + "--> " + this.saveBook);
    this.publishBook = this.booksDetailsList[editBookIndex];
    this.showBooks = false;
    return this.saveBook = !this.saveBook;
  }
  saveEditedBook() {
    this.publishBook.authorName = this.cookies.authorDetails.authorName;
    this.publishBook.emailId = this.cookies.authorDetails.emailId;
    this.publishBook.authorProfileId = this.cookies.authorDetails.authorProfileId;
    console.info(JSON.stringify(this.publishBook));
    this.authorService.saveEditedBook(this.publishBook).subscribe(data => {
      this.response = data;
      console.info(JSON.stringify(data));
      alert(this.response.statusMessage)
      this.publishBook = new BookDetails();
      this.saveBook = !this.saveBook;
      this.showBooks = !this.showBooks;
    },
      error => console.info(error));

  }
  logout() {
    localStorage.clear();
    window.location.reload();
    this.mainDiv = true;
    this.booksDetailsList = [];
    this.showLoginForm = true;
    this.showBooks = false;
    this.publishButton = false;
    this.publishTable = false;
    this.saveBook = false;
    this.booksButton = false;
  }

  getBooksForAuthorButton() {
    this.showBooks = true;
    this.saveBook = false;
    this.publishTable = false;
    this.getBooksForAuthor();

  }

  enablePublish() {
    this.showBooks = !this.showBooks;
    this.saveBook = false;
    return this.publishTable = !this.publishTable;
  }

  changeTime(time: number) {
    console.info(time)
    const date = new Date(time);
    return date.toLocaleString('sv');
  }
  callRegister() {
    console.info(this.showRegistrationForm)
    this.showLoginForm = !this.showLoginForm;
    return this.showRegistrationForm = !this.showRegistrationForm;
  }
  callLogin() {
    console.info(this.showLoginForm)
    this.showRegistrationForm = !this.showRegistrationForm;
    return this.showLoginForm = !this.showLoginForm;
  }

}
