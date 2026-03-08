
পোস্টম্যানে লগইন টেস্ট করার জন্য নিচে ৫টি ভিন্ন রোল এবং ইউজারের **Login JSON** দেওয়া হলো। 

আপনার ব্যাকএন্ডের **`POST /api/auth/login`** এন্ডপয়েন্টে এই ডেটাগুলো ব্যবহার করুন। (মনে রাখবেন, আগে আপনাকে এই ইউজারগুলো **Register** করে নিতে হবে)।

### ১. Admin Login (অ্যাডমিন লগইন)
**Email:** `admin@medistore.com`
```json
{
  "email": "admin@medistore.com",
  "password": "password123"
}
```

### ২. Seller 1 Login (বিক্রেতা ১ - রহিম ফার্মেসি)
**Email:** `rahim@seller.com`
```json
{
  "email": "rahim@seller.com",
  "password": "password123"
}
```

### ৩. Seller 2 Login (বিক্রেতা ২ - করিম হেলথ কেয়ার)
**Email:** `karim@seller.com`
```json
{
  "email": "karim@seller.com",
  "password": "password123"
}
```

### ৪. Customer 1 Login (ক্রেতা ১ - জসিম আহমেদ)
**Email:** `jasim@customer.com`
```json
{
  "email": "jasim@customer.com",
  "password": "password123"
}
```

### ৫. Customer 2 Login (ক্রেতা ২ - সুলতানা বেগম)
**Email:** `sultana@customer.com`
```json
{
  "email": "sultana@customer.com",
  "password": "password123"
}
```

---

### 💡 পোস্টম্যান (Postman) ব্যবহারের গুরুত্বপূর্ণ টিপস:

১. **টোকেন সংগ্রহ (Token):** 
লগইন সফল হলে আপনার ব্যাকএন্ড থেকে একটি `token` (JWT) রিটার্ন করবে। সেটি কপি করে রাখুন।

২. **প্রাইভেট রুট টেস্ট করা:**
পরবর্তীতে যখন আপনি `/api/orders` বা `/api/seller/medicines` এ রিকোয়েস্ট পাঠাবেন, তখন:
- Postman-এ **Auth** ট্যাবে যান।
- Type থেকে **Bearer Token** সিলেক্ট করুন।
- লগইন করার পর পাওয়া **Token** টি ওখানে পেস্ট করে দিন। 

৩. **ভুল পাসওয়ার্ড টেস্ট (Error Handling):**
যদি ভুল পাসওয়ার্ড দিয়ে চেক করতে চান, তাহলে নিচের মতো ডাটা দিন (এটি ৪০১ বা ৪০০ এরর দেওয়া উচিত):
```json
{
  "email": "admin@medistore.com",
  "password": "wrongpassword"
}
```

আপনার ব্যাকএন্ডের ফিল্ডের নাম যদি `email` না হয়ে `username` হয়, তবে শুধু কী (Key) এর নাম পরিবর্তন করে নিলেই হবে।

আপনার Prisma Schema অনুযায়ী আমি এখন **Medicine**, **Order** এবং **Review** এর জন্য ৫টি করে স্যাম্পল JSON তৈরি করে দিচ্ছি। 

**একটি জরুরি অনুরোধ:** যেহেতু আপনি ক্যাটাগরি এবং ইউজার অলরেডি তৈরি করেছেন, তাই আপনার ডেটাবেজ (PostgreSQL) থেকে ওই আইডিগুলো (UUID) কপি করে নিচের JSON-এর নির্দিষ্ট জায়গায় বসাতে হবে।

---

আপনার MediStore প্রজেক্টের ব্যাকএন্ড টেস্ট করার জন্য আমি ৫টি করে স্যাম্পল JSON ডেটা তৈরি করে দিচ্ছি। আপনি এগুলো পোস্টম্যানের (Postman) বডিতে **`raw`** এবং **`JSON`** ফরম্যাট সিলেক্ট করে ব্যবহার করতে পারবেন।

