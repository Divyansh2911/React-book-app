
import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import CardRating from './CardRating';
import Modal from 'react-modal'
import { themeContext } from './ThemeContextProvider';
import modalImage from '../images/modalImage.png'
// Modal.setAppElement(document.getElementById('root'));
export default function CardComponent(props) {
    const { Theme } = useContext(themeContext)
    // console.log(props.isbn)
    const navigate = useNavigate();
    const [modalBook, setModalBook] = useState(null)
    const [check, setCheck] = useState(false)
    // console.log(props.book)
    // const openModal = (book) => {
    //     setModalBook(book)
    //     setCheck(true)
    // }
    const closeModal = () => {
        console.log('called')
        setModalBook("")

        // console.log(modalBook)
        setCheck(false)
    }
    // console.log(modalBook)

    console.log(check)
    return (
        <div className='Card-container' style={{ cursor: 'pointer' }}>
            <div className='thumbnail-container' onClick={() => setCheck(true)}>
                <div className='book-image'>
                    <div id='bookThumb'>
                        <img src={props.imageLinks} alt='Trouble in loading!' />
                    </div>
                </div>
            </div>
            <div className='info-container' onClick={() => setCheck(true)}>
                <h3 id='title'>{props.title}</h3>
                <p>-{props.author ? props.author : ""}</p>
                <div className='inner-info-container'>
                    <div className='rating'>
                        <div className='rating-item'>

                            {props.rating ? <span><strong>Rating:</strong><div className='rating-star'><CardRating rating={props.rating} /> </div> &#40;{props.ratingCount ? <span>{props.ratingCount}</span> : ""}&#41;</span> : ""}
                        </div>
                        <div className='rating-item'>
                            {props.publishDate ? <span><strong>Publish Date : </strong>{props.publishDate} </span> : ""}
                        </div>
                    </div>
                    <div className='synopsis'>
                        <div className='synopsis-items'>
                            {/* {console.log(props.isbn)} */}
                            {/* <button className='read-button' onClick={handleClick}></button> */}
                            {props.embeddable && props.embeddable === true ? <Link to={'/viewer/' + props.isbn} target='blank' className='read-button' ><button className='read-button-button'>
                                Read
                            </button>
                            </Link> : ""}

                        </div>
                        <div className='synopsis-items'>

                        </div>
                    </div>
                </div>
                <div className='synopsis-end' >
                    <details>
                        <summary>About:</summary>
                        <span>{props.searchInfo}</span>
                    </details>
                </div>
            </div>
            { }
            <Modal isOpen={check}
                onRequestClose={closeModal} >
                <div className='Modal-cross-button-container' style={{ textAlign: 'end' }}>
                    <button onClick={closeModal} style={{ color: 'white', backgroundColor: '#e3434ce3', padding: '15px 20px', borderRadius: '4px', cursor: 'pointer' }}>X</button>
                </div>

                {/* <button onClick={()=>check?setCheck(false):setCheck(true)}>close</button> hey */}
                <div className={`visit ${Theme}`}>
                    {/* <Carousel2 className='carousel' images={images} /> */}
                    <div className={`visit-container `} >

                        <div className='visit-grid-one'>
                            <div className='image-constainer-seller-visit' style={{ padding: '10px 10px 10px 10px', display: 'flex', flexDirection: 'row' }}>
                                <img src={props.imageLinks} alt='Trouble in loading' style={{ height: '250px', width: '180px', padding: '20px 3px 7px 25px' }}></img>
                                <div className='image-side-header' style={{ width: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center' }}><h1>{props.title}</h1>
                                    <p>-{props.author}</p>
                                    <p style={{ fontSize: '1.1rem' }}><CardRating rating={props.rating}/>&#40; {props.ratingCount?props.ratingCount:'0'} &#41;</p>
                                    <Link to={props.buyLink} target='_blank'><button style={{ width: "40%", backgroundColor: 'rgb(28 104 139)', cursor: 'pointer', margin: '15px auto 8px auto', borderRadius: '8px', padding: '8px 2px', color: 'white' }}>Buy</button></Link>
                                    

                                    {props.embeddable && props.embeddable === true ? <Link to={'/viewer/' + props.isbn} target='blank' className='read-button' ><button className='read-button-button' style={{ width: "40%", backgroundColor: '#069c54', cursor: 'pointer', margin: '15px auto 8px auto', borderRadius: '8px', padding: '8px 2px', color: 'white' }}>
                                Read
                            </button>
                            </Link> : ""}
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <p style={{}}><i>{props.searchInfo}</i></p>
                                <h3>Description</h3> - {props.description}</div>
                        </div>
                        <div className='visit-grid-two'>
                            <div className='seller-visit-head' style={{ padding: '10px', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                                <h3 style={{ fontWeight: '400', backgroundColor: '#ececec61' }}>Info Links</h3>
                                <p style={{ fontWeight: '500', fontSize: '38px', textTransform: 'capitalize' }}><i></i></p>
                                <p><i class="fa-solid fa-arrow-up-right-from-square"></i>&nbsp; &nbsp;<Link to={props.preview} target='blank'>Preview</Link></p>
                                <p>Page Count - {props.pages}</p>
                                <p>Publish Date - {props.publishDate}</p>
                            </div>
                           
                            <div className='sell-image-modal' >
                                <img src={modalImage} alt='Trouble in loading' style={{width:'80%' , height: "300px"}}></img>
                            </div>

                        </div>
                    </div>
                </div>

            </Modal>

        </div>
    )
}
