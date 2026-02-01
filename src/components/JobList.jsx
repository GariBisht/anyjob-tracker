import JobCard from "./JobCard";

export default function JobList({ jobs, onDelete, onUpdateStatus }) {
  if (jobs.length === 0) {
    return <p className="text-center text-gray-500 py-8">No jobs added yet.</p>;
  }

  return (
    <div className="space-y-4">
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