যেহেতু ডেটাবেজে একটির সাথে অন্যটির সম্পর্ক (Relation/Reference) থাকে, তাই নিচের সিরিয়াল অনুযায়ী ডেটা ইনপুট দিলে সুবিধা হবে:

---

### ১. Categories (ক্যাটাগরি তৈরি)
প্রথমে ক্যাটাগরিগুলো তৈরি করে নিন।
**Endpoint:** `POST /api/categories`

```json
[
  { "name": "Pain Relief", "description": "Medicines for headache and body pain" },
  { "name": "Fever & Cold", "description": "Common cold and fever medications" },
  { "name": "Vitamins", "description": "Health supplements and vitamins" },
  { "name": "Skin Care", "description": "Ointments and skin treatments" },
  { "name": "Digestive Health", "description": "Gastric and digestion related medicines" }
]
```

---

### ২. Users (ইউজার রেজিস্ট্রেশন)
এখানে ৩টি রোলের (Admin, Seller, Customer) স্যাম্পল ডেটা দেওয়া হলো।
**Endpoint:** `POST /api/auth/register`

```json
[
  { "name": "Admin User", "email": "admin@medistore.com", "password": "password123", "role": "Admin" },
  { "name": "Rahim Pharmacy", "email": "rahim@seller.com", "password": "password123", "role": "Seller" },
  { "name": "Karim Health Care", "email": "karim@seller.com", "password": "password123", "role": "Seller" },
  { "name": "Jasim Ahmed", "email": "jasim@customer.com", "password": "password123", "role": "Customer" },
  { "name": "Sultana Begum", "email": "sultana@customer.com", "password": "password123", "role": "Customer" }
]
```

---


### পোস্টম্যান টিপস:
1. **Login:** প্রথমে `/api/auth/login` এ রিকোয়েস্ট পাঠিয়ে **Token** সংগ্রহ করুন। 
2. **Authorization:** প্রাইভেট রুটগুলোর (Seller/Admin/Customer) জন্য Postman-এর `Auth` ট্যাবে গিয়ে `Bearer Token` হিসেবে ওই টোকেনটি সেট করুন।
3. **Sequence:** আগে Category এবং User তৈরি না করলে Medicine বা Order এর কাজ করবে না কারণ এগুলোর একে অপরের ওপর ডিপেন্ডেন্সি আছে। 

আপনার ব্যাকএন্ডে যদি ফিল্ডের নাম ভিন্ন হয় (যেমন: `price` এর জায়গায় `unitPrice`), তবে সামান্য পরিবর্তন করে নিতে পারেন। কোনো এরর আসলে জানাবেন!

### ১. Medicine (মেডিসিন তৈরি)
**Endpoint:** `POST /api/seller/medicines`
*(নোট: এখানে `categoryId` এবং `sellerId` হিসেবে ডেটাবেজে থাকা Seller এবং Category-এর অরিজিনাল ID দিন)*

```json
[
  {
    "name": "Napa Extend",
    "description": "Long lasting paracetamol for pain relief",
    "price": 15.0,
    "stock": 500,
    "manufacturer": "Beximco Pharma",
    "image": "https://example.com/napa.jpg",
    "categoryId": "এখানে_Category_ID_দিন",
    "sellerId": "এখানে_Seller_ID_দিন"
  },
  {
    "name": "Fexo 120",
    "description": "Antihistamine for allergy treatment",
    "price": 8.5,
    "stock": 200,
    "manufacturer": "Incepta",
    "image": null,
    "categoryId": "এখানে_Category_ID_দিন",
    "sellerId": "এখানে_Seller_ID_দিন"
  },
  {
    "name": "Ace 500",
    "description": "Effective for fever and body pain",
    "price": 10.0,
    "stock": 1000,
    "manufacturer": "Square Pharma",
    "image": "https://example.com/ace.jpg",
    "categoryId": "এখানে_Category_ID_দিন",
    "sellerId": "এখানে_Seller_ID_দিন"
  },
  {
    "name": "Entacyd Plus",
    "description": "Chewable tablet for acidity control",
    "price": 5.0,
    "stock": 300,
    "manufacturer": "Square Pharma",
    "image": null,
    "categoryId": "এখানে_Category_ID_দিন",
    "sellerId": "এখানে_Seller_ID_দিন"
  },
  {
    "name": "Savlon Liquid",
    "description": "Antiseptic for cleaning wounds",
    "price": 60.0,
    "stock": 50,
    "manufacturer": "ACI Limited",
    "image": "https://example.com/savlon.jpg",
    "categoryId": "এখানে_Category_ID_দিন",
    "sellerId": "এখানে_Seller_ID_দিন"
  }
]
```

