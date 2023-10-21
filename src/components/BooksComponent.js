import React, { useEffect, useState } from 'react'
import CardComponent from './CardComponent';
import axios from 'axios';

export default function BooksComponent() {
    const [books, setBook] = useState([]);
    const [search, setSearch] = useState("")
    const [submit,setSubmit]=useState("")

    const Changesearch = (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        setSubmit(search)
    }

    useEffect(() => {
        const fetchData = async () => {

            const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${submit}&key=AIzaSyAOD_kaldsXFWdLzWfLNBvbHTriXNDwgBE&maxResults=40`)
            result.json().then((value) => {
                try {
                    console.log(value.items)
                    setBook(value.items)
                    // console.log(value.items[1].volumeInfo)
                    // setBook(value.items[1].volumeInfo.title)
                }
                catch (err) {
                    console.log("error")
                }
            });


        }
        fetchData();
    }, [submit]);
    // console.log(books[0].volumeInfo.title)
    return (
        <div >
           <form onSubmit={handleSubmit}>
            <input type='text'  placeholder='Enter search ' value={search}  onChange={Changesearch}></input>
            <button type='submit'>Submit</button>
            </form>
           
            <div  className='all-book-container'>

            {books?
            books.map((value,index) => (
                <div key={index}>
                    
                    {/* <img src= {value.volumeInfo.imageLinks.thumbnail && value.volumeInfo.imageLinks.thumbnail} alt='Error'></img> */}
                    {/* <img src= { value.volumeInfo.imageLinks && value.volumeInfo.imageLinks.thumbnail?value.volumeInfo.imageLinks.thumbnail:"error"} alt='Error'></img>
                    <h1>Title : {value.volumeInfo.title}</h1> */}
                    
                    
                    <CardComponent
                     title = {value.volumeInfo.title}
                     imageLinks = {value.volumeInfo.imageLinks && value.volumeInfo.imageLinks.thumbnail?value.volumeInfo.imageLinks.thumbnail:"error"}
                     searchInfo = {value.searchInfo && value.searchInfo.textSnippet? value.searchInfo.textSnippet:"Read more"}
                     rating = {value.volumeInfo.averageRating?value.volumeInfo.averageRating:""}
                     ratingCount ={value.volumeInfo.ratingsCount?value.volumeInfo.ratingsCount:""}
                     author ={value.volumeInfo.authors && value.volumeInfo.authors[0]?value.volumeInfo.authors[0]:""}
                     publishDate = {value.volumeInfo.publishedDate?value.volumeInfo.publishedDate:""}
                     isbn = {
                        value.volumeInfo.industryIdentifiers 
                        ? (value.volumeInfo.industryIdentifiers[0] && value.volumeInfo.industryIdentifiers[1]
                            ?
                            (
                            value.volumeInfo.industryIdentifiers[0].type==="ISBN_13"
                            ?
                            value.volumeInfo.industryIdentifiers[0].identifier
                            :
                            value.volumeInfo.industryIdentifiers[1].identifier
                            ):""
                        )
                        
                        :""
                     }
                    />
                </div>
            )):""}
            </div>
            {/* <h3>search : {books.search}</h3> */}
        </div>
    )
}
