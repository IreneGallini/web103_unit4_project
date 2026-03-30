export const calculatePrice = ({ color, wheels, interior, spoiler }) => {
  let total = 20000

  if (color === 'red') total += 500
  if (color === 'blue') total += 400
  if (color === 'black') total += 600

  if (wheels === 'sport') total += 1500
  if (wheels === 'classic') total += 800
  if (wheels === 'off-road') total += 1800

  if (interior === 'leather') total += 2000

  if (spoiler) total += 1200

  return total
}