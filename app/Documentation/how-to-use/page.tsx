"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaRedo,
  FaPlus,
  FaCog,
  FaChartBar,
  FaInfo,
  FaTerminal,
} from "react-icons/fa";

export default function HowToUsePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 5 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Documentation>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="prose prose-gray dark:prose-invert max-w-none"
      >
        <motion.h1
          variants={item}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent"
        >
          Cara Menggunakan Simulasi MLFQ
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaPlus className="mr-2" />
              Membuat Proses
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Untuk membuat proses baru dalam simulasi:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-400">
              <li className="pl-2">
                Klik tombol{" "}
                <span className="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                  `Buat Proses`
                </span>{" "}
                di panel kontrol
              </li>
              <li className="pl-2">
                Atur parameter proses:
                <ul className="pl-6 mt-2 space-y-2 list-disc">
                  <li>
                    ID Proses{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (diberikan secara otomatis)
                    </span>
                  </li>
                  <li>Waktu Kedatangan</li>
                  <li>Waktu Burst</li>
                  <li>
                    Prioritas{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      (opsional)
                    </span>
                  </li>
                </ul>
              </li>
              <li className="pl-2">
                Klik{" "}
                <span className="font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                  `Buat`
                </span>{" "}
                untuk menambahkan proses ke simulasi
              </li>
            </ol>
          </div>
        </motion.div>

        {/* Process Parameters Explained section */}
        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaInfo className="mr-2" />
              Penjelasan Parameter Proses
            </h2>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Memahami setiap parameter saat mendefinisikan proses:
            </p>

            <div className="space-y-6">
              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  ID Proses
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Pengenal unik untuk proses (contoh: P1, P2, dst.)
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded mt-2 p-3 text-sm border border-blue-200 dark:border-blue-600">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Contoh:
                  </span>{" "}
                  P1, Proses_A, Job3
                </div>
              </div>

              <div className="border-l-4 border-green-300 pl-4">
                <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
                  Waktu Kedatangan
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Kapan proses masuk ke antrian siap (unit waktu)
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded mt-2 p-3 text-sm border border-green-200 dark:border-green-600">
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Contoh:
                  </span>{" "}
                  0 berarti proses tersedia di awal simulasi, 5 berarti tiba setelah 5 unit waktu
                </div>
              </div>

              <div className="border-l-4 border-purple-300 pl-4">
                <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">
                  CPU Burst
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Waktu yang diperlukan untuk eksekusi CPU (unit waktu)
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded mt-2 p-3 text-sm border border-purple-200 dark:border-purple-600">
                  <span className="text-purple-700 dark:text-purple-300 font-medium">
                    Contoh:
                  </span>{" "}
                  8 berarti proses membutuhkan 8 unit waktu CPU untuk menyelesaikan eksekusinya
                </div>
              </div>

              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  IO Burst
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Waktu yang dihabiskan untuk operasi I/O (unit waktu)
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded mt-2 p-3 text-sm border border-blue-200 dark:border-blue-600">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    Contoh:
                  </span>{" "}
                  3 berarti proses akan melakukan operasi I/O selama 3 unit waktu setelah menggunakan CPU
                </div>
              </div>

              <div className="border-l-4 border-green-300 pl-4">
                <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
                  Prioritas
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Prioritas awal proses (berpengaruh pada level antrian awal)
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded mt-2 p-3 text-sm border border-green-200 dark:border-green-600">
                  <span className="text-green-700 dark:text-green-300 font-medium">
                    Contoh:
                  </span>{" "}
                  0 berarti prioritas tertinggi, nilai yang lebih besar berarti prioritas lebih rendah
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-600 rounded-md">
              <p className="flex items-start">
                <FaTerminal className="text-blue-500 dark:text-blue-400 mr-2 mt-1" />
                <span className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Tips:</strong> Untuk simulasi yang realistis, pertimbangkan menggunakan variasi waktu yang berbeda untuk setiap proses agar mencerminkan kondisi sistem nyata.
                </span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaCog className="mr-2" />
              Mengkonfigurasi Parameter MLFQ
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Anda dapat menyesuaikan parameter algoritma MLFQ:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Jumlah antrian{" "}
                  <span className="text-gray-500 dark:text-gray-400">
                    (default: 4)
                  </span>
                </span>
              </li>
              <li className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Kuantum waktu untuk setiap antrian
                </span>
              </li>
              <li className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Ambang batas aging
                </span>
              </li>
              <li className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400">
                  Interval boost prioritas
                </span>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaPlay className="mr-2" />
              Menjalankan Simulasi
            </h2>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Untuk memulai simulasi:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaPlay className="text-green-600 dark:text-green-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Klik tombol{" "}
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    Mulai
                  </span>{" "}
                  untuk memulai
                </span>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaStepForward className="text-blue-600 dark:text-blue-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Gunakan{" "}
                  <span className="font-semibold text-blue-700 dark:text-blue-300">
                    Step
                  </span>{" "}
                  untuk maju satu unit waktu
                </span>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                  <FaPause className="text-purple-600 dark:text-purple-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Gunakan{" "}
                  <span className="font-semibold text-purple-700 dark:text-purple-300">
                    Jeda
                  </span>{" "}
                  untuk berhenti sementara
                </span>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaRedo className="text-green-600 dark:text-green-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Gunakan{" "}
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    Reset
                  </span>{" "}
                  untuk mulai ulang
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaChartBar className="mr-2" />
              Melihat Hasil
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Simulasi menyediakan berbagai cara untuk melihat hasil:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-2 border border-blue-200 dark:border-blue-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Visualisasi real-time dari eksekusi proses
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded mr-2 border border-green-200 dark:border-green-600">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Status antrian dan perpindahan proses antar antrian
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded mr-2 border border-purple-200 dark:border-purple-600">
                  ✓
                </span>
                <div className="text-gray-600 dark:text-gray-400">
                  <p>Metrik kinerja:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pl-4">
                    <div className="flex items-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-2 rounded-md shadow-sm border border-blue-100 dark:border-blue-600">
                      <div className="h-1 w-1 rounded-full bg-blue-500 mr-2"></div>
                      <span>Rata-rata Turnaround Time</span>
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-green-50 to-purple-50 dark:from-green-900/20 dark:to-purple-900/20 p-2 rounded-md shadow-sm border border-green-100 dark:border-green-600">
                      <div className="h-1 w-1 rounded-full bg-green-500 mr-2"></div>
                      <span>Rata-rata Waiting Time</span>
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-2 rounded-md shadow-sm border border-purple-100 dark:border-purple-600">
                      <div className="h-1 w-1 rounded-full bg-purple-500 mr-2"></div>
                      <span>Utilisasi CPU</span>
                    </div>
                    <div className="flex items-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-2 rounded-md shadow-sm border border-blue-100 dark:border-blue-600">
                      <div className="h-1 w-1 rounded-full bg-blue-500 mr-2"></div>
                      <span>Urutan penyelesaian proses</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}