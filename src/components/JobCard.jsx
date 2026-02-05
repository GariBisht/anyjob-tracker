export default function JobCard({ job, onDelete, onUpdateStatus }) {
  const status = job.status || 'Applied';
  const statusClass =
    status === 'Applied' ? 'bg-indigo-100 text-indigo-800' :
    status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
    status === 'Offer' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white/95 p-5 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 border border-gray-100">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.company}</h3>
          <p className="text-gray-600">{job.role}</p>
          <p className="text-sm text-gray-500 mt-1">Applied on: {job.appliedDate}</p>
        </div>

        <div className="flex flex-col items-end gap-3">
          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusClass}`}>
            <span className={`w-2 h-2 rounded-full ${status === 'Applied' ? 'bg-indigo-600' : status === 'Interview' ? 'bg-yellow-500' : status === 'Offer' ? 'bg-green-600' : 'bg-red-600'}`}></span>
            {status}
          </span>

          <div className="flex gap-2">
            <select
              value={job.status}
              onChange={(e) => onUpdateStatus(job.id, e.target.value)}
              className="px-3 py-1 border border-gray-200 rounded-full text-sm bg-white"
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>

            <button
              onClick={() => onDelete(job.id)}
              className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

