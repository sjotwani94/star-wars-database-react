import { Avatar, BackgroundImage, Badge, Card, Group, Text } from '@mantine/core';
import {
    IconCliffJumping,
    IconFriends,
    IconHaze,
    IconPlanet,
    IconRotate360,
    IconRotate3d,
    IconRulerMeasure,
    IconTrees,
} from '@tabler/icons-react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingBars from '../../components/loader/LoadingBars';
import { PlanetDetailsModel } from '../../models/PlanetDetails';
import './PlanetDetails.scss';

const PlanetDetails: FC = () => {
    const { planetNumber } = useParams<{ planetNumber: string }>();
    const [planetDetails, setPlanetDetails] = useState<PlanetDetailsModel>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://swapi.dev/api/planets/' + planetNumber);
                if (!response.ok) {
                    throw new Error('Sorry, Something Went Wrong!');
                }
                const result = await response.json();
                setPlanetDetails(result);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const avatar = (iconAlt: string, color: string, iconNode: any) => (
        <Avatar alt={iconAlt} color={color} radius="xl">
            {iconNode}
        </Avatar>
    );

    if (loading) {
        return <LoadingBars></LoadingBars>;
    }

    return (
        <BackgroundImage
            className="planet-details-container"
            src="https://i.pinimg.com/originals/d7/a6/11/d7a61190a836bdcfc62bf97af4f4c74b.png"
        >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Planet Name: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Planet Icon Avatar', 'blue', <IconPlanet size="1.5rem" />)}
                    >
                        {planetDetails?.name}
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Climate: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Climate Icon Avatar', 'green', <IconHaze size="1.5rem" />)}
                    >
                        {planetDetails?.climate}
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Terrain: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Terrain Icon Avatar', 'yellow', <IconTrees size="1.5rem" />)}
                    >
                        {planetDetails?.terrain}
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Population: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Population Icon Avatar', 'red', <IconFriends size="1.5rem" />)}
                    >
                        {planetDetails?.population}
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Diameter: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Diameter Icon Avatar', 'red', <IconRulerMeasure size="1.5rem" />)}
                    >
                        {planetDetails?.diameter} KM
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Rotation Period: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Rotation Period Icon Avatar', 'purple', <IconRotate360 size="1.5rem" />)}
                    >
                        {planetDetails?.rotation_period} Hours
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Orbital Period: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Orbital Period Icon Avatar', 'purple', <IconRotate3d size="1.5rem" />)}
                    >
                        {planetDetails?.orbital_period} Days
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>Gravity: </Text>
                    <Badge
                        pl={0}
                        size="lg"
                        color="teal"
                        radius="xl"
                        leftSection={avatar('Gravity Icon Avatar', 'purple', <IconCliffJumping size="1.5rem" />)}
                    >
                        {planetDetails?.gravity}
                    </Badge>
                </Group>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>No. of Films where this planet was featured: </Text>
                    <Text weight={500}>{planetDetails?.films.length}</Text>
                </Group>
            </Card>
        </BackgroundImage>
    );
};

export default PlanetDetails;
