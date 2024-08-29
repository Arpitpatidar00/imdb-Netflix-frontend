import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
  } from "@material-tailwind/react";
  import React, { useEffect } from "react";
  import { useDataContext } from "./contex/DataContext";
  import Modal from "./MovieDetails";
  import MovieDetails from "./About";
  
  export const BlogCard = () => {
    const {
      data,
      selectedFilter,
      setSelectedFilter,
      fetchData,
      fetchMovieById,
      selectedMovie,
    } = useDataContext();
  
    const [showModal, setShowModal] = React.useState(false);
  
    useEffect(() => {
      fetchData(selectedFilter);
    }, [selectedFilter, fetchData]);
  
    const handleCardClick = (movieId) => {
      fetchMovieById(movieId); // Fetch movie details by ID
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <>
        <div className="container text-center">
          <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            {data.map((movie) => (
              <div className="col" key={movie._id} onClick={() => handleCardClick(movie._id)}>
                <Card className="max-w-[24rem] overflow-hidden">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="m-0 rounded-none"
                  >
                    <img src={movie.poster} alt={movie.title} />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h4" color="blue-gray">
                      {movie.title}
                    </Typography>
                    <Typography variant="lead" color="gray" className="mt-3 font-normal">
                      Because it&apos;s about motivating the doers. Because I&apos;m here to
                      follow my dreams and inspire others.
                    </Typography>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between">
                    <div className="flex items-center -space-x-3">
                      <Tooltip content="Natali Craig">
                        <Avatar
                          size="sm"
                          variant="circular"
                          alt="natali craig"
                          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                          className="border-2 border-white hover:z-10"
                        />
                      </Tooltip>
                      <Tooltip content="Tania Andrew">
                        <Avatar
                          size="sm"
                          variant="circular"
                          alt="tania andrew"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                          className="border-2 border-white hover:z-10"
                        />
                      </Tooltip>
                    </div>
                    <Typography className="font-normal">
                      Released: {new Date(movie.released).toDateString()}
                    </Typography>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
  
        {/* Modal with the MovieDetails component */}
        {selectedMovie && (
          <Modal show={showModal} onClose={handleCloseModal}>
            <MovieDetails movie={selectedMovie} onClose={handleCloseModal} />
          </Modal>
        )}
      </>
    );
  };
  