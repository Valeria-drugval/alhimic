FROM --platform=linux/amd64 golang:1.24 AS builder 
WORKDIR /app
COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o gateway .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/gateway .
EXPOSE 8082
CMD ["./gateway"]