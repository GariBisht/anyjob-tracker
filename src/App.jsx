import { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [jobs, setJobs] = useLocalStorage("jobs", []);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");

  const addJob = (job) => {
    setJobs([...jobs, job]);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const updateStatus = (id, status) => {
    setJobs(
      jobs.map((job) =>
        job.id === id ? { ...job, status } : job
      )
    );
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">Job Tracker</h1>

        <JobForm onAddJob={addJob} />

        <FilterBar
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          search={search}
          setSearch={setSearch}
        />

        <JobList
          jobs={filteredJobs}
          onDelete={deleteJob}
          onUpdateStatus={updateStatus}
        />
      </div>
    </div>
  );
}
