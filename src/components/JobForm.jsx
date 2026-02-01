import { useState } from "react";

export default function JobForm({ onAddJob }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!company || !role) return;

    const newJob = {
      id: Date.now(),
      company,
      role,
      status,
      appliedDate: new Date().toISOString().slice(0, 10),
    };

    onAddJob(newJob);
    setCompany("");
    setRole("");
    setStatus("Applied");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button>Add Job</button>
    </form>
  );
}