---

### ২. Order (অর্ডার তৈরি)
**Endpoint:** `POST /api/orders`
*(Prisma-তে `items` ফিল্ডটি **Json** হিসেবে আছে, তাই এখানে আমরা প্রোডাক্টের ডিটেইলস অবজেক্ট আকারে পাঠাতে পারি)*

```json
[
  {
    "customerId": "এখানে_Customer_ID_দিন",
    "totalAmount": 45.0,
    "shippingAddress": "House 12, Road 5, Dhanmondi, Dhaka",
    "items": [
      { "medicineId": "med_id_1", "name": "Napa", "quantity": 2, "price": 15.0 },
      { "medicineId": "med_id_2", "name": "Fexo", "quantity": 1, "price": 15.0 }
    ]
  },
  {
    "customerId": "এখানে_Customer_ID_দিন",
    "totalAmount": 100.0,
    "shippingAddress": "Flat 4B, Uttara Sector 7, Dhaka",
    "items": [
      { "medicineId": "med_id_3", "name": "Savlon", "quantity": 1, "price": 60.0 },
      { "medicineId": "med_id_1", "name": "Napa", "quantity": 3, "price": 40.0 }
    ]
  }
]
```

---

### ৩. Review (রিভিউ তৈরি)
**Endpoint:** `POST /api/reviews` (বা আপনার রাউট অনুযায়ী)

```json
[
  {
    "rating": 5,
    "comment": "Very effective medicine, and fast delivery!",
    "medicineId": "এখানে_Medicine_ID_দিন",
    "userId": "এখানে_Customer_ID_দিন"
  },
  {
    "rating": 4,
    "comment": "Good quality medicine, well packaged.",
    "medicineId": "এখানে_Medicine_ID_দিন",
    "userId": "এখানে_Customer_ID_দিন"
  },
  {
    "rating": 5,
    "comment": "Authentic product, long expiry date.",
    "medicineId": "এখানে_Medicine_ID_দিন",
    "userId": "এখানে_Customer_ID_দিন"
  },
  {
    "rating": 2,
    "comment": "Delivery was late, but product is okay.",
    "medicineId": "এখানে_Medicine_ID_দিন",
    "userId": "এখানে_Customer_ID_দিন"
  },
  {
    "rating": 5,
    "comment": "The seller is very responsive. Recommended!",
    "medicineId": "এখানে_Medicine_ID_দিন",
    "userId": "এখানে_Customer_ID_দিন"
  }
]
```

### কিছু টিপস:
1. **Float vs Int:** আপনার স্কিমাতে `price` এবং `totalAmount` আছে **Float**, তাই এখানে ডেসিমেল (যেমন: `15.0`) ব্যবহার করা ভালো।
2. **Order Status:** অর্ডারের জন্য `status` দেওয়ার দরকার নেই কারণ স্কিমাতে `PLACED` ডিফল্ট করা আছে।
3. **Image:** আপনার স্কিমাতে `image String?` (Optional) দেওয়া আছে, তাই কিছু মেডিসিনে আমি `null` দিয়েছি চেক করার জন্য। 
4. **Login Token:** এই রিকোয়েস্টগুলো পাঠানোর আগে অবশ্যই **Login** করে হেডার-এ `Authorization: Bearer <token>` সেট করে নেবেন।