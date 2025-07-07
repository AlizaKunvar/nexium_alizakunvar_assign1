'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [quote, setQuote] = useState<{ text: string; author: string } | null>(null)

  useEffect(() => {
    fetchQuote()
  }, [])

  const fetchQuote = async () => {
    const { data, error } = await supabase.from('quotes').select('*')
    if (error) {
      console.error('Error fetching quote:', error)
    } else if (data && data.length > 0) {
      const random = data[Math.floor(Math.random() * data.length)]
      setQuote(random)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-800">Quote Generator</h1>

      {quote ? (
        <div className="bg-white shadow-md p-8 rounded-xl max-w-xl w-full">
          <p className="text-xl font-medium text-black leading-relaxed">
            “{quote.text}”
          </p>
          <p className="mt-4 text-right text-gray-700 font-semibold">
            — {quote.author || 'Unknown'}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}

      <button
        onClick={fetchQuote}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
      >
        Next Quote
      </button>
    </main>
  )
}
