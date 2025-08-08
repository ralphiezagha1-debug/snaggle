export default function CategoryTabs() {
  const categories = ["All", "Tech", "Fashion", "Toys", "Other"];
  return (
    <div className="flex justify-center space-x-4 my-4">
      {categories.map((cat) => (
        <button key={cat} className="bg-navy text-neon-green border border-neon-green px-3 py-1 rounded hover:bg-neon-green hover:text-navy">
          {cat}
        </button>
      ))}
    </div>
  );
}