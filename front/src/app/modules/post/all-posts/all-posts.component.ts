import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent {
  public asFormControl = (formControl: AbstractControl | null): FormControl =>
    formControl as FormControl;

  searchForm: FormGroup;
  posts: any = [];
  meta: any = {};
  loading: boolean = false;
  currentPage: number = 1;

  constructor(private postService: PostService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      search: [''],
      date: [''],
    });
  }

  ngOnInit(): void {
    this.searchForm.controls['search'].valueChanges
      .pipe(debounceTime(300)) // Add debounce time of 300 milliseconds for user typing
      .subscribe(() => {
        this.currentPage = 1;
        this.getPosts();
      });
    this.searchForm.controls['date'].valueChanges
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
      .getAllPosts({...this.searchForm.value, page: this.currentPage})
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
