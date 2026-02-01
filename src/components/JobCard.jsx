export default function JobCard({ job, onDelete, onUpdateStatus }) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p>{job.role}</p>
      <p>Applied on: {job.appliedDate}</p>

      <select
        value={job.status}
        onChange={(e) => onUpdateStatus(job.id, e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <button onClick={() => onDelete(job.id)}>Delete</button>
    </div>
  );
}

