import { useState, useEffect } from "react";
import Header from "./components/Header";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";

export default function App() {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/jobs');
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (job) => {
    // Basic defensive validation (in addition to form validation)
    if (!job || !job.company || !job.role) {
      const msg = 'Company and Role are required.';
      setError(msg);
      throw new Error(msg);
    }

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        // try to read error message from server
        const body = await res.json().catch(() => null);
        const msg = body?.error || `Failed to add job (status ${res.status}).`;
        setError(msg);
        throw new Error(msg);
      }

      const created = await res.json();
      setJobs((prev) => [...prev, created]);
      return created;
    } catch (err) {
      setError(err.message || 'Error');
      throw err; // rethrow so callers (forms) can show message
    }
  };

  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete');
      setJobs((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      setError(err.message || 'Error');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update');
      const updated = await res.json();
      setJobs((prev) => prev.map((j) => (j.id === id ? updated : j)));
    } catch (err) {
      setError(err.message || 'Error');
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;
    const matchesSearch =
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.role.toLowerCase().includes(search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div
      className="relative min-h-screen py-8 bg-hero bg-cover bg-center"
    >
      {/* <Header /> */}
      {/* subtle dark overlay so content stays readable */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">Job Tracker</h1>

        {error && (
          <div className="mb-4 text-center text-red-300">{error}</div>
        )}

        <JobForm onAddJob={addJob} />

        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <div className="text-center text-white mt-6">Loading jobs…</div>
        ) : (
          <JobList
            jobs={filteredJobs}
            onDelete={deleteJob}
            onUpdateStatus={updateStatus}
          />
        )}
      </div>
    </div>
  );
}
