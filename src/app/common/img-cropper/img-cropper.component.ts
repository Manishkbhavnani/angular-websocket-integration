import { Component, OnInit, ViewChild, Injector, Input } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface IModalData {
  modalHeight?: number;
  modalWidth?: number;
  centerTouchRadius: number;
  cropperWidth: number;
  cropperHeight: number;
  cropperMinWidth: number;
  cropperMinHeight: number;
  croppedOutputWidth: number;
  croppedOutputHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  rounded: boolean;
  title: string;
  noFileInput: boolean;
}

@Component({
  selector: 'app-img-cropper',
  templateUrl: './img-cropper.component.html',
  styleUrls: ['./img-cropper.component.scss']
})


export class ImgCropperComponent implements OnInit {

  // GET THE CROPPER INSTANCE
  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;

  // CROPPER SETTING HOLDER
  public cropperSettings: CropperSettings;
  // IMAGE AND OUTPUT HOLDER
  public localData: any = {};
  // Modal Config
  @Input() public data: IModalData;

  constructor(
      public injector: Injector,
      private activeModal: NgbActiveModal
  ) { }

  /**
   * CONVERT BASE64 TO BLOB
   * @param Base64Image Pass base64 image data to convert into blob
   */
  private convertBase64ToBlob(Base64Image: any) {
      // EXTRACT IMAGE TYPE
      const BASE64_MARKER = ';base64,';
      // SPLIT INTO TWO PARTS
      const parts = Base64Image.split(BASE64_MARKER);
      // HOLD THE CONTENT TYPE
      const contentType = parts[0].split(':')[1];
      // CONVERT TO ROW DATA FROM BASE64
      const raw = window.atob(parts[1]);
      // HOLD THE LENGTH OF ROW DATA
      const rawLength = raw.length;
      // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
      const uInt8Array = new Uint8Array(rawLength);
      // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
      for (let i = 0; i < rawLength; ++i) {
          uInt8Array[i] = raw.charCodeAt(i);
      }
      // RETURN BLOB IMAGE AFTER CONVERSION
      return new Blob([uInt8Array], { type: contentType });
  }

  /**
   * EXECUTE CLOSE FUNCTION WHEN CROPPING IS DONE AND PASS THE OUTPUT TO THE COMPONENT WHICH WANT TO CROP THE IMAGE
   * @param data OUTPUT DATA
   */
  public close(data: any): void {
      // CHECK IF BASE64 IMAGE EXIST
      if (data.image) {
          data['file'] = this.convertBase64ToBlob(data.image);
      }
      // PASS THE DATA
      this.activeModal.close(data);
  }

  /**
   * ANGULAR LIFECYCLE EVENT FOR COMPONENT INITIALIZATION
   */
  public ngOnInit(): void {
      // INITIALIZE CROPPER SETTINGS
      this.cropperSettings = new CropperSettings();
      // DEFINE EXPECTED CENTER_TOUCH_RADIUS
      this.cropperSettings.centerTouchRadius = this.data['centerTouchRadius'];
      // DEFINE EXPECTED CROPPER WIDTH
      this.cropperSettings.width = this.data['cropperWidth'];
      // DEFINE EXPECTED CROPPER HEIGHT
      this.cropperSettings.height = this.data['cropperHeight'];
      // DEFINE EXPECTED CROPPER MIN_WIDTH
      this.cropperSettings.minWidth = this.data['cropperMinWidth'];
      // DEFINE EXPECTED MIN_HEIGHT
      this.cropperSettings.minHeight = this.data['cropperMinHeight'];
      // DEFINE EXPECTED CROPPED OUTPUT WIDTH
      this.cropperSettings.croppedWidth = this.data['croppedOutputWidth'];
      // DEFINE EXPECTED CROPPED OUTPUT HEIGHT
      this.cropperSettings.croppedHeight = this.data['croppedOutputHeight'];
      // DEFINE EXPECTED CANVAS WIDTH
      this.cropperSettings.canvasWidth = this.data['canvasWidth'];
      // DEFINE EXPECTED CANVAS HEIGHT
      this.cropperSettings.canvasHeight = this.data['canvasHeight'];
      // DEFINE EXPECTED IMAGE IS ROUNDED
      this.cropperSettings.rounded = this.data['rounded'];
      // DEFINE EXPECTED FILE_INPUT BUTTON OR NOT
      this.cropperSettings.noFileInput = this.data['noFileInput'];

      // Prepare Image Data to pass in the modal
      const image: any = new Image();
      image.src = this.data['file'];
      // Assign cropper settings to the template instance
      this.cropper.settings = this.cropperSettings;
      setTimeout(() => {
        this.cropper.setImage(image);
      }, 10);

  }

}
