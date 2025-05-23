"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaLayerGroup,
  FaClock,
  FaExchangeAlt,
  FaUserClock,
  FaCode,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

export default function HowItWorksPage() {
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
          Cara Kerja Simulasi MLFQ
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaLayerGroup className="mr-2" />
              Gambaran Umum Algoritma MLFQ
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Algoritma Multi-Level Feedback Queue (MLFQ) adalah algoritma penjadwalan CPU yang berusaha mengoptimalkan untuk proses interaktif dan batch. Algoritma ini menggunakan beberapa antrian dengan level prioritas yang berbeda dan mengimplementasikan feedback untuk menyesuaikan prioritas proses berdasarkan perilakunya.
            </p>
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg border border-blue-200 dark:border-blue-600">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Keunggulan utama: MLFQ mencapai manfaat dari SJF (shortest job first) dan priority scheduling tanpa memerlukan pengetahuan sebelumnya tentang waktu eksekusi proses.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaLayerGroup className="mr-2" />
              Komponen Utama
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
                <FaLayerGroup className="mr-2" />
                1. Antrian Multi-Prioritas
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                Algoritma memelihara beberapa antrian, masing-masing dengan level prioritas yang berbeda:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Antrian prioritas tertinggi (Q0) - Untuk proses interaktif
                  </span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Antrian prioritas menengah (Q1, Q2) - Untuk beban kerja campuran
                  </span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Antrian prioritas terendah (Q3) - Untuk proses batch
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-green-700 dark:text-green-300">
                <FaClock className="mr-2" />
                2. Kuantum Waktu
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                Setiap antrian memiliki kuantum waktu sendiri:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded mr-2 border border-green-200 dark:border-green-700 text-sm">
                    ✓
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Antrian prioritas tinggi memiliki kuantum waktu yang lebih pendek
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-2 border border-blue-200 dark:border-blue-700 text-sm">
                    ✓
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Antrian prioritas rendah memiliki kuantum waktu yang lebih panjang
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded mr-2 border border-purple-200 dark:border-purple-700 text-sm">
                    ✓
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Ini membantu proses interaktif mendapatkan waktu respons yang cepat
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                <FaExchangeAlt className="mr-2" />
                3. Penyesuaian Prioritas
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                Proses berpindah antar antrian berdasarkan perilakunya:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-2 border border-blue-200 dark:border-blue-700 text-sm">
                    1
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Proses baru dimulai di antrian prioritas tertinggi
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded mr-2 border border-purple-200 dark:border-purple-700 text-sm">
                    2
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Jika proses menggunakan seluruh kuantum waktunya, ia dipindah ke antrian prioritas lebih rendah
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded mr-2 border border-green-200 dark:border-green-700 text-sm">
                    3
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Jika proses melepas CPU sebelum kuantum waktunya habis, ia tetap di antrian yang sama
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
              <h3 className="flex items-center text-xl font-semibold mb-3 text-purple-700 dark:text-purple-300">
                <FaUserClock className="mr-2" />
                4. Aging (Penuaan)
              </h3>
              <p className="mb-3 text-gray-600 dark:text-gray-400">
                Untuk mencegah starvation, algoritma mengimplementasikan aging:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Proses yang menunggu terlalu lama di antrian prioritas rendah akan dipromosikan ke prioritas lebih tinggi
                  </span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Ini memastikan tidak ada proses yang menunggu tanpa batas waktu
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaCode className="mr-2" />
              Implementasi Simulasi
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Implementasi kami meliputi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-green-600 dark:text-green-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Visualisasi real-time perpindahan proses antar antrian
                </span>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaExchangeAlt className="text-blue-600 dark:text-blue-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Pembuatan dan pengelolaan proses interaktif
                </span>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                  <FaCog className="text-purple-600 dark:text-purple-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Parameter MLFQ yang dapat disesuaikan
                </span>
              </div>
              <div className="flex items-center p-3 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaChartLine className="text-green-600 dark:text-green-300" />
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Perhitungan metrik kinerja
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaChartLine className="mr-2" />
              Metrik Kinerja
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Simulasi melacak beberapa metrik penting:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Turnaround Time
                  </span>{" "}
                  - Total waktu dari submission hingga completion
                </span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Waiting Time
                  </span>{" "}
                  - Waktu yang dihabiskan menunggu di antrian
                </span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-medium text-green-700 dark:text-green-300">
                    Response Time
                  </span>{" "}
                  - Waktu hingga alokasi CPU pertama
                </span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Utilisasi CPU
                  </span>{" "}
                  - Persentase waktu CPU sibuk
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}