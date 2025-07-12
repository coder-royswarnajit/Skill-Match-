const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">SS</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Skill Swap</span>
          </div>
          
          <div className="text-sm text-gray-500">
            © 2024 Skill Swap Platform. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 