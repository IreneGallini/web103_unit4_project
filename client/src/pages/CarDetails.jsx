import React, { useEffect, useState } from 'react'
import '../App.css'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCar, deleteCar } from '../services/CustomItemsAPI'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)

    useEffect(() => {
        const fetchCar = async () => {
            const data = await getCar(id)
            setCar(data)
        }

        fetchCar()
    }, [id])

    const handleDelete = async () => {
        await deleteCar(id)
        navigate('/customcars')
    }

    if (!car) return <p>Loading...</p>

    return (
        <div className='page-container'>
            <h2>{car.name}</h2>

            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Wheels:</strong> {car.wheels}</p>
            <p><strong>Interior:</strong> {car.interior}</p>
            <p><strong>Spoiler:</strong> {car.spoiler ? 'Yes' : 'No'}</p>
            <p><strong>Price:</strong> ${car.price}</p>

            <div className='car-preview' style={{ backgroundColor: car.color }}>
                <p>{car.wheels} wheels</p>
                <p>{car.interior} interior</p>
                {car.spoiler && <p>Spoiler</p>}
            </div>

            <Link to={`/edit/${car.id}`}>
                <button>Edit</button>
            </Link>

            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default CarDetails