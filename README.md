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
Update: 2026-10-23T16:15:51.889971
Update: 2026-10-18T21:35:12.197331
Update: 2025-12-12T05:19:00.539767
Update: 2026-05-02T01:07:47.901421
Update: 2026-01-29T16:19:52.212005
Update: 2026-04-08T06:20:26.554633
Update: 2026-10-13T13:26:35.919079
Update: 2026-06-03T11:14:10.249415
Update: 2026-03-02T14:35:32.606889
Update: 2026-10-20T14:38:40.929340
Update: 2026-10-22T10:32:31.283219
Update: 2026-03-23T19:33:10.616167
Update: 2026-08-06T18:00:56.935717
Update: 2026-02-28T02:35:55.343175
Update: 2026-03-11T23:58:56.701737
Update: 2026-08-13T02:27:55.019992
Update: 2026-11-16T11:54:47.461344
Update: 2026-09-08T22:27:25.875414
Update: 2026-02-09T17:44:02.221206
Update: 2026-04-28T11:02:08.547438
Update: 2026-03-19T23:24:06.913489
Update: 2026-03-14T05:59:19.312320
Update: 2026-10-30T03:12:41.626050
Update: 2026-03-25T01:56:02.989819
Update: 2026-05-31T12:02:49.357127
Update: 2026-05-04T16:40:07.693632
Update: 2026-01-16T21:34:05.068129
Update: 2026-11-07T00:41:12.376655
Update: 2025-11-30T00:52:21.701927
Update: 2026-07-08T00:08:49.038575
Update: 2026-06-04T03:51:28.357395
Update: 2025-12-14T20:44:09.702629
Update: 2026-02-19T08:33:18.057338
Update: 2025-12-06T12:29:58.389574
Update: 2026-01-25T15:59:57.776327
Update: 2026-06-24T05:38:50.145807
Update: 2026-02-23T05:27:15.757198
Update: 2026-09-18T12:42:19.161012
Update: 2026-03-18T15:21:29.480884
Update: 2026-05-06T10:12:30.899118
Update: 2026-08-10T15:21:10.261255
Update: 2026-06-19T01:04:00.651119
Update: 2026-08-17T08:57:44.996097
Update: 2026-07-13T11:44:47.378691
Update: 2026-09-13T04:59:19.715521
Update: 2026-10-15T02:57:42.066946
Update: 2026-06-08T08:15:09.452357
Update: 2026-04-30T07:15:20.798268
Update: 2026-02-08T21:36:42.150071
Update: 2026-10-06T14:15:03.540739
Update: 2026-08-26T03:37:01.890484
Update: 2026-07-10T03:41:42.197547
Update: 2025-11-22T23:21:11.578167
Update: 2026-08-09T06:48:53.950337
Update: 2026-11-17T15:50:20.318463
Update: 2026-08-21T14:18:36.680149
Update: 2026-07-26T09:23:24.203459
Update: 2026-02-15T20:21:26.591157
Update: 2026-04-11T05:52:23.031625
Update: 2026-08-10T07:42:23.406109
Update: 2026-01-17T02:20:47.719231
