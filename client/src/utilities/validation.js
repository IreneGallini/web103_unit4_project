export const getCombinationError = ({ color, wheels, interior, spoiler }) => {
  if (color === 'red' && wheels === 'classic' && spoiler) {
    return 'Red cars with classic wheels cannot have a spoiler.'
  }

  if (interior === 'leather' && wheels === 'off-road') {
    return 'Leather interior is not available with off-road wheels.'
  }

  return null
}