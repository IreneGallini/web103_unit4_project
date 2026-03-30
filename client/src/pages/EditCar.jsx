import React, { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom'
import { getCar, updateCar, deleteCar } from '../services/CustomItemsAPI'
import { calculatePrice } from '../utilities/calcPrice'
import { getCombinationError } from '../utilities/validation'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCar(id)
            setCar(data)
        }

        fetchCar()
    }, [id])

    if (!car) return <p>Loading...</p>

    const price = calculatePrice(car)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setCar({
            ...car,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const validationError = getCombinationError(car)
        if (validationError) {
            setError(validationError)
            return
        }

        const updatedCar = {
            ...car,
            price,
            image_url: `${car.color}-${car.wheels}`
        }

        const response = await updateCar(id, updatedCar)

        if (response.error) {
            setError(response.error)
            return
        }

        navigate('/customcars')
    }

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    return (
        <div className='page-container'>
            <h2>Edit Custom Car</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} className='car-form'>
                <label>Car Name</label>
                <input
                    type='text'
                    name='name'
                    value={car.name}
                    onChange={handleChange}
                    required
                />

                <label>Exterior Color</label>
                <select name='color' value={car.color} onChange={handleChange}>
                    <option value='red'>Red</option>
                    <option value='blue'>Blue</option>
                    <option value='black'>Black</option>
                </select>

                <label>Wheels</label>
                <select name='wheels' value={car.wheels} onChange={handleChange}>
                    <option value='sport'>Sport</option>
                    <option value='classic'>Classic</option>
                    <option value='off-road'>Off-Road</option>
                </select>

                <label>Interior</label>
                <select name='interior' value={car.interior} onChange={handleChange}>
                    <option value='cloth'>Cloth</option>
                    <option value='leather'>Leather</option>
                </select>

                <label>
                    <input
                        type='checkbox'
                        name='spoiler'
                        checked={car.spoiler}
                        onChange={handleChange}
                    />
                    Add Spoiler
                </label>

                <h3>Total Price: ${price}</h3>

                <div className='car-preview' style={{ backgroundColor: car.color }}>
                    <p>{car.wheels} wheels</p>
                    <p>{car.interior} interior</p>
                    {car.spoiler && <p>Spoiler</p>}
                </div>

                <button type='submit'>Update Car</button>
                <button type='button' onClick={handleDelete}>Delete Car</button>
            </form>
        </div>
    )
}

export default EditCar