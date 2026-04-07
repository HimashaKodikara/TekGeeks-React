import PropTypes from 'prop-types';

export default function UserCard({ user }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-lg shadow-indigo-100 ring-1 ring-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          ID: {user.id}
        </span>
      </div>
      
      <div className="flex items-center justify-start gap-2 text-gray-600 mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        <span className="text-sm font-medium">{user.email}</span>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
