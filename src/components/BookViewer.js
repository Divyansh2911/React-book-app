import React, { useRef, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function BookViewer() {
    const {isbn} = useParams();
    console.log(isbn)
    const ref = useRef(null);
    const [loaded, setLoaded] = useState(false);  
    function alertNotFound() {            
        alert("could not embed the book!");
     }
     const ISBN_num = isbn;
    useEffect(() => {
        const scriptTag = document.createElement('script')                
      scriptTag.src= 'https://www.google.com/books/jsapi.js'       
      scriptTag.addEventListener('load', ()=>setLoaded(true))       
      scriptTag.id = "google-script"      
      document.body.appendChild(scriptTag);     
        const element = ref.current;
        console.log(element);

    }, []);
    useEffect(()=>{            
        if (!loaded) return             
        else{         
             if(window.viewer){            
                let viewer = new window.google.books.DefaultViewer
                (ref.current); 
                viewer.load('ISBN:'+ ISBN_num, alertNotFound);                    
              }        
              else{          
                window.google.books.load()                             
                window.google.books.setOnLoadCallback(() => {                 
                let viewer = new window.google.books.DefaultViewer      
                    (ref.current);         
                window.viewer = viewer         
                viewer.load('ISBN:'+ ISBN_num, alertNotFound);        
              })
            }              
        }}, [loaded,ISBN_num])      
    return (
        <div>
            <div ref={ref} id="viewerCanvas">
              
            </div>
        </div>
    )
}
