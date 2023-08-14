import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { AuthService } from './core/services/auth.service';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
