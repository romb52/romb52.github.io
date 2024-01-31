import { Component } from '@angular/core';
import { IPost } from '../share/post.interface';
import { PostService } from '../services/post.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { setErrorAction } from '../share/store/actions/eror.action';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent {
  posts: IPost[] = [];
  total: number = 0;
  isAuth: boolean = false;
  id = 0;
  isFilter = false;
  currentTag: string = '';
  isAuthorPostCalled: boolean = false;
  constructor(
    private postService: PostService,
    private store: Store<{ auth: { token: string; id: number } }>,
    private router: Router
  ) {
    this.cancelFilters();

    this.store
      .select((state) => state.auth)
      .subscribe(({ token, id }) => {
        this.isAuth = token !== '';
        this.id = id || 0;
      });
  }

  getAuthorPosts() {
    if (!this.isFilter) {
      this.postService.getPostsByAuthor(this.id).subscribe((data) => {
        if ('articles' in data) {
          this.posts = data.articles;
          this.total = data.articlesCount;
          this.isAuthorPostCalled = true;
        } else {
          this.store.dispatch(
            setErrorAction({
              message: data.message || '',
              messages: data?.errors?.body || [],
            })
          );
          setTimeout(() => {
            this.store.dispatch(
              setErrorAction({
                message: '',
                messages: [],
              })
            );
          }, 5000);
        }
      });
      this.isFilter = true;
    } else {
      this.postService.getPostsByAuthorAndId(this.id, this.currentTag).subscribe((data) => {
        if ('articles' in data) {
          this.posts = data.articles;
          this.total = data.articlesCount;
        } else {
          this.store.dispatch(
            setErrorAction({
              message: data.message || '',
              messages: data?.errors?.body || [],
            })
          );
          setTimeout(() => {
            this.store.dispatch(
              setErrorAction({
                message: '',
                messages: [],
              })
            );
          }, 5000);
        }
      });
    }
  }

  cancelFilters() {
    this.postService.getPosts().subscribe((data) => {
      if ('articles' in data) {
        this.posts = data.articles;
        this.total = data.articlesCount;
      } else {
        this.store.dispatch(
          setErrorAction({
            message: data.message || '',
            messages: data?.errors?.body || [],
          })
        );

        setTimeout(() => {
          this.store.dispatch(
            setErrorAction({
              message: '',
              messages: [],
            })
          );
        }, 5000);
      }
    });
    this.isFilter = false;
    this.isAuthorPostCalled = false;
    this.currentTag = '';
  }

  getPostsByTag(tag: string) {
    if (!this.isAuthorPostCalled) {
      this.postService.getPostsByTag(tag).subscribe((data) => {
        if ('articles' in data) {
          this.posts = data.articles;
          this.total = data.articlesCount;
        } else {
          this.store.dispatch(
            setErrorAction({
              message: data.message || '',
              messages: data?.errors?.body || [],
            })
          );

          setTimeout(() => {
            this.store.dispatch(
              setErrorAction({
                message: '',
                messages: [],
              })
            );
          }, 5000);
        }
      });
      this.isFilter = true;
      this.currentTag = tag;
    } else {
      this.postService.getPostsByAuthorAndId(this.id, tag).subscribe((data) => {
        if ('articles' in data) {
          this.posts = data.articles;
          this.total = data.articlesCount;
        } else {
          this.store.dispatch(
            setErrorAction({
              message: data.message || '',
              messages: data?.errors?.body || [],
            })
          );
          setTimeout(() => {
            this.store.dispatch(
              setErrorAction({
                message: '',
                messages: [],
              })
            );
          }, 5000);
        }
      });
    }
  }



  deleteAuthorPost(slug: string) {
    this.postService.deleteAuthorPost(slug).subscribe((data) => {
      if ('articles' in data) {
        this.posts = data.articles;
        this.total = data.articlesCount;

      } else {
        this.store.dispatch(
          setErrorAction({
            message: data.message || '',
            messages: data?.errors?.body || [],
          })
        );

        setTimeout(() => {
          this.store.dispatch(
            setErrorAction({
              message: '',
              messages: [],
            })
          );
        }, 5000);
      }
      this.getAuthorPosts();
    });
    this.isFilter = true;
  }

}
