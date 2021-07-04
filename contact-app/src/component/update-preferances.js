import React, { useEffect } from "react"
import {Form, Button, Alert } from "react-bootstrap";
import Opt from "../component/Options";
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import {Link, useHistory } from "react-router-dom"
import Creatable from 'react-select/creatable';
import Select from 'react-select';

const UpdatePreferances=()=> {
    const { currentUser} = useAuth()
    const [twitter, setTwitter] = useState([])
    const [news, setNews] = useState([])
    const [reddit, setReddit] = useState([])
    const history = useHistory()
    const [error, setError] = useState("")
    useEffect(()=>{
        const fetchData= async()=>{
            const result = await fetch(`/api/preferances/${currentUser.email}`)  
            const body= await result.json(); 
       
            setNews(body.news)
            setReddit(body.reddit)
            setTwitter(body.twitter)}
            
         
            fetchData();
        
    },[currentUser]);

  async function onSubmit(e){
    e.preventDefault()
    if(news.length===0 || reddit.length ===0 || twitter.length===0){
      return setError("Error: Atleast one option need to be selected")
    }
        
      await fetch(`/api/update-preferances/${currentUser.email}`, {
                method: 'post',
                body: JSON.stringify({ twitter: twitter, reddit: reddit, news: news }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            history.push("/")
          
     }

    const handleChange1=(twitter)=> setTwitter(twitter); 
    const handleChange2 =(news) => setNews(news);
    const handleChange3 = (reddit) => setReddit(reddit);
     return (
        <>
        <div style={{margin:20}}>{error && <Alert className="text-center" variant="danger">{error}</Alert>}</div>
        
        <Form onSubmit={onSubmit}>
       
        <div className="text-center" style={{minWidth:"15rem", fontFamily: "Pacifico", marginTop: 50}}><h1 style={{fontSize: 40}}>Update your tags</h1></div>
        
       <div className="text-center" style={{margin:10}}> <img  style={{ height : "15rem", width: "25rem", }} src="https://flipweb.org/wp-content/uploads/2019/09/Google-News.png" alt=""/></div> 
       <Creatable
          value={news}
          isMulti
          onChange={handleChange2}
          options={Opt.News}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      <div className="text-center" style={{margin:10}}><img  style={{ height : "10rem", width: "20rem",  }} src="https://cdn.iphoneincanada.ca/wp-content/uploads/2016/02/twitter-logo.png" alt=""/></div>
      <Select
          value={twitter}
          isMulti
          onChange={handleChange1}
          options={Opt.Twitter}
          className="basic-multi-select"
          classNamePrefix="select"
        />
     <div className="text-center" style={{margin:10}}> <img  style={{ height : "10rem", width: "20rem", }} src="https://logos-world.net/wp-content/uploads/2020/10/Reddit-Logo-2017-present.jpg" alt=""/></div> 
     <Select
          value={reddit}
          isMulti
          onChange={handleChange3}
          options={Opt.Reddit}
          className="basic-multi-select"
          classNamePrefix="select"
          
        />
      <div className="text-center" style={{marginTop:50}}>
      <Button variant="success" className="w-100" type="submit">
                Update
                </Button>
               
      </div><div className="text-center" style={{marginTop:10, marginBottom: 50}}><Link to='/'><Button className="w-100"variant="success" >
                  Cancel
                </Button></Link></div> 
      </Form>
     
      </>
       
      );
    }
  export default UpdatePreferances;