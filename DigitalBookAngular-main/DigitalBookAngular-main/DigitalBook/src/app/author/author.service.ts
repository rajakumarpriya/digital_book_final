import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDetils } from '../entitys/athor.details.model';
import { BaseResponse } from '../entitys/base-response.model';
import { UrlConstants } from '../constants/url-constants';
import { BookDetails } from '../entitys/book-details.model';

@Injectable({
  providedIn: 'root'
})

export class AuthorService {

  cookies: BaseResponse = new BaseResponse;
  authorDetils: AuthorDetils = new AuthorDetils();


  response: BaseResponse = new BaseResponse;
  constructor(private http: HttpClient) { }

  registerAuthor(authorDetails: AuthorDetils): Observable<BaseResponse> {
    console.info("inside author service register: " + JSON.stringify(authorDetails));
    return this.http.post<BaseResponse>(UrlConstants.REGISTER, authorDetails);
  }

  authorLogin(authorDetails: AuthorDetils): Observable<BaseResponse> {
    console.info("inside login service " + JSON.stringify(authorDetails));
    return this.http.get<BaseResponse>(UrlConstants.LOGIN + authorDetails.emailId + "&password=" + authorDetails.password);

  }
  getBooksForAuthor() {

    this.cookies = JSON.parse(localStorage.getItem("details"))
    console.info("inside getallbooks service " + JSON.stringify(this.cookies.authorDetails));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.cookies.authorDetails.jwtToken);

    // let options = new RequestOptions({ headers: headers });
    return this.http.get<Array<BookDetails>>(UrlConstants.GETBOOKSFORAUTHOR + this.cookies.authorDetails.authorProfileId, {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.cookies.authorDetails.jwtToken,
        'Content-Type': 'application/json',
      })
    }
    );
  }

  publishABook(publishBook: BookDetails) {
    console.info("inside getallbooks service " + JSON.stringify(this.cookies.authorDetails));
    publishBook.authorName = this.cookies.authorDetails.authorName;
    publishBook.authorProfileId = this.cookies.authorDetails.authorProfileId;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.cookies.authorDetails.jwtToken);
    // let options = new RequestOptions({ headers: headers });
    return this.http.post<BaseResponse>(UrlConstants.PUBLISHBOOK, publishBook, {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.cookies.authorDetails.jwtToken,
        'Content-Type': 'application/json',
      })
    }
    );
  }
  saveEditedBook(publishBook: BookDetails) {
    console.info("inside getallbooks service " + JSON.stringify(publishBook));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', "Bearer " + this.cookies.authorDetails.jwtToken);
    // let options = new RequestOptions({ headers: headers });
    return this.http.put<BaseResponse>(UrlConstants.EDITORBLOCKBOOK, publishBook, {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + this.cookies.authorDetails.jwtToken,
        'Content-Type': 'application/json',
      })
    }
    );
  }

}