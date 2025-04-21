import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Scanner de Notas
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Upload
            </Link>
            <Link to="/results" className="text-gray-600 hover:text-gray-900">
              Resultados
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar