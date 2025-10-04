# 🎨 ZipCart Backend

The **ZipCart Backend** is the server-side application of the ZipCart grocery shopping platform. It is built using Node.js, Express, and MongoDB, providing APIs for user authentication, product management, order processing, and admin/seller functionalities.

It integrates JWT-based authentication, role-based access control, Cloudinary for image uploads, and secure password hashing with Bcrypt.

🔗 **Frontend Repository**
For the frontend part, please visit the ZipCart Frontend repository: [https://github.com/Anirudh-Singh-26/ZipCart_Frontend](https://github.com/Anirudh-Singh-26/ZipCart_Frontend)

🌐 **Deployed Backend**
The backend is deployed on Render and can be accessed at: [https://zipcart-backend.onrender.com](https://zipcart-backend.onrender.com)

---

## 📦 Tech Stack

* Node.js + Express
* MongoDB (Mongoose)
* JWT & Bcrypt for authentication
* Cloudinary for image uploads
* Nodemon for development
* CORS
* dotenv for environment configuration

---

## 🌟 Features

✅ User Signup & Login with JWT-based authentication
✅ Admin/Seller login with role-based access
✅ Product management: create, update, delete, mark in-stock/out-of-stock
✅ Order management: create, view, and track orders
✅ Cloudinary integration for product images
✅ RESTful API design for frontend consumption
✅ Environment variable configuration for flexible deployment

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Anirudh-Singh-26/ZipCart_Backend.git
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

4. **Run development server**

```bash
npm run dev
```

---

## 📚 API Endpoints

* **User Authentication:** `/api/user/register`, `/api/user/login`
* **Product Management:** `/api/product/add`, `/api/product/update/:id`, `/api/product/delete/:id`, `/api/product/list`
* **Order Management:** `/api/order/create`, `/api/order/list`, `/api/order/:id`
* **Admin/Seller Actions:** role-based endpoints for managing products and orders

---

## 👤 Author

Anirudh Singh Rathore
[GitHub Profile](https://github.com/Anirudh-Singh-26)

---

## 📄 License

MIT © Anirudh Singh Rathore
