function showEncrypt() {
  document.getElementById("encrypt").classList.remove("hidden");
  document.getElementById("decrypt").classList.add("hidden");
}

function showDecrypt() {
  document.getElementById("decrypt").classList.remove("hidden");
  document.getElementById("encrypt").classList.add("hidden");
}

/* ---------------- DRAG & DROP HANDLERS ---------------- */

// function setupDragAndDrop(dropId, inputId) {
//     const dropZone = document.getElementById(dropId);
//     const inputFile = document.getElementById(inputId);

//     dropZone.addEventListener("click", () => inputFile.click());

//     dropZone.addEventListener("dragover", e => {
//         e.preventDefault();
//         dropZone.style.background = "rgba(255,255,255,0.2)";
//     });

//     dropZone.addEventListener("dragleave", () => {
//         dropZone.style.background = "rgba(255,255,255,0.05)";
//     });

//     dropZone.addEventListener("drop", e => {
//         e.preventDefault();
//         dropZone.style.background = "rgba(255,255,255,0.05)";
//         inputFile.files = e.dataTransfer.files;
//     });
// }

function setupDragAndDrop(dropId, inputId, previewId) {
  const dropZone = document.getElementById(dropId);
  const inputFile = document.getElementById(inputId);

  dropZone.addEventListener("click", () => inputFile.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(255,255,255,0.2)";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.background = "rgba(255,255,255,0.05)";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(255,255,255,0.05)";
    inputFile.files = e.dataTransfer.files;
    previewImage(inputFile.files[0], previewId);
  });

  inputFile.addEventListener("change", () => {
    if (inputFile.files.length > 0) {
      previewImage(inputFile.files[0], previewId);
    }
  });
}

// setupDragAndDrop("dropEncrypt", "inputImage");
// setupDragAndDrop("dropDecrypt", "encodedImage");

setupDragAndDrop("dropEncrypt", "inputImage", "previewEncrypt");
setupDragAndDrop("dropDecrypt", "encodedImage", "previewDecrypt");

/* ---------------- ENCRYPTION ---------------- */

function encryptMessage() {
  const message = document.getElementById("secretMessage").value;
  const file = document.getElementById("inputImage").files[0];

  if (!message || !file) {
    alert("Please enter a message and choose an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixels = imageData.data;

      const binary = textToBinary(message + "||END||");
      if (binary.length > pixels.length) {
        alert("Message too long for this image!");
        return;
      }

      for (let i = 0; i < binary.length; i++) {
        pixels[i] = (pixels[i] & 0xfe) | parseInt(binary[i]);
      }

      ctx.putImageData(imageData, 0, 0);

      const link = document.getElementById("downloadLink");
      link.download = "encoded.png";
      link.href = canvas.toDataURL();
      link.textContent = "⬇ Download Encrypted Image";
    };
  };

  reader.readAsDataURL(file);
}

function textToBinary(text) {
  return text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

/* ---------------- DECRYPTION ---------------- */

function decryptMessage() {
  const file = document.getElementById("encodedImage").files[0];
  if (!file) {
    alert("Please upload the encoded image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let pixels = imageData.data;

      let binary = "";
      for (let i = 0; i < pixels.length; i++) {
        binary += (pixels[i] & 1).toString();
      }

      const text = binaryToText(binary);
      document.getElementById("outputMessage").innerText =
        "Hidden Message: \n\n" + text.split("||END||")[0];
    };
  };

  reader.readAsDataURL(file);
}

function binaryToText(binary) {
  let chars = [];
  for (let i = 0; i < binary.length; i += 8) {
    let byte = binary.substring(i, i + 8);
    chars.push(String.fromCharCode(parseInt(byte, 2)));
  }
  return chars.join("");
}

function previewImage(file, previewId) {
  const img = document.getElementById(previewId);
  const reader = new FileReader();

  reader.onload = function (e) {
    img.src = e.target.result;
    img.classList.remove("hidden");
  };

  reader.readAsDataURL(file);
}

function removeFile(inputId, previewId, downloadLinkId) {
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);

  if (input) {
    try {
      input.value = "";
      if (input.files) input.files = null;
    } catch (e) {
      input.value = null;
    }
  }

  if (preview) {
    preview.src = "";
    preview.classList.add("hidden");
  }

  if (downloadLinkId) {
    const link = document.getElementById(downloadLinkId);
    if (link) {
      link.href = "";
      link.textContent = "";
    }
  }

  const removeBtn = document.getElementById("remove_" + inputId);
  if (removeBtn) removeBtn.classList.add("hidden");
}

// show remove button when previewing
function _showRemoveButtonForPreview(previewId) {
  const removeId =
    previewId === "previewEncrypt"
      ? "remove_inputImage"
      : "remove_encodedImage";
  const btn = document.getElementById(removeId);
  if (btn) btn.classList.remove("hidden");
}

function previewImage(file, previewId) {
  const img = document.getElementById(previewId);
  const reader = new FileReader();

  reader.onload = function (e) {
    img.src = e.target.result;
    img.classList.remove("hidden");
    _showRemoveButtonForPreview(previewId);
  };

  reader.readAsDataURL(file);
}
