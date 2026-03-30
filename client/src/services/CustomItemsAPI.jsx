const API_BASE = 'http://localhost:3001/api/custom-items'

// GET all cars
export const getAllCars = async () => {
  const response = await fetch(API_BASE)
  return await response.json()
}

// GET one car
export const getCar = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`)
  return await response.json()
}

// CREATE a car
export const createCar = async (car) => {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })

  return await response.json()
}

// UPDATE a car
export const updateCar = async (id, car) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(car)
  })

  return await response.json()
}

// DELETE a car
export const deleteCar = async (id) => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE'
  })

  return await response.json()
}