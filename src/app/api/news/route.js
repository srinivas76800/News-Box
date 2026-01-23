export async function GET(req) {
  const { searchParams } = new URL(req.url)

  const query = searchParams.get("q") || "india"
  const page = searchParams.get("page") || 1
  const from = searchParams.get("from")

  const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${from}&sortBy=publishedAt&page=${page}&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`

  try {
    const res = await fetch(apiUrl)
    const data = await res.json()
    return Response.json(data)
  } catch (err) {
    return Response.json({ status: "error", message: "Server error" }, { status: 500 })
  }
}
