import React, { useEffect, useState } from "react";
import { ImageSvg } from "assets/svg/icon";
import CustomIcon from "components/util-components/CustomIcon";

export default function CloudinaryUploadWidget(props) {
  const [isUpload, setIsUpload] = useState("");
  useEffect(() => {
    const cloudName = "dk2hpdwsd"; // replace with your own cloud name
    const uploadPreset = "jtlbarqy"; // replace with your own upload preset
    props.setImage(props.uploadedImg);
    // Remove the comments from the code below to add
    // additional functionality.
    // Note that these are only a few examples, to see
    // the full list of possible parameters that you
    // can add see:
    //   https://cloudinary.com/documentation/upload_widget_reference

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
        showAdvancedOptions: true,  //add advanced options (public_id and tag)
        sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        folder: "user_images", //upload files to the specified folder
        tags: ["users", "profile"], //add the given tags to the uploaded files
        context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        clientAllowedFormats: ["images"], //restrict uploading to image files only
        maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          props.setImage(result.info.secure_url);
          setIsUpload(result.info.secure_url);
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ant-upload ant-upload-drag mb-2">
      <div className="ant-upload ant-upload-btn">
        {isUpload !== "" ? (
          <div id="upload_widget">
            <img src={isUpload} alt="Img" />
            <p>Thay thế ảnh</p>
          </div>
        ) : (
          <>
            {props.uploadedImg ? (
              <div id="upload_widget">
                <img src={props.uploadedImg} alt="Img" />
                <p>Thay thế ảnh</p>
              </div>
            ) : (
              <div id="upload_widget">
                <CustomIcon className="display-3" svg={ImageSvg} />
                <p>Tải ảnh lên</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
