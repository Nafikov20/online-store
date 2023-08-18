import {Header} from "@/layout/Header/header";
import {Footer} from "@/layout/Footer/footer";
import './globals.css'
import {Providers} from "@/redux/provider";

export const metadata = {
  title: 'DE LA MANO',
  description: 'DE LA MANO',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="ru">

      <body>
          <Providers>
              <Header />
                {children}
              <Footer />
          </Providers>
      </body>
    </html>
  )
}
