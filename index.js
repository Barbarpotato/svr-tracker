// Core
import csv from 'csv-parser';
import express from 'express';
import { parse as csvToJson } from 'json2csv';
import { format } from 'date-fns';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import csvParser from 'csv-parser'; // Correct import name
import cors from 'cors';
import fetch from 'node-fetch';
import https from 'https';
import { Readable } from 'stream';

// Setup App
const app = express();
dotenv.config();

// Enable CORS for specific origin
app.use(cors({
    origin: 'https://itstaging.samamajuprima.co.id',
    methods: ['GET'],
    allowedHeaders: ['Content-Type']
}));


const data = [
    {
        "name": "Abdillah",
        "strava_url": "https://www.strava.com/athletes/127229834"
    },
    {
        "name": "Abdul Mushawwir M T",
        "strava_url": "https://www.strava.com/athletes/50725657"
    },
    {
        "name": "Amiruddin",
        "strava_url": "https://www.strava.com/athletes/104704203"
    },
    {
        "name": "Andi alfa saputra",
        "strava_url": "https://www.strava.com/athletes/106397289"
    },
    {
        "name": "Andi Muarija Mutmainna",
        "strava_url": "https://www.strava.com/athletes/156632283"
    },
    {
        "name": "Annisa Hikmayati",
        "strava_url": "https://www.strava.com/athletes/106084694"
    },
    {
        "name": "Arianto",
        "strava_url": "https://www.strava.com/athletes/112851876"
    },
    {
        "name": "Astrid",
        "strava_url": "https://www.strava.com/athletes/106134897"
    },
    {
        "name": "Azizah Rachman",
        "strava_url": "https://www.strava.com/athletes/156646455"
    },
    {
        "name": "Bagas",
        "strava_url": "https://www.strava.com/athletes/106130235"
    },
    {
        "name": "Bashiruddin Ahmad",
        "strava_url": "https://www.strava.com/athletes/106097569"
    },
    {
        "name": "Bernadus R.Niay",
        "strava_url": "https://www.strava.com/athletes/138877033"
    },
    {
        "name": "Calvien Hamiros",
        "strava_url": "https://www.strava.com/athletes/121860615"
    },
    {
        "name": "Dadang Suhenrah",
        "strava_url": "https://www.strava.com/athletes/156319990"
    },
    {
        "name": "Darmawan",
        "strava_url": "https://www.strava.com/athletes/131083157"
    },
    {
        "name": "Dirman",
        "strava_url": "https://www.strava.com/athletes/112848672"
    },
    {
        "name": "Djen Ahmad Idrus",
        "strava_url": "https://www.strava.com/athletes/105095022"
    },
    {
        "name": "Fajar Alamanda",
        "strava_url": "https://www.strava.com/athletes/131686008"
    },
    {
        "name": "Faradiba Pannyiwi",
        "strava_url": "https://www.strava.com/athletes/104676234"
    },
    {
        "name": "Farid Hadin Hidayat",
        "strava_url": "https://www.strava.com/athletes/104777661"
    },
    {
        "name": "Filly Juliets",
        "strava_url": "https://www.strava.com/athletes/156412556"
    },
    {
        "name": "Firman",
        "strava_url": "https://www.strava.com/athletes/156440955"
    },
    {
        "name": "Gusrin",
        "strava_url": "https://www.strava.com/athletes/131571848"
    },
    {
        "name": "Helmi kurniawan",
        "strava_url": "https://www.strava.com/athletes/133006873"
    },
    {
        "name": "Hendrawan",
        "strava_url": "https://www.strava.com/athletes/137990204"
    },
    {
        "name": "Heriadi",
        "strava_url": "https://www.strava.com/athletes/156293045"
    },
    {
        "name": "Herman",
        "strava_url": "https://www.strava.com/athletes/119635674"
    },
    {
        "name": "IIn Drisnu",
        "strava_url": "https://www.strava.com/athletes/156379904"
    },
    {
        "name": "Ikwan",
        "strava_url": "https://www.strava.com/athletes/156294430"
    },
    {
        "name": "Ivana Wijaya",
        "strava_url": "https://www.strava.com/athletes/106134283"
    },
    {
        "name": "Jabal Rahma",
        "strava_url": "https://www.strava.com/athletes/106105959"
    },
    {
        "name": "Jabal rahman",
        "strava_url": "https://www.strava.com/athletes/104703458"
    },
    {
        "name": "Jeanny Ivone Tombuku",
        "strava_url": "https://www.strava.com/athletes/104781990"
    },
    {
        "name": "Juwandimukzi al-kasfri",
        "strava_url": "https://www.strava.com/athletes/156293701"
    },
    {
        "name": "Kartika Fatimah",
        "strava_url": "https://www.strava.com/athletes/112850698"
    },
    {
        "name": "Kusraniansyah",
        "strava_url": "https://www.strava.com/athletes/156326553"
    },
    {
        "name": "Lili Samsia",
        "strava_url": "https://www.strava.com/athletes/104704718"
    },
    {
        "name": "Lisa",
        "strava_url": "https://www.strava.com/athletes/104782290"
    },
    {
        "name": "M. Rusli",
        "strava_url": "https://www.strava.com/athletes/156142957"
    },
    {
        "name": "Mahesa Taqwa",
        "strava_url": "https://www.strava.com/athletes/131046514"
    },
    {
        "name": "Masita",
        "strava_url": "https://www.strava.com/athletes/104977078"
    },
    {
        "name": "Medyoto tikupasang",
        "strava_url": "https://www.strava.com/athletes/156382528"
    },
    {
        "name": "Muh Akbar",
        "strava_url": "https://www.strava.com/athletes/131080559"
    },
    {
        "name": "Muh Amri",
        "strava_url": "https://www.strava.com/athletes/112851267"
    },
    {
        "name": "Muh Rizal Alwi",
        "strava_url": "https://www.strava.com/athletes/104777566"
    },
    {
        "name": "Muh. Risal",
        "strava_url": "https://www.strava.com/athletes/112849019"
    },
    {
        "name": "Muhajirin",
        "strava_url": "https://www.strava.com/athletes/156326813"
    },
    {
        "name": "Muhammad Albar Ali",
        "strava_url": "https://www.strava.com/athletes/104703436"
    },
    {
        "name": "Muhammad Aswad",
        "strava_url": "https://www.strava.com/athletes/104142273"
    },
    {
        "name": "Muna",
        "strava_url": "https://www.strava.com/athletes/106128990"
    },
    {
        "name": "Musfira",
        "strava_url": "https://www.strava.com/athletes/156646250"
    },
    {
        "name": "Musfira",
        "strava_url": "https://www.strava.com/athletes/168456004"
    },
    {
        "name": "Mustabsyirah",
        "strava_url": "https://www.strava.com/athletes/112850204"
    },
    {
        "name": "Naim Supriadi",
        "strava_url": "https://www.strava.com/athletes/131082566"
    },
    {
        "name": "Nelidasarid",
        "strava_url": "https://www.strava.com/athletes/156395267"
    },
    {
        "name": "Nur Aliah",
        "strava_url": "https://www.strava.com/athletes/104977227"
    },
    {
        "name": "Nur Tazkiyah Sejati",
        "strava_url": "https://www.strava.com/athletes/137818829"
    },
    {
        "name": "Nurul Masrifa",
        "strava_url": "https://www.strava.com/athletes/104142305"
    },
    {
        "name": "Nurul muhammad",
        "strava_url": "https://www.strava.com/athletes/106400926"
    },
    {
        "name": "Poppy wahyudi",
        "strava_url": "https://www.strava.com/athletes/106096757"
    },
    {
        "name": "Rahmat amri",
        "strava_url": "https://www.strava.com/athletes/106142836"
    },
    {
        "name": "Rahmat wahyudi",
        "strava_url": "https://www.strava.com/athletes/156310816"
    },
    {
        "name": "Ramadan",
        "strava_url": "https://www.strava.com/athletes/131082755"
    },
    {
        "name": "Regina",
        "strava_url": "https://www.strava.com/athletes/128848631"
    },
    {
        "name": "Retno Dewi Shinta",
        "strava_url": "https://www.strava.com/athletes/106396953"
    },
    {
        "name": "Rina",
        "strava_url": "https://www.strava.com/athletes/104704146"
    },
    {
        "name": "Rindiyani",
        "strava_url": "https://www.strava.com/athletes/156667848"
    },
    {
        "name": "Rio Jonas",
        "strava_url": "https://www.strava.com/athletes/147973538"
    },
    {
        "name": "Rosmini",
        "strava_url": "https://www.strava.com/athletes/156651628"
    },
    {
        "name": "Samsul Bahri",
        "strava_url": "https://www.strava.com/athletes/155797411"
    },
    {
        "name": "Sultan",
        "strava_url": "https://www.strava.com/athletes/105270975"
    },
    {
        "name": "Vincent Gonardy",
        "strava_url": "https://www.strava.com/athletes/156363541"
    },
    {
        "name": "Wanti Pertiwi",
        "strava_url": "https://www.strava.com/athletes/156753906"
    },
    {
        "name": "Wilda faradillah",
        "strava_url": "https://www.strava.com/athletes/156326185"
    },
    {
        "name": "Yuliana Bulo",
        "strava_url": "https://www.strava.com/athletes/106141823"
    },
    {
        "name": "Yurenee",
        "strava_url": "https://www.strava.com/athletes/106130604"
    },
    {
        "name": "Yusran. M",
        "strava_url": "https://www.strava.com/athletes/156308038"
    },
    {
        "name": "Zelviani Damayanti",
        "strava_url": "https://www.strava.com/athletes/156299639"
    }
]


