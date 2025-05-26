import { useEffect, useState } from 'react';
import axios from 'axios';

interface Treatment {
    id: number;
    date: string;
    notes: string;
}

export default function TreatmentHistory({ patientId }: { patientId: number }) {
    const [history, setHistory] = useState<Treatment[]>([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:8080/patients/${patientId}/history`)
            .then(res => setHistory(res.data));
    }, [patientId]);

    const handleAddNote = async () => {
        await axios.post(`http://localhost:8080/patients/${patientId}/history`, {
            date: new Date().toISOString().split('T')[0],
            notes: newNote
        });
        setNewNote('');
        const response = await axios.get(`http://localhost:8080/patients/${patientId}/history`);
        setHistory(response.data);
    };

    return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">История лечения</h3>
            <textarea
                placeholder="Новая запись"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full p-2 border rounded mb-2"
            />
            <button
                onClick={handleAddNote}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                Добавить запись
            </button>
            <div className="mt-4">
                {history.map(record => (
                    <div key={record.id} className="mb-2 p-2 bg-white rounded shadow">
                        <p className="text-gray-500 text-sm">{record.date}</p>
                        <p>{record.notes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}