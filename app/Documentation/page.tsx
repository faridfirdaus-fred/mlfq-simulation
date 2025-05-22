"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaBook,
  FaInfoCircle,
  FaRocket,
  FaList,
  FaLaptopCode,
  FaTools,
  FaCode,
  FaQuestionCircle,
  FaLayerGroup,
  FaExchangeAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function DocumentationPage() {
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
          Selamat Datang di Simulasi MLFQ
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaBook className="mr-2" />
              Pengenalan
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Selamat datang di dokumentasi Simulasi MLFQ (Multi-Level Feedback Queue). Aplikasi ini menyediakan visualisasi interaktif dari algoritma penjadwalan MLFQ, membantu Anda memahami cara kerjanya secara real-time.
            </p>
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg border border-blue-200 dark:border-blue-600">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Simulasi ini dirancang untuk keperluan edukasi dan praktis, memungkinkan Anda bereksperimen dengan berbagai skenario penjadwalan.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaInfoCircle className="mr-2" />
              Apa itu MLFQ?
            </h2>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Multi-Level Feedback Queue (MLFQ) adalah algoritma penjadwalan CPU yang berusaha mengoptimalkan untuk proses interaktif dan batch. Algoritma ini menggunakan beberapa antrian dengan level prioritas yang berbeda dan mengimplementasikan feedback untuk menyesuaikan prioritas proses berdasarkan perilakunya.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800/30 dark:to-blue-800/30 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <div className="font-medium text-purple-700 dark:text-purple-300">
                    Antrian Multi-Prioritas
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Proses diorganisir dalam antrian dengan prioritas berbeda
                  </span>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-800/30 dark:to-green-800/30 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaExchangeAlt className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    Penyesuaian Prioritas Dinamis
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Prioritas proses berubah berdasarkan perilakunya
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaRocket className="mr-2" />
              Memulai
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Untuk mulai menggunakan Simulasi MLFQ:
            </p>
            <ol className="space-y-3 list-decimal list-inside text-gray-600 dark:text-gray-400">
              <li className="pl-2">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  Navigasi ke halaman utama
                </span>
              </li>
              <li className="pl-2">
                Buat proses baru dengan karakteristik yang berbeda
                <ul className="pl-6 mt-2 space-y-2 list-disc text-gray-600 dark:text-gray-400">
                  <li>Waktu Kedatangan</li>
                  <li>Waktu Burst</li>
                  <li>Prioritas (opsional)</li>
                </ul>
              </li>
              <li className="pl-2">Konfigurasi parameter MLFQ sesuai kebutuhan</li>
              <li className="pl-2">
                Mulai simulasi dan amati perilaku penjadwalan
              </li>
              <li className="pl-2">Analisis hasil dan statistik</li>
            </ol>
            <div className="mt-6 flex justify-center">
              <Link
                href="/Documentation/how-to-use"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-300 flex items-center shadow-lg font-medium transform hover:scale-105"
              >
                <FaRocket className="mr-2" /> Mulai Sekarang
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaList className="mr-2" />
              Bagian Dokumentasi
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Dokumentasi kami terdiri dari beberapa bagian:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/Documentation/how-to-use"
                className="block no-underline transform hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg shadow-sm border border-blue-200 dark:border-blue-600 hover:shadow-md transition-shadow">
                  <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                    <FaLaptopCode className="text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-700 dark:text-blue-300">
                      Cara Penggunaan
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Instruksi detail menggunakan simulasi
                    </span>
                  </div>
                </div>
              </Link>
              <Link href="/Documentation/tools" className="block no-underline transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center p-4 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 rounded-lg shadow-sm border border-purple-200 dark:border-purple-600 hover:shadow-md transition-shadow">
                  <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                    <FaTools className="text-purple-600 dark:text-purple-300" />
                  </div>
                  <div>
                    <div className="font-medium text-purple-700 dark:text-purple-300">
                      Alat & Teknologi
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Informasi tentang teknologi yang digunakan
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/Documentation/how-it-works"
                className="block no-underline transform hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-lg shadow-sm border border-green-200 dark:border-green-600 hover:shadow-md transition-shadow">
                  <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                    <FaCode className="text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <div className="font-medium text-green-700 dark:text-green-300">
                      Cara Kerja
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Detail teknis tentang algoritma MLFQ
                    </span>
                  </div>
                </div>
              </Link>
              <Link
                href="/Documentation/contact"
                className="block no-underline transform hover:scale-105 transition-transform duration-200"
              >
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-800/30 dark:to-green-800/30 rounded-lg shadow-sm border border-blue-200 dark:border-blue-600 hover:shadow-md transition-shadow">
                  <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                    <FaQuestionCircle className="text-blue-600 dark:text-blue-300" />
                  </div>
                  <div>
                    <div className="font-medium text-blue-700 dark:text-blue-300">
                      Kontak & Dukungan
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Dapatkan bantuan dan dukungan
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
              Gunakan menu navigasi di sebelah kiri untuk menjelajahi bagian-bagian ini dan mempelajari lebih lanjut tentang Simulasi MLFQ.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}