const groupMember = {
    "BEYOND LIMITS": [
        "106397289", // andi alfa
        "156395267", // Neli,
        "156412556", //Filly Juliet,
        "147973538", // Rio
    ],
    "MAUNG": [
        "112850698",
        "133006873",
        "127229834",
        "156651628"
    ],
    "SuHu": [
        "131686008",
        "112850204",
        "137990204",
        "156310816"
    ],
    "KOPI": [
        "50725657",
        "104704718",
        "131080559",
        "104704146"
    ],
    "Satgas Lari": [
        "156440955",
        "104782290",
        "131571848",
        "106400926"
    ],
    "The Munazt": [
        "104777566",
        "106128990",
        "156299639",
        "131083157"
    ],
    "PS (Pelari Santai)": [
        "104704203",
        "104142305",
        "106084694",
        "106105959"
    ],
    "Tupai Terbang": [
        "105095022",
        "104676234",
        "168456004", // Musfira
        "112849019"
    ],
    "The Rising Star": [
        "106142836",
        "131082755",
        "106396953",
        "156382528"
    ],
    "Kanvas Lari": [
        "131082566",
        "106141823",
        "156646455",
        "104142273"
    ],
    "Teman Lari Sore": [
        "156326553",
        "156379904",
        "156294430",
        "106096757"
    ],
    "Lari Sprint": [
        "104977078",
        "156293045",
        "121860615",
        "156326813",
        "137818829"
    ],
    "VMA3": [
        "156363541",
        "104703436",
        "112851876",
        "156632283",
        "104977227"
    ],
    "Lari Kalo Ingat": [
        "112851267",
        "156753906",
        "156308038",
        "106130235",
        "119635674"
    ],
    "Anti Lari Kosong": [
        "156293701",
        "156319990",
        "106134283",
        "112848672",
        "106130604"
    ],
    "Grup Lari Gak Jelas": [
        "104781990",
        "128848631",
        "104703458",
        "138877033",
        "131046514"
    ]
}

