import { useState, useEffect } from "react";
import SearcBar from "components/Searchbar/Searchbar";
import { AppStyle } from "./App.styled";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Button from "components/Button/Button";
// import axios from "axios";
import { fetchImg } from "components/Api/Api";
import Loader from "components/Loader/Loader";
import ModalPic from "components/Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

// const KEY = "29175258-0e972b66084e1db5719a62740"


export default function App() {
  const [picture, setPicture] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [imgURL, setImgURL] = useState(null);

 useEffect(() => {
 if (!search) {
  return
   };
     const findImg = async () => {
      try {
        setIsLoading(true)
        const data = await fetchImg(page, search)
         data.hits.length === 0 ? toast.error("no Images") : setPicture((prev) => [...prev, ...data.hits])
      } catch (error) {
        setError(toast.error("Error loading. Try again"))
      } finally {
        setIsLoading(false)
      };
    };
   findImg()
  
  }, [search, page]);

  useEffect(() => {
    window.addEventListener("keydown", hadndleKeyDown);
     return () => {window.removeEventListener("keydown", hadndleKeyDown);}
  }, []);

 const hadndleKeyDown = e => {
    setShowModal(() => {
       if (e.code === "Escape") {
         return false;
    };
     })
  };

    const onSearch = (text) => {
      const { name } = text;
      setPicture([]);
      setPage(1);
      setSearch(() => {
        if (search !== name) {
          return name;
        };
      });
  };
  
   const loadMore = (e) => {
     e.preventDefault();
     setPage(prev => prev + 1)
  };
  
  const toggleModal = (e) => {
    setShowModal(() => {
      if (e.target.nodeName === "IMG") {
        return !showModal;
      };
    });
  };
  
  const close = () => {
    setShowModal(false);
  };

    const getModalContent = (img) => {
      setImgURL(img);
  };
  
  const btnCondition = !isLoading && picture.length > 0

  return (
      <AppStyle onClick={toggleModal}>
 <ToastContainer />
        {showModal && <ModalPic closeModal={close}><img src={imgURL} alt=""/></ModalPic>}
        {error && (<p>UPS</p>)}
        <SearcBar onSearch={onSearch}  />
        {isLoading && <Loader />}
        {picture.length > 0 &&   <ImageGallery pictures={picture} getModalPic={getModalContent}/>}
        {btnCondition && <Button onClick={loadMore} />}
    </AppStyle>
  );
}


////////////////////////////////////////////////
//  useEffect(() => {
//  if (!search) {
//   return
//     };
//     const findImg = async () => {
//       try {
//         setIsLoading(false)
//         const data = await fetchImg(page, search)
//          data.hits.length === 0 ? toast.error("no Images") : setPicture(() => [...picture, ...data.hits])
//       } catch (error) {
//         toast.error("Error loading. Try again")
//       } finally {
//         setIsLoading(false)
//       };
//     };
//    findImg()
  
//   }, [search, page]);