import React, { useContext, useEffect, useState } from 'react'
import CardComponent from './CardComponent';
import axios from 'axios';
// import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import { themeContext } from './ThemeContextProvider';


export default function BooksComponent() {
    const { user, setUser, Theme, bookName, setBookName } = useContext(themeContext);
    const [books, setBook] = useState([]);
    const [search, setSearch] = useState("")
    const [submit, setSubmit] = useState("")
    

    const Changesearch = (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmit(search)
    }

    useEffect(() => {
        const fetchData = async () => {

            const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=AIzaSyC0CDq8lSViFqMqPUpnN3uzbq6XcivXnvY&maxResults=40`)
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
    }, [submit, bookName]);
    // console.log(books[0].volumeInfo.title)
    return (

        <div >
            <form onSubmit={handleSubmit}>
                {/* <input type='text'  placeholder='Enter search ' value={search}  onChange={Changesearch}></input>
            <button type='submit'>Submit</button> */}
            </form>
            <div className={`all-book-container ${Theme}`}>
                {books && <h2 className='book-Head' id="search">Search Results</h2>}
                
                    {books ?
                        books.map((value, index) => (
                            <div key={index}>

                                {/* <img src= {value.volumeInfo.imageLinks.thumbnail && value.volumeInfo.imageLinks.thumbnail} alt='Error'></img> */}
                                {/* <img src= { value.volumeInfo.imageLinks && value.volumeInfo.imageLinks.thumbnail?value.volumeInfo.imageLinks.thumbnail:"error"} alt='Error'></img>
                    <h1>Title : {value.volumeInfo.title}</h1> */}


                                <CardComponent
                                    book={value}
                                    title={value.volumeInfo.title}
                                    imageLinks={value.volumeInfo.imageLinks && value.volumeInfo.imageLinks.thumbnail ? value.volumeInfo.imageLinks.thumbnail : "error"}
                                    searchInfo={value.searchInfo && value.searchInfo.textSnippet ? value.searchInfo.textSnippet : "Read more"}
                                    rating={value.volumeInfo.averageRating ? value.volumeInfo.averageRating : ""}
                                    ratingCount={value.volumeInfo.ratingsCount ? value.volumeInfo.ratingsCount : ""}
                                    author={value.volumeInfo.authors && value.volumeInfo.authors[0] ? value.volumeInfo.authors[0] : ""}
                                    description = {value.volumeInfo?value.volumeInfo.description:""}
                                    buyLink={value.saleInfo?value.saleInfo.buyLink:"https://play.google.com/store/books/details?id=VTeXAAAAQBAJ&rdid=book-VTeXAAAAQBAJ&rdot=1&source=gbs_api"}
                                    preview={value.volumeInfo?value.volumeInfo.previewLink:""}
                                    pages = {value.volumeInfo?value.volumeInfo.pageCount:""}
                                    publishDate={value.volumeInfo.publishedDate ? value.volumeInfo.publishedDate : ""}
                                    embeddable={value.accessInfo ? value.accessInfo.embeddable : console.log(value.accessInfo)}

                                    isbn={
                                        value.volumeInfo.industryIdentifiers
                                            ? (value.volumeInfo.industryIdentifiers[0] && value.volumeInfo.industryIdentifiers[1]
                                                ?
                                                (
                                                    value.volumeInfo.industryIdentifiers[0].type === "ISBN_13"
                                                        ?
                                                        value.volumeInfo.industryIdentifiers[0].identifier
                                                        :
                                                        value.volumeInfo.industryIdentifiers[1].identifier
                                                ) : ""
                                            )

                                            : ""
                                    }

                                />

                            </div>
                        )) : ""}

     
            </div>
            {/* <h3>search : {books.search}</h3> */}
        </div>

    )
}
