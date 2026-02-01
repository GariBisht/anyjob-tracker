export default function JobCard({ job, onDelete, onUpdateStatus }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
      <p className="text-gray-600">{job.role}</p>
      <p className="text-sm text-gray-500">Applied on: {job.appliedDate}</p>

      <div className="mt-4 flex items-center justify-between">
        <select
          value={job.status}
          onChange={(e) => onUpdateStatus(job.id, e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

