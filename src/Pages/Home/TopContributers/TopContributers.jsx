
const contributors = [
  { name: "Alice Johnson", avatar: "https://i.pravatar.cc/150?img=1", posts: 45, comments: 120 },
  { name: "Bob Smith", avatar: "https://i.pravatar.cc/150?img=2", posts: 38, comments: 95 },
  { name: "Catherine Lee", avatar: "https://i.pravatar.cc/150?img=3", posts: 50, comments: 80 },
  { name: "David Kim", avatar: "https://i.pravatar.cc/150?img=4", posts: 30, comments: 70 },
  { name: "Ella Wong", avatar: "https://i.pravatar.cc/150?img=5", posts: 28, comments: 65 },
];

const TopContributors = () => {
  return (
    <section className="bg-primary text-white py-16 px-6 md:px-12 lg:px-20 rounded-xl">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8">
          Top Contributors
        </h2>

        {/* Contributors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {contributors.map((user, index) => (
            <div
              key={index}
              className="bg-secondary border border-slate-700 rounded-xl p-4 flex flex-col items-center shadow-md hover:shadow-lg transition"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover mb-3"
              />
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {user.posts} posts • {user.comments} comments
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContributors;
