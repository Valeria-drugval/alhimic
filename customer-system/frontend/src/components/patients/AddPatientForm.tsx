import { useState } from 'react';
import axios from 'axios';

export default function AddPatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    diagnosis: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/patients', formData);
      setFormData({ name: '', diagnosis: '', email: '', password: '' });
      alert('Пациент успешно добавлен!');
    } catch (error) {
      alert('Ошибка при добавлении пациента');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Добавить нового пациента</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Имя пациента"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          placeholder="Диагноз"
          value={formData.diagnosis}
          onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
          className="w-full p-2 border rounded h-24 focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          placeholder="Электронная почта"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
        >
          Добавить пациента
        </button>
      </form>
    </div>
  );
}