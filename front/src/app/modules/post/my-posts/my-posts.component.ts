import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent {
  public asFormControl = (formControl: AbstractControl | null): FormControl =>
    formControl as FormControl;

  filterForm: FormGroup;
  posts: any = [];
  meta: any = {};
  loading: boolean = false;
  currentPage: number = 1;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      date: [''],
    });
  }

  ngOnInit(): void {
    this.filterForm.controls['date'].valueChanges
      .pipe(debounceTime(0))
      .subscribe(() => {
        this.currentPage = 1;
        this.getPosts();
      });
    this.getPosts();
  }

  getPosts() {
    this.loading = true;

    this.postService
      .getAllPosts({...this.filterForm.value, page: this.currentPage})
      .subscribe((response: any) => {
        this.posts = response.data;
        this.meta = response.meta;
        this.loading = false;
      });
  }

  changePage(page: number) {
    this.getPosts();
  }

}
