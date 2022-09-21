import axios from "axios";

export const allowedExtensions = [
  "png",
  "jpg",
  "jpeg",
  "mp3",
  "pdf",
  "zip",
  "rar",
  "docx",
  "doc",
  "ppt",
  "pptx",
  "txt",
];

export const maxUploadFileSize = 10 * 1024 * 1024; //10 Mbs

export function prepareForm(data, file, name) {
  let formData = new FormData();

  formData.append("data", JSON.stringify(data));

  console.log("File", file);
  if (file) {
    let extension = file.name.split(".");
    extension = extension[extension.length - 1];

    if (file.size > maxUploadFileSize) {
      return Promise.reject({
        fileUploadError: true,
        msg: `Maximum ${maxUploadFileSize / 1024 / 1024} MB file allowed`,
      });
    }

    if (!allowedExtensions.includes(extension)) {
      return Promise.reject({
        fileUploadError: true,
        msg: "Extension not allowed",
      });
    }

    formData.append("file", file, name);
  }
  return formData;
}

export function download(url, name) {
  axios({
    url,
    method: "GET",
    responseType: "blob",
  }).then(response => {
    console.log("Downloading", response);
    const url_ = window.URL.createObjectURL(response);
    const link = document.createElement("a");
    link.href = url_;
    link.setAttribute("download", name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
