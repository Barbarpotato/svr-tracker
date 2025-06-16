// Core
import express from 'express';
import { parse } from 'json2csv';
import { format } from 'date-fns';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import https from 'https';
import csv from 'csv-parser';
import cors from 'cors';


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
    "Tupao Terbang": [
        "105095022",
        "104676234",
        "168456004", // Musfira
        "156646250", // Musfira
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



app.get('/download-csv', async (req, res) => {
    try {
        const activities = []; // Store activities

        const fetchPromises = data.map(async (athlete) => {
            const response = await fetch(athlete.strava_url);
            const pageData = await response.text(); // Rename data to pageData to avoid shadowing

            const regex = /<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s;
            const match = pageData.match(regex);

            if (match) {
                try {
                    const jsonData = JSON.parse(match[1].trim());
                    const athleteData = jsonData.props.pageProps.athleteData;

                    let date = new Date();
                    date.setDate(date.getDate() + 1);
                    date = format(date, "MMMM d, yyyy");

                    // Filter activities for today
                    const filteredActivities = athleteData.recentActivities?.filter(activity => activity.startDateLocal === "Today" || activity.startDateLocal === date);

                    // Add additional properties to filtered activities
                    if (filteredActivities?.length) {
                        const activitiesList = filteredActivities.map((activity) => ({
                            name: athlete.name,
                            distance: activity.distance,
                            elevation: activity.elevation,
                            moving_time: activity.movingTime,
                            type: activity.type,
                            link: `https://www.strava.com/activities/${activity.id}`
                        }));

                        activities.push(...activitiesList);
                    }
                } catch (error) {
                    console.error(`Error parsing JSON for ${athlete.name}:`, error);
                }
            } else {
                console.log(`Script tag not found for ${athlete.name}!`);
            }
        });

        await Promise.all(fetchPromises);

        // Convert to CSV
        const csv = parse(activities);

        // Set CSV headers for download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');
        res.status(200).send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error generating CSV');
    }
});


app.get('/strava', async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Singapore' });

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

            return (athleteData.recentActivities || [])
                .filter(activity => activity.startDateLocal === 'Today' || activity.startDateLocal === tomorrow)
                .map(activity => ({
                    id: activity.id,
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

        // Convert to CSV
        const csv = parse(real_activity);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="SVR-5.csv"');
        res.status(200).send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
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
                // Cleaning and transforming distance to a number
                if (row.distance && typeof row.distance === 'string') {
                    row.distance = parseFloat(row.distance.replace(',', '.'));
                }
                results.push(row);
            })
            .on('end', () => {
                // Aggregating distances by group
                const groupStats = Object.keys(groupMember).map(group => {
                    const memberIds = groupMember[group];
                    const memberCount = memberIds.length;

                    // Collecting member details
                    const members = memberIds.map(id => {
                        const athlete = data.find(a => a.strava_url.endsWith(id));
                        const name = athlete ? athlete.name : 'Unknown';
                        const activity = results.find(row => {
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