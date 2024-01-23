
import React, { useState, useEffect } from "react";
import axios from "axios";
import CardJuegos from '../../common/cardJuegos/CardJuegos';
import Header from '../../common/header/Header';
import styles from "./Home.module.css";
import confetti from 'canvas-confetti';
import { Button } from "@mui/material";
import CreateJuegosModal from "../../common/createJuegosModal/CreateJuegosModal";

const Home = () => {
    const [juegos, setJuegos] = useState([]);
    const [dispatchLike, setDispatchLike] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [open, setOpen] = useState(false);
    const [isJuegosCreate, setIsJuegosCreate] = useState(false);
    const [isJuegosDelete, setIsJuegosDelete] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        axios
        .get("http://localhost:5000/juegos")
        .then((res) => setJuegos(res.data))
        .catch((err) => console.log(err));

        setDispatchLike(false);
        setIsJuegosCreate(false)   
        setIsJuegosDelete(false)
  }, [dispatchLike, isJuegosCreate, isJuegosDelete]);
    
    const handleLike = ( juegos ) => {
        if (!juegos.isLiked) {
            confetti({
              zIndex: 999,
              particleCount: 100,
              spread: 160,
              angle: -100,
              origin: {
                x: 1,
                y: 0,
              },
            });
          }
        
          axios
          .patch(`http://localhost:5000/juegos/${juegos.id}`, {
          isLiked: !juegos.isLiked,
        })
        .then((res) => setDispatchLike(true))
        .catch(( err) => console.log(err))
    };


    const juegosFiltered = juegos.filter( juegos => juegos.isLiked);
    
    const deleteJuegosById = (id)=>{
        
        axios.delete(`http://localhost:5000/juegos/${id} `)
          .then(res =>setIsJuegosDelete(true))
          .catch(err => console.log(err))
      }
    
    return (
        <>
        <Header setFavorite={setFavorite}/>
        <Button onClick={handleOpen}>Agregar Juego</Button>
        <CreateJuegosModal open={open} handleClose={ handleClose } setIsJuegosCreate={setIsJuegosCreate} />
        <div className={styles.containerCards}>
            {!favorite 
            ? (juegos.map((juegos) => {
                        return (
                        <CardJuegos 
                        juegos={juegos} 
                        key={juegos.id} 
                        handleLike={handleLike} 
                        deleteJuegosById={deleteJuegosById}
                        />

                        );
                    })
                ) : (
                    juegosFiltered.map((juegos) => {
                        return (
                            <CardJuegos 
                            juegos={juegos} 
                            key={juegos.id} 
                            handleLike={handleLike} 
                            deleteJuegosById={deleteJuegosById}
                            />
                        );
                    })
                )
                }

        </div>

        </>

    )
};

export default Home;
