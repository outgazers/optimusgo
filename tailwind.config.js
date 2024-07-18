/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    colors:{

      "gray-50": "#FCFCFC",
      "gray-100": "#F9FAFB",
      "gray-200": "#F3F4F6",
      "gray-300": "#E5E7EB",
      "gray-400": "#D1D5DB",
      "gray-500": "#9CA3AF",
      "gray-600": "#6B7280",
      "gray-700": "#4B5563",
      "gray-800": "#374151",
      "gray-900": "#1F2937",

      "Green-50": "#F7FFF5",
      "green-100": "#ECFFE6",
      "green-200": "#CBFFBC",
      "green-300": "#B2FF9A",
      "green-400": "#8EFF6A",
      "green-500": "#5FFF30",
      "green-600": "#38F800",
      "green-700": "#30D600",
      "green-800": "#239C00",
      "Green-900": "#145A00",

      "teal-50": "#F4FEFF",
      "teal-100": "#C4F8FF",
      "teal-200": "#93E8F4",
      "teal-300": "#69D4E3",
      "teal-400": "#4FC0D0",
      "teal-500": "#3FA9B8",
      "teal-600": "#2C8E9C",
      "teal-700": "#1A6D79",
      "teal-800": "#0E515B",
      "teal-900": "#053037",


      "yellow-50": "#FFFCF6",
      "yellow-100": "#FFF4DA",
      "yellow-200": "#FFE095",
      "yellow-300": "#FFCC4F",
      "yellow-400": "#FFC436",
      "yellow-500": "#F0AE0B",
      "yellow-600": "#D89E0C",
      "yellow-700": "#B68408",
      "yellow-800": "#956C06",
      "yellow-900": "#684A01",


      "purple-50": "#FAF5FF",
      "purple-100": "#F3E8FF",
      "purple-200": "#E9D5FF",
      "purple-300": "#D8B4FE",
      "purple-400": "#C084FC",
      "purple-500": "#A855F7",
      "purple-600": "#9333EA",
      "purple-700": "#7E22CE",
      "purple-800": "#6B21A8",
      "purple-900": "#581C87",


      "blue-50": "#EFF6FF",
      "blue-100": "#DBEAFE",
      "blue-200": "#BFDBFE",
      "blue-300": "#93C5FD",
      "blue-400": "#60A5FA",
      "blue-500": "#3B77FA",
      "blue-600": "#2563EB",
      "blue-700": "#1D4ED8",
      "blue-800": "#1E40AF",
      "blue-900": "#1E3A8A",


      "red-50": "#FFE1E1",
      "red-100": "#FFD2D2",
      "red-200": "#FFB5B5",
      "red-300": "#FFA6A6",
      "red-400": "#FF8888",
      "red-500": "#FF6A6A",
      "red-600": "#E65F5F",
      "red-700": "#B34A4A",
      "red-800": "#994040",
      "red-900": "#803535",

      "white": '#ffffff',
      "black": '#000000',

      "appointment-1": '#1E2F93',
      "appointment-2": '#FF8C59',
      "appointment-3": '#6E0093',
      "appointment-4": '#2FA52D',
      "appointment-5": '#088CDA',
      "appointment-6": '#F9316D',
      "appointment-7": '#036A73',
      "appointment-8": '#B75F17',
      "appointment-9": '#FE66E3',
      "appointment-10": '#7A69EE',
      "appointment-11": '#900F5C',
      "appointment-12": '#0475A1',
      "appointment-13": '#D12030',
      "appointment-14": '#37C6AB',
      "appointment-15": '#FFA02E',
      "appointment-16": '#FE01FC',
      "appointment-17": '#75082E',
      "appointment-18": '#4034AB',
      "appointment-19": '#4DD470',
      "appointment-20": '#0BB4FE',

    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1280px',
      xl: '1440px',
    },
    extend: {
      fontSize: {
        '2xs': '0.625rem'
      },
      colors:{
        "bluegray-50": "#F7F8F9",
        "bluegray-100": "#DADEE3",
        "bluegray-200": "#BCC3CD",
        "bluegray-300": "#9FA9B7",
        "bluegray-400": "#818EA1",
        "bluegray-500": "#64748B",
        "bluegray-600": "#556376",
        "bluegray-700": "#465161",
        "bluegray-800": "#37404C",
        "bluegray-900": "#282E38",
        "primary-200": "#EFF6FF",
        "primary-500": "#3B82F6",
        "second-200": "#FFD0CE",
        "second-300": "#FF3D32",
        "third-200": "#FEDDC7",
        "third-500": "#FCC39B",        
        "fourth-200": "#D0E1FD",
        "fourth-500": "#ABC9FB",        
        "fifth-200": "#CAF1D8",
        "fifth-400": "#1DA750",
        "fifth-500": "#A0E6BA",
        "fifth-600": "#8EFF6A",
        "fifth-700": "#22C55E",
        "sixth-200": "#F8FAFC",
        "seventh-300": "#0E515B",
        "seventh-700": "#0E515B",
        "eight-200": "#E5E7EB",

        "white": '#ffffff',
        "black": '#000000',
        "transparent": "#00000000"


      },
      width: {
        'modal-sm': '464px',
        'modal-md': '600px',
        'modal-lg': '789px',
        'modal-xl': '1063px',
        'modal-full': '100%',
      },
      
      boxShadow: {
        'button' : '0 0 0 1px #ffffff, 0 0 0 1px #ffffff',
        1 : '0px 8px 8px -4px #18274B14, 0px 4px 6px -4px #18274B1F',
        3 : '0px 12px 42px -4px #18274B1F, 0px 8px 18px -6px #18274B1F;'
      }
    }
  },
  plugins: [],
}
