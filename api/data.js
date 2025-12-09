export default async function handler(req, res) {
  try {
    const response = await fetch('https://github.com/sakuraet/mgp_visualization/releases/download/v1/everything.json');
    const data = await response.json();
    
    res.setHeader('Cache-Control', 's-maxage=3600'); // Cache for 1 hour
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
