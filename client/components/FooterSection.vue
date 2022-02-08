<template>
  <div class="container py-16 px-4 mx-auto sm:px-6 lg:px-12 xl:px-20">
    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
      <div class="flex flex-col shrink-0">
        <div>
          <svg
            width="57"
            height="17"
            viewBox="0 0 57 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.36 12.328H12.896V16H0.464V0.159999H5.36V12.328ZM18.8135 16.24C17.5815 16.24 16.6055 15.92 15.8855 15.28C15.1655 14.624 14.8055 13.552 14.8055 12.064V4H19.6535V10.936C19.6535 11.544 19.7655 11.976 19.9895 12.232C20.2135 12.488 20.5415 12.616 20.9735 12.616C21.4375 12.616 21.8055 12.44 22.0775 12.088C22.3655 11.736 22.5095 11.168 22.5095 10.384V4H27.3575V16H23.0135L22.8935 13.6C22.1735 15.36 20.8135 16.24 18.8135 16.24ZM34.3209 4L36.1209 7.672L37.9689 4H43.3689L39.2649 9.976L43.4649 16H37.9449L36.0249 12.136L34.1289 16H28.6809L32.9289 9.904L28.8249 4H34.3209ZM50.2822 16.24C48.2022 16.24 46.5702 15.696 45.3862 14.608C44.2022 13.52 43.6102 11.984 43.6102 10C43.6102 8.672 43.8822 7.544 44.4262 6.616C44.9702 5.688 45.7302 4.984 46.7062 4.504C47.6822 4.008 48.8102 3.76 50.0902 3.76C51.4022 3.76 52.5142 4.008 53.4262 4.504C54.3542 4.984 55.0582 5.656 55.5382 6.52C56.0342 7.384 56.2822 8.392 56.2822 9.544C56.2822 10.136 56.2422 10.64 56.1622 11.056H48.2662C48.3782 11.776 48.6022 12.272 48.9382 12.544C49.2902 12.8 49.7542 12.928 50.3302 12.928C50.8262 12.928 51.2182 12.824 51.5062 12.616C51.8102 12.408 52.0262 12.12 52.1542 11.752L56.0422 12.904C55.8342 13.64 55.4422 14.256 54.8662 14.752C54.2902 15.248 53.6022 15.624 52.8022 15.88C52.0022 16.12 51.1622 16.24 50.2822 16.24ZM50.0902 7.048C49.5782 7.048 49.1702 7.192 48.8662 7.48C48.5782 7.768 48.3862 8.256 48.2902 8.944H51.6982C51.6342 8.32 51.4742 7.848 51.2182 7.528C50.9782 7.208 50.6022 7.048 50.0902 7.048Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p class="mt-4 leading-none text-gray-800 text-sm">Copyright © 2018-2022 nekohack</p>
        <p class="mt-4 leading-none text-gray-800 text-sm">All rights reserved</p>
        <div class="flex gap-x-4 items-center mt-12">
          <button
            v-for="network in networks"
            :key="network.value"
            :aria-label="network.title"
            class="flex shrink-0 justify-center items-center w-8 h-8 bg-gray-800 hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 opacity-50 cursor-pointer"
          >
            <img
              :src="`/icon/${network.value}_logo.svg`"
              :alt="`${network.title} logo`"
              class="w-8"
            />
          </button>
        </div>
      </div>
      <div class="flex flex-col ml-8 sm:ml-0">
        <h2 class="font-semibold leading-4 text-gray-800 text-base">
          {{ `Websites` }}
        </h2>
        <a
          v-for="website in websites"
          :key="website.value"
          :href="website.url"
          class="mt-6 leading-4 text-gray-800 hover:text-gray-500 focus:underline focus:outline-none cursor-pointer text-base"
        >
          {{ website.title }}
        </a>
      </div>
      <div class="flex flex-col">
        <h2 class="font-semibold leading-4 text-gray-800 text-base">Support</h2>
        <a
          href="https://nekohack-privacy-policy.netlify.app/"
          class="mt-6 leading-4 text-gray-800 hover:text-gray-500 focus:underline focus:outline-none cursor-pointer text-base"
        >
          Privacy policy
        </a>
      </div>
      <div class="hidden mt-10 lg:block">
        <label class="font-medium leading-5 text-gray-800 text-xl">Get updates</label>
        <div class="flex justify-between items-center mt-4 border cursor-pointer border-gray-800">
          <input
            type="text"
            class="p-4 w-full leading-4 text-gray-800 placeholder:text-gray-800 focus:outline-none text-base"
            placeholder="Enter your email"
          />
          <button
            aria-label="send"
            class="mr-4 text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 fill-current"
          >
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="48.000000pt" height="48.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M3290 2580 l0 -600 605 0 605 0 0 600 0 600 -605 0 -605 0 0 -600z m760 453 c76 -20 130 -54 183 -113 73 -82 92 -140 92 -295 0 -104 -4 -140 -19 -180 -60 -158 -184 -242 -373 -253 -167 -9 -292 34 -378 130 -107 119 -133 354 -55 513 34 70 49 89 112 137 104 79 281 104 438 61z" /><path d="M3825 3020 c-108 -12 -164 -37 -232 -105 -52 -52 -64 -72 -83 -131 -25 -83 -29 -233 -6 -306 33 -110 105 -190 205 -230 76 -30 268 -32 350 -5 117 40 187 112 223 230 30 101 23 257 -16 342 -70 155 -226 227 -441 205z" /><path d="M660 2611 c0 -269 4 -422 10 -426 7 -4 10 130 10 394 0 221 3 401 8 400 4 0 133 -182 286 -404 153 -222 283 -402 288 -399 12 8 10 854 -2 854 -6 0 -10 -140 -10 -400 0 -220 -3 -400 -7 -399 -5 0 -132 180 -283 399 -151 220 -281 399 -287 400 -10 0 -13 -90 -13 -419z" /><path d="M1650 2605 l0 -425 255 0 c163 0 255 4 255 10 0 6 -88 10 -245 10 l-245 0 0 220 0 220 179 0 c109 0 182 4 186 10 4 7 -58 10 -179 10 l-186 0 0 175 0 175 245 0 c157 0 245 4 245 10 0 6 -92 10 -255 10 l-255 0 0 -425z" /><path d="M2550 2605 c0 -277 3 -425 10 -425 6 0 10 58 10 153 l0 153 70 69 c69 69 70 69 89 50 10 -11 92 -110 181 -220 89 -110 169 -202 178 -204 13 -2 14 0 6 10 -6 8 -91 112 -188 231 -97 120 -176 221 -176 226 0 4 18 26 41 47 114 111 319 335 307 335 -9 0 -123 -112 -254 -250 -132 -137 -242 -250 -246 -250 -5 0 -8 113 -8 250 0 160 -4 250 -10 250 -7 0 -10 -148 -10 -425z" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-10 lg:hidden">
      <label class="font-medium leading-5 text-gray-800 text-xl">Get updates</label>
      <div class="flex justify-between items-center mt-4 border border-gray-800">
        <input
          type="text"
          class="relative z-0 p-4 w-full leading-4 text-gray-800 placeholder:text-gray-800 focus:outline-none text-base"
          placeholder="Enter your email"
        />
        <button
          aria-label="send"
          class="relative z-40 mr-4 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 cursor-pointer"
        >
          <svg
            class="text-gray-800 hover:text-gray-500 fill-current"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.8934 7.39673L14.8884 7.39457L1.54219 1.9166C1.42993 1.87011 1.30778 1.85187 1.18666 1.86353C1.06554 1.87519 0.949225 1.91637 0.848125 1.9834C0.741311 2.05266 0.653573 2.14711 0.592805 2.25826C0.532037 2.36941 0.500145 2.49376 0.5 2.62013V6.12357C0.50006 6.29633 0.561019 6.46366 0.67237 6.59671C0.783722 6.72976 0.938491 6.82021 1.11 6.85246L8.38906 8.18438C8.41767 8.18974 8.44348 8.20482 8.46205 8.22701C8.48062 8.2492 8.49078 8.2771 8.49078 8.30591C8.49078 8.33472 8.48062 8.36263 8.46205 8.38481C8.44348 8.407 8.41767 8.42208 8.38906 8.42744L1.11031 9.75936C0.938851 9.79153 0.784092 9.88185 0.67269 10.0148C0.561288 10.1477 0.500219 10.3149 0.5 10.4876V13.9917C0.499917 14.1124 0.530111 14.2312 0.587871 14.3374C0.645632 14.4437 0.729152 14.5341 0.830938 14.6006C0.953375 14.6811 1.09706 14.7241 1.24406 14.7243C1.34626 14.7242 1.4474 14.7039 1.54156 14.6646L14.8875 9.21787L14.8934 9.21509C15.0731 9.13869 15.2262 9.01185 15.3337 8.85025C15.4413 8.68866 15.4986 8.49941 15.4986 8.30591C15.4986 8.11241 15.4413 7.92316 15.3337 7.76157C15.2262 7.59997 15.0731 7.47313 14.8934 7.39673Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { networkLinks, websiteLinks } from '~/utils/constants'

export default {
  setup() {
    const networks = networkLinks
    const websites = websiteLinks
    return { networks, websites }
  }
}
</script>
