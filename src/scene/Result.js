import React from 'react';
import styled from 'styled-components';

const omikujiTable = [
    { no: 0, un: '大吉', weight: 30, img: '/img/kuji/large.png', text: '2020年のあなたの運勢は大吉です！今年は楽しいはんどんライフが送れるでしょう！' },
    { no: 1, un: '吉', weight: 25, img: '/img/kuji/normal.png', text: '2020年のあなたの運勢は吉です。' },
    { no: 2, un: '中吉', weight: 20, img: '/img/kuji/middle.png', text: '2020年のあなたの運勢は中吉です。' },
    { no: 3, un: '小吉', weight: 15, img: '/img/kuji/small.png', text: '2020年のあなたの運勢は小吉です。' },
    { no: 4, un: '末吉', weight: 0, img: '/img/kuji/bottom.png', text: '2020年のあなたの運勢は末吉です。' },
    { no: 5, un: '凶', weight: 10, img: '/img/kuji/bad.png', text: '2020年のあなたの運勢は凶です。十に七八は死ぬ。' }
]

const ResultContainer = styled.div`
    padding-top: 20px;
    width: 100%;
    overflow: scroll;
`;

const ShareContainer = styled.div`
    border: 1px solid #ccc;
    background-color: #fff;
    
    width: 90%;
    max-width: 400px;
    margin: 10px auto;
    color: #000;
    text-align: left;
    font-size: 12px;
`;

const ResultImage = styled.img`
    width: 90%;
    max-width: 400px;
    min-height: 300px;
`;

const ShareLink = styled.a`
    color: #000;
    text-decoration: none;
    vertical-align: middle;
`;

const pickKuji = () => {
    const p = Math.random() * 100;
    let acc = 0.0;
    for (let i = 0; i < omikujiTable.length; i++) {
        acc += omikujiTable[i].weight;
        if (p < acc) return omikujiTable[i];
    }

    console.error('bad weight');
    return null;
}

const Result = () => {
    const result = pickKuji();
    const shareText = `${result.text}\n\n#どんみくじ https://donmikuji.netlify.com`;
    const encodedShareText = encodeURIComponent(shareText);

    return (
        <ResultContainer>
            <ResultImage src={result.img} alt={result.text} />
            <ShareContainer>
                <div style={{ marginBottom: 10, fontWeight: 'bold' }}>結果をシェア</div>
                <ShareLink href={`https://handon.club/?text=${encodedShareText}`} target='_blank'>
                    <img src='/img/masto.png' alt='Mastodon' height='20' style={{ verticalAlign: 'middle' }} />handon.club</ShareLink>
                <div style={{ marginTop: 10 }}>コピペ用</div>
                <textarea value={shareText} style={{ width: '90%', height: 70 }} />
            </ShareContainer>
        </ResultContainer>)
}

export default Result;