import {
    Alert,
    Avatar,
    BackgroundImage,
    Badge,
    Card,
    Divider,
    Group,
    List,
    Spoiler,
    Text,
    ThemeIcon,
} from '@mantine/core';
import { IconAlertCircle, IconCalendarTime, IconChairDirector, IconMovie, IconVideoPlus } from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingBars from '../../components/loader/LoadingBars';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { MovieDetails } from '../../models/MovieDetails';
import { useAppStore } from '../../store/app.store';
import { convertToRomanNumber } from '../../utilities/utilities';
import './MoviesList.scss';

const MoviesList: FC = () => {
    const { userLoggedIn } = useAuth();
    const [noOfPages, setNoOfPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
    const { moviesList, setMoviesList } = useAppStore((state) => ({
        moviesList: state.moviesList,
        setMoviesList: state.setMoviesList,
    }));

    useEffect(() => {
        const fetchMoviesList = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/films');
                if (!response.ok) {
                    setHasErrorOccurred(true);
                    throw new Error('Sorry, Something Went Wrong!');
                }
                const result = await response.json();
                setNoOfPages(result.count);
                setMoviesList(populateListOfMovies(result.results));
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesList();
    }, []);

    const populateListOfMovies = (result: any[]) => {
        const elements: MovieDetails[] = result.map((value) => {
            return {
                title: value.title,
                episode_id: value.episode_id,
                opening_crawl: value.opening_crawl,
                director: value.director,
                producer: value.producer,
                release_date: new Date(value.release_date).toDateString(),
                noOfCharacters: value.characters.length,
                planets: value.planets,
                noOfStarships: value.starships.length,
                noOfVehicles: value.vehicles.length,
                noOfSpecies: value.species.length,
            };
        });

        return elements.sort((a, b) => a.episode_id - b.episode_id);
    };

    const avatar = (iconAlt: string, color: string, iconNode: any) => (
        <Avatar alt={iconAlt} color={color} radius="xl">
            {iconNode}
        </Avatar>
    );

    if (loading) {
        return <LoadingBars></LoadingBars>;
    }

    return userLoggedIn ? (
        <BackgroundImage className="movie-details" src="https://wallpapercave.com/wp/Rc3r14M.jpg">
            {!hasErrorOccurred ? (
                <Card className="movie-details-container" shadow="sm" padding="lg" radius="md" withBorder>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>Movie Title: </Text>
                        <Badge
                            pl={0}
                            size="xl"
                            color="grey"
                            radius="xl"
                            leftSection={avatar('Planet Icon Avatar', 'blue', <IconMovie size="1.5rem" />)}
                        >
                            Star Wars {convertToRomanNumber(moviesList[0]?.episode_id)}: {moviesList[0]?.title}
                        </Badge>
                    </Group>
                    <Divider></Divider>
                    <Group position="apart" mt="md" mb="xs">
                        <Text weight={500}>Release Date: </Text>
                        <Badge
                            pl={0}
                            size="xl"
                            color="grey"
                            radius="xl"
                            leftSection={avatar('Planet Icon Avatar', 'pink', <IconCalendarTime size="1.5rem" />)}
                        >
                            {moviesList[0]?.release_date}
                        </Badge>
                    </Group>
                    <Divider></Divider>
                    <Text weight={400}>Opening Crawl:</Text>
                    <Spoiler className="opening-crawl-container" maxHeight={100} showLabel="Show more" hideLabel="Hide">
                        {moviesList[0]?.opening_crawl}
                    </Spoiler>
                    <Divider></Divider>
                    <Text weight={400}>Crew:</Text>
                    <List spacing="xs" size="sm" center>
                        <List.Item
                            icon={
                                <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconChairDirector size="1rem" />
                                </ThemeIcon>
                            }
                        >
                            Director: {moviesList[0]?.director}
                        </List.Item>
                        <List.Item
                            icon={
                                <ThemeIcon color="blue" size={24} radius="xl">
                                    <IconVideoPlus size="1rem" />
                                </ThemeIcon>
                            }
                        >
                            Producer: {moviesList[0]?.producer}
                        </List.Item>
                    </List>
                    <Divider></Divider>
                </Card>
            ) : (
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                    <Alert icon={<IconAlertCircle size="1rem" />} title="Some Error Occurred!" color="red">
                        There is no data available for this planet!
                    </Alert>
                </Card>
            )}
        </BackgroundImage>
    ) : (
        <Navigate to={'/login'} replace={true} />
    );
};

export default MoviesList;
