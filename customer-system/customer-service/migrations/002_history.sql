CREATE TABLE IF NOT EXISTS treatment_history (
    id SERIAL PRIMARY KEY,
    patient_id INT REFERENCES patients(id),
    date DATE NOT NULL,
    notes TEXT NOT NULL
);