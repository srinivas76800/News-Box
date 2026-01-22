'use client'
import React, { useEffect, useState } from 'react'
import { useSelected } from '@/context/SelectedContext'

const Body = () => {

    const [news, setNews] = useState()
    const { selected } = useSelected()
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const formattedYesterday = yesterday.toISOString().split("T")[0];


    const api = `https://newsapi.org/v2/everything?q=india&from=${formattedYesterday}&sortBy=publishedAt&apiKey=e396316542e44ddb921b7acb910e1eae`
    useEffect(() => {
        const data = async () => {
            try {
                const response = await fetch(api)
                const data = await response.json()
                setNews(data.articles || [])
            } catch (error) {
                console.log('error on fetching data', error)
                setNews([])
            }
        }
        data()
    }, [selected])
    return (
        <div className='d-flex flex-wrap w-100 container justify-content-between '>
            {Array.isArray(news) && news.map((item, i) => {
                return (
                    <div className="card bg-dark text-white my-3" style={{ width: 22 + 'rem' }} key={i}>
                        <img src={item.urlToImage ? item.urlToImage : 'https://media.istockphoto.com/id/1409309637/vector/breaking-news-label-banner-isolated-vector-design.jpg?s=612x612&w=0&k=20&c=JoQHezk8t4hw8xXR1_DtTeWELoUzroAevPHo0Lth2Ow='} style={{ width: 100 + '%', height: 30 + '%' }} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <p className="card-text"><small className="text-body-withe">{item.publishedAt} ago</small></p>
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text">{item.description}</p>
                        </div>
                        <div className="card-body ">
                            <button href={item.url} className="btn btn-outline-primary px-5 ">Read More </button>
                        </div>
                    </div>
                )
            })
            }</div>
    )
}
export default Body