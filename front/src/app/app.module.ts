import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';
import { CreatePostComponent } from './modules/post/create-post/create-post.component';
import { MyPostsComponent } from './modules/post/my-posts/my-posts.component';
import { AllPostsComponent } from './modules/post/all-posts/all-posts.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import { NavMenuComponent } from './shared/components/nav-bar/nav-menu/nav-menu.component';
import { PostCardComponent } from './shared/components/post-card/post-card.component';
import { AuthService } from './core/services/auth.service';
import { APIInterceptor } from './core/interceptors/api.interceptor';
import { TextFieldComponent } from './shared/components/text-field/text-field.component';
import { DatePipe } from '@angular/common';
import { ModalComponent } from './shared/components/modal/modal.component';
import { HighlightPipe } from './shared/pipes/highlight.pipe';
import { DaySelectorComponent } from './shared/components/day-selector/day-selector.component';
import { EmptyComponent } from './shared/components/empty/empty.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { PaginatorComponent } from './shared/components/paginator/paginator.component';
@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    CreatePostComponent,
    MyPostsComponent,
    AllPostsComponent,
    NavBarComponent,
    ButtonComponent,
    InputComponent,
    NavMenuComponent,
    PostCardComponent,
    TextFieldComponent,
    ModalComponent,
    HighlightPipe,
    DaySelectorComponent,
    EmptyComponent,
    SpinnerComponent,
    PaginatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