const tournament_table = [
    {
        title: "Quarter Final",
        start: "2025-06-16",
        end: "2025-06-17",
        matchlist: [
            // Upper Bracket
            [groupMember["MAUNG"], groupMember["SuHu"]],
            [groupMember["The Munazt"], groupMember["Tupai Terbang"]],
            [groupMember["Teman Lari Sore"], groupMember["Lari Kalo Ingat"]],
            [groupMember["Anti Lari Kosong"], groupMember["The Rising Star"]],

            // Lower Bracket
            [groupMember["BEYOND LIMITS"], groupMember["KOPI"]],
            [groupMember["Satgas Lari"], groupMember["PS (Pelari Santai)"]],
            [groupMember["Lari Sprint"], groupMember["VMA3"]],
            [groupMember["Kanvas Lari"], groupMember["Grup Lari Gak Jelas"]]
        ]
    },
    {
        title: "Semi Final",
        start: "2025-06-20",
        end: "2025-06-21",
        matchlist: [

            // upper bracket
            [groupMember["MAUNG"], groupMember["The Munazt"]],
            [groupMember["Anti Lari Kosong"], groupMember["Teman Lari Sore"]],

            // lower bracket
            [groupMember["BEYOND LIMITS"], groupMember["Pelari Santai"]],
            [groupMember["VMA3"], groupMember["Grup Lari Gak Jelas"]]
        ]
    },
    {
        title: "Final",
        start: "2025-06-24",
        end: "2025-06-26",
        matchlist: []
    }
];


