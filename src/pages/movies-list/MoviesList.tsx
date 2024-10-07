import { Carousel, Embla, useAnimationOffsetEffect } from '@mantine/carousel';
import {
    Alert,
    Avatar,
    BackgroundImage,
    Badge,
    Card,
    Divider,
    Group,
    Image,
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

const MoviesImagesList = [
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/385C45162034D0D843A1DFE151986AA2C568643FD14A7B1FCE881F5393B24A56/scale?width=1200&aspectRatio=1.78&format=webp',
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/1D6C8278D399FD280CC3B54A9BC7D23122756B7F43C1D16D2A29CE442260009C/scale?width=1200&aspectRatio=1.78&format=webp',
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B38E9B3419A8AF5BA743C323CF835E7864A0406C310697CC34A072DE7E940FAD/scale?width=1200&aspectRatio=1.78&format=webp',
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/81A736C2B6CC7B7B4A3F2E2381E36542715DFC550F765F49BC0770898DE5F32B/scale?width=1200&aspectRatio=1.78&format=webp',
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B92552B7CE9B7BB39BB3BDC551F35DB98C04740118F5B30975134814DF7A4E62/scale?width=1200&aspectRatio=1.78&format=webp',
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/773B031A52B5727F7C218E42149B45095C21A8BA56601EB1F51FC46485304210/scale?width=1200&aspectRatio=1.78&format=webp',
];

const MoviesList: FC = () => {
    const TRANSITION_DURATION = 200;
    const { userLoggedIn } = useAuth();
    const [noOfPages, setNoOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
    const { moviesList, setMoviesList } = useAppStore((state) => ({
        moviesList: state.moviesList,
        setMoviesList: state.setMoviesList,
    }));
    const [embla, setEmbla] = useState<Embla | null>(null);

    useAnimationOffsetEffect(embla, TRANSITION_DURATION);

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

    const slides = MoviesImagesList.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} />
        </Carousel.Slide>
    ));

    if (loading) {
        return <LoadingBars></LoadingBars>;
    }

    return userLoggedIn ? (
        <BackgroundImage className="movie-details" src="https://wallpapercave.com/wp/Rc3r14M.jpg">
            {!hasErrorOccurred ? (
                <div className="movie-details-carousel">
                    <Carousel
                        loop
                        getEmblaApi={setEmbla}
                        maw={480}
                        mx="auto"
                        withIndicators
                        onSlideChange={(index) => setCurrentPage(index)}
                    >
                        {slides}
                    </Carousel>
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
                                Star Wars {convertToRomanNumber(moviesList[currentPage]?.episode_id)}:{' '}
                                {moviesList[currentPage]?.title}
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
                                {moviesList[currentPage]?.release_date}
                            </Badge>
                        </Group>
                        <Divider></Divider>
                        <Text weight={400}>Opening Crawl:</Text>
                        <Spoiler
                            className="opening-crawl-container"
                            maxHeight={100}
                            showLabel="Show more"
                            hideLabel="Hide"
                        >
                            {moviesList[currentPage]?.opening_crawl}
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
                                Director: {moviesList[currentPage]?.director}
                            </List.Item>
                            <List.Item
                                icon={
                                    <ThemeIcon color="blue" size={24} radius="xl">
                                        <IconVideoPlus size="1rem" />
                                    </ThemeIcon>
                                }
                            >
                                Producer: {moviesList[currentPage]?.producer}
                            </List.Item>
                        </List>
                        <Divider></Divider>
                    </Card>
                </div>
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
