export default function FilterBar({
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">


      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 border border-gray-200 rounded-full shadow-sm text-sm"
      >
        <option value="All">All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
    </div>
  );
}

