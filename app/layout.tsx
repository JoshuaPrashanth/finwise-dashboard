import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Finwise - Financial Dashboard',
  description: 'Manage your finances',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* PNG favicon as data URL (guaranteed to work) */}
        <link 
          rel="icon" 
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAABw0lEQVR4nO2aPUsDQRBGH0EQsbFQsLGw8C8I/gJBsLGxsLGxsLGxUCwVxMJCbCwsLCwsREQhGkWNyZ4mlyw3d7t7mbtE5oHhLpu5h5m8ZDd7s5nMhg0bNvxXeDAei8WimqbJtm2bfd+LZVnGdV0T55imiSzLMlprpWmaZFmWyDAMhBAijmMJIbquI4SQaZqUUkopJcbjcRxHKYQQQkopfRzHpGmaLMsySZIk/XvbtiRN0+R5nrRty6Io0rqu1fd9WZZl0nUdz/Mkz/NUFEWq67rked4kHMcJQRDkOo5T8jxvgrZtMwgCGoZBjuNQHMcYhqFhGCiKItq2LZVlSZZlKYZhaBhGSCk9x3FYliU1TQNVVWGaJmiaBqZpQlVVMAwD2rYNoiiCJEkgCAKwLAuSJAFVVbFtW5imCdM0wTRN8H0feJ4Hj8cDmqYBEASgKArwPA+KogA8zwNVVaFpGgiCANq2haqqUJYlFEWBqqqCZVkQBAHkeQ6e54HrupBlGfi+D57nged5kGXZv+u6DnmeQ5ZlEARB//48z4PjOBiGAU3TgG3b4Ps+2LYNwzCgKAoEQfDvL8sSsixDURQYj8dgWRaO44DneXieh67rgKZpsG07TdM0pmkKjuNAXdfA8zzEcQy+78M4jsDzPHieh67rYJomTNMEnuchTVNwHAfquoZhGGAYBpqmAUEQIEkS5HkOnudBURQwDAOapiFNUyiKAlzXBc/zIIoicBwHjuNA0zRQVbX/nsdxDF3XQVVVUJYlZFkGZVnCsiyYpgmGYYDnedC2LTRNA03TQNM00DQNxHEMURQBYRhCEATQNA04jgNd1wHLsiCOY3AcB5ZlQRRF4Ps+hGEInufBMAzI8xzSNIUoiiCOY0iSBJIkAd/3IY5jSJIEwjAE27YhCAKYz+dgWRYsy4JpmjAMA9i2DVVVQVVVUFUVVFWFLMugKArIsgzyPAfbtqGqKijLEpqmgTAMwTAMyPMcoigCx3FgWRZEUTT8/GH/mH8B2hPkyokGbfkAAAAASUVORK5CYII=" 
          type="image/png"
        />
        {/* Fallback SVG for browsers that support it */}
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='url(%23grad)'/%3E%3Ctext x='50' y='72' font-family='Arial' font-size='58' fill='white' text-anchor='middle'%3E₹%3C/text%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230ea5e9'/%3E%3Cstop offset='100%25' stop-color='%23f97316'/%3E%3C/linearGradient%3E%3C/defs%3E%3C/svg%3E" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  )
}