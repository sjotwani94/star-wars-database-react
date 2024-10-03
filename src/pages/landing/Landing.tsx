import { Container, Paper, Title } from '@mantine/core';
import { FC } from 'react';
import { useAuth } from '../../contexts/AuthContext/AuthContext';
import './Landing.scss';

const Landing: FC = () => {
    const { userLoggedIn, currentUser } = useAuth();
    return (
        <>
            <Container className="box-container">
                {userLoggedIn ? (
                    <Title order={5}>
                        Hi, you are signed in as {currentUser.email}. This Encyclopedia tries to display all the Star
                        Wars data: Planets, Spaceships, Vehicles, People, Films and Species. The data displayed is
                        collected from the 7 Star Wars films released till 2015
                    </Title>
                ) : (
                    <Title order={5}>
                        This Encyclopedia tries to display all the Star Wars data: Planets, Spaceships, Vehicles,
                        People, Films and Species. The data displayed is collected from the 7 Star Wars films released
                        till 2015
                    </Title>
                )}
            </Container>
            <div className="info-cards-wrapper">
                <Paper className="informative-paper" shadow="xs" p="xl">
                    <div className="title">Characters List Page</div>
                    <div>
                        Click on the Characters Link above in the navigation bar to display the list of Characters
                        included in all the 7 Star Wars Films
                    </div>
                </Paper>
                <Paper className="informative-paper" shadow="xs" p="xl">
                    <div className="title">Planet Description Page</div>
                    <div>
                        Clicking on any of the values inside Homeworld Column in the table displayed inside Characters
                        List Page should open Planet Description Page describing details about the planet
                    </div>
                </Paper>
                <Paper className="informative-paper" shadow="xs" p="xl">
                    <div className="title">Movies List Page</div>
                    <div>
                        Clicking on the Movies Link above in the navigation bar will display the list of Star War Films
                        released till 2015.
                    </div>
                </Paper>
            </div>
        </>
    );
};

export default Landing;
