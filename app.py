from flask import Flask, request, jsonify, render_template, redirect, url_for
import pickle
import numpy as np
import sqlite3

app = Flask(__name__)

# =========================
# 🔹 Load Model & Scaler
# =========================
model = pickle.load(open("model.pkl", "rb"))

try:
    scaler = pickle.load(open("scaler.pkl", "rb"))
except:
    scaler = None


# =========================
# 🔹 Database Setup
# =========================
def init_db():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            gender REAL,
            age REAL,
            height REAL,
            weight REAL,
            duration REAL,
            heart_rate REAL,
            body_temp REAL,
            calories REAL
        )
    """)

    conn.commit()
    conn.close()

init_db()


# =========================
# 🔹 Save Data to DB
# =========================
def save_to_db(name, data, prediction):
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO records 
        (name, gender, age, height, weight, duration, heart_rate, body_temp, calories)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (name, *data, prediction))

    conn.commit()
    conn.close()


# =========================
# 🔹 ROUTES (Frontend Pages)
# =========================

# 🟢 Home Page (Enter Name)
@app.route('/')
def home():
    return render_template("form.html", name="User")


# 🟢 Redirect to Form
@app.route('/form')
def form():
    name = request.args.get('username')
    return render_template("form.html", name=name)


# =========================
# 🔥 Prediction API
# =========================
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # ✅ Validate input
        required_fields = [
            'Gender','Age','Height','Weight',
            'Duration','Heart_Rate','Body_Temp','Name'
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({
                    "success": False,
                    "error": f"Missing field: {field}"
                })

        # 👤 Extract name
        name = data['Name']

        # 🔢 Extract features
        features = [
            float(data['Gender']),
            float(data['Age']),
            float(data['Height']),
            float(data['Weight']),
            float(data['Duration']),
            float(data['Heart_Rate']),
            float(data['Body_Temp'])
        ]

        features_array = np.array([features])

        # ⚠️ Apply scaling if exists
        if scaler:
            features_array = scaler.transform(features_array)

        # 🔮 Prediction
        prediction = model.predict(features_array)[0]

        # 💾 Save to database
        save_to_db(name, features, float(prediction))

        return jsonify({
            "success": True,
            "name": name,
            "calories_burned": round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        })


# =========================
# 🔍 View All Records (Optional)
# =========================
@app.route('/records')
def records():
    conn = sqlite3.connect("database.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM records")
    data = cursor.fetchall()

    conn.close()

    return jsonify(data)


# =========================
# 🚀 Run App
# =========================
if __name__ == "__main__":
    app.run(debug=True)