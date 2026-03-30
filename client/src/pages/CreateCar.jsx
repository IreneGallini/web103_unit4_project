import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import { createCar } from '../services/CustomItemsAPI'
import { calculatePrice } from '../utilities/calcPrice'
import { getCombinationError } from '../utilities/validation'

const CreateCar = () => {
    const navigate = useNavigate()

    const [car, setCar] = useState({
        name: '',
        color: 'red',
        wheels: 'sport',
        interior: 'cloth',
        spoiler: false,
        image_url: ''
    })

    const [error, setError] = useState('')

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
        console.log('Submitting form...')
        console.log('Current car:', car)

        const validationError = getCombinationError(car)
        if (validationError) {
            console.log('Validation error:', validationError)
            setError(validationError)
            return
        }

        const newCar = {
            ...car,
            price,
            image_url: `${car.color}-${car.wheels}`
        }

        console.log('Sending to backend:', newCar)

        try {
            const response = await createCar(newCar)
            console.log('Backend response:', response)

            if (response.error) {
                setError(response.error)
                return
            }

            navigate('/customcars')
        } catch (err) {
            console.error('Create failed:', err)
            setError('Failed to save car.')
        }
    }

    return (
        <div className='page-container'>
            <h2>Build Your Custom Car</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} className='car-form'>
                <label>Car Name</label>
                <input
                    type='text'
                    name='name'
                    value={car.name}
                    onChange={handleChange}
                    placeholder='Enter a name'
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

                <button type='submit'>Save Car</button>
            </form>
        </div>
    )
}

export default CreateCar