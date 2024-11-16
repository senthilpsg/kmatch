import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { WordpressService } from 'src/app/core/api/wordpress.service';
import { AuthService } from 'src/app/core/api/auth/auth.service';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss']
})
export class Tab1Page implements OnInit {



  posts: any[] = [];
  loading: boolean = true;
  defaultImage = 'assets/images/illustration/illustration-1.png';
  isModalOpen: boolean = true;

  postData = {
    title: '',
    content: '',
    imageUrl: ''
  };

  constructor(
    private wordpressService: WordpressService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  async loadPosts() {
    const userId = await this.authService.getCurrentUserId();

    this.wordpressService.getPostsWithImages(userId).subscribe(
      (data) => {
        this.posts = data;

        // this.posts.forEach((post) => {
        //   post['fields'] = JSON.parse(post.content);
        // })
        console.log("posts", this.posts);
        this.loading = false; // Set loading to false once data is fetched
      },
      (error) => {
        console.error('Error fetching posts', error);
        this.loading = false; // Handle error case
      }
    );
  }

  ngAfterViewInit() {
    this.loadPosts();
  }

  openAddPost() {
    this.router.navigate(['/tab/add-profile']);
  }

}