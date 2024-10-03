import { Button, Container, Pagination, Table } from '@mantine/core';
import { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import LoadingBars from '../../components/loader/LoadingBars';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import { StarWarsCharacter } from '../../models/StarWarsCharacter';
import { useAppStore } from '../../store/app.store';
import './CharactersList.scss';

const CharactersList: FC = () => {
    const { userLoggedIn } = useAuth();
    const [data, setData] = useState<StarWarsCharacter[]>([]);
    const [loading, setLoading] = useState(true);
    const [noOfPages, setNoOfPages] = useState(1);
    const [searchFilter, setSearchFilter] = useState('');
    const navigate = useNavigate();

    const { activePage, setActivePage } = useAppStore((state) => ({
        activePage: state.activePage,
        setActivePage: state.setActivePage,
    }));

    useEffect(() => {
        const fetchCharactersList = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/people?page=' + activePage);
                if (!response.ok) {
                    throw new Error('Sorry, Something Went Wrong!');
                }
                const result = await response.json();
                setNoOfPages(Math.ceil(result.count / 10));
                setData(populateListOfCharacters(result.results));
            } finally {
                setLoading(false);
            }
        };

        fetchCharactersList();
    }, []);

    const populateListOfCharacters = (result: any[]) => {
        const elements: StarWarsCharacter[] = result.map((value) => {
            return {
                name: value.name,
                height: parseInt(value.height),
                mass: parseInt(value.mass),
                hair_color: value.hair_color,
                skin_color: value.skin_color,
                eye_color: value.eye_color,
                birth_year: value.birth_year,
                gender: value.gender,
                homeworld: value.homeworld,
                films: value.films.length,
                species: value.species.length,
                vehicles: value.vehicles.length,
                starships: value.starships.length,
                url: value.url,
            };
        });

        return elements;
    };

    const fetchCharactersList = async (page: number) => {
        setLoading(true);
        setActivePage(page);
        try {
            const response = await fetch('https://swapi.dev/api/people/?page=' + page);
            if (!response.ok) {
                throw new Error('Sorry, Something Went Wrong!');
            }
            const result = await response.json();
            setData(populateListOfCharacters(result.results));
        } finally {
            setLoading(false);
        }
    };

    const navigateToPlanetDetailsPage = (url: string) => {
        navigate('/planet-details/' + url.slice(-2, -1));
    };

    const rows = data.map((element) => (
        <tr key={element.url}>
            <td>{element.name}</td>
            <td>{element.height}</td>
            <td>{element.mass}</td>
            <td>{element.hair_color}</td>
            <td>{element.skin_color}</td>
            <td>{element.eye_color}</td>
            <td>{element.birth_year}</td>
            <td>{element.gender}</td>
            <td>
                <Button
                    onClick={() => navigateToPlanetDetailsPage(element.homeworld)}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                >
                    View Home World
                </Button>
            </td>
            <td>{element.films}</td>
            <td>{element.species}</td>
            <td>{element.vehicles}</td>
            <td>{element.starships}</td>
        </tr>
    ));

    if (loading) {
        return <LoadingBars></LoadingBars>;
    }

    return userLoggedIn ? (
        <Container className="characters-list-container">
            <Pagination value={activePage} onChange={fetchCharactersList} total={noOfPages} />
            <Table
                striped
                className="characters-list-table"
                highlightOnHover
                sx={{
                    width: '1400px',
                }}
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Hair Color</th>
                        <th>Skin Color</th>
                        <th>Eye Color</th>
                        <th>Birth Year</th>
                        <th>Gender</th>
                        <th>Home World</th>
                        <th>No. of Films</th>
                        <th>No. of Species</th>
                        <th>No. of Vehicles</th>
                        <th>No. of Starships</th>
                    </tr>
                </thead>
                <tbody className="characters-list-table-body">{rows}</tbody>
            </Table>
        </Container>
    ) : (
        <Navigate to={'/login'} replace={true} />
    );
};

export default CharactersList;
