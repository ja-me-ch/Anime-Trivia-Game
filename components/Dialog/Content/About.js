import { Button, Link, styled } from '@mui/material'

const ButtonStyle = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette[theme.palette.theme].primary.main,
    color: theme.palette[theme.palette.theme].primary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette[theme.palette.theme].primary.light
    }
}));

const About = {
    title: 'About',
    content: <div>
        <div>
            <ButtonStyle variant='contained'>
                <Link href='https://github.com/ja-me-ch/Anime-Trivia-Game' underline='none' rel='noreferrer' target='_blank'
                sx={{
                    color: 'white'
                }}
                >
                    GitHub Page
                </Link>
            </ButtonStyle>
        </div>
        <div>
            An application that generates random trivia based on a list on&nbsp;
            <Link href='https://anilist.co/home' underline='hover' rel='noreferrer' target='_blank'>
                AniList
            </Link>.
        </div>
    </div>
}

export default About;