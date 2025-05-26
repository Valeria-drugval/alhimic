package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "math/rand"
    "github.com/gorilla/mux"
    
)

// Структура для запроса
type MLRequest struct {
    Data [][]float64 `json:"data"`
    K    int         `json:"k"`
}

// Структура для ответа
type MLResponse struct {
    Clusters []int `json:"clusters"`
}

func main() {
    r := mux.NewRouter()
    r.HandleFunc("/cluster", handleCluster).Methods("POST")

    fmt.Println("ML-сервис запущен на :8082")
    log.Fatal(http.ListenAndServe(":8082", r))
}

// Обработчик кластеризации (упрощённый k-means)
func handleCluster(w http.ResponseWriter, r *http.Request) {
    var req MLRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Ошибка данных", http.StatusBadRequest)
        return
    }

    // Генерируем случайные кластеры (для примера)
    clusters := make([]int, len(req.Data))
    for i := range clusters {
        clusters[i] = rand.Intn(req.K)
    }

    json.NewEncoder(w).Encode(MLResponse{Clusters: clusters})
}