app.get('/tournament-matches', async (req, res) => {
    try {
        // Buat peta ID atlet untuk pencarian
        const athleteIdMap = data.reduce((map, athlete) => {
            map[athlete.name.toLowerCase()] = {
                id: athlete.strava_url.split('/').pop(),
                name: athlete.name
            };
            return map;
        }, {});

        // Proses setiap fase turnamen
        const phaseResults = [];
        let previousWinners = [];
        for (const phase of tournament_table) {
            const phaseDates = getPhaseDates(phase.start, phase.end);
            const activitiesByDate = {};

            // Ambil dan parse CSV untuk setiap tanggal di fase
            let hasValidData = false;
            for (const date of phaseDates) {
                const csvUrl = `https://itstaging.samamajuprima.co.id/SVR_${date}.csv`;
                const results = [];

                try {
                    const response = await fetch(csvUrl);
                    if (response.status !== 200) {
                        console.log(`CSV for ${date} not found (HTTP ${response.status}), skipping`);
                        continue;
                    }
                    const text = await response.text();
                    if (!text) {
                        console.log(`CSV for ${date} is empty, skipping`);
                        continue;
                    }

                    // Parse CSV
                    await new Promise((resolve, reject) => {
                        const bufferStream = Readable.from(text);
                        bufferStream
                            .pipe(csvParser())
                            .on('data', (row) => {
                                // Validasi dan format ulang kolom tanggal (misalnya, 16/06/2025 ke 2025-06-16)
                                let rowDate = row.date;
                                if (rowDate && rowDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                                    const [day, month, year] = rowDate.split('/');
                                    rowDate = `${year}-${month}-${day}`;
                                }
                                if (rowDate && /^\d{4}-\d{2}-\d{2}$/.test(rowDate) && rowDate === date) {
                                    // Bersihkan dan ubah jarak ke angka
                                    if (row.distance && typeof row.distance === 'string') {
                                        row.distance = parseFloat(row.distance.replace(',', '.'));
                                        // Abaikan baris dengan jarak ≤ 3 km
                                        if (row.distance <= 3) {
                                            return;
                                        }
                                        // Batasi jarak pada 15 km untuk baris > 15 km
                                        if (row.distance > 15) {
                                            row.distance = 15;
                                        }
                                    }
                                    results.push(row);
                                }
                            })
                            .on('end', resolve)
                            .on('error', err => {
                                console.error(`CSV parsing error for ${date}:`, err.message);
                                reject(new Error(`Failed to parse CSV for ${date}: ${err.message}`));
                            });
                    });

                    // Agregasi jarak berdasarkan nama atlet
                    const aggregatedResults = {};
                    results.forEach(row => {
                        const name = row.name.toLowerCase();
                        if (!aggregatedResults[name]) {
                            aggregatedResults[name] = {
                                name: row.name,
                                id: athleteIdMap[name]?.id,
                                distance: 0
                            };
                        }
                        aggregatedResults[name].distance += row.distance || 0;
                    });

                    // Terapkan batas 15 km pada jarak agregasi
                    Object.values(aggregatedResults).forEach(athlete => {
                        if (athlete.distance > 15) {
                            athlete.distance = 15;
                        }
                    });

                    activitiesByDate[date] = Object.values(aggregatedResults);
                    hasValidData = true;
                } catch (err) {
                    console.log(`Error processing CSV for ${date}: ${err.message}, skipping`);
                    continue;
                }
            }

            // Lewati fase jika tidak ada data valid
            if (!hasValidData) {
                console.log(`No valid CSV data for ${phase.title}, skipping phase`);
                continue;
            }

            // Proses pertandingan untuk fase
            const matches = (phase.title === 'Quarter Final' ? phase.matchlist : computeNextPhaseMatches(previousWinners)).map(([group1Ids, group2Ids], index) => {
                const group1Name = Object.keys(groupMember).find(key => groupMember[key] === group1Ids);
                const group2Name = Object.keys(groupMember).find(key => groupMember[key] === group2Ids);
                if (!group1Name || !group2Name) {
                    throw new Error(`Group names not found for match ${index + 1} in ${phase.title}`);
                }

                const group1MemberCount = group1Ids.length;
                const group2MemberCount = group2Ids.length;

                // Inisialisasi members dengan semua anggota dari groupMember
                const members = {
                    [group1Name]: group1Ids.map(id => {
                        const athlete = data.find(a => a.strava_url.endsWith(id));
                        return { name: athlete ? athlete.name : 'Unknown', id: id, distance: 0 };
                    }),
                    [group2Name]: group2Ids.map(id => {
                        const athlete = data.find(a => a.strava_url.endsWith(id));
                        return { name: athlete ? athlete.name : 'Unknown', id: id, distance: 0 };
                    })
                };

                // Hitung rata-rata jarak untuk setiap tanggal di fase
                const distances = {};
                for (const date of phaseDates) {
                    const activities = activitiesByDate[date] || [];

                    // Grup 1
                    let group1TotalDistance = 0;
                    group1Ids.forEach(id => {
                        const activity = activities.find(row => {
                            const athleteInfo = athleteIdMap[row.name.toLowerCase()];
                            return athleteInfo && athleteInfo.id === id;
                        });
                        const member = members[group1Name].find(m => m.id === id);
                        if (activity && member) {
                            member.distance += activity.distance || 0;
                            group1TotalDistance += activity.distance || 0;
                        }
                    });
                    const group1Average = group1MemberCount > 0 ? (group1TotalDistance / group1MemberCount).toFixed(2) : '0.00';

                    // Grup 2
                    let group2TotalDistance = 0;
                    group2Ids.forEach(id => {
                        const activity = activities.find(row => {
                            const athleteInfo = athleteIdMap[row.name.toLowerCase()];
                            return athleteInfo && athleteInfo.id === id;
                        });
                        const member = members[group2Name].find(m => m.id === id);
                        if (activity && member) {
                            member.distance += activity.distance || 0;
                            group2TotalDistance += activity.distance || 0;
                        }
                    });
                    const group2Average = group2MemberCount > 0 ? (group2TotalDistance / group2MemberCount).toFixed(2) : '0.00';

                    distances[date] = {
                        [group1Name]: group1Average,
                        [group2Name]: group2Average
                    };
                }

                // Hitung total jarak akhir
                const group1Total = phaseDates.reduce((sum, date) => {
                    return sum + parseFloat(distances[date]?.[group1Name] || 0);
                }, 0).toFixed(2);
                const group2Total = phaseDates.reduce((sum, date) => {
                    return sum + parseFloat(distances[date]?.[group2Name] || 0);
                }, 0).toFixed(2);

                // Tentukan pemenang
                const winner = parseFloat(group1Total) > parseFloat(group2Total) ? group1Name :
                    parseFloat(group2Total) > parseFloat(group1Total) ? group2Name : 'Tie';

                return {
                    match: `${group1Name} vs ${group2Name}`,
                    distances,
                    totalDistance: {
                        [group1Name]: group1Total,
                        [group2Name]: group2Total
                    },
                    members: members, // Daftar anggota lengkap dengan jarak
                    winner
                };
            });

            // Simpan pemenang untuk fase berikutnya
            previousWinners = matches
                .filter(match => match.winner !== 'Tie')
                .map(match => {
                    const [group1Name] = match.match.split(' vs ');
                    return match.winner === group1Name ? groupMember[group1Name] : groupMember[match.winner];
                });

            phaseResults.push({
                title: phase.title,
                start: phase.start,
                end: phase.end,
                matches
            });
        }

        if (!phaseResults.length) {
            return res.status(200).json({ message: 'No tournament phases with valid CSV data found' });
        }

        res.json(phaseResults);
    } catch (err) {
        console.error('Tournament matches error:', err.message);
        res.status(500).json({ error: `Error processing tournament matches: ${err.message}` });
    }
});

