'use client'
import { getDetail } from '@/apis/productApi'
import React from 'react'
import { useEffect,useState } from 'react'

const detail = ({ params }) => {

    let [data, setData] = useState([])

    useEffect(() => {
        getDetail(params.id).then(res => {
            setData(res.content)
        })
    }, [params.id])
    return (
        <h1>
            TEST
            <img src={data.image}/>
            {data.name}
        </h1>
    )
}

export default detail