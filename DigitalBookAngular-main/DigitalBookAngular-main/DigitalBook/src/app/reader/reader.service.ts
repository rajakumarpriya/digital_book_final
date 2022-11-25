import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDetils } from '../entitys/athor.details.model';
import { BaseResponse } from '../entitys/base-response.model';
import { UrlConstants } from '../constants/url-constants';
import { BookDetails } from '../entitys/book-details.model';
import { SearchDetails } from '../entitys/search-details.model';

@Injectable({
    providedIn: 'root'
})

export class ReaderService {
    cookies: BaseResponse = new BaseResponse;
    authorDetils: AuthorDetils = new AuthorDetils();


    response: BaseResponse = new BaseResponse;
    constructor(private http: HttpClient) { }



    getAllBooksForUser() {
        console.info("inside reader service getallbooks")
        return this.http.get<Array<BookDetails>>(UrlConstants.GETALLBOOKSFROUSER)
    }
    subscribeBook(bookId: number, name: string, emailId: string) {
        console.info("inside reader service subscribebook " + + bookId + name + emailId)
        return this.http.get<BaseResponse>(UrlConstants.PURCHASEABOOK + "?bookId=" + bookId + "&name=" + name + "&emailId=" + emailId)
    }

    getBookByPaymentId(paymentId: string) {
        console.info("inside reader service getBookByPaymentId " + paymentId)
        return this.http.get<BookDetails>(UrlConstants.GETBOOKWITHPAYMENTID + paymentId)
    }
    getBooksByEmailId(emailId: string) {
        console.info("inside reader getByemailId " + emailId)
        return this.http.get<Array<BookDetails>>(UrlConstants.GETPURCHASEDBOOKS + emailId)
    }
    unSubscribeBook(bookId: number, emailId: string) {
        console.info("inside reader unsubscribebook " + bookId + emailId)
        return this.http.get<BaseResponse>(UrlConstants.UNSUBSCRIBEBOOK + "?bookId=" + bookId + "&emailId=" + emailId);
    }
    searchBook(search: SearchDetails) {
        console.info("inside reader search " + JSON.stringify(search))
        console.info("inside reader search " +UrlConstants.GETALLBOOKSFROUSER + "?title=" + search.title + "&authorName=" + search.authorName + "&publisher=" + search.publisher + "&fromDate=" + new Date(search.fromDate).getTime() + "&toDate=" + new Date(search.fromDate).getTime())
        return this.http.get<Array<BookDetails>>(UrlConstants.GETALLBOOKSFROUSER + "?title=" + search.title + "&authorName=" + search.authorName + "&publisher=" + search.publisher + "&fromDate=" + new Date(search.fromDate).getTime() + "&toDate=" + new Date(search.fromDate).getTime())
    }
}