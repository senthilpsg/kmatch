import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WordpressService } from 'src/app/core/api/wordpress.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.page.html',
  styleUrls: ['./add-profile.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProfilePage implements OnInit {
  isViewInitialized: any = false;
  postData: any = {
    name: '',
    father_name: '',
    mother_name: '',
    address: '',
    raasi: '',
    star: '',
    sevvai: '',
    rahu_kethu: '',
    dob: '',
    kulam: '',
    koil: '',
    pincode: '',
    education: '',
    occupation: ''
  };

  constructor(
    private wordpressService: WordpressService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Set the variable to true after view initialization
    // setTimeout(() => {
    this.isViewInitialized = true;
    this.cdr.detectChanges();
    // }, 1000);

  }

  submitPost() {
    const postMeta = this.postData;

    const postData = {
      title: this.postData.name,
      status: 'publish',
      content: "",
      meta: this.postData
      // meta: Object.keys(this.postData).map(key => ({
      //   key,
      //   value: this.postData[key]
      // }))
    };

    // Call createPost and subscribe to the response
    this.wordpressService.createPost(postData).subscribe(
      (response: any) => {
        this.loaderService.showSuccess("Successfully Created Profile");
        this.router.navigate(['/tab/tab1']);
        console.log('Post created:', response);
        // Handle successful post creation, e.g., navigate back or show success message
      },
      (error: any) => {
        this.loaderService.showError("Error in creating profile");
        console.error('Error creating post:', error);
        // Handle error, show error message
      }
    );
  }
}
