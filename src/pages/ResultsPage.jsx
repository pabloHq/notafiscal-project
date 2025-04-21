import { useNavigate } from "react-router-dom";
import { ShoppingCart, ChevronLeft, AlertTriangle } from "lucide-react";

const ResultsPage = ({ receiptData }) => {
  const navigate = useNavigate();

  if (!receiptData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-yellow-50 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <AlertTriangle className="w-10 h-10 text-yellow-700 mb-3" />
          <p className="text-lg text-yellow-700 font-medium">Nenhum dado disponível.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center shadow-md"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Voltar para Upload
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <ShoppingCart className="w-8 h-8 mr-3 text-green-500" /> Dados da Nota Fiscal
        </h1>

        <div className="space-y-6">
          {receiptData.items && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Itens Comprados</h2>
              <div className="bg-gray-50 p-5 rounded-lg shadow-md overflow-x-auto">
                <table className="w-full border-collapse text-gray-700">
                  <thead>
                    <tr className="border-b bg-gray-200 text-gray-800">
                      <th className="text-left p-3">Produto</th>
                      <th className="text-right p-3">Qtd</th>
                      <th className="text-right p-3">Valor Unit.</th>
                      <th className="text-right p-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptData.items.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-100 transition">
                        <td className="p-3">{item.nome}</td>
                        <td className="text-right p-3">{item.quantidade}</td>
                        <td className="text-right p-3">R$ {Number(item.valorUnitario).toFixed(2)}</td>
                        <td className="text-right p-3 font-semibold">R$ {Number(item.valorTotal).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {receiptData.total && (
            <div className="text-right text-xl font-bold text-gray-800">
              Total: <span className="text-green-600">R$ {Number(receiptData.total).toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center shadow-md"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Processar Nova Nota
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
