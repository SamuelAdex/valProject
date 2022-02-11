import { useState, useEffect, createRef } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import './App.css'
import val_img from './img/time-out-1.png';

function App() {
  const [img, setImg] = useState(""),
  [showImg, setShowImg] = useState(false);
  const ref = createRef(null);


  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg" || "image/jpeg",
    quality:1.0
  });


  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  

  //Handle image upload
  const fileUpload = (e, setImg) =>{
    if(e.target.files && e.target.files[0]){
        if(/image\/*/.test(e.target.files[0].type)){
            const reader = new FileReader();

            reader.onload = function(){
                setImg(reader.result)
                console.log(reader.result)
                setShowImg(true)
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }
  }

  useEffect(()=>{
    if(img !== null)
      return img;

  }, [img])

  return (
    <>
        <header className="header">
          <div className="heading">
                <h1>Kings Place Fellowship</h1>
                <h3>Presents</h3>        
          </div><br /><br />
          <section className="lovers">
            <h1>Lovers Time Out</h1>
          </section><br />
        </header>
      <div className="App">
        <div className="layout-container">
          <div className="card-container">
            <div  ref={ref} className="e-card" style={{background: `url(${val_img})`,          
              backgroundSize: "contain", backgroundPosition: 'center'}}>
              {showImg && 
                <div className="guest-image" style={{background: `url(${img})`, backgroundSize: "cover", backgroundPosition: 'center'}} >
                  {/* <img src={speaker3} alt="" /> */}
                </div>
              }
            </div><br />
            {img && <button style={{
              backgroundColor: '#037a2b',
              padding: '10px',
              width: '100%',
              border: 'none',
              color: 'white',
              borderRadius: '10px',
              marginBottom: '15px',
              cursor: 'pointer'
            }}
            onClick={downloadScreenshot}
            >Download Your Avatar</button>}
          </div>
          <div className="upload-img">
            {!img &&
              <label htmlFor="upload">
                <div className="upload-wrapper">
                  <div className="dotted-border">
                    <img src="" alt="" />
                    <p>Click to upload</p>
                  </div>
                </div>
                <input type="file" value="" id="upload" onChange={(e)=> fileUpload(e, setImg)} style={{display: 'none'}} />
              </label>
            }
            {img && 
              <label htmlFor="upload">
              <div className="upload-wrapper">
                <div className="dotted-border">
                  <img src={img} alt="" style={{
                    position: 'relative',
                    width: '150px',
                    height: '180px'
                    
                  }} />
                </div>
              </div>
              <input type="file" value="" id="upload" onChange={(e)=> fileUpload(e, setImg)} style={{display: 'none'}} />
            </label>
            }
            <button onClick={
              (e)=>{
                e.preventDefault();
                setImg("");
                setShowImg(false)
              }
            } style={{
              backgroundColor: "#971a1a",
              padding: '10px',
              width: '100%',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              marginTop: '10px'
            }}>
              Remove Image
            </button>
          </div>
        </div>      
      </div>

      
      <div className="host">
        <h1 className="title" >About The Host</h1>
        <div className="host-wrapper">
          <div className="host-img">
            <img src={speaker1} alt="" />
          </div>
          <div className="about-host">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui, corrupti blanditiis, nemo, aut beatae pariatur ea consequuntur a aperiam doloremque eum vel obcaecati. Perferendis, rem. Dolores, perspiciatis. Harum quidem odio quo nemo dolor reprehenderit consectetur laborum minus aperiam sapiente atque, numquam magnam nihil sit. Cupiditate, quam accusantium voluptate ipsam et reiciendis veniam sequi odit labore esse dignissimos inventore ducimus ipsum! Repellendus maiores quod excepturi provident sed dicta, dolor ad pariatur voluptatum sapiente quibusdam vel voluptates labore accusamus nostrum iusto error officia maxime magnam? Molestiae asperiores ratione sequi doloribus architecto unde, est corrupti commodi atque voluptatem aliquid iure, laborum officia autem!</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

