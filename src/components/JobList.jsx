import JobCard from "./JobCard";

export default function JobList({ jobs, onDelete, onUpdateStatus }) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block bg-white/90 rounded-lg p-6 shadow-md">
          <p className="text-gray-700 mb-3">No jobs added yet.</p>
          <a href="#add-job" className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md">Add your first job</a>
        </div>
      </div>
    );
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

