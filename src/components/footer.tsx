export function Footer() {
  return (
    <footer className="border-t py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-600 cursor-pointer">Our Story</li>
              <li className="hover:text-gray-600 cursor-pointer">Team</li>
              <li className="hover:text-gray-600 cursor-pointer">Careers</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-600 cursor-pointer">Features</li>
              <li className="hover:text-gray-600 cursor-pointer">Pricing</li>
              <li className="hover:text-gray-600 cursor-pointer">FAQ</li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-600 cursor-pointer">Blog</li>
              <li className="hover:text-gray-600 cursor-pointer">
                Documentation
              </li>
              <li className="hover:text-gray-600 cursor-pointer">Support</li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-gray-600 cursor-pointer">Email</li>
              <li className="hover:text-gray-600 cursor-pointer">Twitter</li>
              <li className="hover:text-gray-600 cursor-pointer">LinkedIn</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 pt-8 border-t text-sm">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

