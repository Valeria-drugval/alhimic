package main

import (
    "database/sql"
    "encoding/json"
    "log"
    "net/http"
    "github.com/gorilla/mux"
    _ "github.com/lib/pq"
)

var db *sql.DB // Глобальная переменная для подключения к БД

type Treatment struct {
    ID        int    `json:"id"`
    PatientID int    `json:"patient_id"`
    Date      string `json:"date"`
    Notes     string `json:"notes"`
}

func main() {
    // Подключение к PostgreSQL
    var err error
    db, err = sql.Open("postgres", "host=postgres user=postgres password=postgres dbname=patients sslmode=disable")
    if err != nil {
        log.Fatal("Ошибка подключения к БД:", err)
    }
    defer db.Close()

    // Роутер
    r := mux.NewRouter()
    r.HandleFunc("/patients/{id}/history", getTreatmentHistory).Methods("GET")
    r.HandleFunc("/patients/{id}/history", addTreatmentRecord).Methods("POST")

    log.Fatal(http.ListenAndServe(":8081", r))
}

// Получение истории
func getTreatmentHistory(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    patientID := vars["id"]

    rows, err := db.Query(`
        SELECT id, date, notes 
        FROM treatment_history 
        WHERE patient_id = $1
    `, patientID)
    
    if err != nil {
        http.Error(w, "Ошибка запроса", http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var history []Treatment
    for rows.Next() {
        var t Treatment
        if err := rows.Scan(&t.ID, &t.Date, &t.Notes); err != nil {
            http.Error(w, "Ошибка чтения данных", http.StatusInternalServerError)
            return
        }
        history = append(history, t)
    }
    json.NewEncoder(w).Encode(history)
}

// Добавление записи
func addTreatmentRecord(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    patientID := vars["id"]

    var t Treatment
    if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
        http.Error(w, "Неверный JSON", http.StatusBadRequest)
        return
    }

    _, err := db.Exec(`
        INSERT INTO treatment_history (patient_id, date, notes) 
        VALUES ($1, $2, $3)
    `, patientID, t.Date, t.Notes)
    
    if err != nil {
        http.Error(w, "Ошибка сохранения", http.StatusInternalServerError)
        return
    }
    w.WriteHeader(http.StatusCreated)
}