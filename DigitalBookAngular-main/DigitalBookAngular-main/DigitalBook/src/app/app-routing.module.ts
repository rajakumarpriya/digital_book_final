import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { ReaderComponent } from './reader/reader.component';

const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: 'reader', component: ReaderComponent },
  { path: 'author', component: AuthorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
