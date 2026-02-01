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
    <div className="container">
      <h1>Job Tracker</h1>

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
  );
}
