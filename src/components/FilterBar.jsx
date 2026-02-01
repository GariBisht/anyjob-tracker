export default function FilterBar({
  statusFilter,
  setStatusFilter,
  search,
  setSearch,
}) {
  return (
    <div>
      <input
        placeholder="Search company or role"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
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

