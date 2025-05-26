import AddPatientForm from './components/patients/AddPatientForm';
import PatientList from './components/patients/PatientList';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <AddPatientForm />
        <PatientList />
      </div>
    </div>
  );
}