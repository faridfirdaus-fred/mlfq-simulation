"use client";

import { motion } from "framer-motion";
import Documentation from "@/components/Documentation";
import {
  FaQuestionCircle,
  FaGithub,
  FaEnvelope,
  FaCode,
  FaUsers,
  FaDiscord,
  FaTwitter,
  FaComments,
  FaServer,
  FaDesktop,
} from "react-icons/fa";

export default function ContactPage() {
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
          Kontak & Dukungan
        </motion.h1>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaQuestionCircle className="mr-2" />
              Mendapatkan Bantuan
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Jika Anda memerlukan bantuan dengan Simulasi MLFQ, ada beberapa cara untuk mendapatkan dukungan:
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                Dokumentasi
              </h3>
              <p className="mb-2 text-gray-600 dark:text-gray-400">
                Pertama, periksa halaman dokumentasi kami:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <li className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 p-3 rounded-md shadow-sm border border-blue-200 dark:border-blue-600">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                  <a
                    href="/Documentation/how-to-use"
                    className="text-blue-700 dark:text-blue-300 hover:underline"
                  >
                    Cara Penggunaan
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    - Instruksi penggunaan
                  </span>
                </li>
                <li className="flex items-center bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 p-3 rounded-md shadow-sm border border-purple-200 dark:border-purple-600">
                  <div className="h-2 w-2 rounded-full bg-purple-500 mr-2"></div>
                  <a
                    href="/Documentation/how-it-works"
                    className="text-purple-700 dark:text-purple-300 hover:underline"
                  >
                    Cara Kerja
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    - Detail algoritma MLFQ
                  </span>
                </li>
                <li className="flex items-center bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 p-3 rounded-md shadow-sm border border-green-200 dark:border-green-600">
                  <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                  <a
                    href="/Documentation/tools"
                    className="text-green-700 dark:text-green-300 hover:underline"
                  >
                    Alat & Teknologi
                  </a>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    - Info stack teknologi
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-purple-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-purple-600 dark:text-purple-400">
              <FaGithub className="mr-2" />
              Repositori GitHub
            </h2>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-900/20 dark:to-green-900/20 rounded-lg p-6 shadow-sm border border-purple-100 dark:border-purple-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Kode sumber kami terbagi menjadi dua repositori:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg border border-blue-200 dark:border-blue-600">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                    <FaDesktop className="text-blue-600 dark:text-blue-300" />
                  </div>
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                    Repositori Frontend
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Aplikasi Next.js dengan antarmuka pengguna dan komponen visualisasi.
                </p>
                <a
                  href="https://github.com/faridfirdaus-fred/mlfq-simulation-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaGithub className="mr-2" /> Lihat Kode Frontend
                </a>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-100 to-green-100 dark:from-purple-800/30 dark:to-green-800/30 rounded-lg border border-purple-200 dark:border-purple-600">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                    <FaServer className="text-purple-600 dark:text-purple-300" />
                  </div>
                  <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300">
                    Repositori Backend
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Layanan Python FastAPI yang menangani implementasi algoritma MLFQ.
                </p>
                <a
                  href="https://github.com/faridfirdaus-fred/mlfq-simulation-backend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 px-3 py-2 rounded-md text-sm font-medium text-white transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <FaGithub className="mr-2" /> Lihat Kode Backend
                </a>
              </div>
            </div>

            <div className="border-t border-purple-200 dark:border-purple-700 pt-4">
              <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-3">
                Melaporkan Masalah
              </h3>
              <ol className="space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-400">
                <li className="pl-2">
                  Periksa issue yang sudah ada untuk melihat apakah masalah Anda sudah dilaporkan
                </li>
                <li className="pl-2">
                  Buat issue baru dengan deskripsi yang jelas tentang masalahnya
                </li>
                <li className="pl-2">
                  Sertakan repositori mana yang terkait dengan issue tersebut (frontend atau backend)
                </li>
                <li className="pl-2">
                  Berikan langkah-langkah untuk mereproduksi masalah jika berlaku
                </li>
              </ol>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaEnvelope className="mr-2" />
              Dukungan Email
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Untuk dukungan langsung, Anda dapat menghubungi kami di:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-800/30 dark:to-blue-800/30 rounded-lg shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    Dukungan Teknis
                  </div>
                  <a
                    href="mailto:support@mlfq-simulation.com"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    support@mlfq-simulation.com
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800/30 dark:to-purple-800/30 rounded-lg shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaEnvelope className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    Permintaan Fitur
                  </div>
                  <a
                    href="mailto:features@mlfq-simulation.com"
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                  >
                    features@mlfq-simulation.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-blue-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
              <FaCode className="mr-2" />
              Berkontribusi
            </h2>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-blue-100 dark:border-blue-700">
            <p className="mb-3 text-gray-600 dark:text-gray-400">
              Kami menyambut kontribusi untuk repositori frontend atau backend:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-2 border border-blue-200 dark:border-blue-600 text-sm">
                  1
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Fork repositori yang sesuai (frontend atau backend)
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded mr-2 border border-purple-200 dark:border-purple-600 text-sm">
                  2
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Buat branch fitur
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded mr-2 border border-green-200 dark:border-green-600 text-sm">
                  3
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Buat perubahan Anda
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded mr-2 border border-blue-200 dark:border-blue-600 text-sm">
                  4
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  Submit pull request
                </span>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-600 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <span className="font-medium">Panduan Kontribusi:</span>{" "}
                Pastikan kode Anda mengikuti standar coding kami dan menyertakan pengujian yang sesuai. Untuk perubahan besar, mohon buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="mb-8">
          <div className="border-l-4 border-green-500 pl-4 mb-4">
            <h2 className="flex items-center text-2xl font-semibold mb-4 text-green-600 dark:text-green-400">
              <FaUsers className="mr-2" />
              Komunitas
            </h2>
          </div>
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 shadow-sm border border-green-100 dark:border-green-700">
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Bergabunglah dengan komunitas kami untuk tetap update dan terhubung dengan pengguna lain:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800/30 dark:to-blue-800/30 rounded-lg shadow-sm border border-purple-200 dark:border-purple-600">
                <div className="bg-purple-200 dark:bg-purple-700 p-2 rounded-full mr-3">
                  <FaDiscord className="text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <div className="font-medium text-purple-700 dark:text-purple-300">
                    Server Discord
                  </div>
                  <a
                    href="https://discord.gg/mlfq-simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline text-sm"
                  >
                    Bergabung Discord
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-800/30 dark:to-green-800/30 rounded-lg shadow-sm border border-blue-200 dark:border-blue-600">
                <div className="bg-blue-200 dark:bg-blue-700 p-2 rounded-full mr-3">
                  <FaTwitter className="text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <div className="font-medium text-blue-700 dark:text-blue-300">
                    Twitter
                  </div>
                  <a
                    href="https://twitter.com/mlfq_simulation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline text-sm"
                  >
                    @mlfq_simulation
                  </a>
                </div>
              </div>
              <div className="flex items-center p-4 bg-gradient-to-r from-green-100 to-purple-100 dark:from-green-800/30 dark:to-purple-800/30 rounded-lg shadow-sm border border-green-200 dark:border-green-600">
                <div className="bg-green-200 dark:bg-green-700 p-2 rounded-full mr-3">
                  <FaComments className="text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <div className="font-medium text-green-700 dark:text-green-300">
                    GitHub Discussions
                  </div>
                  <a
                    href="https://github.com/faridfirdaus-fred/mlfq-simulation-frontend/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:underline text-sm"
                  >
                    Ikuti diskusi
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Documentation>
  );
}