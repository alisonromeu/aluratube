import React, { useState } from 'react';
import config from '../config.json';
import styled from 'styled-components';

import {CSSReset} from '../src/components/CSSReset';
import { StyledTimeline } from "../src/components/Timeline";
import Menu from '../src/components/Menu';

function PageHome() {

    const [valorDoFiltro, setValorDoFiltro] = useState('');

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
                    Conteúdo
                </Timeline>
            </div>
        </>
    )
}

export default PageHome;

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .userInfo {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

const StyledBanner = styled.div`
    background-image: url(${({bg}) => bg});
    height: 230px;
    background-size: cover;
`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className='userInfo'>
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline({searchValue, ...propriedades}) {
    
    const playlistNames = Object.keys(propriedades.playlists);
    
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName, index) => {
                const videos = propriedades.playlists[playlistName];
                
                return (
                    <section key={index}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();

                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video, index) => {
                                return (
                                    <a href={video.url} key={index}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}