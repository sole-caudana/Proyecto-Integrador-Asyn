import React from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";

import {useFormik} from "formik"
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateJuegosModal = ({ open, handleClose, setIsJuegosCreate }) => {

  let initialValues = {
    name: "",
    description: "",
    img: ""
  }

  const onSubmit = (data)=>{
    
    let arg = {
      name: data.name,
      description: data.description,
      img: data.img,
      isLiked: false
    }

    axios.post("http://localhost:5000/juegos", arg )
    .then( res => {
      handleClose()
      setIsJuegosCreate(true)
    } )
    .catch(error => console.log(error))

  }


  const { handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema,
    onSubmit
  })


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",
              height: "400px",
            }}
            onSubmit={handleSubmit}
          >

            <Typography variant="h6" color="primary"> Agregar Juego 🎉</Typography>
            <TextField
              id="outlined-basic"
              label="Juego"
              variant="outlined"
              name="name"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              id="outlined-basic"
              label="Descripción"
              variant="outlined"
              name="description"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Adjuntar URL de la imagen"
              variant="outlined"
              name="img"
              onChange={handleChange}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">Agregar</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateJuegosModal;
