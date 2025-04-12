# 🖼️ AI Image Generation – MERN Stack

A full-stack MERN application that enables users to generate AI-powered images based on custom text prompts using the OpenAI API. The app supports image upload via Cloudinary, stores posts in MongoDB, and includes a responsive frontend with search functionality and loading indicators.

## 🔧 Tech Stack

- **Frontend**: React, Styled-Components, Material UI
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Image Hosting**: Cloudinary
- **AI Model**: OpenAI DALL·E API

---

## ⚙️ Environment Setup

Create a `.env` file in the **server** directory with the following environment variables:

```env
MONGODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPENAI_API_KEY=your_openai_api_key
```

> ⚠️ If you're using the free-tier OpenAI API, image generation might be restricted. In that case, sample images will be displayed.

---

## 🚀 How to Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/your-username/mern-ai-image-generation.git
cd mern-ai-image-generation
```

2. **Install dependencies for server**

```bash
cd server
npm install
```

3. **Start the server**

```bash
npm start
```

4. **Install dependencies for client**

```bash
cd ../client
npm install
```

5. **Start the React app**

```bash
npm start
```

The app should now be running at `http://localhost:3000` and the server at `http://localhost:8080`.

---

## ✨ Features

- Generate images from text prompts using OpenAI
- Upload and host images via Cloudinary
- Search and filter generated images by prompt or author
- Mobile-responsive UI with loading and error handling
- Displays fallback sample images if API fails

---

## 📁 Project Structure

```
mern-ai-image-generation/
│
├── client/         # React frontend
│   └── ...
├── server/         # Node.js backend
│   └── ...
└── README.md
```

---

## 📄 License

This project is open-source and available under the MIT License.
