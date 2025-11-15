// Format price with euro symbol and thousand separators
export function formatPrice(price: string | number | undefined): string {
  if (!price) return '€0'
  
  // Convert to string and remove any existing formatting
  const priceStr = String(price).replace(/[€.\s,]/g, '')
  
  // If empty or not a number, return default
  if (!priceStr || isNaN(Number(priceStr))) {
    return '€0'
  }
  
  // Add thousand separators (dots for Portuguese format)
  const formatted = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  
  return `€${formatted}`
}

