import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';

const SearchFunction = () => {
    const [aarray, setAarray] = useState([])
    const [results, setResults] = useState([])
    const searchRef = useRef()
    const [page, setPage] = useState(6)
    const [display, setDisplay] = useState("")
    const [linedisplay, setLineDisplay] = useState("none")

    useEffect(()=>{
      getDetails()
    })

    const getDetails = () =>{
        axios.get(`https://api.spacexdata.com/v3/launches?limit=${page}&offset=0`).then((result) => {
            const array = result.data
            setAarray(array)
        }).catch((err) => {
            console.log(err)
        });
    }

    const scrollToEnd = () =>{
        setPage(page + 6)
        if(page >= 110){
            setDisplay("none");
            setLineDisplay("block")
        }
    }
    window.onscroll = ()=>{
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            scrollToEnd()
        }
        
    }

    const onSearchSubmit =(e)=>{
        e.preventDefault()
        const searchFilt = aarray.filter((name)=>{
            return searchRef.current.value === name.mission_name
        })
        setResults(searchFilt)
        setDisplay("none")
        setLineDisplay("none")
        console.log(results);
    }
    return( 
        <section className='search'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12 form-floating searchBar'>
                        <input type="text" className="form-control" id="floatingInput" placeholder="Search" ref={searchRef} onChange={onSearchSubmit}/>
                        <label for="floatingInput">Search</label>
                    </div>
                    <div className='col-12 searchResults'>
                        <div className='row'>
                        {results.length === 0 ?
                            aarray.map((data,index)=>(
                            <div className='col-6 tiles' key={{index}}>
                                <div data-aos="fade-up" className='tile'>
                                    <p>
                                        {data.mission_name}<span>{data.launch_year}</span>
                                        {data.launch_success ? <i class="bi bi-check-circle-fill" style={{color:"green"}}></i> 
                                        : <i class="bi bi-check-circle-fill" style={{color:"red"}}></i> }
                                    </p>
                                    <p className='details'>{data.details}</p>
                                </div>
                            </div>)) 
                        : 
                            results.map((data,index)=>(
                            <div className='col-6 tiles' key={{index}}>
                                <div data-aos="fade-up" className='tile'>
                                    <p>{data.mission_name}<span>{data.launch_year}</span></p>
                                    <p className='details'>{data.details}</p>
                                </div>
                            </div>))
                        }
                        </div>
                        <div class="spinner-border text-primary spinner" style={{display:`${display}`}}  role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <h1 className='endOfLine' style={{display:`${linedisplay}`}}>End of Line</h1>
                    </div>
                    
                    
                </div>
            </div>
        
        </section>
      
    
    );
}

export default SearchFunction