// Helper untuk menghasilkan tanggal dalam rentang fase
function getPhaseDates(start, end) {
    const dates = [];
    let current = new Date(start);
    const endDate = new Date(end);
    while (current <= endDate) {
        dates.push(current.toLocaleDateString('en-CA'));
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

// Helper untuk menghitung pertandingan fase berikutnya berdasarkan pemenang sebelumnya
function computeNextPhaseMatches(winners) {
    if (winners.length < 2) return [];
    const matches = [];
    for (let i = 0; i < winners.length; i += 2) {
        if (winners[i + 1]) {
            matches.push([winners[i], winners[i + 1]]);
        }
    }
    return matches;
}


app.get('/strava', async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' });
        const csvUrl = `https://itstaging.samamajuprima.co.id/SVR_${today}.csv`;

        // Fetch all athlete pages concurrently
        const athleteResponses = await Promise.all(
            data.map(athlete =>
                fetch(athlete.strava_url)
                    .then(res => res.text())
                    .then(pageData => {
                        const match = pageData.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
                        if (!match) throw new Error(`No script tag found for ${athlete.name}`);
                        return { athlete, jsonData: JSON.parse(match[1].trim()) };
                    })
            )
        );

        // Extract today's or tomorrow's activities
        const activities = athleteResponses.flatMap(({ athlete, jsonData }) => {
            const athleteData = jsonData.props.pageProps.athleteData;
            let date = new Date();
            date.setDate(date.getDate() + 1);
            const tomorrow = format(date, 'MMMM d, yyyy');

            const athleteid = athleteData.athlete.id;

            return (athleteData.recentActivities || [])
                .filter(activity => activity.startDateLocal === 'Today' || activity.startDateLocal === tomorrow || activity.startDateLocal === "Yesterday")
                .map(activity => ({
                    id: athleteid,
                    activity_id: activity.id,
                    date: activity.startDateLocal,
                    name: athlete.name,
                    distance: activity.distance,
                    elevation: activity.elevation,
                    moving_time: activity.movingTime,
                    type: activity.type,
                    link: `https://www.strava.com/activities/${activity.id}`
                }));
        });

        // Fetch and extract detail + images from activity pages
        const activityResponses = await Promise.all(
            activities.map(activity =>
                fetch(activity.link)
                    .then(res => res.text())
                    .then(pageData => {
                        const match = pageData.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
                        if (!match) throw new Error(`No script tag found for activity ${activity.link}`);

                        const jsonData = JSON.parse(match[1].trim());
                        const activityData = jsonData.props.pageProps.activity;
                        if (!activityData) return null;

                        // Extract images using Cheerio
                        const $ = cheerio.load(pageData);
                        const images = [];
                        $('button[data-cy="photo"]').each((_, el) => {
                            const src = $(el).find('img').attr('src');
                            if (src) images.push(src);
                        });

                        const matchDate = activityData.startLocal.match(/^(\d{4}-\d{2}-\d{2})/);
                        const detail_date = matchDate ? matchDate[1] : null;

                        return {
                            activity_id: activity.activity_id,
                            id: activity.id,
                            date: detail_date,
                            name: activity.name,
                            distance: new Intl.NumberFormat('de-DE').format((activityData.scalars.distance / 1000).toFixed(2)),
                            elevation: activity.elevation,
                            moving_time: activity.moving_time,
                            type: activity.type,
                            link: activity.link,
                            images: images.join(', ')
                        };
                    })
            )
        );

        const real_activity = activityResponses.filter(result => result !== null);

        // Fetch existing CSV from itstaging server
        let existingActivities = [];
        try {
            const response = await fetch(csvUrl);
            if (response.status !== 200) {
                console.log(`CSV not found for ${today}, creating new file`);
                // Jika CSV tidak ada, lanjutkan dengan array kosong
            } else {
                const text = await response.text();
                if (!text) {
                    console.log(`CSV for ${today} is empty`);
                } else {
                    // Parse existing CSV
                    await new Promise((resolve, reject) => {
                        const bufferStream = Readable.from(text);
                        bufferStream
                            .pipe(csvParser())
                            .on('data', (row) => {
                                existingActivities.push({
                                    activity_id: row.activity_id,
                                    id: row.id,
                                    date: row.date,
                                    name: row.name,
                                    distance: row.distance,
                                    elevation: row.elevation,
                                    moving_time: row.moving_time,
                                    type: row.type,
                                    link: row.link,
                                    images: row.images
                                });
                            })
                            .on('end', resolve)
                            .on('error', err => {
                                console.error('CSV parsing error:', err.message);
                                reject(new Error(`Failed to parse CSV: ${err.message}`));
                            });
                    });
                }
            }
        } catch (err) {
            console.error('Error fetching or parsing CSV:', err.message);
            throw new Error(`Unable to fetch or parse CSV from ${csvUrl}: ${err.message}`);
        }

        // Pastikan semua ID di-set sebagai string untuk konsistensi
        const existingActivityIds = new Set(existingActivities.map(a => String(a.activity_id)));

        // Buang duplikat dalam real_activity sendiri (jika ada)
        const realActivityMap = new Map();
        for (const activity of real_activity) {
            const id = String(activity.activity_id);
            realActivityMap.set(id, activity); // Jika ada duplikat ID, akan ditimpa (keep latest occurrence)
        }

        // Ambil hanya yang belum ada di existing
        const uniqueRealActivities = Array.from(realActivityMap.values()).filter(activity =>
            !existingActivityIds.has(String(activity.activity_id))
        );

        // Gabungkan semuanya tanpa duplikat
        const mergedActivities = [...existingActivities, ...uniqueRealActivities];

        // Convert merged activities to CSV for client response
        const csv = csvToJson(mergedActivities, {
            fields: ['activity_id', 'id', 'date', 'name', 'distance', 'elevation', 'moving_time', 'type', 'link', 'images']
        });

        // Send merged activities as CSV to client
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="SVR_${today}.csv"`);
        res.status(200).send(csv);
    } catch (err) {
        console.error('Main error:', err.message);
        res.status(500).send(`Error processing request: ${err.message}`);
    }
});


app.get('/read-csv', (req, res) => {
    const date = req.query.date; // Get date from query parameter
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ error: 'Invalid or missing date parameter. Use format YYYY-MM-DD' });
    }
    const csvUrl = `https://itstaging.samamajuprima.co.id/SVR_${date}.csv`;

    const results = [];

    // Creating a map of athlete names to their IDs and names for lookup
    const athleteIdMap = data.reduce((map, athlete) => {
        map[athlete.name.toLowerCase()] = {
            id: athlete.strava_url.split('/').pop(),
            name: athlete.name
        };
        return map;
    }, {});

    // Fetching and parsing CSV
    https.get(csvUrl, (response) => {
        response
            .pipe(csv())
            .on('data', (row) => {
                // Validate and reformat CSV date field (e.g., 16/06/2025 to 2025-06-16)
                let rowDate = row.date;
                if (rowDate && rowDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
                    const [day, month, year] = rowDate.split('/');
                    rowDate = `${year}-${month}-${day}`;
                }
                if (rowDate && /^\d{4}-\d{2}-\d{2}$/.test(rowDate) && rowDate === date) {
                    // Cleaning and transforming distance to a number
                    if (row.distance && typeof row.distance === 'string') {
                        row.distance = parseFloat(row.distance.replace(',', '.'));
                        // Exclude rows with distance ≤ 3 km
                        if (row.distance <= 3) {
                            return;
                        }
                        // Cap distance at 15 km for rows > 15 km
                        if (row.distance > 15) {
                            row.distance = 15;
                        }
                    }
                    results.push(row);
                }
            })
            .on('end', () => {
                // Aggregate distances by athlete name
                const aggregatedResults = {};
                results.forEach(row => {
                    const name = row.name.toLowerCase();
                    if (!aggregatedResults[name]) {
                        aggregatedResults[name] = {
                            name: row.name,
                            id: athleteIdMap[name]?.id,
                            distance: 0
                        };
                    }
                    aggregatedResults[name].distance += row.distance || 0;
                });

                // Apply 15 km cap to aggregated distance
                Object.values(aggregatedResults).forEach(athlete => {
                    if (athlete.distance > 15) {
                        athlete.distance = 15;
                    }
                });

                // Convert aggregated results to array
                const aggregatedArray = Object.values(aggregatedResults);

                // Aggregating distances by group
                const groupStats = Object.keys(groupMember).map(group => {
                    const memberIds = groupMember[group];
                    const memberCount = memberIds.length;

                    // Collecting member details
                    const members = memberIds.map(id => {
                        const athlete = data.find(a => a.strava_url.endsWith(id));
                        const name = athlete ? athlete.name : 'Unknown';
                        const activity = aggregatedArray.find(row => {
                            const athleteInfo = athleteIdMap[row.name.toLowerCase()];
                            return athleteInfo && athleteInfo.id === id;
                        });
                        const distance = activity && !isNaN(activity.distance) ? activity.distance.toFixed(2) : '0.00';
                        return { name, distance };
                    });

                    // Summing distances
                    const totalDistance = members.reduce((sum, member) => {
                        return sum + parseFloat(member.distance);
                    }, 0);

                    // Calculating average distance
                    const averageDistance = memberCount > 0 ? (totalDistance / memberCount).toFixed(2) : '0.00';

                    return {
                        group,
                        totalDistance: totalDistance.toFixed(2),
                        memberCount,
                        averageDistance,
                        members
                    };
                });

                // Sorting groups by average distance in descending order
                groupStats.sort((a, b) => b.averageDistance - a.averageDistance);

                res.json(groupStats);
            })
            .on('error', (err) => {
                console.error('CSV download error:', err.message);
                res.status(500).json({ error: 'Failed to fetch CSV file' });
            });
    });
});

app.listen(3000, () => {
    console.log(`HELLO SVR! Your API is running on port 3000`);
});