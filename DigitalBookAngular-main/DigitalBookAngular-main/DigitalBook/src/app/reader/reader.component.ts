import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorDetils } from '../entitys/athor.details.model';
import { BaseResponse } from '../entitys/base-response.model';
import { BookDetails } from '../entitys/book-details.model';
import { SearchDetails } from '../entitys/search-details.model';
import { ReaderService } from './reader.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  name: string = "";
  emailId: string = "";
  index: number = 1;
  openForms: boolean = false;
  paymentButton: boolean = false;
  emailButton: boolean = false;
  subButton: boolean = true;
  searchButton: boolean = false;
  paymentId: string = "";
  bookId: number = 0;
  title: string = "";
  category: string = "";
  publisher: string = "";
  authorName: string = "";
  fromDate: number = 0;
  toDate: number = 0;
  unsubemailButton: boolean = false;

  booksDetailsList: BookDetails[] = [];
  readerDetails: BookDetails = new BookDetails();
  detailsList: BookDetails = new BookDetails();
  searchBooksDetailsList: BookDetails[] = [];
  authorDetils: AuthorDetils = new AuthorDetils();
  response: BaseResponse = new BaseResponse();
  cookies: BaseResponse = new BaseResponse();
  search: SearchDetails = new SearchDetails();
  constructor(public service: ReaderService) { }

  ngOnInit(): void {
    this.getAllBooksForUser();
  }



  getAllBooksForUser() {
    this.openForms = false;
    this.emailButton = false;
    this.searchButton = false;
    this.paymentButton = false;
    console.info("inside reader component")
    this.service.getAllBooksForUser().subscribe(data => {
      this.booksDetailsList = data;
      this.subButton = true;
      console.info("response in reader :" + JSON.stringify(data))
    },
      error => console.info(error));
  }

  subscribeBook() {
    this.readerDetails.bookId = this.booksDetailsList[this.index].bookId;
    console.info("inside reader subscribebook " + this.readerDetails.bookId + this.readerDetails.authorName + this.readerDetails.emailId)
    this.service.subscribeBook(this.readerDetails.bookId, this.readerDetails.authorName, this.readerDetails.emailId).subscribe(data => {
      this.response = data;
      localStorage.setItem("emailId", this.readerDetails.emailId);
      console.info("response in reader :" + JSON.stringify(data))
      this.readerDetails = new BookDetails();
      alert(this.response.statusMessage);
      this.getBooksByEmailId();
      this.openForms=false;
    },
      error => console.info(error));
  }
  getBookByPaymentId() {
    console.info("inside reader subscribebook " + this.index + this.name + this.emailId)
    this.service.getBookByPaymentId(this.paymentId).subscribe(data => {
      this.booksDetailsList = [];
      this.booksDetailsList.push(data);
      console.info("response in reader :" + JSON.stringify(data))
      this.paymentId = "";
      this.subButton = false;
    },
      error => console.info(error));
  }
  getBooksByEmailId() {
    console.info("inside reader subscribebook " + this.index + this.name + this.emailId)
    this.service.getBooksByEmailId(this.readerDetails.emailId).subscribe(data => {
      this.booksDetailsList = [];
      this.booksDetailsList = data;
      localStorage.setItem("emailId", this.emailId);
      console.info("response in reader :" + JSON.stringify(data))
      this.readerDetails.emailId = "";
      this.subButton = false;
      this.emailButton = false;
    },
      error => console.info(error));
  }
  unSubscribeBook() {
    this.readerDetails.bookId = this.booksDetailsList[this.index].bookId;
    console.info("inside reader subscribebook " + this.readerDetails.bookId + this.readerDetails.emailId)
    this.service.unSubscribeBook(this.readerDetails.bookId, this.readerDetails.emailId).subscribe(data => {
      this.response = data;
      console.info("response in reader :" + JSON.stringify(data))
      alert(this.response.statusMessage);
      this.unsubemailButton = false;
    },
      error => console.info(error));
  }
  searchBook() {
    console.info("inside reader subscribebook " + this.index + this.name + this.emailId)
    this.service.searchBook(this.search).subscribe(data => {
      this.booksDetailsList = [];
      this.booksDetailsList = data;
      console.info("response in reader :" + JSON.stringify(data))
      this.search = new SearchDetails();
    },
      error => console.info(error));
  }










  changeTime(time: number) {
    console.info(time)
    const date = new Date(time);
    return date.toLocaleString('sv');
  }

  openForm(i: number) {
    this.index = i;
    console.info(this.openForms + "" + this.index)
    this.paymentButton = false;
    this.emailButton = false;
    this.searchButton = false;
    return this.openForms = !this.openForms;
  }
  enableEmail(i: number) {
    this.index = i;
    this.openForms = false;
    this.paymentButton = false;
    this.searchButton = false;
    this.emailButton = false;
    return this.unsubemailButton = !this.unsubemailButton;
  }
  paymentButtonEnabler() {
    this.openForms = false;
    this.emailButton = false;
    this.searchButton = false;
    return this.paymentButton = !this.paymentButton;
  }
  emailButtonEnabler() {
    this.openForms = false;
    this.paymentButton = false;
    this.searchButton = false;
    return this.emailButton = !this.emailButton;
  }
  searchButtonEnabler() {
    this.openForms = false;
    this.paymentButton = false;
    this.emailButton = false;
    return this.searchButton = !this.searchButton;
  }
}


