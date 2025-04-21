import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UploadPage from './pages/UploadPage'
import ResultsPage from './pages/ResultsPage'
import Navbar from './components/Navbar'

function App() {
  const [receiptData, setReceiptData] = useState(null)

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<UploadPage setReceiptData={setReceiptData} />} />
          <Route path="/results" element={<ResultsPage receiptData={receiptData} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App