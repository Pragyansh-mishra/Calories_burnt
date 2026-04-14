# 🔥 Calories Burnt Prediction System

A Machine Learning-powered web application that predicts the number of calories burned based on user input such as age, weight, duration of exercise, heart rate, and body temperature.

---

## 🚀 Overview

This project uses a trained Machine Learning model integrated with a Flask web application to provide real-time calorie burn predictions. It also stores user data and predictions in a database for future reference.

---

## 🧠 Features

* 🔮 Predict calories burned using ML model
* 📊 Takes multiple health inputs (age, weight, heart rate, etc.)
* 💾 Stores prediction history in SQLite database
* 🌐 REST API for predictions
* 🖥️ Simple frontend using HTML templates
* 📁 View all stored records

---

## ⚙️ Tech Stack

* **Frontend:** HTML, CSS
* **Backend:** Flask (Python)
* **Machine Learning:** Scikit-learn / XGBoost (based on model.pkl)
* **Database:** SQLite
* **Libraries:** NumPy, Pickle

---

## 📂 Project Structure

```
Calories_burnt/
│── app.py              # Main Flask application
│── model.pkl           # Trained ML model
│── scaler.pkl          # Feature scaler (optional)
│── database.db         # SQLite database
│── templates/          # HTML files
│── static/             # CSS / JS files
```

---

## 🛠️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/Pragyansh-mishra/Calories_burnt.git
cd Calories_burnt
```

2. Install dependencies:

```bash
pip install flask numpy scikit-learn
```

3. Run the application:

```bash
python app.py
```

4. Open in browser:

```
http://127.0.0.1:5000/
```

---

## 📡 API Usage

### 🔥 Predict Calories

**Endpoint:**

```
POST /predict
```

**Sample JSON Input:**

```json
{
  "Name": "John",
  "Gender": 1,
  "Age": 25,
  "Height": 175,
  "Weight": 70,
  "Duration": 30,
  "Heart_Rate": 120,
  "Body_Temp": 37
}
```

**Response:**

```json
{
  "success": true,
  "name": "John",
  "calories_burned": 230.45
}
```

---

## 📊 View Records

**Endpoint:**

```
GET /records
```

Returns all stored predictions from the database.

---

## 🔮 Future Improvements

* Add user authentication system
* Improve UI/UX design
* Deploy on cloud (Render / AWS / Vercel)
* Add graphs & analytics dashboard
* Mobile-friendly design

---

## 👨‍💻 Author

**Pragyansh Mishra**

* GitHub: https://github.com/Pragyansh-mishra

---

## ⭐ Contribute

Feel free to fork this repo and improve it!

---

## 📜 License

This project is open-source and available under the MIT License.

---
Update: 2026-05-10T09:08:22.767241
Update: 2026-06-19T17:31:23.504845
Update: 2026-11-08T20:36:19.881337
Update: 2026-05-02T17:28:49.266202
Update: 2026-09-09T00:59:00.623369
Update: 2026-06-05T23:59:50.956576
Update: 2025-12-21T14:57:18.302261
Update: 2026-10-07T23:29:28.686285
Update: 2026-09-03T15:08:56.998052
Update: 2026-04-02T03:22:31.362938
Update: 2026-04-23T20:05:16.700471
Update: 2026-03-29T09:16:13.006974
Update: 2025-11-26T10:02:38.364019
Update: 2026-02-22T06:32:38.717323
Update: 2026-02-28T12:26:59.033374
Update: 2026-02-20T12:37:57.381378
Update: 2025-12-22T08:24:51.697238
Update: 2026-04-09T00:42:26.039589
Update: 2026-11-18T04:35:22.392121
Update: 2026-09-22T23:36:55.707925
Update: 2026-10-15T06:24:56.065290
Update: 2026-04-14T10:49:28.483311
