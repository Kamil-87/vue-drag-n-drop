export default function formattedText(text, limit = 25) {
  return text.trim().slice(0, limit) + (limit < text.length ? '...' : '')
}
