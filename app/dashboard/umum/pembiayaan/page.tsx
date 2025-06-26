import {
  FaMoneyBill,
  FaCreditCard,
  FaChartLine,
  FaFileInvoice,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaDownload,
} from "react-icons/fa"
import PageHeader from "@/components/ui/PageHeader"
import StatsCard from "@/components/ui/StatsCard"
import Tooltip from "@/components/ui/Tooltip"

export default function PembiayaanPage() {
  const financialRecords = [
    {
      id: 1,
      workerName: "Ahmad Rizki",
      transactionType: "Training Fee",
      amount: "Rp 5,000,000",
      status: "paid",
      dueDate: "2024-01-15",
      paymentDate: "2024-01-10",
      paymentMethod: "Bank Transfer",
      invoiceNumber: "INV-2024-001",
    },
    {
      id: 2,
      workerName: "Siti Nurhaliza",
      transactionType: "Visa Processing",
      amount: "Rp 2,500,000",
      status: "pending",
      dueDate: "2024-01-20",
      paymentDate: "-",
      paymentMethod: "-",
      invoiceNumber: "INV-2024-002",
    },
    {
      id: 3,
      workerName: "Budi Santoso",
      transactionType: "Medical Check",
      amount: "Rp 1,200,000",
      status: "overdue",
      dueDate: "2024-01-05",
      paymentDate: "-",
      paymentMethod: "-",
      invoiceNumber: "INV-2024-003",
    },
    {
      id: 4,
      workerName: "Maya Sari",
      transactionType: "Document Processing",
      amount: "Rp 800,000",
      status: "paid",
      dueDate: "2024-01-12",
      paymentDate: "2024-01-11",
      paymentMethod: "Credit Card",
      invoiceNumber: "INV-2024-004",
    },
  ]

  const paymentPlans = [
    {
      id: 1,
      planName: "Basic Package",
      description: "Training + Visa Processing",
      totalAmount: "Rp 7,500,000",
      installments: 3,
      monthlyPayment: "Rp 2,500,000",
      subscribers: 45,
    },
    {
      id: 2,
      planName: "Premium Package",
      description: "Full Service Package",
      totalAmount: "Rp 15,000,000",
      installments: 6,
      monthlyPayment: "Rp 2,500,000",
      subscribers: 32,
    },
    {
      id: 3,
      planName: "Express Package",
      description: "Fast Track Processing",
      totalAmount: "Rp 12,000,000",
      installments: 4,
      monthlyPayment: "Rp 3,000,000",
      subscribers: 28,
    },
  ]

  const recentTransactions = [
    { id: 1, worker: "Ahmad Rizki", amount: "Rp 5,000,000", type: "Payment", time: "2 hours ago" },
    { id: 2, worker: "Siti Nurhaliza", amount: "Rp 2,500,000", type: "Invoice", time: "4 hours ago" },
    { id: 3, worker: "Maya Sari", amount: "Rp 800,000", type: "Payment", time: "6 hours ago" },
    { id: 4, worker: "Budi Santoso", amount: "Rp 1,200,000", type: "Reminder", time: "8 hours ago" },
  ]

  return (
    <>
      <PageHeader title="Pembiayaan" description="Kelola pembayaran, tagihan, dan paket pembiayaan pekerja">
        <div className="flex space-x-2">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <FaDownload className="mr-2" />
            Export
          </button>
          <button className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors flex items-center">
            <FaPlus className="mr-2" />
            Buat Invoice
          </button>
        </div>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <Tooltip content="Total pendapatan yang diterima dari seluruh pembayaran.">
          <StatsCard
            title="Total Pendapatan"
            value="Rp 245M"
            change="+15%"
            changeType="positive"
            icon={<FaMoneyBill className="text-green-600" />}
            iconBg="bg-green-100"
          />
        </Tooltip>
        <Tooltip content="Total tagihan yang masih menunggu pembayaran.">
          <StatsCard
            title="Tagihan Pending"
            value="Rp 45M"
            change="+8%"
            changeType="positive"
            icon={<FaFileInvoice className="text-yellow-600" />}
            iconBg="bg-yellow-100"
          />
        </Tooltip>
        <Tooltip content="Total pembayaran yang diterima bulan ini.">
          <StatsCard
            title="Pembayaran Bulan Ini"
            value="Rp 89M"
            change="+12%"
            changeType="positive"
            icon={<FaCreditCard className="text-blue-600" />}
            iconBg="bg-blue-100"
          />
        </Tooltip>
        <Tooltip content="Total tagihan yang belum dibayar (tunggakan).">
          <StatsCard
            title="Tunggakan"
            value="Rp 12M"
            change="-5%"
            changeType="negative"
            icon={<FaChartLine className="text-red-600" />}
            iconBg="bg-red-100"
          />
        </Tooltip>
      </div>

      {/* Payment Plans & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Payment Plans */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Paket Pembiayaan</h3>
          <div className="space-y-4">
            {paymentPlans.map((plan) => (
              <div key={plan.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{plan.planName}</h4>
                  <span className="text-sm font-medium text-red-600">{plan.totalAmount}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{plan.description}</p>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                  <div>{plan.installments} cicilan × {plan.monthlyPayment}</div>
                  <div>{plan.subscribers} pelanggan</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Transaksi Terbaru</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {transaction.worker
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{transaction.worker}</p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{transaction.amount}</p>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transaction.type === "Payment"
                        ? "bg-green-100 text-green-800"
                        : transaction.type === "Invoice"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Records Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Catatan Keuangan</h3>
              <p className="text-sm text-gray-600 mt-1">Kelola semua transaksi dan pembayaran</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Cari transaksi..."
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <select className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm">
                <option>Semua Status</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Pekerja
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis Transaksi
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No. Invoice
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jatuh Tempo
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Bayar
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metode Bayar
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.workerName}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.transactionType}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.amount}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.invoiceNumber}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.dueDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.paymentDate}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.paymentMethod}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : record.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {record.status === "paid" ? "Lunas" : record.status === "pending" ? "Pending" : "Terlambat"}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <FaEye />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
