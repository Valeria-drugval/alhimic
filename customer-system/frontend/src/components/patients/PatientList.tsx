import { useEffect, useState } from 'react';
import axios from 'axios';
import TreatmentHistory from './TreatmentHistory'; 

interface Patient {
  id: number;
  name: string;
  diagnosis: string;
  email: string;
}

export default function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  // Загрузка пациентов
  useEffect(() => {
    axios.get('http://localhost:8080/patients')
      .then(res => setPatients(res.data));
  }, []);

  // Поиск пациентов
  const handleSearch = async () => {
    const response = await axios.get(
      `http://localhost:8080/patients/search?q=${searchQuery}`
    );
    setPatients(response.data);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Поиск */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="🔍 Поиск по имени или диагнозу"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Найти
        </button>
      </div>

      {/* Список пациентов */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map(patient => (
          <div 
            key={patient.id}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg"
            onClick={() => setSelectedPatient(patient.id)}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {patient.name}
            </h3>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Диагноз:</span> {patient.diagnosis}
            </p>
            <p className="text-blue-500 text-sm mt-1">{patient.email}</p>
          </div>
        ))}
      </div>

      {/* История лечения */}
      {selectedPatient && (
        <TreatmentHistory patientId={selectedPatient} />
      )}
    </div>
  );
}