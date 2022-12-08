import { AppBar, Box, Card, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Grid, Toolbar, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import './App.css';

function App() {
    const [movies, setMovies] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [move, setMove] = useState({})
    const largura = window.screen.width

    const getMovies = useCallback(() => {

        fetch('https://api.themoviedb.org/3/movie/popular?api_key=0f7f734413859ad69f2aee2b915bed16')
        .then(res => res.json())
        .then(data => {
            setMovies(data.results)
        })
    },[])

    useEffect(() => {
        getMovies()
    }, [getMovies])
    

  return (
    <Grid container spacing={1}>
      <AppBar position='static' sx={{backgroundColor: 'black'}}>
        <Toolbar>
            <Box display='flex' justifyContent='center' width='100vw'>
                <h1 className='title'>THE MOVIES</h1>
            </Box>
        </Toolbar>
      </AppBar>
      {movies.map(move => 
        <Grid item xs={6} lg={2}>
            <Card onClick={() => {
                setOpenModal(true)
                setMove(move)
                }} key={move.title} className='cardMove'>
                <CardMedia
                    component='img'
                    height='350'
                    image={`https://image.tmdb.org/t/p/w500/${move.poster_path}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant='h6' align='center' component='div'>
                            {move.title}
                        </Typography>
                    </CardContent>
            </Card>
        </Grid>
        )}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth='lg'fullWidth>
            <DialogTitle><Typography variant='h4'>{move.title}</Typography></DialogTitle>
            <DialogContent>
                <Grid container spacing={1}>
                        {largura < 650 ? (
                            <>
                                <Grid item xs={12}>
                                    <Typography variant='h5' style={{marginBottom:'20px'}}>
                                        {move.overview}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Release date of: {move.release_date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        component='img'
                                        height='300px'
                                        src={`https://image.tmdb.org/t/p/w500/${move.poster_path}`}
                                    />    
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant='h5' style={{marginBottom:'20px'}}>
                                        {move.overview}
                                    </Typography>
                                    <Typography variant='body2'>
                                        Release date of: {move.release_date}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5}>
                                    <Box
                                        component='img'
                                        height='300px'
                                        src={`https://image.tmdb.org/t/p/w500/${move.backdrop_path}`}
                                    />
                                </Grid>
                            </>
                        )}
                </Grid>
            </DialogContent>
        </Dialog>
    </Grid>
  )
}

export default App;
