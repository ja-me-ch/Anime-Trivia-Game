import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <title>Anime Trivia Game</title>
                <meta property="og:type" content="website"/>
                <meta
                    property="og:url"
                    content="https://ja-me-ch.github.io/Anime-Trivia-Game/"
                />
                <meta property="og:title" content="Anime Trivia Game" />
                <meta
                    property="og:description"
                    content="An Anime Trivia Game that generates trivia from your profile on AniList.co"
                />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}