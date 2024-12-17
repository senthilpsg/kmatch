import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WordpressService } from 'src/app/core/api/wordpress.service';


@Component({
  selector: 'app-profile-view',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {
  profileId: number = 0;
  profileImage: string = 'assets/images/illustration/illustration-1.png'; // Default image
  profileName: string = 'Rajesh'; // Default name
  profileFields: any[] = []; // Array to hold dynamic fields
  postTitle: string = 'Post Title'; // Default title
  postContent: string = '';
  profile: any;
  slideOptions = {
    initialSlide: 0, // Starting slide
    speed: 400, // Slide transition speed
    loop: true, // Enable looping
  };
  loading = true;
  constructor(
    private route: ActivatedRoute,
    private wordpressService: WordpressService,
    private router: Router

  ) { }

  ngOnInit() {
    this.profileId = +this.route.snapshot.paramMap.get('profileId')!;

  }

  ngAfterViewInit() {
    this.loadPostData();
  }
  loadPostData() {
    this.loading = true;
    this.wordpressService.getPost(this.profileId).subscribe(post => {
      this.postTitle = post.title.rendered || this.postTitle;
      this.postContent = post.content.rendered || this.postContent;
      this.profile = post.meta;
      // Check if post has an image and set it
      if (post._embedded && post._embedded['wp:featuredmedia']) {
        this.profileImage = post._embedded['wp:featuredmedia'][0].source_url;
      }
      this.loading = false;

    });
  }

  onImageError(event: any) {
    console.log('image error', event)
    event.target.src = 'assets/images/illustration/illustration-1.png';  // Fallback image
  }

  editProfile() {

  }

  deleteProfile() {
    this.wordpressService.deletePost(this.profileId).subscribe({
      next: (response) => {
        console.log('Post deleted successfully:', response);
        this.router.navigate(['/tab/tab1']);
      },
      error: (error) => {
        console.error('Error deleting post:', error);
      },
    });
  }
}
