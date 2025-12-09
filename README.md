# 🔐 Image Steganography Web Tool

A simple, modern, and interactive web-based application that hides and extracts secret messages inside images using the **Least Significant Bit (LSB)** steganography technique.

---

## 📌 Features

* 🖼 **Encrypt text into an image** using LSB
* 🔍 **Decrypt hidden text** from an encoded image
* 📥 **Drag & Drop image upload**
* 👀 **Real-time image preview** before encryption/decryption
* ✨ **Modern UI** with animations and glassmorphism design
* ⚡ **Fully client-side** — no server, complete privacy
* 📱 Works on desktop and mobile browsers

---

## 🚀 How It Works

The tool uses HTML5 Canvas to access pixel data of images.

* **Encryption:**

  * Converts the message to binary
  * Embeds each bit into the least significant bit of pixel values
  * Generates a downloadable encoded image

* **Decryption:**

  * Extracts LSB bits from the encoded image
  * Converts binary back to text
  * Displays the recovered message

All computation happens **entirely in the browser**.

---

## 🗂 Project Structure

```
steganography-tool/
│── index.html        # UI layout
│── style.css         # Modern UI styling + animations
│── app.js            # LSB algorithm + drag/drop + previews
│── README.md         # Project documentation
```

---

## 🛠 Technologies Used

* **HTML5**
* **CSS3 (Glassmorphism, Animations)**
* **JavaScript (Canvas API, FileReader API)**

---

## 📥 Installation & Setup

No installation required.

Simply:

1. Download or clone the project folder
2. Open `index.html` in any modern web browser
3. Start hiding and revealing messages!

---

## 🎯 Usage Instructions

### 🔹 **Encrypt (Hide Message)**

1. Click **Encrypt**
2. Enter your secret message
3. Drag & drop or upload an image
4. Preview the image
5. Click **Encrypt**
6. Download the encoded image

### 🔹 **Decrypt (Reveal Message)**

1. Click **Decrypt**
2. Upload or drag the encoded image
3. Preview the image
4. Click **Decrypt**
5. The hidden message will appear

---

## 🔒 Security Notes

* LSB steganography hides data but is **not cryptographically strong**
* Image modifications (compression, resizing, filters) may destroy hidden data
* For higher security, encrypt your message **before** using this tool

---

## 📌 Future Enhancements

* AES encryption before embedding
* Key-based random pixel embedding
* Support for audio/video steganography
* Drag-and-drop multiple image support
* Dark/Light theme toggle

---

## 👨‍💻 Author

**Achinthya Krishna Alangaru**


---

## 📝 License

This project is open-source and free to use for educational and personal purposes.

---

