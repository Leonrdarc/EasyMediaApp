import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './modules/user/sign-in/sign-in.component';
import { SignUpComponent } from './modules/user/sign-up/sign-up.component';
import { CreatePostComponent } from './modules/post/create-post/create-post.component';
import { MyPostsComponent } from './modules/post/my-posts/my-posts.component';
import { AllPostsComponent } from './modules/post/all-posts/all-posts.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  {
    path: 'posts',
    component: NavBarComponent,
    children: [
      { path: 'create-post', component: CreatePostComponent },
      { path: 'my-posts', component: MyPostsComponent },
      { path: 'all-posts', component: AllPostsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
