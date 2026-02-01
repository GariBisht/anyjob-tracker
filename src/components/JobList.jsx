import JobCard from "./JobCard";

export default function JobList({ jobs, onDelete, onUpdateStatus }) {
  if (jobs.length === 0) {
    return <p>No jobs added yet.</p>;
  }

  return (
    <div>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onDelete={onDelete}
          onUpdateStatus={onUpdateStatus}
        />
      ))}
    </div>
  );
}

