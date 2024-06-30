import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BARE_URL } from 'src/app/utils/config';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.css']
})
export class ProofComponent implements OnInit {
  selectedType: number | null = null;
  selectedFile: File | null = null;
  fullName: string = '';
  MSSV: string = '';
  programId: string = '';
  content: string = '';

  requestTypes = [
    { name: 'Đề xuất minh chứng', value: 1 },
    { name: 'Đề xuất khiếu nại', value: 2 }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.fullName = this.cookieService.get('fullName') || '';
    this.MSSV = this.cookieService.get('MSSV') || '';

    this.programId = this.route.snapshot.paramMap.get('programId') || '';
  }

  goHome() {
    this.router.navigate(['/mailbox']);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  removeSelectedFile() {
    this.selectedFile = null;
  }

  submitRequest() {
    if (!this.programId) {
      alert('Vui lòng nhập mã chương trình.');
      return;
    }
    if (!this.selectedType) {
      alert('Vui lòng chọn loại yêu cầu.');
      return;
    }
    if (!this.selectedFile) {
      alert('Vui lòng đính kèm file.');
      return;
    }

    const formData = new FormData();
    formData.append('programId', this.programId);
    formData.append('content', this.content);
    formData.append('type', this.selectedType === 1 ? 'PROPOSE' : 'COMPLAINT');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const accessToken = this.cookieService.get('accessToken') || '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`
    });

    this.http.post(`${BARE_URL}/propose/create-propose`, formData, { headers })
      .subscribe(
        (response) => {
          // console.log('API Response:', response);
          alert('Gửi yêu cầu thành công!');
          window.location.reload();
        },
        (error) => {
          console.error('API Error:', error);
          alert('Gửi yêu cầu thất bại. Vui lòng thử lại.');
        }
      );
  }

  get selectedTypeName(): string {
    const selectedType = this.requestTypes.find(type => type.value === this.selectedType);
    return selectedType ? selectedType.name : 'Chọn loại';
  }
}
