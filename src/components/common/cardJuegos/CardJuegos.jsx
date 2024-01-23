
import React from 'react'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button } from "@mui/material";


const CardJuegos = ({ juegos, handleLike, deleteJuegosById }) => {
    return (
      <Card sx={{ width: 300, height: 500 }}>
        <CardHeader title={juegos.name} />
        <CardMedia
          component="img"
          height="194"
          image={juegos.img}
          alt="Paella dish"
        />
        <CardContent sx={{ height: 150 }}>
          <Typography variant="body2" color="text.secondary">
            {juegos.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="add to favorites" onClick={() => handleLike(juegos)}>
            <FavoriteIcon
              color={juegos.isLiked ? "error" : "disabled"}
            />
          </IconButton>
        <Button onClick={()=>deleteJuegosById(juegos.id)} variant="outlined" color="primary">Eliminar</Button>
        </CardActions>
         
      </Card>
    );
  };
  

export default CardJuegos