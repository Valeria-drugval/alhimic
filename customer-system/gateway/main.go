package main

import (
    "log"
    "net/http"
    "net/http/httputil"
    "net/url"
    "github.com/gorilla/mux"
)

func enableCORS(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        next.ServeHTTP(w, r)
    })
}

func main() {
    r := mux.NewRouter()
    r.Use(enableCORS)

    // Объявление и инициализация внутри main()
    customerURL, _ := url.Parse("http://customer-service:8081")
    r.PathPrefix("/patients").Handler(httputil.NewSingleHostReverseProxy(customerURL))

    mlURL, _ := url.Parse("http://ml-service:8082")
    r.PathPrefix("/ml").Handler(httputil.NewSingleHostReverseProxy(mlURL))

    log.Println("Шлюз запущен на :8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}