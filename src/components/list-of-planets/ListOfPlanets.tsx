import { Alert, Card, Container, Table } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanetDetailsModel } from '../../models/PlanetDetails';
import LoadingBars from '../loader/LoadingBars';
import './ListOfPlanets.scss';

interface ListOfPlanetsProps {
    planets: string[];
}

const ListOfPlanets: FC<ListOfPlanetsProps> = ({ planets }) => {
    const hasPlanetsListAlreadyFetched = useRef(false);
    const [loading, setLoading] = useState(true);
    const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
    const [planetsList, setPlanetsList] = useState<PlanetDetailsModel[]>([]);
    const navigate = useNavigate();

    const fetchMoviesList = async () => {
        const planetsListArray = planets.map(async (value) => {
            try {
                const response = await fetch(value);
                if (!response.ok) {
                    throw new Error('Sorry, Something Went Wrong!');
                }
                const result = await response.json();
                return result;
            } catch (error) {
                if (error instanceof Error) {
                    setHasErrorOccurred(true);
                }
            }
        });

        const planetsListResults: PlanetDetailsModel[] = await Promise.all(planetsListArray);
        setPlanetsList(planetsListResults);
        setLoading(false);
    };

    useEffect(() => {
        if (!hasPlanetsListAlreadyFetched.current) {
            fetchMoviesList();
            // Set the ref to true so it doesn't run again
            hasPlanetsListAlreadyFetched.current = true;
        }
    }, []);

    if (loading) {
        return <LoadingBars></LoadingBars>;
    }

    if (hasErrorOccurred) {
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Alert icon={<IconAlertCircle size="1rem" />} title="Some Error Occurred!" color="red">
                    Some Error Occurred While Fetching Data!
                </Alert>
            </Card>
        );
    }

    const navigateToPlanetDetailsPage = (url: string) => {
        navigate('/planet-details/' + url.slice(-2, -1));
    };

    const rows = planetsList.map((element) => (
        <tr key={element.url} onClick={() => navigateToPlanetDetailsPage(element.url)}>
            <td>{element.name}</td>
            <td>{element.climate}</td>
            <td>{element.diameter}</td>
            <td>{element.population}</td>
            <td>{element.terrain}</td>
        </tr>
    ));

    return (
        <Container className="planets-list-container">
            <Table striped className="planets-list-table" highlightOnHover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Climate</th>
                        <th>Diameter</th>
                        <th>Population</th>
                        <th>Terrain</th>
                    </tr>
                </thead>
                <tbody className="planets-list-table-body">{rows}</tbody>
            </Table>
        </Container>
    );
};

export default ListOfPlanets;
