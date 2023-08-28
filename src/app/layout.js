
import { UserProvider } from '../context/Context'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/logo-circle.png" />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/logo-circle.png' />
        <meta name="theme-color" content="#2A52BE" />
        <meta name="msapplication-navbutton-color" content="#2a52BE" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#2a52BE" />
        <meta name="description" content="Sistema de Administracion de Clientes y Formularios" />
        <meta name="keywords" content="Logistics Gear" />
        <meta name="author" content="Logistics Gear" />
        <title>Precio Justo</title>
      </head>
      <body className={inter.className}>
        <UserProvider>
          <main className='h-screen'>
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  )
}


