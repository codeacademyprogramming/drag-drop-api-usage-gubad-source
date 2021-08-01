let dropArea = document.querySelector(".drop-area");
let file;

dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("active");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  file = e.dataTransfer.files[0];
  let fileType = file.type;
  let valFileTypes = ["image/jpg", "image/png", "image/jpeg"];
  if (valFileTypes.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="" draggable="true">`;

      //    dropArea.innerHTML=imgTag;
      let imageBody = document.querySelector(".image-body");
      imageBody.innerHTML = imgTag;

      let delButton = document.createElement("button");
      delButton.classList.add("btn");
      delButton.classList.add("btn-danger");
      delButton.classList.add("mt-3");
      delButton.innerText = "Delete";
      imageBody.append(delButton);
      delButton.addEventListener("click", () => {
        if (confirm("are you sure") == true) {
          delButton.previousElementSibling.remove();
          delButton.remove();
        } else {
          return;
        }
      });
    };
    fileReader.readAsDataURL(file);
  } else {
    alert("no");
  }
  dropArea.classList.remove("active");
});
