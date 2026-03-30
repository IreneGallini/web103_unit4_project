import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { getAllCars } from '../services/CustomItemsAPI'

const ViewCars = () => {
    const [cars, setCars] = useState([])

    useEffect(() => {
        const fetchCars = async () => {
            const data = await getAllCars()
            setCars(data)
        }

        fetchCars()
    }, [])

    return (
        <div className='page-container'>
            <h2>Saved Custom Cars</h2>

            {cars.length === 0 ? (
                <p>No custom cars saved yet.</p>
            ) : (
                <div className='cars-grid'>
                    {cars.map((car) => (
                        <div key={car.id} className='car-card'>
                            <h3>{car.name}</h3>
                            <p>Color: {car.color}</p>
                            <p>Wheels: {car.wheels}</p>
                            <p>Interior: {car.interior}</p>
                            <p>Spoiler: {car.spoiler ? 'Yes' : 'No'}</p>
                            <p>Price: ${car.price}</p>

                            <div
                                className='mini-preview'
                                style={{ backgroundColor: car.color }}
                            >
                                <p>{car.wheels}</p>
                            </div>

                            <Link to={`/customcars/${car.id}`}>
                                <button>View</button>
                            </Link>

                            <Link to={`/edit/${car.id}`}>
                                <button>Edit</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars