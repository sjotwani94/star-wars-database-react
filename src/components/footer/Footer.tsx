import { ThemeIcon } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { FC } from 'react';
import './Footer.scss';

const Footer: FC = () => (
    <footer className="footer">
        <p>Made with&nbsp;</p>
        <ThemeIcon color="indigo">
            <IconHeart style={{ width: '70%', height: '70%' }} />
        </ThemeIcon>
        &nbsp;
        <a href="https://www.linkedin.com/in/siddharth-jotwani-1a835a166">Siddharth Jotwani</a>
    </footer>
);

export default Footer;
