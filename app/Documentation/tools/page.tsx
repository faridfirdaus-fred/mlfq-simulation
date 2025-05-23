"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaReact,
  FaPython,
  FaTools,
  FaCode,
  FaLayerGroup,
  FaServer,
  FaCogs,
  FaPalette,
  FaRocket,
} from "react-icons/fa";

export default function ToolsPage() {
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
          Alat & Teknologi
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaTools className="mr-2" />
              Stack Teknologi
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Simulasi MLFQ dibangun menggunakan teknologi web modern untuk memberikan pengalaman yang responsif dan interaktif:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaReact className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    Next.js
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Framework React untuk pengembangan frontend
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 rounded-lg shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                  <FaPython className="text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <div className="font-medium text-purple-700 dark:text-purple-300">
                    Python
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Bahasa pemrograman backend
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-lg shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaRocket className="text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    FastAPI
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Framework web modern untuk API
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaCode className="mr-2" />
              Teknologi Frontend
            </h2>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
            <div className="space-y-6">
              <div className="border-l-4 border-blue-300 pl-4">
                <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                  Library Inti
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  Library utama yang digunakan dalam pengembangan frontend:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        TypeScript
                      </span>{" "}
                      - JavaScript dengan tipe data yang aman
                    </span>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-purple-700 dark:text-purple-300">
                        TailwindCSS
                      </span>{" "}
                      - Framework CSS utility-first
                    </span>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-green-700 dark:text-green-300">
                        React Hook Form
                      </span>{" "}
                      - Manajemen state form
                    </span>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        Zod
                      </span>{" "}
                      - Validasi skema data
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-l-4 border-green-300 pl-4">
                <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
                  Komponen UI
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  UI kami dibangun dengan library komponen berikut:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-green-700 dark:text-green-300">
                        Shadcn UI
                      </span>{" "}
                      - Sistem komponen yang dapat diakses
                    </span>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                    <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-blue-700 dark:text-blue-300">
                        Framer Motion
                      </span>{" "}
                      - Library animasi
                    </span>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                    <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-purple-700 dark:text-purple-300">
                        Lucide Icons
                      </span>{" "}
                      - Library ikon
                    </span>
                  </div>

                  <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium text-green-700 dark:text-green-300">
                        React Icons
                      </span>{" "}
                      - Koleksi ikon yang luas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaServer className="mr-2" />
              Teknologi Backend
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Backend berbasis Python kami menggerakkan perhitungan simulasi dan endpoint API:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-lg shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaRocket className="text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    FastAPI
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Framework API berkinerja tinggi
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaServer className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    Uvicorn
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Implementasi server web ASGI
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 rounded-lg shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                  <FaLayerGroup className="text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <div className="font-medium text-purple-700 dark:text-purple-300">
                    Pydantic
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Validasi data menggunakan anotasi tipe Python
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-lg shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaCogs className="text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    Algoritma MLFQ
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Implementasi khusus logika penjadwalan
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-3">
                Dependensi Python
              </h3>
              <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 p-4 rounded-lg border border-green-200 dark:border-green-600 overflow-auto">
                <pre className="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono">
                  annotated-types==0.7.0 anyio==4.9.0 certifi==2025.1.31
                  click==8.1.8 colorama==0.4.6 fastapi==0.115.12 h11==0.14.0
                  httpcore==1.0.8 httpx==0.28.1 idna==3.10 iniconfig==2.1.0
                  packaging==25.0 pluggy==1.5.0 pydantic==2.11.3
                  pydantic_core==2.33.1 pytest==8.3.5 sniffio==1.3.1
                  starlette==0.46.2 typing-inspection==0.4.0
                  typing_extensions==4.13.2 uvicorn==0.34.1
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaPalette className="mr-2" />
              Desain & Styling
            </h2>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Desain visual aplikasi kami berfokus pada kejelasan dan kemudahan penggunaan:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded mr-2 border border-purple-200 dark:border-purple-600 text-sm">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Desain Responsif
                  </span>{" "}
                  - Pendekatan mobile-first yang memastikan kompatibilitas di semua ukuran perangkat
                </span>
              </li>

              <li className="flex items-start">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-2 border border-blue-200 dark:border-blue-600 text-sm">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    Dukungan Mode Gelap
                  </span>{" "}
                  - Pergantian tema otomatis berdasarkan preferensi sistem
                </span>
              </li>

              <li className="flex items-start">
                <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded mr-2 border border-green-200 dark:border-green-600 text-sm">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-green-700 dark:text-green-300">
                    TailwindCSS
                  </span>{" "}
                  - CSS utility-first untuk styling yang konsisten dan pengembangan yang cepat
                </span>
              </li>

              <li className="flex items-start">
                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded mr-2 border border-purple-200 dark:border-purple-600 text-sm">
                  ✓
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    Interface Minimalis
                  </span>{" "}
                  - Layout bersih yang berfokus pada konten dan fungsionalitas dengan gangguan visual yang minimal
                </span>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-600 rounded-md">
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Sistem desain kami mengutamakan fitur aksesibilitas, memastikan aplikasi dapat digunakan oleh semua orang, termasuk pengguna dengan berbagai disabilitas atau mereka yang menggunakan teknologi bantu.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaCode className="mr-2" />
              Alat Pengembangan
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Alat dan praktik yang digunakan selama pengembangan:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Git & GitHub untuk version control
                </span>
              </div>

              <div className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  ESLint untuk kualitas kode
                </span>
              </div>

              <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Prettier untuk format kode
                </span>
              </div>

              <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Pytest untuk pengujian Python
                </span>
              </div>

              <div className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Httpx untuk pengujian API
                </span>
              </div>

              <div className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  Visual Studio Code sebagai IDE
                </span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 border border-blue-200 dark:border-blue-600 rounded-md">
              <p className="flex items-center text-sm text-blue-700 dark:text-blue-300">
                <FaCode className="text-blue-500 dark:text-blue-400 mr-2" />
                <span>
                  Pendekatan serverless kami menghilangkan kebutuhan untuk manajemen database, menyederhanakan deployment sambil mempertahankan kinerja tinggi.
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}